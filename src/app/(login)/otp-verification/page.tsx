import OtpVerification from '@/components/authentication/authentication-modal/forms/OtpVerificationForm';
import Image from 'next/image';
import React from 'react';
import darkLogo from '@/../public/images/neetGuideDarkLogo.png';
import logo from '@/../public/images/Neet Guid Logo.png';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex justify-center items-center max-w-1/2 ml-auto mr-auto mt-[5rem] flex-col">
      <div>
        <Link scroll href="/">
          <Image
            src={darkLogo}
            alt="dark logo"
            width={100}
            height={100}
            className="hidden dark:block"
          />
        </Link>
        <Link href="/">
          <Image
            src={logo}
            alt=" logo"
            width={100}
            height={100}
            className="block dark:hidden"
          />
        </Link>
      </div>
      <OtpVerification />
    </div>
  );
};

export default Page;
