import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import { ScreensD } from "../../../types/layout";

type TabUiContextType = {
  activeRoute: {
    name: ScreensD;
    params: any;
  };
  navigate: (name: ScreensD, params?: any) => any;
};

const TabUiContext = createContext<TabUiContextType>({} as TabUiContextType);

export const useTabUiChatbot = () => useContext(TabUiContext);

export default function TabUiProvider({ children }: { children: ReactNode }) {
  const [activeRoute, setActiveRoute] = useState<{
    name: ScreensD;
    params: any;
  }>({
    name: "homeTab",
    params: null,
  });

  const navigate = useCallback((name: ScreensD, params?: any) => {
    setActiveRoute({ name, params });
  }, []);

  return <TabUiContext.Provider value={{ activeRoute, navigate }}>{children}</TabUiContext.Provider>;
}
