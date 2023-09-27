import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import { ScreensD } from "../../types/layout";

type TabUiContextType = {
  activeRoute: {
    name: ScreensD;
    params: any;
  };
  navigate: (name: ScreensD, params?: any) => any;
  clearPrams: () => void;
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

  console.log("ACTIVE ROUTE", activeRoute);

  const clearPrams = useCallback(() => {
    setActiveRoute((s) => ({ name: s.name, params: null }));
  }, []);

  return <TabUiContext.Provider value={{ activeRoute, navigate, clearPrams }}>{children}</TabUiContext.Provider>;
}
