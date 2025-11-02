import { useTranslation } from "react-i18next";

interface MultiLangName {
  ar: string;
  en: string;
  he: string;
}

export const useName = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  function getName(name: MultiLangName | undefined | null): string {
    if (!name) return "";
    return name[lang as keyof MultiLangName] || name.en || "";
  }

  return { getName, lang };
};
