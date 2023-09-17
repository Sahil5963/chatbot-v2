import { ComposePayload } from "../utils/socket";

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

export type MessageEventResponse = {
  type?: MessagesReceivedType;
  from: MessageFrom;
  origin?: string;
  localId: any;
  content: {
    stream_url?: string;
    message?: string;
    message_id?: number;
  };
  session_uid?: string;
  operator?: {
    id: string;
    first_name: string;
    last_name: string;
    phone_no: any;
    phone_code: any;
    profile_pic: string;
    name: string;
    email: string;
    password: string;
    username: string;
    firebase_uid: string;
    country: string;
    email_verified: string;
    type: any;
    createdAt: string;
    updatedAt: string;
    deleted_at: any;
  };
};
export type MessagesComponseEventResponse = ComposePayload;

export type SocketState = "idle" | "creatingSession" | "joined" | "error" | "resettingSession" | "connected";

export type MessageFrom = "user" | "operator" | "assistant";
