"use client";

import { appBySlug } from "@/app/apps-data";
import { APP_PAGES } from "@/app/app-pages-data";
import { COPY } from "@/app/copy";
import { AppDetail } from "@/components/AppDetail";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useLang } from "@/lib/lang";

export default function AppPageView({ slug }: { slug: string }) {
  const [lang, setLang] = useLang();
  const app = appBySlug(slug)!;
  const page = APP_PAGES[slug][lang];
  const t = COPY[lang];

  return (
    <>
      <SiteHeader lang={lang} onLang={setLang} home={false} />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
        <AppDetail app={app} lang={lang} headingLevel={1} />
        <section aria-labelledby="use-case-title" className="mt-8 border-t border-line pt-8">
          <h2 id="use-case-title" className="font-display text-2xl font-bold sm:text-3xl">{t.dl.useCaseTitle}</h2>
          <p className="mt-4 leading-relaxed text-graphite">{page.useCase}</p>
        </section>
        <section aria-labelledby="faq-title" className="mt-10 border-t border-line pt-8">
          <h2 id="faq-title" className="font-display text-2xl font-bold sm:text-3xl">{t.dl.faqTitle}</h2>
          <div className="mt-6 border-t border-line">
            {page.faq.map(({ q, a }) => (
              <div key={q} className="border-b border-line py-5">
                <h3 className="text-lg font-semibold">{q}</h3>
                <p className="mt-3 leading-relaxed text-graphite">{a}</p>
              </div>
            ))}
          </div>
        </section>
        <a href="/#apps" className="mt-8 inline-block font-semibold text-indigo underline underline-offset-4">{t.heroApps}</a>
      </main>
      <div className="bg-ink px-4 pb-6 pt-1 sm:px-8">
        <div className="mx-auto max-w-6xl"><SiteFooter lang={lang} /></div>
      </div>
    </>
  );
}
