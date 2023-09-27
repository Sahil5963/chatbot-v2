import { MessageEventResponse, MessageFrom } from "./socket";

export type MessageD = MessageEventResponse &
  SessionMessageItem & {
    loadingStatus?: "streaming" | "loading" | null;
    createdAt: string | number | null;
    links?: any[];
    rate?: null | "1" | "0";
  };

export type SessionMessageItem = {
  // session_id: number;
  send_by?: MessageFrom;
  id?: number;
  message?: string;
  // type: number;
  // seen: string;
  // createdAt: string;
};

export type MessagesLoadingStatus = "loading" | "typing" | null;

export type RenderMessageItem = {
  text: string;
  id?: number;
  localId?: number;
  sent: boolean;
  from: MessageFrom;
  rate: null | "1" | "0";
  user?: {
    fName?: string;
    pic?: string;
    name?: string;
  };
  loadingStatus?: "streaming" | "loading" | null;
  createdAt: string | number | null;
  links: string[];
};
