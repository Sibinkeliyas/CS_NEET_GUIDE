import prisma from "@/lib/prisma";
import { CreateUserProps } from "@/types/auth";

export const findExistingUser = (email: string, phone: string) => {
  try {
    return prisma.users.findFirst({ where: { OR: [{ email }, { phone }] } });
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData: CreateUserProps) => {
  try {
    const res = await prisma.users.create({ data: userData });
    const freePlan = await prisma.products.findFirst({
      where: { planStatus: 0 },
    });
    if (freePlan) {
      await prisma.paymentHistory.create({
        data: {
          userId: res.id,
          productId: freePlan?.id,
          type: freePlan?.predictorType,
          planAmount: "0",
          discountAmount: "0",
          totalAmount: "0",
          paidAmount: "0",
          orderId: 0,
          trackingId: "",
          bankReference: "",
          orderStatus: "Success",
          failureMessage: "", 
          paymentMode: "Free plan",
          billingName: res.name,
          cancelMessage: "",
          phoneNo: res.phone,
        },
      });
      await prisma.tokens.create({
        data: { userId: res.id, remainingTokens: freePlan?.tokens, totalTokens: freePlan?.tokens },
      });
    }
    return res;
  } catch (error) {
    throw error;
  }
};

// to get the otp
export const generateOtp = async (mobileNo: number) => {
  const authKey = process.env.AUTH_KEY!;
  const templateId = process.env.TEMPLATE_ID!;
  const senderId = process.env.SENDER_ID!;
  const route = process.env.ROUTE!;
  const otpNumber = Math.floor(Math.random() * 900000) + 100000;
  const otpMessage = `${otpNumber} is your one-time password (OTP) to log in to Collegesuggest.com NEET Predictor. Please enter OTP to proceed VVT`;

  await fetch(
    `${process.env.OTP_BASE_URL}?message=${otpMessage}&sender=${senderId}&mobiles=${mobileNo}&DLT_TE_ID=${templateId}&route=${route}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authkey: authKey,
      },
    }
  );

  return { mobileNo, otpNumber };
};

export const validatingUserOtp = async (phone: string, otp: number) => {
  try {
    return await prisma.users.findFirst({
      where: { phone, otp, deleteStatus: 0 },
    });
  } catch (error) {
    throw error;
  }
};

export const updateUserOtp = async (id: number, otp: number) => {
  try {
    return await prisma.users.update({ where: { id }, data: { otp } });
  } catch (error) {
    throw error;
  }
};
