import prisma from "@/lib/prisma";

export const phonePeInitialization = async (data: any) => {
  try {
    return prisma.paymentHistory.create({ data });
  } catch (error) {
    throw error;
  }
};

export const getUserPaymentData = (userId: number) => {
  return prisma.paymentHistory.findFirst({
    where: { userId },
    orderBy: { addedDate: "desc" },
  });
};

export const updatePayment = (paymentId: number, data: any) => {
  try {
    return prisma.paymentHistory.update({ where: { id: paymentId }, data });
  } catch (error) {
    throw error;
  }
};

export const getProducts = async () => {
  return prisma.products.findMany({ where: { deleteStatus: 0, status: 1 } });
};

export const updateTokens = async (userId: number, tokens: number) => {
  try {
    const userTokens = await prisma.tokens.findFirst({ where: { userId } });
    if (userTokens) {
      return prisma.tokens.update({
        where: { id: userTokens.id },
        data: {
          remainingTokens: userTokens.remainingTokens + tokens,
          totalTokens: userTokens.totalTokens + tokens,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

export const findProduct = async (productId: number) => {
  return prisma.products.findFirst({ where: { id: productId } });
};
