import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_APPS, appBySlug, shotUrls, slugOf } from "@/app/apps-data";
import { APP_PAGES } from "@/app/app-pages-data";
import { IS_UAT } from "@/app/site-info";
import { appJsonLd, appTitle } from "@/lib/app-page";
import AppPageView from "./AppPageView";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_APPS.map(app => ({ slug: slugOf(app) }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = appBySlug(slug);
  if (!app) notFound();
  const title = appTitle(app);
  const description = APP_PAGES[slug].th.metaDescription;
  const url = `/apps/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [shotUrls(app)[0] ?? "/og.jpg"] },
  };
}

export default async function AppPage({ params }: Props) {
  const { slug } = await params;
  const app = appBySlug(slug);
  if (!app) notFound();
  return (
    <>
      {!IS_UAT && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd(app, APP_PAGES[slug])).replace(/</g, "\\u003c") }} />}
      <AppPageView slug={slug} />
    </>
  );
}
