import { ReactNode, createContext, useContext, useState } from "react";

type TabProviderType = {
  sessions: any[];
};

const TabContext = createContext<TabProviderType>({} as TabProviderType);

export const useTabChatbot = () => useContext(TabContext);

export default function TabProvider({ children }: { children: ReactNode }) {
  const [sessions] = useState<any[]>([]);

  return (
    <TabContext.Provider
      value={{
        sessions,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}
