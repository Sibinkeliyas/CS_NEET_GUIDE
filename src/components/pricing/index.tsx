"use client";
import React, { useState } from "react";
import PricingCard from "./PricingCard";
import Slider, { Settings } from "react-slick";
import { IPaymentProducts } from "@/types/payment";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { paymentInitialization, postPhonePePayment } from "@/utils/api/payment";
import { useSelector } from "@/store";
import { toast } from "@/components/ui/use-toast";
import { ERROR, PAYMENT } from "@/types/enums";
import { CS_BASE_URL } from "@/config";
import { encrypt } from "@/utils";

// color data
const colorData: any = {
  0: {
    bgColor: "bg-[#CCFDD0]",
    btnColor: "bg-[#0B6049]",
  },
  1: {
    bgColor: "bg-[#C2D6FF]",
    btnColor: "bg-[#3b82f6]",
  },
  2: {
    bgColor: "bg-[#FFE1C3]",
    btnColor: "bg-[#f97316]",
  },
};

const Pricing = ({ products }: { products: IPaymentProducts[] }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.authReducer);

  const [inputCoupen, setInputCoupen] = useState<string>("");

  const handleEnterCoupen = (e: any) => {
    setInputCoupen(e.target.value);
  };

  const settings:Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  // const phonePeHandler = async (
  //   amount: number,
  //   coupon: { id: number; amount: number },
  //   transactionId: string,
  //   orderId: number
  // ) => {
  //   try {
  //     const payload = {
  //       merchantId: process.env.NEXT_PUBLIC_PHONE_PE_MERCHANT_ID,
  //       merchantTransactionId: transactionId,
  //       merchantUserId: user?.id,
  //       merchantOrderId: orderId,
  //       amount: amount - coupon.amount,
  //       redirectUrl: `${window.origin}/api/payment/${user?.id}`,
  //       redirectMode: "POST",
  //       callbackUrl: `${window.origin}/api/payment/${user?.id}`,
  //       mobileNumber: user?.phone,
  //       param1: "home",
  //       paymentInstrument: {
  //         type: "PAY_PAGE",
  //       },
  //     };

  //     const dataPayload = JSON.stringify(payload);
  //     const dataBase64 = Buffer.from(dataPayload).toString("base64");
  //     const saltKey = process.env.NEXT_PUBLIC_PHONE_PE_SALT_KEY;
  //     const fullURL = `${dataBase64}/pg/v1/pay${saltKey}`;
  //     const md = sha256.create();
  //     md.update(fullURL, "utf8");
  //     const dataSha256 = md.digest().toHex();
  //     const checksum = `${dataSha256}###${process.env.NEXT_PUBLIC_PHONE_PE_SALT_INDEX}`;
  //     const response = await postPhonePePayment(dataBase64, checksum);

  //     if (response.success) {
  //       const redirect = response.data.instrumentResponse.redirectInfo.url;
  //       return redirect;
  //     } else {
  //       toast({
  //         title: ERROR.SOMETHING_WENT_WRONG,
  //         variant: "destructive",
  //         description: ERROR.PAYMENT_FAILED,
  //       });
  //     }
  //   } catch (error) {
  //     toast({
  //       title: ERROR.SOMETHING_WENT_WRONG,
  //       variant: "destructive",
  //       description: ERROR.PAYMENT_FAILED,
  //     });
  //   }
  // };

  const paymentHanlder = async (
    amount: number,
    coupon: { id: number; amount: number },productId: number
  ) => {
    try {
      const transactionId = `${uuidv4().substring(0, 35)}`;
      const orderId = Math.floor(Math.random() * 99999) + 10000;
      await paymentInitialization({
        orderId,
        trackingId: transactionId,
        billingName: user?.name,
        couponId: coupon.id || null,
        discountAmount: `${coupon.amount}`,
        orderStatus: PAYMENT.PAYMENT_INITIALIZED,
        paidAmount: "0",
        paymentMode: PAYMENT.PHONE_PE,
        phoneNo: user?.phone,
        planAmount: `${amount}`,
        productId,
        totalAmount: `${amount - coupon.amount}`,
        type: 1,
      });

      const tokenData = {
        userId: user?.id,
        phone: user?.phone,
        amount,
        transactionId,
        orderId,
      };
      const encrypted = await encrypt(
        JSON.stringify(tokenData),
        process.env.NEXT_PUBLIC_PHONE_PE_ENC_PASSWORD || ""
      );
      router.push(
        `${CS_BASE_URL}/payment/integrate?iv=${encrypted.iv}&enc=${encrypted.encrypted}`
      );

      // const url = await phonePeHandler(amount, coupon, transationId, orderId);
      // if (url) router.push(url);
      // else {
      //   toast({
      //     title: ERROR.SOMETHING_WENT_WRONG,
      //     variant: "destructive",
      //     description: ERROR.PAYMENT_FAILED,
      //   });
      // }
    } catch (error) {
      toast({
        title: ERROR.SOMETHING_WENT_WRONG,
        variant: "destructive",
        description: ERROR.PAYMENT_FAILED,
      });
    }
  };

  return (
    <div className="max-w-[1100px] m-auto px-[10px] ">
      <Slider {...settings} className="mx-[-10px] mb-[10px">
        {products.map((plan, index) => (
          <div key={index} className="px-[10px]">
            <PricingCard
              plan={plan}
              colorData={colorData[index]}
              inputCoupen={inputCoupen}
              handleEnterCoupen={handleEnterCoupen}
              onSubmit={paymentHanlder}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Pricing;
