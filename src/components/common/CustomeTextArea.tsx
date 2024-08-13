import React, {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
} from 'react';
import LoadingSpinner from '../icons/LoadingSpinner';
import SendPlane from '../icons/SendPlane';
import { cn } from '@/lib/utils';
import AttachIcon from '../icons/Attach';
import Image from 'next/image';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ImageFileProps } from '../chat-ai';
import { uploadToS3bucket } from '@/utils/api/common';
import { toast } from '../ui/use-toast';
import { IPrompts } from '@/types/ai';

interface ICustomeProps {
  formClassName?: string;
  textAreaClassName?: string;
  submitBtnClassName?: string;
  wrapperClass?: string;
  input: string;
  imageFile?: ImageFileProps;
  isBtnDisabled?: boolean;
  isFileAttach?: boolean;
  prompts?:IPrompts[]
  onSubmit: () => void;
  setImageFile?: (image: ImageFileProps) => void;
  setInput: (value: string) => void;
  onFocus: (foucus: boolean) => void;
}

const CustomeTextArea = ({
  onFocus,
  formClassName,
  textAreaClassName,
  submitBtnClassName,
  wrapperClass,
  input,
  imageFile,
  isBtnDisabled,
  isFileAttach,
  prompts,
  onSubmit,
  setImageFile,
  setInput,
}: ICustomeProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFileClear = () => {
    setImageFile && setImageFile({});
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleFileOpen: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileOnchange: ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const formData = new FormData();
    const file = e.target?.files?.[0];
    if (file) formData.append('file', file);
    formData.append(
      'folder',
      `ai/${
        file?.type.includes('image')
          ? process.env.NEXT_PUBLIC_S3_IMAGE_FOLDER
          : process.env.NEXT_PUBLIC_S3_PDF_FOLDER
      }`
    );
    const res = await uploadToS3bucket(formData);
    if (!res?.success || !file) {
      toast({
        title: res?.message,
        variant: 'destructive',
      });
    }
    setImageFile &&
      setImageFile({
        url: res?.url,
        fileName: res?.fileName,
      });
    textareaRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      !isBtnDisabled && onSubmit();
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit();
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <form
      data-test-id="doubt-module-ai-form"
      className={cn(
        'p-[6px] w-full border-t border-[#F5F5F5] dark:border-[#2b2b2b4e] mt-4 flex flex-col bg-[#F5F5F5] dark:bg-[#0a0a0a]  rounded-[10px]',
        formClassName
      )}
      onSubmit={handleSubmit}
    >
      <div>
        {imageFile?.url && (
          <div className="px-6 py-2 transition-all relative max-w-fit">
            {imageFile?.fileName?.split('.')[1] === 'pdf' ? (
              <>
                <button
                  className="absolute right-5 top-1  border-none p-[1px] cursor-pointer rounded-full bg-[#FFF] dark:bg-[#cbcbcb]"
                  onClick={onFileClear}
                >
                  <Cross2Icon className="h-4 w-4 text-black " />
                </button>
                <div className=" rounded-md transition-all bg-[#e6e6e6] dark:bg-[#171717] px-4 py-2">
                  {imageFile.fileName}
                </div>
              </>
            ) : (
              <>
                <button
                  className="absolute right-7 top-3  border-none p-[1px] cursor-pointer rounded-full bg-[#cbcbcb]"
                  onClick={onFileClear}
                >
                  <Cross2Icon className="h-4 w-4 text-black " />
                </button>
                <Image
                  src={imageFile.url}
                  loading="lazy"
                  fetchPriority="low"
                  alt={`${imageFile.fileName}`}
                  width={120}
                  height={250}
                  className="h-20 rounded-md transition-all"
                />
              </>
            )}
          </div>
        )}
        <div className={cn('flex w-full items-end', wrapperClass)}>
          {isFileAttach && (
            <>
              <button
                onClick={handleFileOpen}
                aria-label="doubt module AI button"
                data-test-id="doubt-module-ai-button"
                type="submit"
                className="bg-none border-none  cursor-pointer m-auto p-2"
              >
                <AttachIcon />
              </button>
              <input
                type="file"
                name=""
                id=""
                hidden
                ref={fileRef}
                onChange={handleFileOnchange}
              />
            </>
          )}
          <textarea
            aria-label="doubt module ai textarea"
            data-test-id="doubt-module-ai-textarea"
            placeholder="Ask your doubts..."
            className={cn(
              'w-full p-2 placeholder-[#000] dark:placeholder-[#fff] border-none outline-none bg-transparent flex-1 overflow-y-auto focus-visible:outline-none text-[14px] resize-none max-h-[150px] scrollbar-thin',
              textAreaClassName
            )}
            value={input}
            ref={textareaRef}
            onKeyPress={handleKeyPress}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => onFocus(true)}
            onBlur={() => {
              setTimeout(() => {
                onFocus(false);
              }, 250);
            }}
            rows={1}
          />
          <button
            disabled={
              isBtnDisabled ||
              (!input.trim() && (imageFile ? !imageFile.url : true))
            }
            aria-label="doubt module AI button"
            data-test-id="doubt-module-ai-button"
            type="submit"
            className={cn(
              'bg-[#0B57D0] !text-[20px] dark:bg-[#CCE6FC] text-[#FFFFFF] dark:text-[#021863] w-9 h-9 cursor-pointer	flex-shrink-0 rounded-[8px] flex justify-center items-center ml-2',
              submitBtnClassName
            )}
          >
            {isBtnDisabled ? <LoadingSpinner /> : <SendPlane />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CustomeTextArea;
