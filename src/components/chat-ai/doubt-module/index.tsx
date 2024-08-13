"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import ChatHeader from "../ChatHeader";
import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "@/store";
import { cn } from "@/lib/utils";
import AuthenticaitionModal from "../../authentication/authentication-modal";
import { IChatAiProps, IPrompts } from "@/types/ai";
import {
  getDoubtModuleAiHistory,
  getUserAiRelatedData,
  postAiQuestion,
  postAskAiChapterQuestions,
} from "@/utils/api/ai-doubt-module";
import { AI, AUTHENTICATION, BOT_TYPE } from "@/types/enums";
import { toast } from "../../ui/use-toast";
import { updateLoginModel } from "@/store/slices/menu";
import { getAiInitialInput } from "@/store/slices/ai";
import ScrollView from "../ScrollView";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type ImageFileProps = {
  url?: string;
  fileName?: string;
};

interface IDoubtsModuleProps {
  prompts?: IPrompts[];
  subjectUrl?: string;
  chapterUrl?: string;
  topicUrl?: string;
  topicName?: string;
  type: BOT_TYPE;
}

const DoubtModule = ({
  prompts,
  subjectUrl,
  chapterUrl,
  topicUrl,
  topicName,
  type,
}: IDoubtsModuleProps) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const { aiInitialMessage } = useSelector((state) => state.aiReducer);
  const { openDrawer } = useSelector((state) => state.menuReducer);

  const [messages, setMessages] = useState<IChatAiProps[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<ImageFileProps>({});
  const [index, setIndex] = useState(0);
  const [lastMsg, setLastMsg] = useState<string>("");
  const [tokenCount, setTokenCount] = useState(0);

  const handleDynamicWrite = useCallback(
    (messages: IChatAiProps[]) => {
      const lastMessageIndex = messages.length - 1;
      const currentMessage = messages[lastMessageIndex];
      if (!currentMessage) return;

      if (index < lastMsg.length) {
        const timeout = setTimeout(() => {
          setMessages((prevMessages) => {
            return prevMessages.map((msg, i) =>
              msg.id === currentMessage.id
                ? { ...msg, answer: (msg.answer || "") + lastMsg.charAt(index) }
                : msg
            );
          });
          setIndex((prevIndex) => prevIndex + 1);
        }, 6);
        return () => clearTimeout(timeout);
      } else {
        setIndex(0);
        setLastMsg("");
        setMessages((prevMessages) =>
          prevMessages.map((msg, i) =>
            msg.id === currentMessage.id ? { ...msg, typing: false } : msg
          )
        );
      }
    },
    [index, lastMsg, setMessages]
  );

  const getAiResponse = async (message: string, imageData: ImageFileProps) => {
    if (type === BOT_TYPE.COMMON_BOT) {
      return await postAiQuestion({
        message,
        history: messages[messages.length - 1]?.history,
        assetUrl: imageData.url,
      });
    } else {
      return await postAskAiChapterQuestions({
        message,
        history: messages[messages.length - 1]?.history,
        assetUrl: imageData.url,
        subjectUrl,
        chapterUrl,
        topicUrl,
      });
    }
  };

  const handleSend = useCallback(
    async (prompt?: string, imgFile?: ImageFileProps) => {
      if (input.trim() === "" && !imageFile.url && !prompt && !imgFile) {
        return;
      }
      if (!isAuthenticated) {
        dispatch(updateLoginModel(true));
        return;
      }
      const message = input || prompt || "";
      const imageData = imageFile.url ? imageFile : imgFile || {};
      resetInput();
      const newChat = createNewChat(message, imageData);
      setMessages((prev) => [...prev, newChat]);
      const result = await getAiResponse(message, imageData);
      handleResponse(result, message, imageData);
      setTokenCount((prev) => (prev ? prev - 1 : prev));
      history.pushState({ input: '', assetFile: '' }, "", pathname);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [imageFile, input, isAuthenticated]
  );

  const resetInput = () => {
    setInput("");
    setImageFile({});
    aiInitialMessage && dispatch(getAiInitialInput({}));
  };

  const createNewChat = (message: string, imageData: ImageFileProps) => ({
    id: (messages[messages.length - 1]?.id || 0) + 1,
    question: message,
    loading: true,
    assetUrl: imageData.url,
    typing: false,
  });

  const handleResponse = (
    result: any,
    message: string,
    imageData: ImageFileProps
  ) => {
    if (result.paymentStatus === false) {
      toast({
        title: AI.TOKENS_COMPLETED,
        variant: "destructive",
        description: AI.TOKENS_COMPLETED_DES,
      });
    } else {
      updateMessagesWithResponse(result, message, imageData);
    }
  };

  const updateMessagesWithResponse = (
    result: any,
    message: string,
    imageData: ImageFileProps
  ) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];

      if (newMessages.length) {
        newMessages[newMessages.length - 1] = {
          ...lastMessage,
          id: result.data?.id || lastMessage.id,
          history: result.data?.history,
          loading: false,
          typing: true,
        };
      } else {
        newMessages.push({
          id: result.data?.id || 0,
          question: message,
          assetUrl: imageData.url,
          history: result.data?.history,
          loading: false,
          typing: true,
        });
      }

      return newMessages;
    });
    setLastMsg(result.data?.answer || AI.ERROR_MESSAGE);
  };

  useEffect(() => {
    lastMsg.length && handleDynamicWrite(messages);
  }, [index, handleDynamicWrite, messages, lastMsg.length]);

  useMemo(() => {
    if (isAuthenticated) {
      const getData = async () => {
        setLoading(true);
        const data = await getUserAiRelatedData(
          subjectUrl,
          chapterUrl,
          topicUrl
        );
        data.success && data.data && data.data.history
          ? setMessages(data.data.history)
          : setMessages([]);
        setTokenCount(data.data?.tokenData?.remainingTokens || 0);
        if (history.state.input || history.state.assetFile || aiInitialMessage?.input || aiInitialMessage?.assetFile)
          handleSend(history.state.input || aiInitialMessage?.input, history.state.assetFile || aiInitialMessage?.assetFile);
        setLoading(false);
      };
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterUrl, subjectUrl, topicUrl, isAuthenticated]);

  return (
    <>
      <div
        data-test-id="doubt-module-maincard "
        className={cn(
          "my-4 relative mx-auto lg:mx-0 mb-[20px] h-full",
          "overflow-hidden"
        )}
      >
        <>
          <div
            className={cn(
              " mb-10 w-full lg:!px-[20%] sm:!px-[20px] !px-[10px]",
              !openDrawer && "lg:!px-[30%] sm:!px-[25px] !px-[15px]"
            )}
          >
            <ChatHeader
              topicName={topicName?.replaceAll("-", " ")}
              setMessages={setMessages}
              disableReset={messages.length === 0}
            />
          </div>
          <ScrollView
            loading={loading}
            messages={messages}
            prompts={prompts}
            textareaRef={textareaRef}
            handleSend={handleSend}
            input={input}
            setInput={setInput}
          />
        </>
      </div>
      {
        <div
          className={cn(
            "lg:relative fixed !bottom-[12px]  lg:!bottom-[0px] w-[95%] lg:w-[100%]  m-auto lg:translate-x-[0%] -translate-x-1/2 left-[50%] lg:left-[0%] lg:!px-[20%] sm:!px-[20px] !px-[10px]",
            !openDrawer && "lg:!px-[30%] sm:!px-[25px] !px-[15px]"
          )}
        >
          <SearchBar
            textareaRef={textareaRef}
            handleSend={handleSend}
            imageFile={imageFile}
            input={input}
            setImageFile={setImageFile}
            setInput={setInput}
            isCustomized
            isBtnDisabled={
              messages[messages?.length - 1]?.typing ||
              messages[messages?.length - 1]?.loading ||
              false
            }
          />
          <div className="w-full mt-[5px]">
            <p className="!text-[14px] text-center">
              {AI.TOKEN_COUNT} <span className="font-bold">{tokenCount}</span>,{" "}
              {AI.FOR_MORE_TOKENS}{" "}
              <Link
                href="/pricing-plans"
                className="underline text-[#0b57d0] dark:text-[#a6bcf0]"
              >
                {AI.BUY_NOW}
              </Link>
            </p>
          </div>
        </div>
      }
      <AuthenticaitionModal />
    </>
  );
};

export default DoubtModule;
