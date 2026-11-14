export type PageCopy = {
  metaDescription: string;
  useCase: string;
  faq: { q: string; a: string }[];
};

export type AppPage = { th: PageCopy; en: PageCopy };

export const APP_PAGES: Record<string, AppPage> = {};
