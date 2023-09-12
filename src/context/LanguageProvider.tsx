import { ReactNode, createContext, useState } from "react";

import Fr from "lang/fr.json";
import En from "lang/en.json";
import { IntlProvider } from "react-intl";

const local = navigator.language;
let lang: any = {};

if (local.includes("en")) {
  lang = En;
} else {
  if (local === "fr") {
    lang = Fr;
  }
}

type LanguageContextType = {
  selectLanguage: (e: string) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);

  function selectLanguage(e: string) {
    const newLocale = e;
    setLocale(newLocale);
    if (newLocale.includes("en")) {
      setMessages(En);
    } else {
      if (newLocale === "fr") {
        setMessages(Fr);
      }
    }
  }

  console.log("locale", locale);

  return (
    <LanguageContext.Provider value={{ selectLanguage }}>
      <IntlProvider messages={messages} locale={locale} defaultLocale="en">
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}
