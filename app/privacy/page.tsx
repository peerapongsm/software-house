import { Phrases } from "@/components/Phrases";
import type { Metadata } from "next";
import type { Msg } from "@/lib/api.ts";

// Privacy for accounts, Stripe payments, and opt-in services. Decisions: 2026-11-14 spec.
// LINE OA chat section verified against peerapos-chat 2026-11-13: Claude API replies, last turns kept 24 h in
// Cloudflare KV keyed by a hash of the LINE user ID, daily/monthly counters, 12 h pause after a handoff.
// The AI paragraph follows peerapos-go/docs/privacy-ai.md and licence worker/src/consent.ts.
// The LINE connector section follows the peerapos-go relay (relay/src/line.ts, goRoom.ts, shared/src/lineSort.ts) and
// host/src/line after the round-3 fixes (per-event extracts, mixed codes, unread removed hooks, finished disconnect), 2026-11-17.

const COPY = {
  description: {
    th: "นโยบายความเป็นส่วนตัวสำหรับแอป PeerapoS บัญชี การชำระเงินผ่าน Stripe บริการออนไลน์ และแชต LINE",
    en: "Privacy policy for PeerapoS apps, accounts, Stripe payments, online services and the LINE chat.",
  },
  orders: {
    th: "คำสั่งซื้อ: รายการ ยอดเงิน เวลา สถานะ อีเมลรับใบยืนยัน ชื่อ รหัสอ้างอิงการชำระเงินของ Stripe และการติ๊กยอมรับข้อกำหนด",
    en: "Orders: items, amount, time, status, receipt email, name, Stripe payment reference and your acceptance of the Terms.",
  },
  stripeRecords: {
    th: "การซื้อผ่าน Stripe: รหัสลูกค้าและรหัสการสมัคร สินค้า สถานะ วันสิ้นสุด การยกเลิก และประวัติ Pro 1 ปี ใช้ตรวจสิทธิ์ Pro และรับการแจ้งชำระเงิน คืนเงิน หรือข้อพิพาทจาก Stripe ไม่เก็บหมายเลขบัตร",
    en: "Stripe purchases: customer and subscription ids, product, status, end date, cancellation and prepaid pass records, used to check Pro and process Stripe payment, refund and dispute notifications. We do not store card numbers.",
  },
  mail: {
    th: "เราส่งอีเมลยืนยันการชำระเงินสำหรับแอปซื้อขาดและ Pro 1 ปี ไม่ส่งอีเมลการตลาด Stripe ส่งใบแจ้งค่าบริการและอีเมลต่ออายุสำหรับการสมัครผ่านบัตร",
    en: "We send payment confirmations for paid apps and prepaid passes, with no marketing. Stripe sends invoices and renewal emails for card subscriptions.",
  },
  paymentTitle: { th: "ชำระเงินผ่าน Stripe", en: "Payments through Stripe" },
  payment: {
    th: "การซื้อบนเว็บไซต์จ่ายด้วยบัตรหรือ PromptPay ผ่าน Stripe (Stripe Payments Singapore / Stripe, Inc.) ซึ่งเป็นผู้ประมวลผลการชำระเงิน เราส่งอีเมลและรหัสบัญชีใน metadata ให้ Stripe เพื่อผูกการชำระเงินกับบัญชีของคุณ",
    en: "Website purchases are paid by card or PromptPay through Stripe (Stripe Payments Singapore / Stripe, Inc.), our payment processor. We send Stripe your email and account id in metadata to link payments to your account.",
  },
  card: {
    th: "คุณกรอกข้อมูลการชำระเงินบนหน้าของ Stripe โดยตรง เราไม่เห็นหมายเลขบัตร Stripe เก็บข้อมูลการชำระเงินตามระยะเวลาเก็บข้อมูลของ Stripe และหน้าที่ตามกฎหมาย",
    en: "You enter payment details directly on Stripe's page. We never see card numbers. Stripe keeps payment data under Stripe's retention policy and its legal obligations.",
  },
  recipient: {
    th: "Stripe (Stripe Payments Singapore / Stripe, Inc.): ประมวลผลการชำระเงิน รับอีเมล รหัสบัญชีใน metadata และข้อมูลการชำระเงินที่คุณกรอกบนหน้าของ Stripe",
    en: "Stripe (Stripe Payments Singapore / Stripe, Inc.): processes payments; receives email, account id in metadata and payment details you enter on Stripe's page.",
  },
  stripeRetention: {
    th: "ข้อมูลการชำระเงินที่ Stripe เก็บ ใช้ระยะเวลาเก็บข้อมูลของ Stripe ลูกค้าและบันทึกการชำระเงินยังอยู่ที่ Stripe หลังลบบัญชี PeerapoS โดย metadata ของลูกค้ามีเพียงรหัสบัญชี",
    en: "Payment data held by Stripe follows Stripe's retention policy. The Stripe customer and payment records remain with Stripe after you delete your PeerapoS account; customer metadata holds only the account id.",
  },
  retention: {
    th: "บัญชี ข้อมูลการสมัครผ่าน Stripe Pro 1 ปี และเครื่องที่เชื่อม ไม่มีกำหนดลบอัตโนมัติ เราเก็บไว้ตลอดที่บัญชียังอยู่ และลบจากระบบของเราเมื่อคุณลบบัญชี ส่วนคำสั่งซื้อยังเก็บเป็นหลักฐานทางภาษี",
    en: "Accounts, Stripe subscription records, prepaid passes and linked PCs have no automatic deletion. We keep them while the account exists and delete them from our system when you delete the account. Orders remain as tax records.",
  },
  deletion: {
    th: "เมื่อลบบัญชี การสมัครผ่านบัตรจะถูกยกเลิกทันทีโดยไม่คืนเงิน และ Pro 1 ปีที่เหลือจะหายไป",
    en: "On account deletion, card subscriptions are cancelled immediately without a refund, and remaining prepaid passes are lost.",
  },
  updated: {
    th: "แอป บัญชี และบริการของ PeerapoS อัปเดตล่าสุด 17 พฤศจิกายน 2569",
    en: "PeerapoS apps, accounts and services. Last updated 17 November 2026",
  },
} satisfies Record<string, Msg>;

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว · Privacy Policy — PeerapoS",
  description: COPY.description.en,
  // override the layout's "/" canonical and og:url
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

const EMAIL = "contact@peerapongsm.dev";
const APPS_FREE =
  "PeerapoS Wash, Stock, File, Pay, Garage, Room, Class, CRM, Campaign, Plan, BCP, School, Trip, Pilates, Repair, Studio, Pharmacy, POS, Massage และ Budget";
const APPS_PAID = "PeerapoS Account, Wholesale, Property, Service, Contractor, Academy และ Wellness";
const APPS_FREE_EN =
  "PeerapoS Wash, Stock, File, Pay, Garage, Room, Class, CRM, Campaign, Plan, BCP, School, Trip, Pilates, Repair, Studio, Pharmacy, POS, Massage and Budget";
const APPS_PAID_EN = "PeerapoS Account, Wholesale, Property, Service, Contractor, Academy and Wellness";

type Sec = { id?: string; title: string; p?: string[]; li?: string[]; after?: string[] };

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-8 scroll-mt-6">
      <h3 className="font-display text-xl font-bold"><Phrases text={title} /></h3>
      <div className="mt-2 space-y-2 leading-relaxed text-graphite">{children}</div>
    </section>
  );
}

function Secs({ list }: { list: Sec[] }) {
  return (
    <>
      {list.map((s) => (
        <Section key={s.title} id={s.id} title={s.title}>
          {s.p?.map((x) => <p key={x}><Phrases text={x} /></p>)}
          {s.li && (
            <ul className="list-disc space-y-2 pl-5">
              {s.li.map((x) => <li key={x}><Phrases text={x} /></li>)}
            </ul>
          )}
          {s.after?.map((x) => <p key={x}><Phrases text={x} /></p>)}
        </Section>
      ))}
    </>
  );
}

const PROCESSORS = [
  ["Cloudflare", "https://www.cloudflare.com/privacypolicy/", "https://www.cloudflare.com/website-terms/"],
  ["Stripe", "https://stripe.com/privacy", "https://stripe.com/legal/ssa"],
  ["Resend", "https://resend.com/legal/privacy-policy", "https://resend.com/legal/terms-of-service"],
  ["Google", "https://policies.google.com/privacy", "https://policies.google.com/terms"],
  ["Anthropic", "https://www.anthropic.com/legal/privacy", "https://www.anthropic.com/legal/consumer-terms"],
  ["OpenAI", "https://openai.com/policies/privacy-policy/", "https://openai.com/policies/terms-of-use/"],
];

function ProcessorLinks({ lang }: { lang: "th" | "en" }) {
  return (
    <Section title={lang === "th" ? "นโยบายและเงื่อนไขของผู้ให้บริการ" : "Providers' policies and terms"}>
      <p><Phrases text={lang === "th" ? "ตัวเชื่อม AI ใช้ผู้ให้บริการที่คุณเลือก เช่น Anthropic หรือ OpenAI อ่านนโยบายและเงื่อนไขของผู้ให้บริการแต่ละรายได้ที่นี่" : "The AI connector uses the provider you choose, such as Anthropic or OpenAI. Read each provider's own privacy policy and terms here."} /></p>
      <ul className="list-disc space-y-2 pl-5">
        {PROCESSORS.map(([name, privacy, terms]) => (
          <li key={name}>{name}: <a href={privacy} className="text-indigo underline">{lang === "th" ? "ความเป็นส่วนตัว" : "Privacy"}</a>{" · "}<a href={terms} className="text-indigo underline">{lang === "th" ? "เงื่อนไข" : "Terms"}</a></li>
        ))}
      </ul>
    </Section>
  );
}

const TH: Sec[] = [
  {
    title: "เราเป็นใคร ร้านเป็นใคร",
    p: [
      "ผู้ให้บริการคือ พีระพอส (PeerapoS) ผู้ประกอบการบุคคลธรรมดา",
      "ข้อมูลลูกค้าและพนักงานที่ร้านกรอกในแอป ร้านเป็นผู้ควบคุมข้อมูลเอง เราไม่เห็นข้อมูลนั้น",
      "ข้อมูลบัญชี คำสั่งซื้อ รายงานปัญหาที่ส่งมา และสถิติการใช้งาน เราเป็นผู้ควบคุมข้อมูลเอง",
      "ถ้าร้านเปิดบริการออนไลน์ที่ให้เปิดใช้เอง (รีเลย์ PeerapoS Pair ตัวเชื่อม AI ตัวเชื่อม LINE การสำรองข้อมูลไป Google Drive หน้าลูกค้า) เราเป็นผู้ประมวลผลข้อมูลให้ร้าน เท่าที่จำเป็นต่อการเดินบริการ",
    ],
  },
  {
    title: "แอปฟรีและการเชื่อมต่ออินเทอร์เน็ต",
    p: [
      "ข้อมูลที่กรอกในแอปอยู่ในคอมพิวเตอร์ของคุณเท่านั้น เราไม่มีเซิร์ฟเวอร์เก็บข้อมูลธุรกิจของคุณ ไฟล์สำรองหรือไฟล์ที่ส่งออกไปอยู่ที่ที่คุณเลือกเอง",
      "ใช้ฟรี ฟีเจอร์บางอย่างต้องใช้ PeerapoS Pro ไม่มีโฆษณา ใช้งานหลักได้โดยไม่ต้องมีบัญชี แอปอาจเชื่อมต่ออินเทอร์เน็ตดังนี้",
    ],
    li: [
      "ตรวจหาเวอร์ชันใหม่ แอปถาม GitHub Releases ว่ามีเวอร์ชันใหม่ไหม ไม่ส่งข้อมูลของคุณไปด้วย",
      "รายงานปัญหาหรือส่งความเห็น ส่งเฉพาะตอนที่คุณกดส่งเอง ดูหัวข้อ \"รายงานปัญหา\"",
      "สถิติการใช้งาน วันละครั้งเมื่อออนไลน์ ปิดได้ ดูหัวข้อ \"สถิติการใช้งาน\"",
      "เฉพาะเมื่อคุณเปิดใช้เอง: ตรวจสิทธิ์ Pro รีเลย์ PeerapoS Pair ตัวเชื่อม AI ตัวเชื่อม LINE และสำรองข้อมูลไป Google Drive",
    ],
  },
  {
    title: "สถิติการใช้งาน",
    p: [
      "แอป PeerapoS ส่งสถิติการใช้งานวันละครั้งเมื่อออนไลน์ เปิดเป็นค่าเริ่มต้น และมีประกาศในแอปก่อนส่งครั้งแรก เราใช้สถิตินี้ปรับปรุงโปรแกรม โดยอาศัยฐาน|ประโยชน์โดยชอบด้วยกฎหมาย ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล มาตรา 24(5)",
      "รายงานใช้รหัสสุ่มหนึ่งรหัสต่อคอมพิวเตอร์ แอป PeerapoS ทุกตัวบนเครื่องนั้นใช้รหัสเดียวกัน ส่วนอุปกรณ์ที่จับคู่ไว้และเชื่อมต่อในวันนั้น แต่ละเครื่องมีรหัสที่แฮชแยกของตัวเอง รหัสนี้ไม่ใช่รหัสเครื่องของ Windows และไม่ผูกกับบัญชี สิทธิ์ใช้งาน อีเมล Google การชำระเงิน รายงานปัญหา หรือข้อมูลรีเลย์และตัวเชื่อม AI เราถือว่าสถิตินี้เป็นข้อมูลส่วนบุคคล|แบบใช้รหัสแทนชื่อ",
    ],
    li: [
      "ชื่อและเวอร์ชันแอป รุ่น Windows (10, 11 หรืออื่น ๆ) ภาษาไทยหรืออังกฤษ และโหมดฟรี Pro หรือเครื่องลูก",
      "จำนวนวันที่เปิดแอปใน 7 วันที่ผ่านมา (0–7 วัน) และเวลาที่เปิดหน้าต่างแอปใช้งานวันนี้ บอกเป็นช่วง (0–15, 15–60, 60–240 หรือมากกว่า 240 นาที)",
      "จำนวนครั้งที่ใช้ฟีเจอร์|และเปิดบริการ นับเฉพาะรายการที่กำหนดไว้ในแอป เช่น ออกเอกสาร เปิดหน้าสมัคร Pro หรือชนขีดจำกัดของรุ่นฟรี นับไม่เกิน 999 ครั้งต่อรายการ ไม่มีข้อความที่คุณพิมพ์",
      "จำนวนบริษัท (1, 2, 3 หรือ 4 ขึ้นไป) และจำนวนรายการหลักในบริษัทที่เปิดอยู่ บอกเป็นช่วง (0–10, 11–50, 51–200 หรือ 201 ขึ้นไป) เช่น ห้อง สินค้า ลูกค้า หรือรถ แล้วแต่แอป ส่งแค่ช่วงจำนวน ไม่มีรายละเอียดของรายการ",
      "จำนวนอุปกรณ์ที่จับคู่ ที่เชื่อมต่อวันนี้ และที่ใช้รีเลย์วันนี้ (อย่างละ 0–20) พร้อมรหัสสุ่มของคอมพิวเตอร์ และรหัสแฮชของอุปกรณ์ที่เชื่อมต่อวันนี้ ไม่เกิน 20 เครื่อง",
      "เลขรุ่นของรูปแบบรายงาน และจำนวนครั้งที่แอปปิดตัวเองเพราะข้อผิดพลาดกับที่อัปเดตไม่สำเร็จ (อย่างละ 0–99) ไม่มีข้อความข้อผิดพลาด",
    ],
    after: [
      "รายงานไม่มีข้อมูลร้านหรือลูกค้า ไม่มีชื่อ ยอดเงิน ข้อความที่พิมพ์เอง ที่อยู่ เบอร์โทร เลขภาษี ที่อยู่ไฟล์ในเครื่อง หรืออายุ และไม่เก็บตำแหน่งที่ตั้งทุกชนิด ทั้งประเทศ ภูมิภาค และเขตเวลา Cloudflare เป็นผู้ประมวลผลให้เรา จึงเห็นที่อยู่ IP ตอนรับส่งคำขอและใช้จำกัดจำนวนครั้ง แต่เราไม่อ่าน ไม่เก็บ และไม่บันทึก IP ในล็อก",
      "เราเก็บสถิติ 3 เดือนแล้วลบ ไม่เอาไปเชื่อมกับข้อมูลอื่นเพื่อหาว่าเป็นใคร และเวลาสรุปผล จะไม่แสดงกลุ่มที่มีคอมพิวเตอร์น้อยกว่า 5 เครื่อง",
      "ปิดได้ที่ ตั้งค่า > เกี่ยวกับ พอยืนยันปิด แอปก็หยุดนับและส่ง แล้วลบตัวนับและรหัสสถิติ|บนคอมพิวเตอร์เครื่องนั้นทิ้ง ถ้ามีรายงานที่กำลังส่งอยู่พอดี รายงานนั้นอาจส่งไปจนเสร็จ รายงานเก่าโยงกลับมาที่เครื่องนี้ไม่ได้อีก และหมดอายุเองภายใน 3 เดือน ถ้าเปิดใหม่ แอปจะสร้างรหัสใหม่ ในหน้าเดียวกันกด \"ดูสิ่งที่ส่ง\" เพื่อดูรายงานได้",
      "เราไม่ขอให้ใครส่งรหัสสถิติมาให้เรา เพราะจะทำให้รู้ว่ารหัสนั้นเป็นของใคร ถ้าอยากคัดค้านหรือลบ ให้ปิดสวิตช์นี้",
    ],
  },
  {
    title: "บัญชี Pro และแอปแบบซื้อขาด",
    p: [
      "แอปที่ใช้ Pro และแอปแบบซื้อขาด ต้องมีบัญชี และติดต่อ peerapongsm.dev เพื่อตรวจสิทธิ์ตอนเปิดแอป ตอนกลับมาที่หน้าต่างแอป และวันละครั้งขณะเปิดอยู่ แอปแบบซื้อขาดอัปเดตจาก peerapongsm.dev ด้วย แทน GitHub",
      "สิ่งที่เราเก็บ",
    ],
    li: [
      "บัญชี: รหัสบัญชี Google ที่คงที่ อีเมล และชื่อ ที่ Google ส่งให้ตอนเข้าสู่ระบบ ใช้สร้างบัญชีและเป็นชื่อในสิทธิ์ และเวลาที่สร้างบัญชี",
      "สิทธิ์: ชื่อในสิทธิ์ (แสดงในแอป) แอปที่ซื้อ สถานะ Pro และวันสิ้นสุด",
      COPY.orders.th,
      "เครื่องที่เชื่อม: ชื่อเครื่อง (ตามที่แอปส่ง) แอปที่ใช้เชื่อม รหัสเครื่องที่แฮชแล้ว (ไม่ใช่รหัสเดิมของ Windows) เวลาที่เชื่อม ใช้ล่าสุด และเลิกใช้",
      "การเข้าสู่ระบบ: เซสชันที่เก็บเป็นแฮช อยู่ 30 วัน เบราว์เซอร์เก็บคุกกี้เซสชันที่จำเป็นต่อการเข้าสู่ระบบ ไม่มีคุกกี้โฆษณา",
      COPY.stripeRecords.th,
    ],
    after: [
      COPY.mail.th,
    ],
  },
  {
    title: "เข้าสู่ระบบด้วย Google",
    p: [
      "บัญชีบนเว็บไซต์เข้าสู่ระบบด้วย Google เท่านั้น ตอนเข้าสู่ระบบ Google ส่งรหัสบัญชีที่คงที่ อีเมล และชื่อให้เรา เราไม่ได้รหัสผ่าน Google ของคุณ",
      "แอป PeerapoS Pair บน Android เป็นแอปคู่หูฟรี ไม่ต้องเข้าสู่ระบบ ไม่มีการซื้อในแอป และไม่เก็บข้อมูลส่วนบุคคล",
    ],
  },
  {
    title: COPY.paymentTitle.th,
    p: [
      COPY.payment.th,
      COPY.card.th,
    ],
  },
  {
    title: "บริการออนไลน์ที่ให้เปิดใช้เอง",
    p: [
      "บริการเหล่านี้ปิดอยู่เป็นค่าเริ่มต้น ต้องมี Pro และต้องเปิดเองในแอป เปิดและปิดได้ทุกเมื่อ",
    ],
  },
  {
    title: "รีเลย์ PeerapoS Pair และหน้าลูกค้า",
    p: [
      "เมื่อเปิด เครื่องหลักของร้านเชื่อมออกไปที่ relay.peerapongsm.dev ค้างไว้ เพื่อให้มือถือ PeerapoS Pair และหน้าลูกค้า (เปิดจาก QR) คุยกับเครื่องหลักได้ตอนอยู่นอกร้าน เบราว์เซอร์ของลูกค้าเปิดหน้าจาก go.peerapongsm.dev",
    ],
    li: [
      "เนื้อหาเข้ารหัสปลายทางระหว่างเครื่องหลักกับมือถือหรือหน้าลูกค้า เราเห็นแค่ข้อมูลเส้นทาง คือ เวลา ชนิด ขนาด และผลของแต่ละข้อความ เก็บ 7 วันแล้วลบ ไม่เก็บที่อยู่ IP",
      "คำขอจองหรือสอบถามจากหน้าลูกค้า ถ้าเครื่องหลักปิดอยู่ จะถูกพักไว้ที่เราเป็นข้อมูลเข้ารหัส สูงสุด 200 รายการต่อร้าน เก็บ 14 วันแล้วลบ หรือลบเมื่อเครื่องหลักรับไปแล้ว",
      "หน้าลูกค้าเข้ารหัสด้วยโค้ดที่เราส่งให้เบราว์เซอร์จาก go.peerapongsm.dev ลูกค้าจึงต้องเชื่อใจโค้ดนั้น ซึ่งเราเป็นผู้ให้",
      "ฟอร์มบนหน้าลูกค้าใช้ Cloudflare Turnstile กันบอต",
      "การแจ้งเตือนเข้ามือถือส่งผ่าน Google Firebase Cloud Messaging มีแค่ชื่อสาขาที่ร้านตั้ง ชนิดเหตุการณ์ และจำนวน เช่น \"ออร์เดอร์ใหม่ 3 รายการ\" ไม่มีข้อมูลธุรกิจ",
      "ปิดได้ที่ ตั้งค่า › Pair ในแอป เมื่อปิด เครื่องหลักตัดการเชื่อมออก",
    ],
    after: ["ร้านเป็นผู้ควบคุมข้อมูลของลูกค้าที่กรอกผ่านหน้าลูกค้า และเป็นผู้ตั้งข้อความความเป็นส่วนตัวของร้าน ใครอยากใช้สิทธิ์เกี่ยวกับข้อมูลนั้น ให้ติดต่อร้านนั้นก่อน"],
  },
  {
    title: "ตัวเชื่อม AI",
    p: [
      "ตัวเชื่อม AI (ไม่บังคับ ปิดเป็นค่าเริ่มต้น) PeerapoS เป็นทางผ่านระหว่างผู้ให้บริการ AI ที่ร้านเลือกกับเครื่องของร้าน เราไม่เก็บคำถาม คำตอบ หรือข้อมูลร้านไว้บนเซิร์ฟเวอร์ เก็บเพียงรหัสร้าน ขนาด ผลลัพธ์ (สำเร็จหรือรหัสข้อผิดพลาด) และเวลา เพื่อดูแลระบบและตรวจสอบการใช้งานเกินกำหนด ข้อมูลที่ผ่านเราไปถึงผู้ให้บริการ AI ไม่ได้เข้ารหัสปลายทาง ผู้ให้บริการ AI ที่ร้านเลือกเป็นผู้รับข้อมูลที่ร้านตัดสินใจส่งเอง และอยู่ภายใต้เงื่อนไขและนโยบายของผู้ให้บริการนั้น ไม่ใช่ของ PeerapoS ร้านยกเลิกการเชื่อมได้ทุกเมื่อที่ ตั้งค่า › AI ในแอป หรือ \"AI ที่เชื่อมต่อ\" ในหน้าบัญชีของฉัน เมื่อยกเลิก การเรียกถัดไปจะถูกปฏิเสธทันที",
      "AI จะไม่เห็นเบอร์โทร ที่อยู่ เลขบัตรประชาชน ข้อมูลสุขภาพ ข้อมูลเด็ก รหัสผ่าน และค่าจ้างพนักงาน ชื่อลูกค้าส่งไปเฉพาะเมื่อร้านเปิดสวิตช์ส่งชื่อลูกค้า AI อ่านได้แม้แอปล็อกอินอยู่ ตราบใดที่เปิดเครื่องและเปิดสวิตช์ไว้ และสร้างได้แค่ร่างที่ร้านต้องกดยืนยันในแอปเอง",
      "สิ่งที่อยู่ที่เราเมื่อเชื่อมแล้ว คือบันทึกการเชื่อม (AI ตัวไหน รหัสบัญชี สิทธิ์ที่ให้) และโทเคนเข้าถึง ไม่ใช่ข้อมูลร้าน บันทึกนี้อยู่จนกว่าคุณยกเลิกหรือโทเคนหมดอายุ",
      "ร้านที่เปิดตัวเชื่อม AI ควรใส่ข้อความนี้ไว้ในประกาศความเป็นส่วนตัวของร้านเอง เพราะร้านเป็นผู้ตัดสินใจส่งข้อมูลไปให้ผู้ให้บริการ AI",
    ],
  },
  {
    title: "ตัวเชื่อม LINE ของร้าน",
    p: [
      "ตัวเชื่อม LINE (ไม่บังคับ ปิดเป็นค่าเริ่มต้น) ให้ร้านส่งข้อความ|จากแอปถึงลูกค้าทาง LINE Official Account ของร้านเอง ในแอปฟรีต้องมี Pro ส่วนแอปแบบซื้อขาด|มีให้อยู่แล้ว ร้านใช้ OA และ Channel access token ของร้าน โทเคนกับ Channel secret อยู่ในเครื่องหลักของร้าน|เท่านั้น ไม่ส่งมาที่เรา",
      "ข้อความที่ลูกค้าส่งถึง LINE OA ของร้าน|จะผ่านเซิร์ฟเวอร์ PeerapoS (relay.peerapongsm.dev) ก่อนถึงเครื่องร้าน เซิร์ฟเวอร์อ่าน|เพียงเพื่อคัดว่าเป็น|รหัสเชื่อม LINE คำขอยกเลิก การเพิ่มเพื่อนหรือบล็อก หรือข้อความแชต รหัสเชื่อมกับการเพิ่มเพื่อน|เก็บไว้แบบเข้ารหัส|ไม่เกิน 7 วัน คำขอยกเลิกกับการบล็อก|ไม่เกิน 90 วัน จนเครื่องร้านมารับ แล้วลบทันทีที่รับไป ถ้าเปิดแชตบอต ข้อความแชต|จะส่งต่อถึงเครื่องร้าน|ทันทีเท่านั้น ไม่เก็บไว้ ถ้าเครื่องปิดอยู่ ข้อความนั้นก็ถูกทิ้ง ถ้าไม่เปิดแชตบอต เราไม่ส่งต่อข้อความแชต ข้อความที่ร้านส่งออก|จากเครื่องร้าน|ตรงถึง LINE ไม่ผ่านเรา",
    ],
    li: [
      "ที่เก็บไว้เข้ารหัส|ด้วยกุญแจของเครื่องหลักร้าน มีแค่เครื่องนั้นที่เปิดอ่านได้ เราเปิดอ่านไม่ได้ แต่ละรายการเก็บแค่ชนิด (รหัสเชื่อม คำขอยกเลิก เพิ่มเพื่อน หรือบล็อก) ตัวรหัส LINE userId เวลา และรหัสอ้างอิงของ LINE ไม่เก็บข้อความที่ลูกค้าพิมพ์ และไม่เก็บข้อความอื่น|ที่ส่งมาพร้อมกัน",
      "รหัสเชื่อมมี 6 ตัว ปนทั้งตัวอักษรและตัวเลขเสมอ ข้อความหน้าตาแบบนี้เท่านั้น|ที่นับเป็นรหัส คำทั่วไปอย่าง THANKS หรือตัวเลขล้วน ไม่นับและไม่ถูกเก็บ แล้วเครื่องร้าน|จะเทียบกับรหัส|ที่ร้านออกให้จริง",
      "ถ้าลูกค้าส่งรหัสตอนเครื่องร้านปิดอยู่ การเชื่อมจะนับ|ก็ต่อเมื่อ LINE รับข้อความยืนยัน|ที่ OA ของร้านส่งถึงลูกค้าคนนั้นแล้ว ถ้า LINE ไม่รับ การเชื่อมจะถูกยกเลิก|และร้านต้องออกรหัสใหม่ให้",
      "บันทึกเส้นทางมีแค่เวลา ขนาด และผลการคัด ไม่มีเนื้อหา เก็บ 7 วันแล้วลบ ไม่เก็บที่อยู่ IP",
      "ลูกค้าเชื่อม LINE เอง|ด้วยรหัสใช้ครั้งเดียว|จากร้าน (สแกน QR ที่ร้านแล้วกดส่ง) เลิกได้ทุกเมื่อ|ด้วยการพิมพ์ \"ยกเลิก LINE\" หรือ STOP หรือบล็อก OA ของร้าน",
      "รายการว่าบัญชี LINE ไหน (LINE userId) เชื่อมกับลูกค้าคนไหน อยู่ในเครื่องหลัก|ของร้าน ไม่อยู่ที่เรา แอปไม่ดึงชื่อ|หรือรูปโปรไฟล์ LINE ของลูกค้า",
      "เมื่อร้านยกเลิกการเชื่อม เครื่องหลัก|ลืม Channel secret ทันที แล้วลบที่อยู่ webhook ที่เรา ข้อความที่รอเครื่องร้านอยู่|ก็ถูกลบไปด้วย ถ้าตอนนั้น|ติดต่อเราหรือ LINE ไม่ได้ เครื่องหลักจะลองใหม่ทุกนาที|และหลังเปิดแอปใหม่ จนลบเสร็จ ระหว่างนั้นเก็บไว้แค่โทเคน|เพื่อเปลี่ยนที่อยู่ webhook ใน LINE แล้วลบโทเคนทิ้ง|ทันทีที่เสร็จ ถ้า LINE ไม่รับโทเคนนั้นแล้ว ให้ปิด Use webhook ใน LINE Developers เอง ข้อความที่ LINE ส่งมาหลังลบแล้ว|เราไม่อ่านและไม่เก็บ",
    ],
    after: [
      "ร้านเป็นผู้ควบคุมข้อมูล|ของลูกค้าที่คุยกับ LINE OA ของร้าน เราเป็นผู้ประมวลผลให้ร้าน ร้านที่เปิดตัวเชื่อม LINE ควรบอกเรื่องนี้|ในประกาศความเป็นส่วนตัว|ของร้านเองด้วย ส่วน LINE เก็บแชต|ตามนโยบายของ LINE เอง",
    ],
  },
  {
    title: "สำรองข้อมูลไป Google Drive",
    p: ["เมื่อคุณเปิดใช้ แอปส่งไฟล์สำรองที่เข้ารหัสไปยังบัญชี Google Drive ของคุณโดยตรง เราไม่เก็บหรืออ่านเนื้อหาไฟล์สำรอง คุณปิดและจัดการไฟล์ในบัญชี Google ของคุณได้"],
  },
  {
    title: "รายงานปัญหา",
    p: [
      "ส่งเฉพาะตอนที่คุณกดส่งเอง รายงานมีข้อความที่คุณพิมพ์ อีเมลสำหรับให้เราตอบกลับ (ถ้าคุณใส่) ชื่อและเวอร์ชันแอป เวอร์ชัน Windows และรายละเอียดข้อผิดพลาด ก่อนส่ง แอปจะลบชื่อผู้ใช้ Windows และที่อยู่โฟลเดอร์ในเครื่องออกให้ รายงานส่งผ่าน feedback.peerapongsm.dev (Cloudflare) แล้วส่งต่อเป็นอีเมลถึงเรา พร้อมประเทศและเวลาที่ได้รับ สำเนารายงานเก็บในฐานข้อมูลของเราบน Cloudflare จนกว่าเราจะดึงไปอ่านแล้วลบออก ที่อยู่ IP ใช้แค่จำกัดจำนวนครั้งที่ส่งได้ ไม่ได้เก็บไว้ เราใช้รายงานเพื่อแก้บั๊กเท่านั้น ไม่ขายหรือแบ่งปันให้ใคร",
    ],
  },
  {
    title: "เว็บไซต์ peerapongsm.dev",
    p: [
      "เว็บไซต์ใช้ Cloudflare Web Analytics นับจำนวนผู้เข้าชม โดยไม่ใช้คุกกี้ หน้าแรกเรียกตัวนับผู้เข้าชมจาก abacus.jasoncameron.dev ซึ่งเห็นที่อยู่ IP ของคุณตามปกติของการเปิดเว็บ หน้าเข้าสู่ระบบโหลดปุ่มเข้าสู่ระบบจาก Google",
    ],
  },
  {
    title: "แชตกับ PeerapoS ทาง LINE",
    p: [
      "ข้อความที่คุณส่งมาที่ LINE Official Account ของ PeerapoS (@peerapos) บอท AI จะตอบก่อน บอทใช้ Claude ของ Anthropic ข้อความของคุณจึงถูกส่งไปที่ Anthropic เพื่อเขียนคำตอบ Anthropic ไม่เอาข้อความนี้ไปฝึก AI",
      "เพื่อให้บอทจำได้ว่าคุยอะไรกันอยู่ เราเก็บข้อความล่าสุดไว้ 24 ชั่วโมงแล้วลบทิ้งเอง โดยผูกกับรหัสที่แปลงมาจาก LINE user ID ไม่ใช่ชื่อหรือรูปโปรไฟล์ของคุณ และนับจำนวนคำถามต่อวันเพื่อจำกัดโควตา ถ้าคุณพิมพ์ คุยกับแอดมิน หรือบอทตอบเรื่องไหนไม่ได้ บอทจะหยุดตอบคุณ 12 ชั่วโมง และส่งข้อความล่าสุดของคุณทางอีเมลถึงแอดมินเพื่อให้มาตอบเอง",
      "บอทมองไม่เห็นข้อมูลในโปรแกรมบนเครื่องคุณ อย่าส่งรหัสผ่านหรือข้อมูลลูกค้าของคุณมาในแชต แอดมินอ่านแชตได้ผ่านระบบของ LINE และ LINE เก็บแชตตามนโยบายของ LINE เอง",
    ],
  },
  {
    title: "ใครรับข้อมูลบ้าง และส่งไปนอกประเทศไหม",
    li: [
      "Cloudflare: สถิติการใช้งาน เซิร์ฟเวอร์ ฐานข้อมูล ที่เก็บไฟล์ รีเลย์ ตัวเชื่อม LINE เว็บไซต์ และ Turnstile",
      "Google: เข้าสู่ระบบด้วยบัญชี Google และสำรองข้อมูลไป Google Drive เมื่อคุณเปิดใช้",
      "Resend: ส่งอีเมลยืนยันการชำระเงิน ได้รับอีเมลผู้รับและเนื้อหาอีเมล",
      COPY.recipient.th,
      "GitHub: ตรวจหาเวอร์ชันใหม่ของแอปฟรี",
      "Anthropic: บอทแชต LINE ไม่เอาข้อมูลไปฝึก AI",
      "LINE: แชตกับ LINE Official Account ของ PeerapoS และส่งข้อความของลูกค้าร้าน|มาที่ตัวเชื่อม LINE ของร้าน",
      "Google Firebase Cloud Messaging: แจ้งเตือนเข้ามือถือ PeerapoS Pair",
      "ผู้ให้บริการ AI ที่ร้านเลือกเอง: รับข้อมูลที่ร้านตัดสินใจส่ง ตามเงื่อนไขของผู้ให้บริการนั้น",
    ],
    after: [
      "ผู้ให้บริการเหล่านี้อาจประมวลผลข้อมูลนอกประเทศไทย เราใช้เท่าที่จำเป็นต่อบริการข้างต้น และไม่ขายข้อมูลให้ใคร",
    ],
  },
  {
    title: "เก็บนานแค่ไหน",
    li: [
      "เซสชัน 30 วัน",
      "บันทึกเส้นทางของรีเลย์ 7 วัน คำขอจากหน้าลูกค้าที่พักไว้ 14 วัน",
      COPY.stripeRetention.th,
      "สำเนารายงานปัญหา จนกว่าเราจะดึงไปอ่านแล้วลบ",
      "ข้อความแชตกับบอท LINE 24 ชั่วโมง",
      "ตัวเชื่อม LINE ของร้าน: รหัสเชื่อมและการเพิ่มเพื่อน|ไม่เกิน 7 วัน คำขอยกเลิกและการบล็อก|ไม่เกิน 90 วัน หรือจนเครื่องร้านรับไป ข้อความแชตไม่เก็บ",
      "สถิติการใช้งาน 3 เดือน",
      COPY.retention.th,
      "คำสั่งซื้อและอีเมลยืนยันการชำระเงิน เก็บเท่าที่กฎหมายภาษีและบัญชีให้เก็บเอกสารการขาย แม้ลบบัญชีแล้ว",
    ],
  },
  {
    id: "delete",
    title: "สิทธิ์ของคุณและการลบ",
    p: [
      "ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล คุณขอเข้าถึงหรือขอสำเนา ขอแก้ไข ขอลบ ขอให้หยุดใช้ หรือคัดค้านการใช้ข้อมูลของคุณที่เราควบคุมได้ และร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคลได้",
      `ลบบัญชีได้เองที่หน้า /account บนเว็บไซต์ ลบแล้ว บัญชี ข้อมูลเข้าสู่ระบบ เซสชัน เครื่องที่เชื่อม และสิทธิ์ จะหายไปทั้งหมด แอปแบบซื้อขาดที่ซื้อไว้ก็ใช้ต่อไม่ได้ และเรากู้คืนให้ไม่ได้ ส่วนคำสั่งซื้อและอีเมลยืนยันการชำระเงินยังอยู่ เพราะกฎหมายภาษีให้เก็บ ถ้าลบเองไม่ได้ ให้อีเมลมาที่ ${EMAIL} จากอีเมลของบัญชี เราตรวจว่าเป็นคุณ แล้วตอบภายใน 30 วัน`,
      COPY.deletion.th,
      "ในเครื่องของคุณ ถอนการติดตั้งแอปหรือลบโฟลเดอร์ข้อมูลของแอป ข้อมูลก็หายจากเครื่อง ยกเลิกการเชื่อมเครื่องได้ที่หน้าบัญชีของฉัน",
      `ข้อความที่คุยกับบอทใน LINE ลบเองภายใน 24 ชั่วโมง ถ้าอยากให้ลบทันที ส่งอีเมลมาที่ ${EMAIL} บอกช่องทางที่คุยและเวลาคร่าว ๆ ที่ส่งข้อความ`,
    ],
  },
  {
    title: "ติดต่อ",
    p: [`ผู้ให้บริการ: พีระพอส (PeerapoS) มีคำถามเรื่องความเป็นส่วนตัว ทักมาได้ที่ ${EMAIL}`],
  },
];

const EN: Sec[] = [
  {
    title: "Who we are, who the shop is",
    p: [
      "The provider is พีระพอส (PeerapoS), a sole proprietorship.",
      "The shop is the data controller for the customer and staff data it enters in the apps. We do not see that data.",
      "We are the data controller for account data, orders, problem reports sent to us and usage statistics.",
      "If a shop turns on an opt-in online service (PeerapoS Pair relay, the AI connector, the LINE connector, Google Drive backup, customer pages), we act as a data processor for the shop, only as far as needed to run the service.",
    ],
  },
  {
    title: "Free apps and internet connections",
    p: [
      "Everything you enter in an app is stored only on your computer. We run no server that holds your business data. Backups and exports go wherever you choose.",
      "Free to use; some features need PeerapoS Pro. There are no ads and the core app needs no account. A free app can make these internet connections:",
    ],
    li: [
      "Update check. The app asks GitHub Releases whether a new version exists. None of your data is sent.",
      "Problem reports and feedback, only when you choose to send one. See \"Problem reports\".",
      "Usage statistics, once a day when online; you can turn them off. See \"Usage statistics\".",
      "Only when you turn them on: Pro licence checks, PeerapoS Pair relay, the AI connector, the LINE connector and Google Drive backup.",
    ],
  },
  {
    title: "Usage statistics",
    p: [
      "PeerapoS apps send usage statistics once a day when online. This is on by default, with an in-app notice before the first report. Our legal basis is legitimate interest under PDPA section 24(5), for product improvement.",
      "One random id per PC is shared across PeerapoS apps on that PC, with a separate hashed id for each paired device seen that day. It is not a Windows machine id and is never linked to account, licence, email, Google, payment, feedback, relay or AI connector data. We treat these statistics as pseudonymous personal data.",
    ],
    li: [
      "App name and version, Windows version (10, 11 or other), Thai or English interface, and free, Pro or other-PC client mode.",
      "Days the app was opened in the last 7 days (0–7), and today's foreground-use range (0–15, 15–60, 60–240 or over 240 minutes).",
      "Counts of features used and services enabled from a fixed list in the app, such as issuing a document, viewing the Pro signup page or reaching a limit. Counts stop at 999 per item; no text you type is included.",
      "Company-count range (1, 2, 3 or 4+) and item-count range in the open company (0–10, 11–50, 51–200 or 201+), such as rooms, products, customers or vehicles depending on the app. Only ranges, with no item details.",
      "Counts of paired devices, devices connected today and devices using relay today (each 0–20), with the random PC id and hashed ids of up to 20 devices seen today.",
      "Crash and failed-update counts (each 0–99), without error messages, and a report-format version number.",
    ],
    after: [
      "No shop or customer data, names, amounts, free text, addresses, phone numbers, tax ids, file paths or age. No location of any kind, including country, region or time zone. Cloudflare is our processor and sees the IP address to deliver and rate-limit the request; we do not read, store or log it.",
      "Statistics are kept for 3 months, then deleted. We never join them with other data to identify a person and do not show groups of fewer than 5 PCs.",
      "Turn it off in Settings > About and confirm Turn off. This stops counting and sending and deletes local counters and the statistics id on that PC. A report already being sent may still complete. Earlier reports can no longer be tied to this PC and expire within 3 months. Turning it on again creates a new id. \"See what is sent\" on the same screen shows the report.",
      "We never ask anyone to send us their statistics id, because that would tie the id to a person. To object or delete, use this switch.",
    ],
  },
  {
    title: "Accounts, Pro and paid apps",
    p: [
      "Apps using Pro, and the one-time paid apps, need an account and contact peerapongsm.dev to check the licence: when the app starts, when its window regains focus, and once a day while open. The paid apps also update from peerapongsm.dev instead of GitHub.",
      "What we store:",
    ],
    li: [
      "Account: the stable Google account id, email and name that Google sends when you sign in, used for the account and as the licence name, and when the account was created.",
      "Licence: the licence name (shown in the apps), the apps you bought, Pro status and its end date.",
      COPY.orders.en,
      "Linked PCs: the PC name (as the app sends it), the app used to link, a hashed machine ID (not the raw Windows ID), and when it was linked, last used and removed.",
      "Sign-in: a session stored as a hash for 30 days. Your browser keeps a session cookie that sign-in needs. No advertising cookies.",
      COPY.stripeRecords.en,
    ],
    after: [
      COPY.mail.en,
    ],
  },
  {
    title: "Google sign-in",
    p: [
      "Website accounts use Google sign-in only. Google sends us the stable account id, email and name. We do not get your Google password.",
      "The PeerapoS Pair Android app is a free companion. It has no sign-in or purchases and collects no personal data.",
    ],
  },
  {
    title: COPY.paymentTitle.en,
    p: [
      COPY.payment.en,
      COPY.card.en,
    ],
  },
  {
    title: "Opt-in online services",
    p: ["These are off by default. They need Pro and you turn them on yourself in the app. You can turn them on and off at any time."],
  },
  {
    title: "PeerapoS Pair relay and customer pages",
    p: [
      "When on, the shop PC keeps one outbound connection to relay.peerapongsm.dev so the PeerapoS Pair phone app and customer pages (opened from a QR) can reach it away from the shop. The customer's browser loads the page from go.peerapongsm.dev.",
    ],
    li: [
      "Content is end-to-end encrypted between the shop PC and the phone or customer page. We see only routing data: time, type, size and outcome of each message. It is kept 7 days, then deleted. We do not keep IP addresses.",
      "A booking or enquiry from a customer page, while the shop PC is off, is held with us as encrypted data: at most 200 per shop, kept 14 days then deleted, or deleted once the PC has taken it.",
      "A customer page is encrypted by code that we serve to the browser from go.peerapongsm.dev, so the customer has to trust that code, and we supply it.",
      "Forms on customer pages use Cloudflare Turnstile to keep bots out.",
      "Phone alerts go through Google Firebase Cloud Messaging. They carry only the branch name the shop set, the type of event and a count, such as \"3 new orders\". No business data.",
      "Turn it off in Settings › Pair in the app. When off, the shop PC drops the connection.",
    ],
    after: ["The shop is the data controller for what customers enter on its customer pages and sets its own privacy text. To use your rights over that data, contact that shop first."],
  },
  {
    title: "AI connector",
    p: [
      "AI connector (optional, off by default). PeerapoS is only the pass-through between the AI provider the shop chose and the shop's own PC. We do not store questions, answers or shop data on our servers; we keep only the shop handle, sizes, outcome (success or error code) and time, to run the service and spot abuse. Data passing through us to the AI provider is not end-to-end encrypted. The AI provider the shop picks is a recipient of data the shop itself decided to send, under that provider's terms and policy, not PeerapoS's. A shop can disconnect at any time in Settings › AI in the app or under \"Connected AI\" on My account; the next call is then refused at once.",
      "The AI never sees phone numbers, addresses, ID numbers, health data, children's records, passwords or staff pay. Customer names are sent only while the shop's \"send customer names\" switch is on. It can read even while the app is locked, as long as the PC is on and the switch is on, and it can only create drafts that the shop confirms in the app.",
      "What stays with us once connected is the connection record (which AI app, the account id, the access granted) and an access token, not shop data. It stays until you disconnect or the token expires.",
      "A shop that turns the connector on should put this in its own privacy notice, because the shop decides to send data to the AI provider.",
    ],
  },
  {
    title: "A shop's LINE connector",
    p: [
      "The LINE connector (optional, off by default) lets a shop send messages from the app to its customers through the shop's own LINE Official Account. Free apps need Pro; the paid apps include it. The shop uses its own OA and Channel access token. The token and Channel secret stay only on the shop's main PC and are never sent to us.",
      "Messages a customer sends to the shop's LINE OA pass through the PeerapoS server (relay.peerapongsm.dev) before they reach the shop PC. The server reads them only to sort out link codes, stop requests, friend adds or blocks, and chat. Link codes and friend adds are kept encrypted for at most 7 days, stop requests and blocks for at most 90 days, until the shop PC collects them, and are deleted as soon as it does. If the shop turns the chatbot on, chat messages are passed to the shop PC live only and never kept; if the PC is off, they are dropped. With the chatbot off, we do not pass chat on. Messages the shop sends go from the shop PC straight to LINE, not through us.",
    ],
    li: [
      "What is kept is encrypted to the shop PC's own key. Only that PC can open it; we cannot. Each kept item holds only its type (link code, stop request, friend add or block), the code itself, the LINE userId, the time and LINE's reference ids. The text the customer typed is not kept, and nor is anything else sent with it.",
      "A link code is 6 characters that always mix letters and digits. Only a message shaped like that counts as a code; ordinary words such as THANKS, or plain numbers, do not and are not kept. The shop PC then checks it against the codes the shop actually issued.",
      "If a customer sends a code while the shop PC is off, the link counts only once LINE accepts a confirmation message from the shop's OA to that customer. If LINE refuses it, the link is undone and the shop issues a new code.",
      "Routing records hold only the time, size and how each delivery was sorted, with no content. They are kept 7 days, then deleted. We do not keep IP addresses.",
      "Customers link their own LINE with a one-time code from the shop (scan the QR at the shop and press send). They can stop at any time by sending \"ยกเลิก LINE\" or STOP, or by blocking the shop's OA.",
      "The list of which LINE account (LINE userId) is linked to which customer lives on the shop's main PC, not with us. The app never fetches a customer's LINE name or profile picture.",
      "When the shop disconnects, the main PC forgets the Channel secret at once and removes its webhook address with us; the messages waiting for it are deleted with it. If we or LINE cannot be reached at that moment, the PC retries every minute, and again after the app restarts, until removal is done. Meanwhile it keeps only the token, to change the webhook address in LINE, and deletes it as soon as that is done. If LINE no longer accepts the token, turn off Use webhook in LINE Developers yourself. Anything LINE sends after removal is neither read nor kept by us.",
    ],
    after: [
      "The shop is the data controller for its customers who talk to its LINE OA, and we are its data processor. A shop that turns on the LINE connector should say so in its own privacy notice. LINE keeps chats under its own policy.",
    ],
  },
  {
    title: "Google Drive backup",
    p: ["When you turn it on, the app sends encrypted backups directly to your own Google Drive account. We do not store or read their contents. You can turn it off and manage files in your Google account."],
  },
  {
    title: "Problem reports",
    p: [
      "Sent only when you choose to send one. A report contains the text you type, an optional reply email, the app name and version, the Windows version and error details. Your Windows user name and local folder paths are removed before sending. Reports go through feedback.peerapongsm.dev (Cloudflare) and are forwarded to us by email with the country and time received. A copy is held in our database on Cloudflare until we pull it to read and then delete it. Your IP address is used only for rate limiting and is not stored. Reports are used only to fix bugs and are never sold or shared.",
    ],
  },
  {
    title: "The website, peerapongsm.dev",
    p: [
      "The site uses Cloudflare Web Analytics to count visits, without cookies. The home page fetches a visitor counter from abacus.jasoncameron.dev, which sees your IP address as any site you open would. The sign-in page loads the sign-in button from Google.",
    ],
  },
  {
    title: "Chatting with PeerapoS on LINE",
    p: [
      "Messages you send to the PeerapoS LINE Official Account (@peerapos) are answered first by an AI bot built on Claude by Anthropic, so your message is sent to Anthropic to write the reply. Anthropic does not use it to train AI.",
      "So the bot can follow the conversation, we keep your latest messages for 24 hours and then they are deleted automatically. They are keyed to a code derived from your LINE user ID, not your name or profile picture. We also count questions per day to enforce a quota. If you type คุยกับแอดมิน (talk to an admin), or the bot can't answer, the bot stays quiet for you for 12 hours and emails your latest message to the admin so a person can reply.",
      "The bot cannot see the data in the apps on your PC. Please don't send passwords or your customers' details in the chat. The admin can read chats through LINE, and LINE keeps chats under its own policy.",
    ],
  },
  {
    title: "Who receives data, and transfers abroad",
    li: [
      "Cloudflare: usage statistics, servers, databases, file storage, the relay, the LINE connector, the website and Turnstile.",
      "Google: Google sign-in and Google Drive backup when you turn it on.",
      "Resend: sends the payment confirmation emails, so it receives the recipient address and the message.",
      COPY.recipient.en,
      "GitHub: update checks for the free apps.",
      "Anthropic: the LINE chat bot; it does not train AI on the data.",
      "LINE: chats with the PeerapoS LINE Official Account, and delivering a shop's customer messages to that shop's LINE connector.",
      "Google Firebase Cloud Messaging: phone alerts for PeerapoS Pair.",
      "The AI provider the shop chooses: receives what the shop decides to send, under that provider's terms.",
    ],
    after: [
      "These providers may process data outside Thailand. We use them only as far as the services above need, and we sell data to no one.",
    ],
  },
  {
    title: "How long we keep it",
    li: [
      "Sessions 30 days.",
      "Relay routing records 7 days; held customer-page requests 14 days.",
      COPY.stripeRetention.en,
      "Problem report copies, until we pull and delete them.",
      "LINE bot chat messages, 24 hours.",
      "A shop's LINE connector: link codes and friend adds at most 7 days, stop requests and blocks at most 90 days, or until the shop PC takes them. Chat messages are not kept.",
      "Usage statistics, 3 months.",
      COPY.retention.en,
      "Orders and the payment confirmation email are kept as long as tax and accounting law has us keep sales records, even after the account is deleted.",
    ],
  },
  {
    id: "delete-en",
    title: "Your rights and deleting your data",
    p: [
      "Under Thailand's Personal Data Protection Act you may ask to access or get a copy of, correct, delete, restrict or object to our use of your data that we control, and you may complain to the Personal Data Protection Committee.",
      `You can delete your account yourself on /account on the website. Deleting removes the account, sign-ins, sessions, linked PCs and licence. Paid apps you bought stop working, and we cannot restore them. Orders and the payment confirmation email stay, because tax law has us keep them. If you cannot delete it yourself, email ${EMAIL} from the account's email address; we check it is you and answer within 30 days.`,
      COPY.deletion.en,
      "On your own PC, uninstall the app or delete its data folder and the data is gone. You can unlink a PC on My account.",
      `Chat messages with the LINE bot are deleted automatically within 24 hours. To have them deleted sooner, email ${EMAIL} with the chat channel and roughly when you sent the messages.`,
    ],
  },
  {
    title: "Contact",
    p: [`Provider: พีระพอส (PeerapoS). Privacy questions: ${EMAIL}`],
  },
];

export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
      <a href="/" className="font-display font-bold hover:text-indigo">
        PeerapoS
      </a>

      {/* ── ภาษาไทย ── */}
      <article lang="th" className="mt-8">
        <h1 className="font-display text-4xl font-bold tracking-tight">นโยบายความเป็นส่วนตัว</h1>
        <p className="mt-2 text-graphite"><Phrases text={COPY.updated.th} /></p>
        <p className="mt-4 leading-relaxed text-graphite">
          ใช้กับแอปฟรี {APPS_FREE} แอปแบบซื้อขาด {APPS_PAID} และ PeerapoS Pair อ่านคู่กับ{" "}
          <a href="/terms" className="text-indigo underline">ข้อกำหนดการใช้งาน</a>
        </p>
        <Secs list={TH} />
        <ProcessorLinks lang="th" />
      </article>

      <hr className="my-14 border-line" />

      {/* ── English ── */}
      <article lang="en">
        <h2 className="font-display text-4xl font-bold tracking-tight">Privacy Policy</h2>
        <p className="mt-2 text-graphite">{COPY.updated.en}</p>
        <p className="mt-4 leading-relaxed text-graphite">
          Applies to the free apps {APPS_FREE_EN}, the paid apps {APPS_PAID_EN}, and PeerapoS Pair. Read together with the{" "}
          <a href="/terms" className="text-indigo underline">Terms of Use</a>.
        </p>
        <Secs list={EN} />
        <ProcessorLinks lang="en" />
      </article>
    </main>
  );
}
