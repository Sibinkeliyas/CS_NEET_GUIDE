import { ImageFileProps } from "@/components/chat-ai";

export interface IChatAiProps {
  id: number;
  question?: string;
  answer?: string;
  history?: string;
  assetUrl?: string;
  loading?: boolean;
  typing?: boolean;
}

export interface IPrompts {
  id: number;
  prompt: string;
}

export interface IAiInitialMsgProps {
  input: string;
  assetFile?: ImageFileProps;
}

export interface AiProps {
  error?: string | null;
  aiInitialMessage: IAiInitialMsgProps | null;
}

export interface IAiTokenProps {
  id: number;
  totalTokens: number;
  remainingTokens: number;
}
