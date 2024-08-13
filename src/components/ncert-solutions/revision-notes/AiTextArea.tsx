"use client";
import React, { memo, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "@/store";
import CustomeTextArea from "@/components/common/CustomeTextArea";
import { updateLoginModel } from "@/store/slices/menu";
import { ImageFileProps } from "@/components/chat-ai";
import { getAiInitialInput } from "@/store/slices/ai";
import { useParams, useRouter } from "next/navigation";
import { IPrompts } from "@/types/ai";
import SuggestionPrompts from '@/components/chat-ai/SuggestionPrompts';
const AuthenticaitionModal = dynamic(
  () => import("@/components/authentication/authentication-modal")
);

const AiTextArea = ({ prompts }: { prompts?: IPrompts[] }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params: any = useParams();
  const { subjectUrl, chapterUrl, topicUrl } = params;

  const { isAuthenticated } = useSelector((state) => state.authReducer);

  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<ImageFileProps>();
  const [openSuggestList, setOpenSuggestList] = useState(false);

  const handleSubmit = async () => {
    const inputMsg = input;
    const assetFile = imageFile;
    dispatch(getAiInitialInput({ input: inputMsg, assetFile }));
    history.pushState(
      { input: inputMsg, assetFile },
      "",
      `/ask-your-doubts/${subjectUrl}/${chapterUrl}${
        topicUrl ? `/${topicUrl}` : ""
      }`
    );
    setInput("");
    setImageFile({});
    if (!isAuthenticated) dispatch(updateLoginModel(true));
    else {
      router.push(
        `/ask-your-doubts/${subjectUrl}/${chapterUrl}${
          topicUrl ? `/${topicUrl}` : ""
        }`
      );
    }
  };

  return (
    <>
      {openSuggestList && prompts && prompts.length > 0 && (
        <SuggestionPrompts data={prompts} setSuggestion={setInput} />
      )}
      <div className=" lg:max-w-[100%] max-w-[95%] m-auto w-full flex bg-[#f5f5f5] dark:bg-[#181818] p-[10px] rounded-[50px]">
        <CustomeTextArea
          isFileAttach
          input={input}
          imageFile={imageFile}
          setInput={setInput}
          onSubmit={handleSubmit}
          setImageFile={setImageFile}
          formClassName="dark:bg-[#171717] rounded-[50px] flex justify-center border-[0.5px] border-[#10101073] dark:border-[#ffffff1c] h-full m-0 bg-[#ffff]"
          textAreaClassName="lg:h-[40px] h-[20px]"
          submitBtnClassName="bg-[#101010] my-auto mr-3 rounded-[50%] lg:h-12  lg:w-12 p-2 w-9  h-9 cursor-pointer	flex-shrink-0  mr-[0px]"
          wrapperClass="items-center"
          prompts={prompts}
          onFocus={setOpenSuggestList}
        />
      </div>
      {!isAuthenticated && <AuthenticaitionModal />}
    </>
  );
};

export default memo(AiTextArea);
