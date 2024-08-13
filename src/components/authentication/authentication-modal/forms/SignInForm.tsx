"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@/components/common/Button";
import { FormTypeProps } from "..";
import { postSignIn } from "@/utils/api/authentication";
import { AUTHENTICATION, COUNTRY_CODE } from "@/types/enums";
import { toast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_ROUTERS } from "@/types";
import { useDispatch } from "@/store";
import { userMobileNumber } from "@/store/slices/auth";

const SignInForm = ({
  setFormType,
}: {
  setFormType?: (formType: FormTypeProps) => void;
}) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();
  const [isSignInPage, setSignInPage] = useState(false);
  const validationSchema = Yup.object({
    phone: Yup.string()
      .min(10, "Mobile number must be exactly 10 digits.")
      .max(10, "Mobile number cannot exceed 10 digits.")
      .required("Mobile number is required."),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await postSignIn(`${COUNTRY_CODE.INDIA}${values.phone}`);
      if (res?.success) {
        await dispatch(userMobileNumber(values.phone));
        isSignInPage && router.push("/otp-verification");
        setFormType && setFormType("verification");
      } else {
        toast({
          title: "Login failed.",
          variant: "destructive",
          description: res?.message,
        });
      }
    },
  });

  useEffect(() => {
    setSignInPage(pathName.includes(AUTH_ROUTERS.SIGN_IN));
  }, [pathName]);

  return (
    <div
      className="w-11/12 md:w-1/2 lg:max-w-[400px] ml-auto mr-auto"
      data-test-id="sign-in-card"
    >
      <div className="my-[46px]">
        <h3 className="text-[26px] font-[500] text-center dark:text-[#FFFF]">
          {AUTHENTICATION.WELCOME} <br /> {AUTHENTICATION.SIGN_IN_CONTINUE}
        </h3>
      </div>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="pb-[40px]">
          <div>
            <label className="lg:text-[16px] text-[14px] font-[400] block !mb-[14px]">
              {AUTHENTICATION.MOBILE_NO}
            </label>
            <Input
              aria-label="Phone input label"
              data-test-id="phone-input-label"
              name="phone"
              type="number"
              id="mobile_no"
              onChange={formik.handleChange}
              placeholder="Enter your Mobile no"
              className="h-[48px] mt-[5px]"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-2">
                {formik.errors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button
            text={AUTHENTICATION.CONTINUE}
            ariaLabel="Sign in continue button"
            dataTestId="sign-in-continue-button"
            className="w-full h-[48px] font-medium text-base"
            onClick={() => {}}
          />
        </div>
        <div className="mt-5">
          <p className="text-[14px] font-[400] text-center tracking-[0.30px]">
            {AUTHENTICATION.DONT_HAVE_AN_ACC}{" "}
            <span
              className="text-[#1976D2]  cursor-pointer"
              onClick={() => {
                setFormType && setFormType("signUp");
                isSignInPage && router.push("/sign-up");
              }}
            >
              {AUTHENTICATION.SIGN_UP}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
