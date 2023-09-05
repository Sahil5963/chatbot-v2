import { ComposePayload } from "utils/socket";

export type SessionData = {
  id: number;
  integration_id: number;
  status: string;
  device_type: string;
  platform: string;
  country: null | string;
  project_id: number;
  session_uid: string;
  updatedAt: string;
  createdAt: string;
  token: string;
};

export type MessagesReceivedType = "text" | "stream";

export type MessagesReceivedEventResponse = {
  type: MessagesReceivedType;
  from: MessageFrom;
  origin: string;
  content: {
    stream_url?: string;
    message?: string;
    message_id: number;
  };
};
export type MessagesComponseEventResponse = ComposePayload;

export type SocketState = "idle" | "creatingSession" | "joined" | "error";

export type MessageFrom = "user" | "operator" | "assistant";
