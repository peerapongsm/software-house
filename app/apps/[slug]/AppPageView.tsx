"use client";

import Image from "next/image";
import { appBySlug, downloadUrl } from "@/app/apps-data";
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
  const paid = app.price !== undefined;
  const price = paid ? `฿${app.price!.toLocaleString("en-US")}` : "";
  // Same target and label as the button at the end of AppDetail.
  const action = paid ? { href: `/buy?app=${app.id}`, label: `${t.buy} ${price}` } : { href: downloadUrl(app), label: t.dl.button };
  const button = "block rounded-xl bg-ink px-6 py-3.5 text-center font-semibold text-white transition-colors hover:bg-indigo-deep";

  return (
    <>
      <SiteHeader lang={lang} onLang={setLang} home={false} />
      {/* Mobile: one column, the action lives in a bar pinned to the bottom (pb-28 keeps the end of the page clear of it).
          Desktop: content left, a sticky panel right with the same action always in view. */}
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-4 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 lg:pb-16 lg:pt-8">
        <div className="min-w-0">
          <div className="-mx-5 sm:-mx-8">
            <AppDetail app={app} lang={lang} headingLevel={1} />
          </div>
          <section aria-labelledby="use-case-title" className="mt-8 border-t border-line pt-8">
            <h2 id="use-case-title" className="font-display text-2xl font-bold sm:text-3xl">{t.dl.useCaseTitle}</h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-graphite">{page.useCase}</p>
          </section>
          <section aria-labelledby="faq-title" className="mt-10 border-t border-line pt-8">
            <h2 id="faq-title" className="font-display text-2xl font-bold sm:text-3xl">{t.dl.faqTitle}</h2>
            <div className="mt-6 border-t border-line">
              {page.faq.map(({ q, a }) => (
                <div key={q} className="border-b border-line py-5">
                  <h3 className="text-lg font-semibold">{q}</h3>
                  <p className="mt-3 max-w-prose leading-relaxed text-graphite">{a}</p>
                </div>
              ))}
            </div>
          </section>
          <a href="/#apps" className="mt-8 inline-block font-semibold text-indigo underline underline-offset-4">{t.heroApps}</a>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-8 rounded-2xl border border-line bg-sheet p-6">
            <Image src={app.icon} alt="" width={96} height={96} className="size-20 rounded-[22%] shadow-tile" />
            <p className="mt-4 font-display text-xl font-bold">{app.name}</p>
            <p className="mt-1 leading-snug text-graphite">{app[lang].tagline}</p>
            {paid && (
              <p className="mt-4 font-display text-3xl font-bold text-indigo">
                {price} <span className="text-sm font-semibold text-graphite">{t.oneTime}</span>
              </p>
            )}
            <a href={action.href} className={`mt-5 ${button}`}>{action.label}</a>
            <p className="mt-4 text-sm leading-relaxed text-graphite">{t.winOnly}</p>
          </div>
        </aside>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-sheet/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <Image src={app.icon} alt="" width={96} height={96} className="size-11 shrink-0 rounded-[22%]" />
          <a href={action.href} className={`flex-1 ${button}`}>{action.label}</a>
        </div>
      </div>

      <div className="bg-ink px-4 pb-6 pt-1 sm:px-8">
        <div className="mx-auto max-w-6xl"><SiteFooter lang={lang} /></div>
      </div>
    </>
  );
}
