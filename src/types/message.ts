import { MessageEventResponse } from "./socket";

export type MessageD = MessageEventResponse & {
  loadingStatus?: "streaming" | "loading" | null;
  createdAt: string | number | null;
  links?: any[];
  rated?: null | "1" | "0";
};
