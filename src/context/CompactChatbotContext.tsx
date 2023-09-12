import { ReactNode, createContext } from "react";

type CompactChatbotContextType = {};

const CompactChatbotContext = createContext<CompactChatbotContextType>({});

export default function CompactChatbotProvider({ children }: { children: ReactNode }) {
  return <CompactChatbotContext.Provider value={{}}>{children}</CompactChatbotContext.Provider>;
}
