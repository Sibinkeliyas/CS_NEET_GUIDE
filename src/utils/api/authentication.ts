import { VerificationProps } from "@/components/authentication/authentication-modal/forms/OtpVerificationForm";
import { CreateUserProps } from "@/types/auth";
import { Api_endpoint } from "@/types/enums";
import axios from "axios";

export const postSignIn = async (
  phone: string
): Promise<{ success: boolean; message: string } | undefined> => {
  try {
    const res = await axios.get(`/${Api_endpoint.user_signIn}?phone=${phone}`);
    return res.data;
  } catch (error: any) {
    return (
      error?.response?.data || {
        success: false,
        message: "Something went wrong, Please try again later",
      }
    );
  }
};

export const otpVerification = async (
  phone: string,
  otp: string
): Promise<VerificationProps | undefined> => {
  try {
    const res = await axios.get(
      `/${Api_endpoint.user_verification}?phone=${phone}&otp=${otp}`
    );
    return res.data;
  } catch (error: any) {
    return (
      error?.response?.data || {
        success: false,
        message: "Something went wrong, Please try again later",
      }
    );
  }
};

export const createUser = async (userData: CreateUserProps) => {
  try {
    const res = await axios.post(`/${Api_endpoint.user_auth}`, userData);
    return res.data;
  } catch (error: any) {
    return (
      error?.response?.data || {
        success: false,
        message: "Something went wrong, Please try again later",
      }
    );
  }
};
