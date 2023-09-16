import { ReactNode, createContext, useContext } from "react";

type TabProviderType = any;

const TabContext = createContext<TabProviderType>({} as TabProviderType);

export const useTabChatbot = () => useContext(TabContext);

export default function TabProvider({ children }: { children: ReactNode }) {
  return <TabContext.Provider value={{}}>{children}</TabContext.Provider>;
}
