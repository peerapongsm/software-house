import type { Metadata } from "next";
import type { Msg } from "@/lib/api.ts";

// Privacy for accounts, Stripe and Play payments, and opt-in services. Decisions: 2026-11-14 spec.
// LINE OA chat section verified against peerapos-chat 2026-11-13: Claude API replies, last turns kept 24 h in
// Cloudflare KV keyed by a hash of the LINE user ID, daily/monthly counters, 12 h pause after a handoff.
// The AI paragraph follows peerapos-go/docs/privacy-ai.md and licence worker/src/consent.ts.

const COPY = {
  description: {
    th: "นโยบายความเป็นส่วนตัวสำหรับแอป PeerapoS บัญชี การชำระเงินผ่าน Stripe และ Google Play บริการออนไลน์ และแชต LINE",
    en: "Privacy policy for PeerapoS apps, accounts, Stripe and Google Play payments, online services and the LINE chat.",
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
    th: "บัญชี ข้อมูลการซื้อบน Play ข้อมูลการสมัครผ่าน Stripe Pro 1 ปี และเครื่องที่เชื่อม ไม่มีกำหนดลบอัตโนมัติ เราเก็บไว้ตลอดที่บัญชียังอยู่ และลบจากระบบของเราเมื่อคุณลบบัญชี ส่วนคำสั่งซื้อยังเก็บเป็นหลักฐานทางภาษี",
    en: "Accounts, Play purchase records, Stripe subscription records, prepaid passes and linked PCs have no automatic deletion. We keep them while the account exists and delete them from our system when you delete the account. Orders remain as tax records.",
  },
  deletion: {
    th: "เมื่อลบบัญชี การสมัครผ่านบัตรจะถูกยกเลิกทันทีโดยไม่คืนเงิน และ Pro 1 ปีที่เหลือจะหายไป การลบบัญชีไม่ยกเลิกการสมัครใน Google Play ให้ยกเลิกใน Google Play ก่อน มิฉะนั้นจะถูกคิดเงินต่อ และการสมัครของบัญชีที่ลบไปแล้วผูกกับบัญชีใหม่ไม่ได้",
    en: "On account deletion, card subscriptions are cancelled immediately without a refund, and remaining prepaid passes are lost. Deleting the account does NOT cancel a Google Play subscription. Cancel it in Google Play first or you will keep being charged; a subscription from a deleted account cannot be attached to a new account.",
  },
  updated: {
    th: "แอป บัญชี และบริการของ PeerapoS อัปเดตล่าสุด 14 พฤศจิกายน 2569",
    en: "PeerapoS apps, accounts and services. Last updated 14 November 2026",
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
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <div className="mt-2 space-y-2 leading-relaxed text-graphite">{children}</div>
    </section>
  );
}

function Secs({ list }: { list: Sec[] }) {
  return (
    <>
      {list.map((s) => (
        <Section key={s.title} id={s.id} title={s.title}>
          {s.p?.map((x) => <p key={x}>{x}</p>)}
          {s.li && (
            <ul className="list-disc space-y-2 pl-5">
              {s.li.map((x) => <li key={x}>{x}</li>)}
            </ul>
          )}
          {s.after?.map((x) => <p key={x}>{x}</p>)}
        </Section>
      ))}
    </>
  );
}

const TH: Sec[] = [
  {
    title: "เราเป็นใคร ร้านเป็นใคร",
    p: [
      "ผู้ให้บริการคือ พีระพอส (PeerapoS) ผู้ประกอบการบุคคลธรรมดา",
      "ข้อมูลลูกค้าและพนักงานที่ร้านกรอกในแอป ร้านเป็นผู้ควบคุมข้อมูลเอง เราไม่เห็นข้อมูลนั้น",
      "ข้อมูลบัญชี คำสั่งซื้อ และรายงานปัญหาที่ส่งมา เราเป็นผู้ควบคุมข้อมูลเอง",
      "ถ้าร้านเปิดบริการออนไลน์ที่ให้เปิดใช้เอง (รีเลย์ PeerapoS Pair ตัวเชื่อม AI หน้าลูกค้า) เราเป็นผู้ประมวลผลข้อมูลให้ร้าน เท่าที่จำเป็นต่อการเดินบริการ",
    ],
  },
  {
    title: "แอปฟรีที่ไม่มี Pro: ออฟไลน์",
    p: [
      "ข้อมูลที่กรอกในแอปอยู่ในคอมพิวเตอร์ของคุณเท่านั้น เราไม่มีเซิร์ฟเวอร์เก็บข้อมูลธุรกิจของคุณ ไฟล์สำรองหรือไฟล์ที่ส่งออกไปอยู่ที่ที่คุณเลือกเอง",
      "แอปฟรีที่ยังไม่ใช้ Pro ไม่มีบัญชี ไม่ติดต่อเซิร์ฟเวอร์ตรวจสิทธิ์ของเรา ไม่มีโฆษณา ไม่มีระบบติดตามการใช้งาน (analytics) และต่ออินเทอร์เน็ตแค่สองกรณี",
    ],
    li: [
      "ตรวจหาเวอร์ชันใหม่ แอปถาม GitHub Releases ว่ามีเวอร์ชันใหม่ไหม ไม่ส่งข้อมูลของคุณไปด้วย",
      "รายงานปัญหาหรือส่งความเห็น ส่งเฉพาะตอนที่คุณกดส่งเอง ดูหัวข้อ \"รายงานปัญหา\"",
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
      "การซื้อ Pro บน Google Play: เก็บแค่แฮชของโทเคนการซื้อ สินค้า สถานะ และวันหมดอายุ ไม่เก็บข้อมูลบัตร Google เก็บเอง",
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
    title: "เข้าสู่ระบบด้วย Google และ Google Play",
    p: [
      "เข้าสู่ระบบด้วยบัญชี Google เท่านั้น ทั้งบนเว็บและบน Android ตอนเข้าสู่ระบบ Google ส่งรหัสบัญชีที่คงที่ อีเมล และชื่อให้เรา เราไม่ได้รหัสผ่าน Google ของคุณ",
      "ถ้าคุณสมัคร Pro บน Google Play Google เป็นผู้คิดเงินและเก็บข้อมูลบัตร เราเห็นแค่ข้อมูลการซื้อที่ระบุข้างบน เพื่อตรวจการซื้อ เราส่งข้อมูลที่จำเป็นให้ Google Play (โทเคนการซื้อและสินค้า) และ Google แจ้งเราเมื่อการสมัครเปลี่ยน เช่น ต่ออายุ ยกเลิก หมดอายุ หรือคืนเงิน",
      "การลบบัญชีไม่ยกเลิกการสมัครบน Google Play ให้ยกเลิกใน Google Play เอง",
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
    title: "รายงานปัญหา",
    p: [
      "ส่งเฉพาะตอนที่คุณกดส่งเอง รายงานมีข้อความที่คุณพิมพ์ อีเมลสำหรับให้เราตอบกลับ (ถ้าคุณใส่) ชื่อและเวอร์ชันแอป เวอร์ชัน Windows และรายละเอียดข้อผิดพลาด ก่อนส่ง แอปจะลบชื่อผู้ใช้ Windows และที่อยู่โฟลเดอร์ในเครื่องออกให้ รายงานส่งผ่าน feedback.peerapongsm.dev (Cloudflare) แล้วส่งต่อเป็นอีเมลถึงเรา พร้อมประเทศและเวลาที่ได้รับ สำเนารายงานเก็บในฐานข้อมูลของเราบน Cloudflare จนกว่าเราจะดึงไปอ่านแล้วลบออก ที่อยู่ IP ใช้แค่จำกัดจำนวนครั้งที่ส่งได้ ไม่ได้เก็บไว้ วันละครั้ง ระบบส่งรายงานที่ได้รับไปให้ Claude ของ Anthropic ช่วยสรุปให้เราอ่าน Anthropic ไม่เอาไปฝึก AI เราใช้รายงานเพื่อแก้บั๊กเท่านั้น ไม่ขายหรือแบ่งปันให้ใคร",
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
      "Cloudflare: เซิร์ฟเวอร์ ฐานข้อมูล ที่เก็บไฟล์ รีเลย์ เว็บไซต์ และ Turnstile",
      "Google: เข้าสู่ระบบด้วยบัญชี Google และตรวจการซื้อ Pro บน Google Play",
      "Resend: ส่งอีเมลยืนยันการชำระเงิน ได้รับอีเมลผู้รับและเนื้อหาอีเมล",
      COPY.recipient.th,
      "GitHub: ตรวจหาเวอร์ชันใหม่ของแอปฟรี",
      "Anthropic: บอทแชต LINE และสรุปรายงานปัญหาวันละครั้ง ไม่เอาข้อมูลไปฝึก AI",
      "LINE: แชตกับ LINE Official Account ของ PeerapoS",
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
      COPY.retention.th,
      "คำสั่งซื้อและอีเมลยืนยันการชำระเงิน เก็บเท่าที่กฎหมายภาษีและบัญชีให้เก็บเอกสารการขาย แม้ลบบัญชีแล้ว",
    ],
  },
  {
    id: "delete",
    title: "สิทธิ์ของคุณและการลบ",
    p: [
      "ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล คุณขอเข้าถึงหรือขอสำเนา ขอแก้ไข ขอลบ ขอให้หยุดใช้ หรือคัดค้านการใช้ข้อมูลของคุณที่เราควบคุมได้ และร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคลได้",
      `ลบบัญชีได้เองที่หน้า /account หรือในแอป ลบแล้ว บัญชี ข้อมูลเข้าสู่ระบบ เซสชัน เครื่องที่เชื่อม สิทธิ์ และข้อมูลการซื้อบน Play จะหายไปทั้งหมด แอปแบบซื้อขาดที่ซื้อไว้ก็ใช้ต่อไม่ได้ และเรากู้คืนให้ไม่ได้ ส่วนคำสั่งซื้อและอีเมลยืนยันการชำระเงินยังอยู่ เพราะกฎหมายภาษีให้เก็บ ถ้าลบเองไม่ได้ ให้อีเมลมาที่ ${EMAIL} จากอีเมลของบัญชี เราตรวจว่าเป็นคุณ แล้วตอบภายใน 30 วัน`,
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
      "We are the data controller for account data, orders and the problem reports sent to us.",
      "If a shop turns on an opt-in online service (relay, PeerapoS Pair, the AI connector, customer pages), we act as a data processor for the shop, only as far as needed to run the service.",
    ],
  },
  {
    title: "Free apps without Pro: offline",
    p: [
      "Everything you enter in an app is stored only on your computer. We run no server that holds your business data. Backups and exports go wherever you choose.",
      "A free app without Pro has no account, never contacts our licence server, has no ads and no usage tracking or analytics, and goes online in only two cases.",
    ],
    li: [
      "Update check. The app asks GitHub Releases whether a new version exists. None of your data is sent.",
      "Problem reports and feedback, only when you choose to send one. See \"Problem reports\".",
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
      "Pro purchases on Google Play: only a hash of the purchase token, the product, the state and the expiry. No card details: Google holds those.",
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
    title: "Google sign-in and Google Play",
    p: [
      "Sign-in is with a Google account only, on the website and on Android. Google sends us the stable account id, email and name. We do not get your Google password.",
      "If you subscribe to Pro on Google Play, Google takes the payment and holds the card details. We see only the purchase data listed above. To check a purchase we send Google Play what it needs (the purchase token and the product), and Google sends us notifications when a subscription changes, such as renewal, cancellation, expiry or refund.",
      "Deleting your account does not cancel a Google Play subscription. Cancel it in Google Play yourself.",
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
    title: "Problem reports",
    p: [
      "Sent only when you choose to send one. A report contains the text you type, an optional reply email, the app name and version, the Windows version and error details. Your Windows user name and local folder paths are removed before sending. Reports go through feedback.peerapongsm.dev (Cloudflare) and are forwarded to us by email with the country and time received. A copy is held in our database on Cloudflare until we pull it to read and then delete it. Your IP address is used only for rate limiting and is not stored. Once a day, received reports are sent to Claude by Anthropic to write a summary for us; Anthropic does not use them to train AI. Reports are used only to fix bugs and are never sold or shared.",
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
      "Cloudflare: servers, databases, file storage, the relay, the website and Turnstile.",
      "Google: Google sign-in, and checking Pro purchases on Google Play.",
      "Resend: sends the payment confirmation emails, so it receives the recipient address and the message.",
      COPY.recipient.en,
      "GitHub: update checks for the free apps.",
      "Anthropic: the LINE chat bot and the daily problem-report summary; it does not train AI on the data.",
      "LINE: chats with the PeerapoS LINE Official Account.",
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
      COPY.retention.en,
      "Orders and the payment confirmation email are kept as long as tax and accounting law has us keep sales records, even after the account is deleted.",
    ],
  },
  {
    id: "delete-en",
    title: "Your rights and deleting your data",
    p: [
      "Under Thailand's Personal Data Protection Act you may ask to access or get a copy of, correct, delete, restrict or object to our use of your data that we control, and you may complain to the Personal Data Protection Committee.",
      `You can delete your account yourself on /account or in the app. Deleting removes the account, sign-ins, sessions, linked PCs, licence and Play records. Paid apps you bought stop working, and we cannot restore them. Orders and the payment confirmation email stay, because tax law has us keep them. If you cannot delete it yourself, email ${EMAIL} from the account's email address; we check it is you and answer within 30 days.`,
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
        <p className="mt-2 text-graphite">{COPY.updated.th}</p>
        <p className="mt-4 leading-relaxed text-graphite">
          ใช้กับแอปฟรี {APPS_FREE} แอปแบบซื้อขาด {APPS_PAID} และ PeerapoS Pair อ่านคู่กับ{" "}
          <a href="/terms" className="text-indigo underline">ข้อกำหนดการใช้งาน</a>
        </p>
        <Secs list={TH} />
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
      </article>
    </main>
  );
}
