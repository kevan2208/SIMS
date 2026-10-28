"use client";

import { createContext, useContext } from "react";

import { strings, type Lang, type Strings } from "@/content/strings";

const LangContext = createContext<Lang>("en");

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): { lang: Lang; t: Strings } {
  const lang = useContext(LangContext);
  return { lang, t: strings[lang] };
}
