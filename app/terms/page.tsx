import { Phrases } from "@/components/Phrases";
import type { Metadata } from "next";
import type { Msg } from "@/lib/api.ts";

// Terms for paid apps and website-only Pro through Stripe. Decisions: 2026-11-14 spec.

const COPY = {
  description: {
    th: "ข้อกำหนดการใช้งานแอป PeerapoS การซื้อแอปและ Pro บนเว็บไซต์ผ่าน Stripe",
    en: "Terms of use for PeerapoS apps, paid-app orders and website Pro through Stripe.",
  },
  paid: {
    th: "แอปแบบซื้อขาด (PeerapoS Account, Wholesale, Property, Service, Contractor, Academy, Wellness) ซื้อครั้งเดียวที่หน้า /buy จ่ายด้วยบัตรหรือ PromptPay ผ่าน Stripe อัปเดตให้ฟรีตลอด ไม่หมดอายุ เว้นแต่คืนเงินเต็มจำนวนหรือแพ้ข้อพิพาทการชำระเงิน ราคาดูที่หน้า /buy",
    en: "The paid apps (PeerapoS Account, Wholesale, Property, Service, Contractor, Academy, Wellness) are bought once on /buy by card or PromptPay through Stripe, with free updates forever. They never expire unless fully refunded or a payment dispute is lost. Prices are on /buy.",
  },
  pro: {
    th: "PeerapoS Pro จำหน่ายบนเว็บไซต์นี้เท่านั้น ราคาและวิธีชำระเงินแสดงตอนชำระเงิน",
    en: "PeerapoS Pro is sold only on this website. Prices and payment methods are shown at checkout.",
  },
  deletion: {
    th: "เมื่อลบบัญชี การสมัครผ่านบัตรจะถูกยกเลิกทันทีโดยไม่คืนเงิน และ Pro แบบจ่ายครั้งเดียวที่เหลือจะหายไป",
    en: "On account deletion, card subscriptions are cancelled immediately without a refund, and remaining prepaid passes are lost.",
  },
  payment: {
    th: "ซื้อแอปและ Pro บนเว็บไซต์ผ่านหน้าชำระเงินของ Stripe แอปซื้อขาดและ Pro แบบจ่ายครั้งเดียวจ่ายด้วยบัตรหรือ PromptPay ส่วน Pro แบบรายเดือนและรายปีที่ต่ออายุอัตโนมัติจ่ายด้วยบัตรเท่านั้น กรอกข้อมูลการชำระเงินบนหน้าของ Stripe เราไม่เห็นหมายเลขบัตร",
    en: "Website purchases of paid apps and Pro use Stripe's payment page. Paid apps and prepaid passes accept card or PromptPay; auto-renewing monthly and yearly Pro subscriptions accept cards only. Enter payment details on Stripe's page; we never see card numbers.",
  },
  receipt: {
    th: "เมื่อชำระค่าแอปซื้อขาดหรือ Pro แบบจ่ายครั้งเดียวแล้ว เราส่งอีเมลยืนยันการชำระเงินไปที่อีเมลรับใบยืนยัน ส่วนใบแจ้งค่าบริการและอีเมลต่ออายุการสมัครผ่านบัตรส่งโดย Stripe อีเมลยืนยันของเราเป็นหลักฐานการชำระเงิน ไม่ใช่ใบกำกับภาษี",
    en: "After payment for a paid app or prepaid pass we email a payment confirmation to the receipt email. Stripe sends card-subscription invoices and renewal emails. Our confirmation is proof of payment, not a tax invoice.",
  },
  cancel: {
    th: "Pro ที่สมัครผ่านบัตรต่ออายุอัตโนมัติ ยกเลิกได้ทุกเมื่อที่หน้า /account ใช้ได้ถึงสิ้นรอบที่จ่ายไว้ ไม่คืนเงินตามสัดส่วน",
    en: "Card Pro subscriptions renew automatically. Cancel any time from /account; Pro runs to the end of the paid period, with no partial refunds.",
  },
  pass: {
    th: "Pro แบบจ่ายครั้งเดียวมี 2 แบบ คือ Pro 1 เดือนใช้ได้ 30 วัน และ Pro 1 ปีใช้ได้ 365 วัน ทั้งสองแบบไม่ต่ออายุอัตโนมัติ ถ้ามีเฉพาะ Pro แบบจ่ายครั้งเดียวที่ยังใช้ได้ ซื้อเพิ่มล่วงหน้าได้ โดยระยะเวลาที่ซื้อเพิ่มเริ่มเมื่อระยะเวลาเดิมหมด รวมระยะเวลาที่เหลือไม่เกิน 2 ปี ต้องรอให้การสมัครผ่านบัตรสิ้นสุดก่อนซื้อ Pro แบบจ่ายครั้งเดียว และถ้ามี Pro แบบจ่ายครั้งเดียวที่ยังใช้ได้ ต้องรอให้หมดก่อนสมัครผ่านบัตร",
    en: "A prepaid pass covers 30 days (1-month pass) or 365 days (1-year pass) and does not auto-renew. If only passes are active, you can buy ahead: the next pass starts when the current coverage ends, up to 2 years of coverage ahead. Wait until an active card subscription ends before buying a pass; wait until an active pass ends before starting a card subscription.",
  },
  ends: {
    th: "Pro สิ้นสุดเมื่อรอบที่จ่ายไว้หมดหลังยกเลิก เมื่อ Pro แบบจ่ายครั้งเดียวหมด เมื่อผู้ให้บริการเก็บเงินไม่สำเร็จจนหมดเวลาแก้ไข หรือเมื่อคืนเงินเต็มจำนวน เพิกถอนการซื้อ หรือแพ้ข้อพิพาทการชำระเงิน",
    en: "Pro ends when the paid period runs out after cancellation, a prepaid pass expires, the payment provider cannot collect payment within its allowed recovery time, or a purchase is fully refunded, revoked or a payment dispute is lost.",
  },
  grace: {
    th: "หลังวันสิ้นสุด มีช่วงผ่อนผัน 14 วันสำหรับฟีเจอร์ Pro บนคอมพิวเตอร์ ส่วนการคืนเงินหรือแพ้ข้อพิพาทผ่าน Stripe ทำให้ Pro สิ้นสุดทันที แต่ช่วงผ่อนผันบนคอมพิวเตอร์ยังใช้ตามเดิม",
    en: "After the end date, PC Pro features have a 14-day grace period. A Stripe refund or lost dispute ends Pro immediately, while the PC grace period still applies.",
  },
  owned: {
    th: "แอปซื้อขาดไม่ผูกกับ Pro และไม่หมดอายุหรือถูกล็อกเมื่อออฟไลน์ เว้นแต่เครื่องถูกยกเลิกการเชื่อม บัญชีถูกลบ หรือสิทธิ์ถูกถอนจากการคืนเงินเต็มจำนวนหรือแพ้ข้อพิพาทการชำระเงิน เครื่องออฟไลน์ยังใช้แอปได้จนกว่าจะตรวจสิทธิ์อีกครั้ง",
    en: "Paid apps do not depend on Pro and never expire or lock offline, except when a PC is unlinked, the account is deleted, or rights are revoked after a full refund or lost payment dispute. An offline PC can keep using the app until its next licence check.",
  },
  refunds: {
    th: "Pro ที่ซื้อบนเว็บไซต์ไม่คืนเงินตามสัดส่วนเมื่อยกเลิก เว้นแต่กฎหมายบังคับ",
    en: "Website Pro has no partial refunds on cancellation, except where the law requires otherwise.",
  },
  revoke: {
    th: "เมื่อคืนเงินเต็มจำนวนหรือแพ้ข้อพิพาทการชำระเงินผ่านบัตร เราถอนแอปที่อยู่ในคำสั่งซื้อนั้น หรือ Pro สิ้นสุดทันที แอปบนคอมพิวเตอร์เสียสิทธิ์เมื่อตรวจสิทธิ์ครั้งถัดไป ส่วน Pro บนคอมพิวเตอร์ยังมีช่วงผ่อนผันตามข้อ 6 การคืนเงินบางส่วนหรือข้อพิพาทที่ยังไม่ตัดสินไม่ถอนสิทธิ์อัตโนมัติ",
    en: "A full refund or lost card dispute removes the apps in that order, or Pro ends immediately. PCs lose refunded apps at their next licence check; PC Pro grace still applies as in section 6. Partial refunds and unresolved disputes do not automatically revoke rights.",
  },
  updated: {
    th: "แอปและบริการของ PeerapoS อัปเดตล่าสุด 18 พฤศจิกายน 2569",
    en: "PeerapoS apps and services. Last updated 18 November 2026",
  },
} satisfies Record<string, Msg>;

export const metadata: Metadata = {
  title: "ข้อกำหนดการใช้งาน · Terms of Use — PeerapoS",
  description: COPY.description.en,
  // override the layout's "/" canonical and og:url
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms" },
};

const EMAIL = "contact@peerapongsm.dev";

type Sec = { title: string; p?: string[]; li?: string[]; after?: string[] };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="font-display text-xl font-bold"><Phrases text={title} /></h3>
      <div className="mt-2 space-y-2 leading-relaxed text-graphite">{children}</div>
    </section>
  );
}

function Secs({ list }: { list: Sec[] }) {
  return (
    <>
      {list.map((s) => (
        <Section key={s.title} title={s.title}>
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

const TH: Sec[] = [
  {
    title: "1. ใครให้บริการ",
    p: [
      "ผู้ให้บริการคือ พีระพอส (PeerapoS) ผู้ประกอบการบุคคลธรรมดา จดทะเบียนพาณิชย์ในประเทศไทย ข้อกำหนดนี้ใช้กับแอปของ PeerapoS บัญชีบนเว็บไซต์ peerapongsm.dev PeerapoS Pro แอปมือถือ (PeerapoS Pair และ PeerapoS Plan) แอปแบบซื้อขาด และบริการออนไลน์ที่ให้เปิดใช้เอง (รีเลย์ PeerapoS Pair ตัวเชื่อม AI ตัวเชื่อม LINE การสำรองข้อมูลไป Google Drive หน้าลูกค้า การลงนามเอกสารออนไลน์)",
      "ติ๊กยอมรับตอนสั่งซื้อ เข้าสู่ระบบ หรือใช้แอปต่อไปหลังเราประกาศข้อกำหนดนี้ ถือว่าคุณตกลงตามนี้",
    ],
  },
  {
    title: "2. แอปฟรี แอปซื้อขาด และ Pro",
    li: [
      "ใช้ฟรี ฟีเจอร์บางอย่างต้องใช้ PeerapoS Pro ดูขีดจำกัดและรายละเอียดในแอป",
      COPY.paid.th,
      COPY.pro.th,
      "Pro เปิดฟีเจอร์ Pro ในแอปฟรีทั้งหมด แอปแบบซื้อขาดที่คุณเป็นเจ้าของ รีเลย์ ตัวเชื่อม AI PeerapoS Pair และการสำรองข้อมูลไป Google Drive ในแอปฟรี (แอปแบบซื้อขาดมีให้อยู่แล้ว ไม่ต้องมี Pro) ส่วนแอปแบบซื้อขาดที่คุณยังไม่ได้ซื้อ Pro ไม่เปิดให้ สมัครครั้งเดียวใช้ได้กับทุกแอปในบัญชีเดียวกัน",
      "PeerapoS Plan บนมือถือลงฟรีจากร้านแอป แต่ต้องมี Pro ที่ยังใช้งานได้ถึงจะใช้ได้",
    ],
    after: [
      "ฟีเจอร์อาจเปลี่ยนแปลงหรือย้ายไปอยู่ใน PeerapoS Pro ได้ และมีผลกับผู้ใช้เดิมด้วย เราจะแจ้งล่วงหน้าบนเว็บไซต์และในแอปที่หัวข้อ มีอะไรใหม่ (What's new) ถ้าขอบเขตฟีเจอร์ของ Pro เปลี่ยน เราก็จะแจ้งล่วงหน้าผ่านช่องทางเดียวกัน",
      "คุณเลือกไม่อัปเดตและใช้เวอร์ชันเดิมต่อได้ ปิดการอัปเดตอัตโนมัติแล้วเปิดกลับเมื่อพร้อมได้ และติดตั้งเวอร์ชันก่อนหน้าได้จาก https://dl.peerapongsm.dev",
      "งานที่สร้างไว้แล้วยังเปิดดู ทำต่อให้เสร็จ ยกเลิก พิมพ์ และส่งออกได้ ข้อมูลที่บันทึกไว้ก็ยังเห็นอยู่ แต่ถ้าจะเริ่มงานใหม่หรือออกรายงานด้วยฟีเจอร์ที่ย้ายไป Pro ต้องมี Pro",
      "สิทธิ์ใช้โอนให้คนอื่นไม่ได้ และใช้ได้เฉพาะกิจการตามชื่อที่ลงไว้ในบัญชี",
    ],
  },
  {
    title: "3. หนึ่งบัญชี หนึ่งชื่อ หนึ่งสิทธิ์",
    p: ["บัญชีหนึ่งมีหนึ่งชื่อ (ชื่อร้าน บริษัท หรือชื่อคุณ) และหนึ่งชุดสิทธิ์ ชื่อนี้แสดงในแอป ไม่มีรหัสหรือคีย์ให้พิมพ์ เครื่องได้สิทธิ์ด้วยการเชื่อมเครื่องกับบัญชี"],
    li: [
      "เชื่อมเครื่อง: เปิดแอป กด \"เปิดใช้\" แล้วยืนยันบนเว็บหรือสแกนด้วยมือถือ",
      "จำนวนเครื่องที่เชื่อมได้: มีแต่แอปซื้อขาด 2 เครื่อง มีแต่ Pro ไม่มีแอปซื้อขาด 6 เครื่อง มี Pro และมีแอปซื้อขาดอย่างน้อยหนึ่งแอป 10 เครื่อง",
      "ยกเลิกการเชื่อมได้เองที่หน้าบัญชีของฉัน เครื่องที่ยกเลิกจะเสียสิทธิ์ทันทีที่ออนไลน์ครั้งถัดไป",
      "ถ้า Pro หมดและจำนวนเครื่องเกินที่เหลือ เราไม่ตัดเครื่องไหนทิ้ง แต่สิทธิ์จะเรียงตามลำดับที่เชื่อมไว้ และเชื่อมเครื่องใหม่ไม่ได้จนกว่าจะไม่เกิน",
    ],
  },
  {
    title: "4. เข้าสู่ระบบและลบบัญชี",
    li: [
      "เข้าสู่ระบบด้วยบัญชี Google เท่านั้น ทั้งบนเว็บและบน Android ไม่มีรหัสเข้าสู่ระบบทางอีเมล",
      "ถ้าเราเพิ่มการเข้าสู่ระบบด้วย Apple ภายหลัง บัญชี Apple หนึ่งบัญชีผูกกับบัญชี Google หนึ่งบัญชีได้ครั้งเดียว",
      "ลบบัญชีได้เองที่หน้า /account บนเว็บไซต์ ลบแล้ว บัญชี ข้อมูลเข้าสู่ระบบ เซสชัน เครื่องที่เชื่อม และสิทธิ์ จะหายไปทั้งหมด แอปแบบซื้อขาดที่ซื้อไว้ก็ใช้ต่อไม่ได้ และเรากู้คืนให้ไม่ได้ ส่วนคำสั่งซื้อและอีเมลยืนยันการชำระเงินยังอยู่ เพราะเป็นหลักฐานทางภาษี",
    ],
    after: [
      COPY.deletion.th,
    ],
  },
  {
    title: "5. จ่ายเงิน",
    p: [
      COPY.payment.th,
      COPY.receipt.th,
      COPY.cancel.th,
      COPY.pass.th,
    ],
  },
  {
    title: "6. เมื่อ Pro สิ้นสุด",
    li: [
      COPY.ends.th,
      COPY.grace.th,
      "เกิน 14 วัน ฟีเจอร์ Pro จะหยุด ซึ่งรวมบริการออนไลน์ที่ต้องมี Pro ด้วย",
      "เครื่องที่ไม่ได้ออนไลน์เช็กสิทธิ์เกิน 30 วัน ก็เข้าช่วงผ่อนผัน 14 วันแบบเดียวกัน แล้วกลับมาปกติเมื่อเช็กสำเร็จ",
      "แอปบนคอมพิวเตอร์ยังใช้งานต่อได้ ข้อมูลไม่ถูกล็อก ดูและส่งออกข้อมูลได้เสมอ",
      "ถ้าร้านมีข้อมูลเกินขีดจำกัดของรุ่นฟรี ข้อมูลทั้งหมดยังอยู่และใช้ได้ แค่เพิ่มเกินขีดจำกัดไม่ได้",
      COPY.owned.th,
    ],
  },
  {
    title: "7. การคืนเงิน",
    p: [
      `แอปซื้อขาดขอคืนเงินเต็มจำนวนได้ภายใน 14 วันนับจากวันที่ซื้อ โดยอีเมลมาที่ ${EMAIL} หลังจากนั้นถือว่าการขายเป็นที่สิ้นสุด ไม่คืนเงิน`,
      COPY.refunds.th,
      COPY.revoke.th,
      "ข้อนี้ไม่จำกัดสิทธิ์ของคุณตามกฎหมายคุ้มครองผู้บริโภคของไทย",
    ],
  },
  {
    title: "8. PeerapoS ไม่ใช่นักบัญชี ที่ปรึกษาภาษี หรือทนายความ",
    p: [
      "แอปช่วยจดบันทึก คำนวณ และออกเอกสาร ไม่ได้ให้คำปรึกษาด้านบัญชี ภาษี แรงงาน หรือกฎหมาย และเราไม่รับรองว่าตัวเลขหรือเอกสารจากแอปจะผ่านการตรวจของหน่วยงานใด",
      "คุณต้องตรวจข้อมูลของตัวเอง และรับผิดชอบการยื่นแบบและการส่งเอกสารให้หน่วยงานรัฐ ถ้าไม่แน่ใจ ถามผู้เชี่ยวชาญ",
    ],
  },
  {
    title: "9. ให้ใช้ตามสภาพ และขอบเขตความรับผิด",
    p: [
      "เราให้ซอฟต์แวร์และบริการตามสภาพที่เป็นอยู่ ไม่รับประกันว่าจะไม่มีข้อผิดพลาดหรือใช้ได้ไม่สะดุด คุณควรสำรองข้อมูลเป็นประจำ",
      "เท่าที่กฎหมายอนุญาต ความรับผิดทั้งหมดของเราต่อคุณมีเพดานดังนี้ แอปซื้อขาด: ไม่เกินราคาที่คุณจ่ายสำหรับแอปนั้น Pro: ไม่เกินค่าบริการ Pro ที่คุณจ่ายใน 12 เดือนที่ผ่านมา แอปฟรีที่ไม่ได้จ่ายเงิน: เท่าที่กฎหมายบังคับเท่านั้น",
      "เพดานนี้ไม่ใช้กับความเสียหายที่เกิดจากเจตนาหรือความประมาทเลินเล่ออย่างร้ายแรงของเรา และไม่ตัดสิทธิ์ที่กฎหมายไม่ให้ตัด",
    ],
  },
  {
    title: "10. ข้อมูลของคุณ",
    p: [
      "ข้อมูลธุรกิจที่คุณกรอกในแอปอยู่ในเครื่องคุณ ร้านเป็นผู้ควบคุมข้อมูลของลูกค้าและพนักงานของร้านเอง และรับผิดชอบเรื่องความยินยอมและการแจ้งเจ้าของข้อมูล เราไม่เห็นข้อมูลนั้น",
      "ถ้าคุณเปิดบริการออนไลน์ (รีเลย์ PeerapoS Pair ตัวเชื่อม AI ตัวเชื่อม LINE การสำรองข้อมูลไป Google Drive หน้าลูกค้า การลงนามเอกสารออนไลน์) เราทำหน้าที่ผู้ประมวลผลข้อมูลให้ร้านเท่าที่จำเป็นต่อการเดินบริการ เรา: ประมวลผลตามที่ร้านสั่งด้วยการเปิดใช้บริการ ไม่เอาข้อมูลไปใช้เพื่อประโยชน์ของเราเอง ใช้ผู้ประมวลผลช่วงตามรายชื่อในนโยบายความเป็นส่วนตัว และลบตามระยะเวลาที่นโยบายนั้นบอก",
      "รีเลย์ PeerapoS Pair ส่งผ่านข้อมูลที่เข้ารหัส เราอ่านเนื้อหาไม่ได้ ไฟล์สำรอง Google Drive เข้ารหัสและส่งตรงไปบัญชีของคุณ เราไม่เก็บหรืออ่านเนื้อหา เอกสารที่ส่งให้ลงนามออนไลน์เข้ารหัสบนเครื่องของร้าน เราอ่านไม่ได้ ส่วนตัวเชื่อม AI ส่งข้อมูลที่คุณเลือกไปยังผู้ให้บริการ AI ตามนโยบายความเป็นส่วนตัว ข้อมูลส่วนนั้นไม่ได้เข้ารหัสปลายทาง",
      "ข้อมูลบัญชี คำสั่งซื้อ รายงานปัญหาที่ส่งมา และสถิติการใช้งาน เราเป็นผู้ควบคุมข้อมูลเอง รายละเอียดอยู่ในนโยบายความเป็นส่วนตัว",
    ],
  },
  {
    title: "11. ใช้งานอย่างเหมาะสม",
    li: [
      "ห้ามถอดรหัส ย้อนวิศวกรรม แก้ไข หรือหาทางเลี่ยงระบบตรวจสิทธิ์ของแอป",
      "ห้ามคัดลอกไฟล์สิทธิ์ แบ่งบัญชีให้กิจการอื่น หรือขายต่อแอปซื้อขาด",
      "ห้ามใช้บริการออนไลน์ส่งสแปม โจมตี ทำให้ระบบล่ม หรือผิดกฎหมาย",
      "ห้ามส่งข้อมูลที่คุณไม่มีสิทธิ์ใช้ผ่านบริการออนไลน์",
    ],
    after: ["ถ้าฝ่าฝืน เราอาจระงับการเชื่อมเครื่องหรือบริการออนไลน์ของบัญชีนั้น ไม่คืนเงิน ยกเว้นกฎหมายบังคับ"],
  },
  {
    title: "12. เงินของลูกค้าคุณ และข้อความถึงลูกค้าคุณ",
    p: [
      "เงินที่ลูกค้าของร้านจ่ายให้ร้านไม่ผ่านเรา แอปแค่ทำ QR และบันทึกยอด ร้านรับเงินเข้าบัญชีของร้านเอง",
      "เราไม่ส่งข้อความถึงลูกค้าของร้าน ไม่ว่าทางใด รวมถึงทาง LINE ข้อความที่ลูกค้าเห็นมาจากร้านเท่านั้น",
      "ตัวเชื่อม LINE (ในแอปฟรีต้องมี Pro แอปแบบซื้อขาดมีให้อยู่แล้ว) ใช้ LINE Official Account และ Channel access token ของร้านเอง โทเคนกับ Channel secret อยู่ในเครื่องหลักของร้าน ไม่ส่งมาที่เรา ข้อความถึงลูกค้า|ส่งจากเครื่องหลักของร้าน|ตรงถึง LINE ในนามของร้าน ค่าบริการและโควตาข้อความของ LINE เป็นเรื่องระหว่างร้านกับ LINE และร้านต้องทำตาม|ข้อกำหนดของ LINE เอง",
      "ร้านเป็นผู้ควบคุมข้อมูล|ของลูกค้าที่เชื่อม LINE และรับผิดชอบ|การขอความยินยอม|กับการแจ้งลูกค้า เราเป็นผู้ประมวลผลข้อมูลให้ร้าน เรารับข้อมูลที่ LINE ส่งมา (รหัสเชื่อม คำขอยกเลิก การเพิ่มเพื่อนหรือบล็อก และข้อความแชตเมื่อร้านเปิดแชตบอต) ตามที่ร้านสั่งด้วยการเปิดใช้ เพื่อส่งต่อถึงเครื่องหลัก|ของร้านเท่านั้น ไม่เอาไปใช้|เพื่อประโยชน์ของเราเอง และลบตามระยะเวลา|ในนโยบายความเป็นส่วนตัว",
      "เราประมวลผลข้อมูลนี้|บนเซิร์ฟเวอร์ของ Cloudflare ซึ่งอาจอยู่นอกประเทศไทย ข้อมูลส่วนนี้|จึงอาจถูกส่งไป|ประมวลผลนอกประเทศ",
      "ลูกค้าเชื่อม LINE เอง|ด้วยรหัสใช้ครั้งเดียว และเลิกได้ทุกเมื่อ|ด้วยการพิมพ์ \"ยกเลิก LINE\" หรือ STOP หรือบล็อก OA ของร้าน แล้วแอปจะหยุดส่งข้อความ|ถึงคนนั้น ถ้าลูกค้าส่งรหัสตอนเครื่องร้านปิดอยู่ แอปส่งข้อความยืนยัน|หนึ่งข้อความจาก OA ของร้าน ซึ่งนับในโควตาข้อความ|ของร้าน และการเชื่อมจะนับ|เมื่อ LINE รับข้อความนั้นแล้ว",
    ],
  },
  {
    title: "13. เปลี่ยนแปลงและยุติบริการออนไลน์",
    p: [
      "บริการออนไลน์ (เว็บไซต์ บัญชี รีเลย์ PeerapoS Pair ตัวเชื่อม AI ตัวเชื่อม LINE หน้าลูกค้า การอัปเดตแอปซื้อขาด) เราอาจปรับ ระงับ หรือเลิกได้ ถ้าจะเลิกบริการที่คุณใช้อยู่ เราแจ้งล่วงหน้าบนเว็บไซต์และในแอปที่หัวข้อ มีอะไรใหม่ (What's new)",
      "แอปที่ติดตั้งแล้วใช้งานในเครื่องต่อได้ และข้อมูลของคุณยังอยู่ในเครื่อง",
    ],
  },
  {
    title: "14. ข้อกำหนดนี้เปลี่ยนได้",
    p: [
      "ถ้าเปลี่ยนข้อกำหนด เราลงฉบับใหม่ที่หน้านี้พร้อมวันที่ใหม่ การสั่งซื้อครั้งใหม่ใช้ฉบับที่ประกาศอยู่ตอนนั้น ถ้าการเปลี่ยนมีผลต่อสิทธิ์ของคุณอย่างสำคัญ เราแจ้งล่วงหน้าบนเว็บไซต์และในแอปที่หัวข้อ มีอะไรใหม่ (What's new)",
    ],
  },
  {
    title: "15. กฎหมายและภาษา",
    p: [
      "ข้อกำหนดนี้ใช้กฎหมายไทย ถ้าฉบับภาษาไทยกับภาษาอังกฤษไม่ตรงกัน ให้ถือฉบับภาษาไทย",
      `มีคำถาม ทักมาที่ ${EMAIL}`,
    ],
  },
];

const EN: Sec[] = [
  {
    title: "1. Who provides the service",
    p: [
      "The provider is พีระพอส (PeerapoS), a sole proprietorship registered for commerce in Thailand. These Terms cover the PeerapoS apps, your account on peerapongsm.dev, PeerapoS Pro, the mobile apps (PeerapoS Pair and PeerapoS Plan), the one-time paid apps, and the opt-in online services (PeerapoS Pair relay, the AI connector, the LINE connector, Google Drive backup, customer pages, online document signing).",
      "Ticking the box when you order, signing in, or continuing to use the apps after we publish these Terms, means you agree to them.",
    ],
  },
  {
    title: "2. Free apps, paid apps and Pro",
    li: [
      "Free to use; some features need PeerapoS Pro. The app shows its limits and details.",
      COPY.paid.en,
      COPY.pro.en,
      "Pro turns on Pro features in all the free apps, the paid apps you own, the relay, the AI connector, PeerapoS Pair and backup to Google Drive in the free apps (the paid apps include it without Pro). It does not open paid apps you have not bought. One Pro works across all apps on the same account.",
      "PeerapoS Plan on a phone is a free download, but it needs an active Pro to use at all.",
    ],
    after: [
      "Features may change or move to PeerapoS Pro, including for existing users. We announce changes in advance on the website and in the app's What's new. Changes to the scope of Pro also come with advance notice through those channels.",
      "You can decline an update and keep your current version, turn automatic updates off and resume them when ready, and install an earlier version from https://dl.peerapongsm.dev.",
      "Existing records stay viewable, finishable, cancellable, printable and exportable, and saved data remains visible. Starting new work or producing reports with features moved to Pro needs Pro.",
      "The right to use cannot be transferred, and is for the business named on the account.",
    ],
  },
  {
    title: "3. One account, one name, one licence",
    p: ["An account has one name (shop, company or your own name) and one set of rights. The name shows in the apps. There are no keys to type: a PC gets its rights by being linked to the account."],
    li: [
      "To link a PC: open the app, press \"เปิดใช้\" (Activate), then approve on the web or scan with your phone.",
      "PC limits: paid apps alone 2 PCs; Pro with no paid app 6 PCs; Pro plus at least one paid app 10 PCs.",
      "You can unlink a PC yourself on My account. An unlinked PC loses its rights the next time it is online.",
      "If Pro ends and you have more PCs than the remaining limit, we do not remove any. Rights follow the order the PCs were linked, and you cannot link a new PC until you are back under the limit.",
    ],
  },
  {
    title: "4. Signing in and deleting your account",
    li: [
      "Sign-in is with a Google account only, on the website and on Android. There is no email-code login.",
      "If we add Apple sign-in later, one Apple login can be linked to one Google account, once.",
      "You can delete your account yourself on /account on the website. Deleting removes the account, sign-ins, sessions, linked PCs and licence. Paid apps you bought stop working, and we cannot restore them. Orders and the receipt email stay, as tax records.",
    ],
    after: [
      COPY.deletion.en,
    ],
  },
  {
    title: "5. Payment",
    p: [
      COPY.payment.en,
      COPY.receipt.en,
      COPY.cancel.en,
      COPY.pass.en,
    ],
  },
  {
    title: "6. When Pro ends",
    li: [
      COPY.ends.en,
      COPY.grace.en,
      "After 14 days Pro features stop. This includes the online services that need Pro.",
      "A PC that has not checked in online for more than 30 days enters the same 14-day grace, and returns to normal after a successful check.",
      "Apps on your computer keep working. Your data is never locked: you can always read and export it.",
      "If a shop holds more data than the free limit allows, it keeps all of it and can use all of it. Only adding more stops.",
      COPY.owned.en,
    ],
  },
  {
    title: "7. Refunds",
    p: [
      `For paid apps, you can request a full refund within 14 days of purchase by emailing ${EMAIL}. After 14 days, sales are final.`,
      COPY.refunds.en,
      COPY.revoke.en,
      "This does not limit your rights under Thai consumer law.",
    ],
  },
  {
    title: "8. PeerapoS is not an accountant, tax adviser or lawyer",
    p: [
      "The apps help you record, calculate and issue documents. They are not accounting, tax, labour or legal advice, and we do not promise that any figure or document will pass any authority's review.",
      "You must check your own data and you are responsible for your own filings and submissions. If unsure, ask a professional.",
    ],
  },
  {
    title: "9. As is, and limit of liability",
    p: [
      "We provide the software and services as is. We do not promise they are error-free or uninterrupted. Back up your data regularly.",
      "To the extent the law allows, our total liability to you is capped as follows. Paid app: the price you paid for that app. Pro: the Pro fees you paid in the last 12 months. Free apps you did not pay for: only what the law requires.",
      "The cap does not apply to harm caused by our intent or gross negligence, and does not remove rights the law does not let us remove.",
    ],
  },
  {
    title: "10. Your data",
    p: [
      "The business data you enter in the apps stays on your PC. The shop is the data controller for its own customers and staff, and is responsible for consent and notices to them. We do not see that data.",
      "If you turn on an online service (PeerapoS Pair relay, the AI connector, the LINE connector, Google Drive backup, customer pages, online document signing), we act as a data processor for the shop, only as far as needed to run the service. We: process on the shop's instruction given by turning the service on, do not use the data for our own purposes, use the sub-processors listed in the Privacy Policy, and delete on the schedule that policy gives.",
      "PeerapoS Pair relay passes encrypted data whose contents we cannot read. Google Drive backups are encrypted and sent directly to your account; we do not store or read their contents. Documents sent for online signing are encrypted on the shop PC; we cannot read them. The AI connector passes the data you choose to your AI provider as described in the Privacy Policy; that traffic is not end-to-end encrypted.",
      "For account data, orders, problem reports you send and usage statistics, we are the data controller. Details are in the Privacy Policy.",
    ],
  },
  {
    title: "11. Acceptable use",
    li: [
      "No decompiling, reverse engineering, modifying, or bypassing the apps' licence checks.",
      "No copying licence files, sharing one account across other businesses, or reselling a paid app.",
      "No using the online services for spam, attacks, overloading the system, or anything unlawful.",
      "No storing or sending through the online services data you have no right to use.",
    ],
    after: ["If you break these rules we may suspend the account's linked PCs or online services, without a refund unless the law requires one."],
  },
  {
    title: "12. Your customers' money and messages",
    p: [
      "Money your customers pay your shop never passes through us. The apps only make a QR and record the amount. Your shop receives the money in its own account.",
      "We never message a shop's customers, by any channel, LINE included. Anything your customers see comes from your shop.",
      "The LINE connector (free apps need Pro; the paid apps include it) uses the shop's own LINE Official Account and Channel access token. The token and Channel secret stay on the shop's main PC and are never sent to us. Messages to customers go from the shop's main PC straight to LINE, in the shop's name. LINE's fees and message quota are between the shop and LINE, and the shop must follow LINE's own terms.",
      "The shop is the data controller for its customers who link their LINE, and is responsible for their consent and notices. We act as the shop's data processor: we receive what LINE sends (link codes, stop requests, friend adds or blocks, and chat while the shop's chatbot is on) on the shop's instruction given by turning the connector on, only to pass it to the shop's main PC. We do not use it for our own purposes, and we delete it on the schedule in the Privacy Policy.",
      "We process this data on Cloudflare servers, which may be outside Thailand, so this data may be transferred abroad for processing.",
      "Customers link their own LINE with a one-time code and can stop at any time by sending \"ยกเลิก LINE\" or STOP, or by blocking the shop's OA. The app then stops messaging them. If a customer sends a code while the shop PC is off, the app sends one confirmation message from the shop's OA, which counts against the shop's message quota, and the link counts once LINE accepts it.",
    ],
  },
  {
    title: "13. Changing or ending online services",
    p: [
      "We may change, pause or end the online services (the website, accounts, relay, PeerapoS Pair, the AI connector, the LINE connector, customer pages, paid-app updates). If we end one you use, we tell you ahead on the website and in the app's What's new.",
      "Apps already installed keep working on your PC, and your data stays on it.",
    ],
  },
  {
    title: "14. Changes to these Terms",
    p: [
      "If we change the Terms we publish the new version here with a new date. A new order uses the version in force at that time. If a change affects your rights in an important way, we tell you ahead on the website and in the app's What's new.",
    ],
  },
  {
    title: "15. Law and language",
    p: [
      "Thai law applies. If the Thai and English texts differ, the Thai text prevails.",
      `Questions: ${EMAIL}`,
    ],
  },
];

export default function Terms() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
      <a href="/" className="font-display font-bold hover:text-indigo">
        PeerapoS
      </a>

      {/* ── ภาษาไทย ── */}
      <article lang="th" className="mt-8">
        <h1 className="font-display text-4xl font-bold tracking-tight">ข้อกำหนดการใช้งาน</h1>
        <p className="mt-2 text-graphite"><Phrases text={COPY.updated.th} /></p>
        <p className="mt-4 leading-relaxed text-graphite">
          อ่านคู่กับ <a href="/privacy" className="text-indigo underline">นโยบายความเป็นส่วนตัว</a>
        </p>
        <Secs list={TH} />
      </article>

      <hr className="my-14 border-line" />

      {/* ── English ── */}
      <article lang="en">
        <h2 className="font-display text-4xl font-bold tracking-tight">Terms of Use</h2>
        <p className="mt-2 text-graphite">{COPY.updated.en}</p>
        <p className="mt-4 leading-relaxed text-graphite">
          Read together with the <a href="/privacy" className="text-indigo underline">Privacy Policy</a>.
        </p>
        <Secs list={EN} />
      </article>
    </main>
  );
}
