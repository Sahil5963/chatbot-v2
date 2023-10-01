export enum SocketEmitE {
  createSession = "chatbot:session:create",
  joinSession = "chatbot:session:join",
  sendMessage = "chatbot:message:send",
  history = "chatbot:conversation:history",
  compose = "chatbot:message:compose",

  //NEW
  createVisitor = "chatbot:visitor:create",
  joinVisitor = "chatbot:visitor:join",
  navigation = "chatbot:navigation:create",
}
export enum SocketListenE {
  sessionCreated = "chatbot:session:created",
  joined = "chatbot:session:joined",
  messageReceived = "chatbot:message:received",
  messageCompose = "chatbot:message:compose",
  connect = "connect",

  //NEW
  visitorCreated = "chatbot:visitor:created",
}
