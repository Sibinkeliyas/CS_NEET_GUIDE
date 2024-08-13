import React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../../ui/input-otp";

const OtpFields = ({ onChange }: { onChange: (value: string) => void }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <InputOTP
        maxLength={6}
        className="w-full flex items-center justify-center "
        containerClassName="w-full"
        onChange={(value) => onChange(value)}
      >
        <InputOTPGroup className="gap-0 sm:gap-2 items-center justify-between mt-3 !w-full ">
          <InputOTPSlot
            index={0}
            className="h-[48px] w-[48px] border-[1px] sm:rounded-md"
          />
          <InputOTPSlot
            index={1}
            className="h-[48px] w-[48px] border-[1px] sm:rounded-md"
          />
          <InputOTPSlot
            index={2}
            className="h-[48px] w-[48px] border-[1px] sm:rounded-md"
          />
          <InputOTPSlot
            index={3}
            className="h-[48px] w-[48px] border-[1px] sm:rounded-md"
          />
          <InputOTPSlot
            index={4}
            className="h-[48px] w-[48px] border-[1px] sm:rounded-md"
          />
          <InputOTPSlot
            index={5}
            className="h-[48px] w-[48px] border-[1px] sm:rounded-md"
          />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default OtpFields;
