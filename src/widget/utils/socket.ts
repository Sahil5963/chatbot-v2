import { io, Socket } from "socket.io-client";
import { MessageFrom } from "../types/socket";
import { SocketEmitE } from "../types/enum/socket";

export type ComposePayload = {
  session_uid: string;
  widget_uid: string;
  from: MessageFrom;
  type: "start" | "stop";
  content: { type: "streaming" | "typing" | "loading"; message?: string };
};

class SocketManager {
  socket: Socket;
  sessionData: any = null;

  constructor() {
    // this.socket = io("http://192.168.18.221:8080/chatbot"); // Initialize the socket connection
    this.socket = io("https://wss.yourgpt.ai/chatbot"); // Initialize the socket connection
  }

  emitEvent(eventName: string, data: any) {
    // Emit a socket event with optional data
    this.socket.emit(eventName, data);
  }

  createSession(data: { widget_uid: string; visitor_uid: string }) {
    console.log("EMIT CREATE SESSION");
    const from: MessageFrom = "user";
    const raw = { ...data, from, user_agent: navigator.userAgent };
    this.socket.emit(SocketEmitE.createSession, raw);
  }
  joinSession(data: {
    chatbot_uid: string;
    session_uid: string;
    user: {
      name: any;
    };
  }) {
    console.log("EMIT JOIN SESSION");
    const raw = { ...data, device: { page_title: document.title, url: window.location.href } };
    this.socket.emit(SocketEmitE.joinSession, raw);
  }

  sendMessage(data: { session_uid: string; flow_id: string; widget_uid: string; type: string; origin: string; message: string; from: MessageFrom }) {
    console.log("EMIT SEND MESSAGE");
    this.socket.emit(SocketEmitE.sendMessage, data);
  }
  navigation(data: { visitor_uid: string; page_title: string; url: string }) {
    console.log("EMIT NAVIGATION");
    this.socket.emit(SocketEmitE.navigation, data);
  }

  sendCompose(data: ComposePayload) {
    console.log("EMIT COMPOSE", data.content.type);
    this.socket.emit(SocketEmitE.compose, data);
  }

  getHistory(data: { chatbot_uid: string; session_uid: string; widget_uid: string }) {
    this.socket.emit(SocketEmitE.history, data);
  }

  //NEW
  createVisitor(data: { widget_uid: string }) {
    console.log("EMIT CREATE VISITOR", data, this.socket.connected);
    const raw = { ...data, user_agent: navigator.userAgent };
    this.socket.emit(SocketEmitE.createVisitor, raw);
  }
  joinVisitor(data: { widget_uid: string; visitor_uid: string }) {
    console.log("EMIT JOIN VISITOR", data);
    this.socket.emit(SocketEmitE.joinVisitor, data);
  }
}

// Create a single instance of the SocketManager
const socketManager = new SocketManager();

export default socketManager;
