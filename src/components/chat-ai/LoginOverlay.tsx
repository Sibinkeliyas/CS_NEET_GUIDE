import React from 'react';
import Button from '../common/Button';
import { CHAT } from '@/types/enums';

const LoginOverlay = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex items-center justify-center absolute left-0 top-0 bg-[#ffffff4d] w-full h-full backdrop-filter backdrop-blur-sm dark:bg-[#00000071]">
      <div className="text-center">
        <h1
          data-test-id="doubt-module-login-title"
          className="text-[20px] text-[#101010] dark:text-[#fff] font-semibold lg:mb-[24px] mb-[20px]"
        >
          {CHAT.LOGIN_ASK_QUESTION}
        </h1>

        <Button
          ariaLabel="login now button"
          data-test-id="doubt-module-loginnow-button"
          onClick={onClick}
          text={'Login Now'}
          dataTestId={`login_btn-${1}`}
          endIcon={''}
          className={
            'bg-[#0B57D0] dark:bg-[#CCE6FC] dark:text-[#021863] text-[#fff] text-[16px] lg:px-[28px] px-[24px] py-[20px] lg:py-[20px]'
          }
          startIcon={''}
        ></Button>
      </div>
    </div>
  );
};

export default LoginOverlay;
