import { io, Socket } from "socket.io-client";
import { SocketEmitE } from "types/enum/socket";
import { MessageFrom } from "types/socket";

export type ComposePayload = {
  chatbot_uid: string;
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
    // this.socket = io("http://192.168.1.14:8080/chatbot"); // Initialize the socket connection
    this.socket = io("https://wss.yourgpt.ai/chatbot"); // Initialize the socket connection
  }

  emitEvent(eventName: string, data: any) {
    // Emit a socket event with optional data
    this.socket.emit(eventName, data);
  }

  createSession(data: { chatbot_uid: string; widget_uid: string; device_type: string; platform: string }) {
    console.log("EMIT CREATE SESSION");
    this.socket.emit(SocketEmitE.createSession, data);
  }
  joinSession(data: {
    chatbot_uid: string;
    session_uid: string;
    device: { page_url: string; page_title: string };
    user: {
      name: any;
    };
  }) {
    console.log("EMIT JOIN SESSION");
    this.socket.emit(SocketEmitE.joinSession, data);
  }

  sendMessage(data: { chatbot_uid: string; session_uid: string; flow_id: string; widget_uid: string; type: string; origin: string; message: string; from: MessageFrom }) {
    console.log("EMIT SEND MESSAGE");
    this.socket.emit(SocketEmitE.sendMessage, data);
  }

  sendCompose(data: ComposePayload) {
    console.log("EMIT COMPOSE", data.content.type);
    this.socket.emit(SocketEmitE.compose, data);
  }

  getHistory(data: { chatbot_uid: string; session_uid: string; widget_uid: string }) {
    this.socket.emit(SocketEmitE.history, data);
  }
}

// Create a single instance of the SocketManager
const socketManager = new SocketManager();

export default socketManager;
