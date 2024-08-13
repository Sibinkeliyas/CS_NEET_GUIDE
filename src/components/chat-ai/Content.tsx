import React from 'react';
import ChatSkeleton from './ChatSkeleton';
import Image from 'next/image';
import { useSelector } from '@/store';
import ChatLoading from './ChatLoading';
import { IChatAiProps, IPrompts } from '@/types/ai';
import { cn } from '@/lib/utils';
import MarkdownWithLatex from '../common/MarkDown';

const Content = ({
  loading,
  messages,
}: {
  loading: boolean;
  messages: IChatAiProps[];
}) => {
  const { isAuthenticated, isInitialized } = useSelector(
    (state) => state.authReducer
  );
  return (
    <>
      {isInitialized && isAuthenticated && (
        <>
          {loading ? (
            <>
              <ChatLoading />
            </>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={index}>
                  <div className={`mb-[15px] flex justify-end`}>
                    <div
                      className={` text-[#101010] lg:text-[16px] text-[14px]  p-[15px] rounded-lg bg-[#F5F5F5] dark:bg-[#1818186b] dark:text-[#ffffffd2] w-max lg:max-w-[70%] max-w-[100%]  block !leading-6`}
                    >
                      {message.assetUrl && (
                        <>
                          <Image
                            src={message.assetUrl}
                            alt={`image`}
                            width={200}
                            height={200}
                            className={cn(
                              'rounded  w-[200px] h-[200px] !max-w-[350px]',
                              message.question && 'mb-2'
                            )}
                          />
                        </>
                      )}
                      {message.question && message.question}
                    </div>
                  </div>

                  {message.answer && (
                    <div className={`mb-[15px] flex justify-start`}>
                      <div
                        className={` text-[#101010] lg:text-[14px] text-[13px]  p-[15px] rounded-lg   dark:text-[#ffffffd2]  w-max  block leading-6`}
                        id={`${message.id}`}
                      >
                        <MarkdownWithLatex
                          content={`${message.answer} ${
                            message.typing ? `⚫` : ''
                          }`}
                        />
                      </div>
                    </div>
                  )}
                  {!message.loading && !message.typing && (
                    <hr className="mt-4 mb-10" />
                  )}
                  <>{message.loading && <ChatSkeleton />}</>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Content;
