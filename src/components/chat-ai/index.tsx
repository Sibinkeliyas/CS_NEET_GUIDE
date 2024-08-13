'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MainCard from '@/components/common/MainCard';
import ChatHeader from './ChatHeader';
import LoginOverlay from './LoginOverlay';
import { useDispatch, useSelector } from '@/store';
import { cn } from '@/lib/utils';
import AuthenticaitionModal from '../authentication/authentication-modal';
import { IChatAiProps } from '@/types/ai';
import {
  getDoubtModuleAiHistory,
  postAiQuestion,
} from '@/utils/api/ai-doubt-module';
import { useParams } from 'next/navigation';
import { AI, ERROR } from '@/types/enums';
import { toast } from '../ui/use-toast';
import ScrollToBottom from 'react-scroll-to-bottom';
import { updateLoginModel } from '@/store/slices/menu';

export type ImageFileProps = {
  url?: string;
  fileName?: string;
};

const ChatAi = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const authModel = useSelector((state) => state.menuReducer.openAuthModal);
  const params: any = useParams();
  const { subjectUrl, chapterUrl, topicUrl } = params;
  const chapterUrlParts = chapterUrl.split('-');
  const chapterSlug = chapterUrlParts.slice(2).join('-');

  const [messages, setMessages] = useState<IChatAiProps[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<ImageFileProps>({});
  const [index, setIndex] = useState(0);
  const [lastMsg, setLastMsg] = useState<string>('');

  const handleDynamicWrite = useCallback(
    (messages: IChatAiProps[]) => {
      const lastMessageIndex = messages.length - 1;
      const currentMessage = messages[lastMessageIndex];

      if (index < lastMsg.length) {
        const timeout = setTimeout(() => {
          currentMessage.answer =
            (currentMessage.answer || '') + lastMsg.charAt(index);
          setMessages((prev) =>
            prev.map((msg, i) =>
              msg.id === currentMessage.id ? currentMessage : msg
            )
          );
          setIndex((prev) => prev + 1);
        }, 6);
        return () => clearTimeout(timeout);
      } else {
        setIndex(0);
        setLastMsg('');
        setMessages((prev) =>
          prev.map((msg, i) =>
            msg.id === currentMessage.id ? { ...msg, typing: false } : msg
          )
        );
      }
    },
    [index, lastMsg, setMessages]
  );

  const handleSend = async () => {
    if (input.trim() !== '' || imageFile.url) {
      if (!isAuthenticated) {
        toast({
          title: ERROR.NOT_AUTHORIZED,
          variant: 'destructive',
          description: ERROR.NOT_AUTH_MSG,
        });
        return;
      }
      const message = input;
      const imageData = imageFile;
      setInput('');
      setImageFile({});
      const newChat: IChatAiProps = {
        id: (messages[messages.length - 1]?.id || 0) + 1,
        question: message,
        loading: true,
        assetUrl: imageData.url,
        typing: false,
      };
      setMessages((prev) => [...prev, newChat]);
      const result = await postAiQuestion({
        message,
        history: messages[messages.length - 1]?.history,
        subjectUrl,
        chapterUrl: chapterSlug,
        topicUrl,
        assetUrl: imageData.url,
      });
      if (result.paymentStatus) {
        setLastMsg(result.data?.answer || AI.ERROR_MESSAGE);
        setMessages(() => [
          ...messages,
          {
            id: result.data?.id || 0,
            question: input,
            assetUrl: result.data?.assetUrl,
            history: result.data?.history,
            loading: false,
            typing: true,
          },
        ]);
      } else
        toast({
          title: AI.TOKENS_COMPLETED,
          variant: 'destructive',
          description: AI.TOKENS_COMPLETED_DES,
        });
    }
  };

  useEffect(() => {
    lastMsg.length && handleDynamicWrite(messages);
  }, [index, handleDynamicWrite, messages, lastMsg.length]);

  useMemo(() => {
    if (params?.shortUrls && isAuthenticated) {
      const getData = async () => {
        setLoading(true);
        const data = await getDoubtModuleAiHistory(
          subjectUrl,
          chapterSlug,
          topicUrl
        );
        data.success && data.data ? setMessages(data.data) : setMessages([]);
        setLoading(false);
      };
      getData();
    }
  }, [chapterSlug, params?.shortUrls, subjectUrl, topicUrl, isAuthenticated]);

  return (
    <>
      <MainCard
        data-test-id="doubt-module-maincard"
        title={<ChatHeader disableReset setMessages={() => {}} />}
        className="my-4 relative h-full"
        cardAction={
          <>
            {/* <SearchBar
              input={input}
              imageFile={imageFile}
              setImageFile={setImageFile}
              setInput={setInput}
              handleSend={handleSend}
              textareaRef={}
            /> */}
          </>
        }
      >
        <>
          <div className="w-full mx-auto  rounded-lg ">
            {isAuthenticated ? (
              <ScrollToBottom
                className={cn(
                  'block  overflow-y-auto scrollbar-thin lg:pe-2 pe-1 transition-all'
                )}
                scrollViewClassName="scrollbar-thin"
                followButtonClassName="mb-5"
              >
                {/* <Content loading={loading} messages={messages} /> */}
              </ScrollToBottom>
            ) : (
              <>
                <div
                  className={cn(
                    'block  overflow-y-auto scrollbar-thin lg:pe-2 pe-1 transition-all'
                  )}
                >
                  <LoginOverlay
                    onClick={() => dispatch(updateLoginModel(!authModel))}
                  />
                </div>
              </>
            )}
          </div>
        </>
      </MainCard>
      <AuthenticaitionModal />
    </>
  );
};

export default ChatAi;
