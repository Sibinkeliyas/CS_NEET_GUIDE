"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@/components/common/Button";
import { FormTypeProps } from "..";
import { createUser, postSignIn } from "@/utils/api/authentication";
import { AUTHENTICATION, COUNTRY_CODE } from "@/types/enums";
import { toast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_ROUTERS } from "@/types";
import { useDispatch } from "@/store";
import { userMobileNumber } from "@/store/slices/auth";

const SignUpForm = ({
  setFormType,
}: {
  setFormType?: (formType: FormTypeProps) => void;
}) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();
  const [isSignUpPage, setSignUpPage] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must contain atleast 3 letters")
      .required("Name is required."),
    email: Yup.string()
      .email("Not a valid email")
      .required("Email is required."),
    phone: Yup.string()
      .min(10, "Mobile number must be exactly 10 digits.")
      .max(10, "Mobile number cannot exceed 10 digits.")
      .required("Mobile number is required."),
    state: Yup.string().required("State is required."),
    city: Yup.string().required("City is required."),
    targetedScore: Yup.number()
      .max(720, "Targeted score must be less than or equal to 1")
      .min(1, "Targeted score must be greater than or equal to 1")
      .required("Targeted score is required."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      state: "",
      city: "",
      targetedScore: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await createUser({
        ...values,
        phone: `${COUNTRY_CODE.INDIA}${values.phone}`,
        otp: 0,
        targetedScore: Number(values.targetedScore),
      });
      if (res?.success) {
        await dispatch(userMobileNumber(values.phone));
        isSignUpPage && router.push("/otp-verification");
        setFormType && setFormType("verification");
      } else {
        toast({
          title: AUTHENTICATION.LOGGED_IN_FAILED,
          variant: "destructive",
          description: res?.message,
        });
      }
    },
  });

  useEffect(() => {
    setSignUpPage(pathName.includes(AUTH_ROUTERS.SIGN_UP));
  }, [pathName]);

  return (
    <div
      className="w-11/12 md:w-1/2 lg:max-w-[400px] lg:mt-[40px] mt-[20px] mb-[20px]  ml-auto mr-auto"
      data-test-id="sign-up-form-card"
    >
      <div className="lg:mt-[40px] mt-[25px] lg:mb-[46px] mb-[20px]">
        <h3 className="text-[26px] font-[500] text-center dark:text-[#FFFF]">
          {AUTHENTICATION.WELCOME} <br /> {AUTHENTICATION.SIGN_UP_CONTINUE}
        </h3>
      </div>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="pb-[20px]">
          <div className="mb-[20px]">
            <Input
              aria-label="Name input "
              data-test-id="name-input-label"
              name="name"
              type="text"
              id="user_name"
              onChange={formik.handleChange}
              placeholder="Enter your Name"
              className="h-[48px] mt-[5px]"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-2">
                {formik.errors.name}
              </p>
            )}
          </div>
          <div className="mb-[20px]">
            <Input
              aria-label="email input "
              data-test-id="email-input-label"
              name="email"
              type="email"
              id="user_email"
              onChange={formik.handleChange}
              placeholder="Enter your Email"
              className="h-[48px] mt-[5px]"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-2">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="mb-[20px]">
            <Input
              aria-label="Phone input"
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
          <div className="mb-[20px]">
            <Input
              aria-label="State input"
              data-test-id="state-input-label"
              name="state"
              type="text"
              id="user_state"
              onChange={formik.handleChange}
              placeholder="Enter your State"
              className="h-[48px] mt-[5px]"
            />
            {formik.touched.state && formik.errors.state && (
              <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-2">
                {formik.errors.state}
              </p>
            )}
          </div>
          <div className="mb-[30px]">
            <Input
              aria-label="City input"
              data-test-id="city-input-label"
              name="city"
              type="text"
              id="user_city"
              onChange={formik.handleChange}
              placeholder="Enter your city"
              className="h-[48px] mt-[5px]"
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-2">
                {formik.errors.city}
              </p>
            )}
          </div>
          <div>
            <Input
              aria-label="Target score input"
              data-test-id="targe-score-input-label"
              name="targetedScore"
              type="number"
              id="mobile_no"
              onChange={formik.handleChange}
              placeholder="Enter your targeted score"
              className="h-[48px] mt-[5px]"
            />
            {formik.touched.targetedScore && formik.errors.targetedScore && (
              <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-2">
                {formik.errors.targetedScore}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center lg:mt-[40px] mt-[20px]">
          <Button
            text={AUTHENTICATION.CONTINUE}
            ariaLabel="SignUp continue button"
            dataTestId="sign-up-continue-button"
            className="w-full h-[48px] font-medium text-base"
            onClick={() => {}}
          />
        </div>
        <div className="mt-5">
          <p className="text-[14px] font-[400] text-center tracking-[0.30px]">
            {AUTHENTICATION.ALREADY_ACC_EXIST}{" "}
            <span
              className="text-[#1976D2]  cursor-pointer"
              onClick={() => {
                setFormType && setFormType("signIn");
                isSignUpPage && router.push("/sign-in");
              }}
              aria-label="Already have an account, Click here"
              data-test-id="already-have-an-account"
            >
              {AUTHENTICATION.SIGN_IN}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
