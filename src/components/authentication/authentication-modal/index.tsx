"use client";
import { MainSheet } from "@/components/common/MainSheet";
import React, { useState } from "react";
import SignInForm from "./forms/SignInForm";
import OtpVerification from "./forms/OtpVerificationForm";
import SignUpForm from "./forms/SignUpForm";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "@/store";
import { updateLoginModel } from "@/store/slices/menu";
import { useParams, useRouter } from "next/navigation";

export type FormTypeProps = "signIn" | "signUp" | "verification";

const AuthenticaitionModal = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const params:any = useParams()
  const [formType, setFormType] = useState<FormTypeProps>("signIn");
  const authModel = useSelector((state) => state.menuReducer.openAuthModal);
  const { aiInitialMessage } = useSelector((state) => state.aiReducer)
  const { subjectUrl, chapterUrl } = params;

  const form = (formType: FormTypeProps) => {
    switch (formType) {
      case "signIn":
        return <SignInForm setFormType={setFormType} />;
      case "signUp":
        return <SignUpForm setFormType={setFormType} />;
      case "verification":
        return (
          <OtpVerification
            setFormType={setFormType}
            setOpen={() => {
              if(aiInitialMessage?.assetFile || aiInitialMessage?.input) router.push(`/ask-your-doubts/${subjectUrl}/${chapterUrl}`)
              dispatch(updateLoginModel(!authModel))}}
          />
        );
      default:
        return <SignInForm setFormType={setFormType} />;
    }
  };

  const onClose = () => {
    setFormType("signIn");
    dispatch(updateLoginModel(!authModel));
  };

  return (
    <>
      <MainSheet
        open={authModel}
        onClose={onClose}
        side="bottom"
        title=""
        className={cn(
          "w-full lg:w-1/2 rounded-t-xl ml-auto mr-auto transition-all scrollbar-thin",
          formType === "signUp" ? "lg:h-[90%] h-[100%] overflow-auto" : "h-3/4"
        )}
        titleClassName="text-center text-[26px] font-[500] mb-0"
      >
        {form(formType)}
      </MainSheet>
    </>
  );
};

export default AuthenticaitionModal;
