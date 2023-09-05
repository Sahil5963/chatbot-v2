export type MessageD = {
  type?: any;
  text?: string;
  sent?: boolean;
  id?: any;
  loadingStatus: "streaming" | "loading" | "finished" | "error";
};
