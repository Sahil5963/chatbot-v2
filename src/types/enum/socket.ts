export enum SocketEmitE {
  createSession = "chatbot:session:create",
  joinSession = "chatbot:session:join",
  sendMessage = "chatbot:message:send",
  history = "chatbot:conversation:history",
  compose = "chatbot:message:compose",
}
export enum SocketListenE {
  sessionCreated = "chatbot:session:created",
  joined = "chatbot:session:joined",
  messageReceived = "chatbot:message:received",
  messageCompose = "chatbot:message:compose",
}
