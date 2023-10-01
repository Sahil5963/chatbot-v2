import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useTabUiChatbot } from "./TabUiContext";
import { useChatbot } from "../../context/ChatbotContext";
import { MessageEventResponse, MessagesComponseEventResponse } from "../../types/socket";
import socketManager from "../../utils/socket";
import { ApiRes } from "../../types/enum";
import { getSessionsApi } from "../../network/api";
import { SessionItemApiD } from "../../types/session";
import { StorageManager } from "../../utils/storage";
import { useWidget } from "../../context/WidgetContext";

type TabProviderType = {
  sessions: SessionItemApiD[];
  sendQueryFromOutside: (query: string) => void;
  loadingSessions: boolean;
  refreshingSessions: boolean;
  hasMoreSessions: boolean;
  sessionsError: string;
  setSessions: React.Dispatch<React.SetStateAction<SessionItemApiD[]>>;
  fetchSessions: (refresh?: boolean) => void;
  leadTempMessage: string;
  setLeadTempMessage: React.Dispatch<React.SetStateAction<string>>;
  leadPending: boolean;
  setLeadPending: React.Dispatch<React.SetStateAction<boolean>>;
};

const LIMIT = 20;

const TabContext = createContext<TabProviderType>({} as TabProviderType);

export const useTabChatbot = () => useContext(TabContext);

export default function TabProvider({ children }: { children: ReactNode }) {
  const { navigate } = useTabUiChatbot();
  const { socketConnected, visitorUid, widgetUid } = useChatbot();
  const { setting } = useWidget();

  const [sessions, setSessions] = useState<SessionItemApiD[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [refreshingSessions, setRefreshingSessions] = useState(false);
  const [hasMoreSessions, setHasMoreSessions] = useState(true);
  const [sessionsError, setSessionsError] = useState("");
  const [page, setPage] = useState(1);

  const fetchSessions = useCallback(
    async (refresh = false) => {
      try {
        if (!visitorUid) return;

        if (refresh) {
          setRefreshingSessions(true);
          setPage(1);
        } else {
          setLoadingSessions(true);
        }
        const res = await getSessionsApi({ visitor_uid: visitorUid, limit: LIMIT, orderBy: "desc", page: refresh ? 1 : page });
        setLoadingSessions(false);
        setRefreshingSessions(false);

        if (res.type === ApiRes.SUCCESS) {
          const data = res.data;

          if (refresh) {
            setSessions(data);
          } else {
            setSessions((s: any) => [...s, ...data]);
          }
        }
        if (res.data?.length < LIMIT) {
          setHasMoreSessions(false);
        }

        if (res.type === ApiRes.ERROR) {
          setHasMoreSessions(false);
        }
      } catch (err) {
        setRefreshingSessions(false);
        setHasMoreSessions(false);
        setLoadingSessions(false);
        console.log("Err", err);
        setSessionsError("Something went wrong");
      }
    },
    [page, visitorUid]
  );

  // const loadMoreConversations = useCallback(async () => {
  //   setPage((p) => p + 1);
  // }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  //REAL TIME SOCKET LISTEN

  const handleMessage = useCallback(
    (data: MessageEventResponse) => {
      setSessions((p) => {
        const newArr = [...p];
        const messageItemIndex = p?.findIndex((i) => i.session_uid === data.session_uid);

        if (messageItemIndex === -1) {
          fetchSessions(true);
        } else {
          newArr[messageItemIndex] = {
            ...newArr[messageItemIndex],
            last_message: data.content.message || "",
            total_unseen: (Number(newArr[messageItemIndex]?.total_unseen || 0) + 1 || 1).toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        }
        return newArr;
      });
    },
    [fetchSessions]
  );
  const handleCompose = useCallback((data: MessagesComponseEventResponse) => {
    setSessions((p) => {
      return p.map((i) => {
        if (i.session_uid === data.session_uid) {
          return {
            ...i,
            typing: data.content?.type === "typing" ? (data.type === "start" ? true : false) : false,
          };
        } else {
          return i;
        }
      });
    });
  }, []);

  useEffect(() => {
    if (socketConnected && socketManager.socket) {
      // socketManager.socket.on(SocketListnerE.messageReceived, handleMessage);
      // socketManager.socket.on(SocketListnerE.messageCompose, handleCompose);
    }
    return () => {
      // socketManager.socket?.off(SocketListnerE.messageReceived, handleMessage);
      // socketManager.socket?.off(SocketListnerE.messageCompose, handleCompose);
    };
  }, [socketConnected, handleMessage, handleCompose]);

  const sendQueryFromOutside = (query: string) => {
    navigate("chatScreen", { query });
  };

  /**
   * LEAD
   */
  const [leadTempMessage, setLeadTempMessage] = useState("");
  const [leadPending, setLeadPending] = useState(false);

  useEffect(() => {
    const stored = StorageManager.getStorage(widgetUid);

    if (!stored?.leadSubmitted) {
      console.log("stored", stored, setting);
      if (setting?.enable_widget_form) {
        setLeadPending(true);
      }
    }
  }, [setting, widgetUid]);

  return (
    <TabContext.Provider
      value={{
        sessions,
        sendQueryFromOutside,
        loadingSessions,
        refreshingSessions,
        hasMoreSessions,
        sessionsError,
        setSessions,
        fetchSessions,
        leadTempMessage,
        setLeadTempMessage,
        leadPending,
        setLeadPending,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}
