import { sha256 } from "node-forge";
import { NextResponse } from "next/server";

import { BASE_URL } from "@/config";
import { phonePePaymentStatusRequest } from "@/utils/api/payment";
import { findProduct, getUserPaymentData, updatePayment, updateTokens } from "../query";
import { IUpdatePaymentProps } from "@/types/payment";
import { PAYMENT } from "@/types/enums";

export async function POST(
  req: Request,
  router: { params: { userId: string } }
) {
  try {
    const paymentDetails = await getUserPaymentData(
      Number(router.params.userId)
    );
    const data = await req.formData();
    const merchantId = data.get(PAYMENT.MERCHANT_ID);
    const transactionId = data.get(PAYMENT.TRANSACTION_ID);

    const md = sha256.create();
    const saltKey = process.env.NEXT_PUBLIC_PHONE_PE_SALT_KEY;
    const st = `/pg/v1/status/${merchantId}/${transactionId}${saltKey}`;
    md.update(st, "utf8");
    const dataSha256 = md.digest().toHex();
    const checksum = `${dataSha256}###${process.env.NEXT_PUBLIC_PHONE_PE_SALT_INDEX}`;

    const response = await phonePePaymentStatusRequest(
      merchantId,
      transactionId,
      checksum
    );

    const result: IUpdatePaymentProps = {
      bankReference: response.data.paymentInstrument.bankTransactionId,
      orderStatus: response.data.responseCode,
      failureMessage: !response.success ? response.message : null,
      paymentMode: response.data.paymentInstrument.type,
      cancelMessage: !response.success ? response.message : null,
      paidAmount: `${response.data.amount}`,
      otherDetails: JSON.stringify({
        ...response.data,
        ...data,
        csTransactionId: transactionId,
      }),
    };
    await updatePayment(paymentDetails?.id || 0, result);
    const product = await findProduct(paymentDetails?.productId || 0)
    await updateTokens(Number(router.params.userId), product?.tokens || 0)
    if (response.code === PAYMENT.PAYMENT_SUCCESS_STATUS)
      return NextResponse.redirect(`${BASE_URL}/payment/success`, {
        status: 301,
      });
    else
      return NextResponse.redirect(`${BASE_URL}/payment/fail`, { status: 301 });
  } catch (error) {
    return NextResponse.redirect(`${BASE_URL}/payment/fail`, { status: 301 });
  }
}
