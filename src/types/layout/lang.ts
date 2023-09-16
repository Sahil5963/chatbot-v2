export enum LanguageCodesE {
  en = "en",
  fr = "fr",
}
export const LanguageLabels: {
  [keyof in LanguageCodesE]: string;
} = {
  en: "English",
  fr: "French",
};
