import axios from "axios";
import axiosService from "../axios";
import { Api_endpoint } from "@/types/enums";
import { IPaymentInitializeProps, IPaymentProducts } from "@/types/payment";
import { BASE_URL } from "@/config";

// payment status
export const phonePePaymentStatusRequest = async (
  merchantId: FormDataEntryValue | null,
  transactionId: FormDataEntryValue | null,
  checksum: string
) => {
  try {
    const options = {
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_PHONE_PE_STATUS_URL}/${merchantId}/${transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${merchantId}`,
      },
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// phonePe payment request
export const postPhonePePayment = async ( dataBase64: string, checksum: string ) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_PHONE_PE_REQUEST_URL}`, { request: dataBase64 },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const paymentInitialization = async (data: IPaymentInitializeProps) => {
  try {
    return axiosService.post(`/${Api_endpoint.payment_initialization}`, data)
  } catch (error) {
    throw error
  }
}

// get products
export const getPaymentProducts = async ():Promise<{success: boolean, message:string, data?: IPaymentProducts[]}> => {
  try {
    const res = await axios.get(`${BASE_URL}/${Api_endpoint.payment_products}`)
    return res.data
  } catch (error:any) {
    return {success: false, message: error?.response?.data }
  }
}
