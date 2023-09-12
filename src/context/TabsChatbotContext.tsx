import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { ScreensD } from "types/layout";

type TabsChatbotContextType = {
  activeRoute: {
    name: ScreensD;
    params: any;
  };
  navigate: (name: ScreensD, params?: any) => any;
};

const TabsChatbotContext = createContext<TabsChatbotContextType>({} as TabsChatbotContextType);

export const useTabsChatbot = () => useContext(TabsChatbotContext);

export default function TabsChatbotProvider({ children }: { children: ReactNode }) {
  const [activeRoute, setActiveRoute] = useState<{
    name: ScreensD;
    params: any;
  }>({
    name: "homeTab",
    params: null,
  });

  useEffect(() => {
    console.log("RENDER TABS");
    return () => {
      console.log("RENDER OUT TABS");
    };
  }, []);

  const navigate = useCallback((name: ScreensD, params?: any) => {
    setActiveRoute({ name, params });
  }, []);

  return <TabsChatbotContext.Provider value={{ activeRoute, navigate }}>{children}</TabsChatbotContext.Provider>;
}
