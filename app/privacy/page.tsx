import type { Metadata } from "next";

// Privacy policy for the PeerapoS apps, accounts and opt-in online services (linked from the site footer and /buy).
// Facts checked against code 2026-11-06: peerapos-licence feat/accounts (D1 schema, mail.ts, slipok.ts, index.ts),
// peerapos-feedback worker, peerapos-go feat/go specs + docs/privacy-ai.md, each app's netPolicy.ts.
// The AI paragraph is the one in peerapos-go/docs/privacy-ai.md; keep it in step with licence worker/src/consent.ts.
// Marketplace sync is not built and is left out. Not reviewed by a lawyer.

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว · Privacy Policy — PeerapoS",
  description: "Privacy policy for the PeerapoS apps, accounts and online services by PeerapoS.",
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

type Sec = { title: string; p?: string[]; li?: string[]; after?: string[] };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <div className="mt-2 space-y-2 leading-relaxed text-graphite">{children}</div>
    </section>
  );
}

function Secs({ list }: { list: Sec[] }) {
  return (
    <>
      {list.map((s) => (
        <Section key={s.title} title={s.title}>
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
      "ถ้าร้านเปิดบริการออนไลน์ที่ให้เปิดใช้เอง (รีเลย์ PeerapoS Go ตัวเชื่อม AI หน้าลูกค้า) เราเป็นผู้ประมวลผลข้อมูลให้ร้าน เท่าที่จำเป็นต่อการเดินบริการ",
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
    title: "บัญชี Pro Max และแอปแบบซื้อขาด",
    p: [
      "แอปที่ใช้ Pro หรือ Max และแอปแบบซื้อขาด ต้องมีบัญชี และติดต่อ peerapongsm.dev เพื่อตรวจสิทธิ์ตอนเปิดแอป ตอนกลับมาที่หน้าต่างแอป และวันละครั้งขณะเปิดอยู่ แอปแบบซื้อขาดอัปเดตจาก peerapongsm.dev ด้วย แทน GitHub",
      "สิ่งที่เราเก็บ",
    ],
    li: [
      "บัญชี: อีเมล และเวลาที่สร้างบัญชี",
      "สิทธิ์: ชื่อที่คุณตั้ง (แสดงในแอป) แอปที่ซื้อ Pro หรือ Max และวันสิ้นสุด",
      "คำสั่งซื้อ: รายการ ยอดเงิน เวลา สถานะ อีเมลรับใบยืนยัน ชื่อ รหัสอ้างอิงธุรกรรมจากสลิป และการติ๊กยอมรับข้อกำหนด",
      "เครื่องที่เชื่อม: ชื่อเครื่อง (ตามที่แอปส่ง) แอปที่ใช้เชื่อม รหัสเครื่องที่แฮชแล้ว (ไม่ใช่รหัสเดิมของ Windows) เวลาที่เชื่อม ใช้ล่าสุด และเลิกใช้",
      "การเข้าสู่ระบบ: รหัส 6 หลักที่เก็บเป็นแฮช อยู่ 10 นาที และเซสชันที่เก็บเป็นแฮช อยู่ 30 วัน เบราว์เซอร์เก็บคุกกี้เซสชันที่จำเป็นต่อการเข้าสู่ระบบ ไม่มีคุกกี้โฆษณา",
      "บันทึกการตรวจสลิป: คำสั่งซื้อ เดือน เวลา และผลตรวจ ไม่มีรูปสลิป",
    ],
    after: [
      "เราส่งอีเมลถึงคุณสองแบบ คือรหัสเข้าสู่ระบบ และอีเมลยืนยันการชำระเงิน ไม่ส่งอีเมลการตลาด นอกจากนี้เราส่งอีเมลหาตัวเองเมื่อมีสลิปที่ต้องตรวจเอง",
    ],
  },
  {
    title: "จ่ายเงินและตรวจสลิป",
    p: [
      "เงินจ่ายผ่าน PromptPay เข้าบัญชีของเรา ไม่ผ่านบัตร ตอนตรวจ เราส่งรูปสลิปไปที่ SlipOK เพื่อตรวจว่าเป็นสลิปจริง ยอดตรง และผู้รับตรง",
      "ถ้า SlipOK ตัดสินไม่ได้ สลิปจะถูกเก็บไว้ที่ที่เก็บไฟล์ส่วนตัวของเราเพื่อให้เราตรวจเอง แล้วลบทิ้งเมื่อเราอนุมัติหรือปฏิเสธ",
    ],
  },
  {
    title: "บริการออนไลน์ที่ให้เปิดใช้เอง",
    p: [
      "บริการเหล่านี้ปิดอยู่เป็นค่าเริ่มต้น ต้องมี Pro หรือ Max และต้องเปิดเองในแอป เปิดและปิดได้ทุกเมื่อ",
    ],
  },
  {
    title: "รีเลย์ PeerapoS Go และหน้าลูกค้า",
    p: [
      "เมื่อเปิด เครื่องหลักของร้านเชื่อมออกไปที่ relay.peerapongsm.dev ค้างไว้ เพื่อให้มือถือ PeerapoS Go และหน้าลูกค้า (เปิดจาก QR) คุยกับเครื่องหลักได้ตอนอยู่นอกร้าน เบราว์เซอร์ของลูกค้าเปิดหน้าจาก go.peerapongsm.dev",
    ],
    li: [
      "เนื้อหาเข้ารหัสปลายทางระหว่างเครื่องหลักกับมือถือหรือหน้าลูกค้า เราเห็นแค่ข้อมูลเส้นทาง คือ เวลา ชนิด ขนาด และผลของแต่ละข้อความ เก็บ 7 วันแล้วลบ ไม่เก็บที่อยู่ IP",
      "คำขอจองหรือสอบถามจากหน้าลูกค้า ถ้าเครื่องหลักปิดอยู่ จะถูกพักไว้ที่เราเป็นข้อมูลเข้ารหัส สูงสุด 200 รายการต่อร้าน เก็บ 14 วันแล้วลบ หรือลบเมื่อเครื่องหลักรับไปแล้ว",
      "หน้าลูกค้าเข้ารหัสด้วยโค้ดที่เราส่งให้เบราว์เซอร์จาก go.peerapongsm.dev ลูกค้าจึงต้องเชื่อใจโค้ดนั้น ซึ่งเราเป็นผู้ให้",
      "ฟอร์มบนหน้าลูกค้าใช้ Cloudflare Turnstile กันบอต",
      "การแจ้งเตือนเข้ามือถือส่งผ่าน Google Firebase Cloud Messaging มีแค่ชื่อสาขาที่ร้านตั้ง ชนิดเหตุการณ์ และจำนวน เช่น \"ออร์เดอร์ใหม่ 3 รายการ\" ไม่มีข้อมูลธุรกิจ",
      "ปิดได้ที่ ตั้งค่า › Go ในแอป เมื่อปิด เครื่องหลักตัดการเชื่อมออก",
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
      "ส่งเฉพาะตอนที่คุณกดส่งเอง รายงานมีข้อความที่คุณพิมพ์ อีเมลสำหรับให้เราตอบกลับ (ถ้าคุณใส่) ชื่อและเวอร์ชันแอป เวอร์ชัน Windows และรายละเอียดข้อผิดพลาด ก่อนส่ง แอปจะลบชื่อผู้ใช้ Windows และที่อยู่โฟลเดอร์ในเครื่องออกให้ รายงานส่งผ่าน feedback.peerapongsm.dev (Cloudflare) แล้วส่งต่อเป็นอีเมลถึงเรา พร้อมประเทศและเวลาที่ได้รับ สำเนารายงานเก็บในฐานข้อมูลของเราบน Cloudflare จนกว่าเราจะดึงไปอ่านแล้วลบออก ที่อยู่ IP ใช้แค่จำกัดจำนวนครั้งที่ส่งได้ ไม่ได้เก็บไว้ เราใช้รายงานเพื่อแก้บั๊กเท่านั้น ไม่ขายหรือแบ่งปันให้ใคร",
    ],
  },
  {
    title: "เว็บไซต์ peerapongsm.dev",
    p: [
      "เว็บไซต์ใช้ Cloudflare Web Analytics นับจำนวนผู้เข้าชม โดยไม่ใช้คุกกี้ หน้าแรกเรียกตัวนับผู้เข้าชมจาก abacus.jasoncameron.dev ซึ่งเห็นที่อยู่ IP ของคุณตามปกติของการเปิดเว็บ หน้าเข้าสู่ระบบอาจโหลด Cloudflare Turnstile เพื่อกันบอต",
    ],
  },
  {
    title: "ใครรับข้อมูลบ้าง และส่งไปนอกประเทศไหม",
    li: [
      "Cloudflare: เซิร์ฟเวอร์ ฐานข้อมูล ที่เก็บไฟล์ รีเลย์ เว็บไซต์ และ Turnstile",
      "Resend: ส่งอีเมลรหัสเข้าสู่ระบบและอีเมลยืนยันการชำระเงิน ได้รับอีเมลผู้รับและเนื้อหาอีเมล",
      "SlipOK: ตรวจรูปสลิป",
      "GitHub: ตรวจหาเวอร์ชันใหม่ของแอปฟรี",
      "Google Firebase Cloud Messaging: แจ้งเตือนเข้ามือถือ PeerapoS Go",
      "ผู้ให้บริการ AI ที่ร้านเลือกเอง: รับข้อมูลที่ร้านตัดสินใจส่ง ตามเงื่อนไขของผู้ให้บริการนั้น",
    ],
    after: [
      "ผู้ให้บริการเหล่านี้อาจประมวลผลข้อมูลนอกประเทศไทย เราใช้เท่าที่จำเป็นต่อบริการข้างต้น และไม่ขายข้อมูลให้ใคร",
    ],
  },
  {
    title: "เก็บนานแค่ไหน",
    li: [
      "รหัสเข้าสู่ระบบ 10 นาที เซสชัน 30 วัน",
      "บันทึกเส้นทางของรีเลย์ 7 วัน คำขอจากหน้าลูกค้าที่พักไว้ 14 วัน",
      "รูปสลิปที่รอตรวจเอง จนกว่าเราจะตัดสิน",
      "สำเนารายงานปัญหา จนกว่าเราจะดึงไปอ่านแล้วลบ",
      "บัญชี คำสั่งซื้อ และเครื่องที่เชื่อม ไม่มีกำหนดลบอัตโนมัติ เราเก็บไว้ตลอดที่บัญชียังอยู่ และเท่าที่กฎหมายภาษีและบัญชีให้เก็บเอกสารการขาย",
    ],
  },
  {
    title: "สิทธิ์ของคุณและการลบ",
    p: [
      "ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล คุณขอเข้าถึงหรือขอสำเนา ขอแก้ไข ขอลบ ขอให้หยุดใช้ หรือคัดค้านการใช้ข้อมูลของคุณที่เราควบคุมได้ และร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคลได้",
      `ยังไม่มีปุ่มลบบัญชีในเว็บไซต์ ให้อีเมลมาที่ ${EMAIL} จากอีเมลของบัญชี เราตรวจว่าเป็นคุณ แล้วลบหรือเลิกใช้ข้อมูลของบัญชี เว้นส่วนที่กฎหมายให้เก็บ (เช่นเอกสารการขาย) เราตอบภายใน 30 วัน จะเปลี่ยนอีเมลของบัญชีก็ให้ติดต่อมาเช่นกัน`,
      "ในเครื่องของคุณ ถอนการติดตั้งแอปหรือลบโฟลเดอร์ข้อมูลของแอป ข้อมูลก็หายจากเครื่อง ยกเลิกการเชื่อมเครื่องได้ที่หน้าบัญชีของฉัน",
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
      "If a shop turns on an opt-in online service (relay, PeerapoS Go, the AI connector, customer pages), we act as a data processor for the shop, only as far as needed to run the service.",
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
    title: "Accounts, Pro, Max and paid apps",
    p: [
      "Apps using Pro or Max, and the one-time paid apps, need an account and contact peerapongsm.dev to check the licence: when the app starts, when its window regains focus, and once a day while open. The paid apps also update from peerapongsm.dev instead of GitHub.",
      "What we store:",
    ],
    li: [
      "Account: your email and when it was created.",
      "Licence: the name you set (shown in the apps), the apps you bought, Pro or Max and its end date.",
      "Orders: items, amount, time, status, the receipt email, the name, the bank transaction reference from the slip, and your ticking of the Terms.",
      "Linked PCs: the PC name (as the app sends it), the app used to link, a hashed machine ID (not the raw Windows ID), and when it was linked, last used and removed.",
      "Sign-in: a 6-digit code stored as a hash for 10 minutes, and a session stored as a hash for 30 days. Your browser keeps a session cookie that sign-in needs. No advertising cookies.",
      "Slip check log: order, month, time and result. No slip image.",
    ],
    after: [
      "We email you two kinds of message: the sign-in code and the payment confirmation. No marketing. We also email ourselves when a slip needs a manual check.",
    ],
  },
  {
    title: "Payment and slip checks",
    p: [
      "You pay by PromptPay into our account, not by card. To check, we send the slip image to SlipOK, which checks that the slip is genuine and the amount and receiver match.",
      "If SlipOK cannot settle it, the slip is kept in our private file storage so we can check it by hand, then deleted when we approve or reject it.",
    ],
  },
  {
    title: "Opt-in online services",
    p: ["These are off by default. They need Pro or Max and you turn them on yourself in the app. You can turn them on and off at any time."],
  },
  {
    title: "PeerapoS Go relay and customer pages",
    p: [
      "When on, the shop PC keeps one outbound connection to relay.peerapongsm.dev so the PeerapoS Go phone app and customer pages (opened from a QR) can reach it away from the shop. The customer's browser loads the page from go.peerapongsm.dev.",
    ],
    li: [
      "Content is end-to-end encrypted between the shop PC and the phone or customer page. We see only routing data: time, type, size and outcome of each message. It is kept 7 days, then deleted. We do not keep IP addresses.",
      "A booking or enquiry from a customer page, while the shop PC is off, is held with us as encrypted data: at most 200 per shop, kept 14 days then deleted, or deleted once the PC has taken it.",
      "A customer page is encrypted by code that we serve to the browser from go.peerapongsm.dev, so the customer has to trust that code, and we supply it.",
      "Forms on customer pages use Cloudflare Turnstile to keep bots out.",
      "Phone alerts go through Google Firebase Cloud Messaging. They carry only the branch name the shop set, the type of event and a count, such as \"3 new orders\". No business data.",
      "Turn it off in Settings › Go in the app. When off, the shop PC drops the connection.",
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
      "Sent only when you choose to send one. A report contains the text you type, an optional reply email, the app name and version, the Windows version and error details. Your Windows user name and local folder paths are removed before sending. Reports go through feedback.peerapongsm.dev (Cloudflare) and are forwarded to us by email with the country and time received. A copy is held in our database on Cloudflare until we pull it to read and then delete it. Your IP address is used only for rate limiting and is not stored. Reports are used only to fix bugs and are never sold or shared.",
    ],
  },
  {
    title: "The website, peerapongsm.dev",
    p: [
      "The site uses Cloudflare Web Analytics to count visits, without cookies. The home page fetches a visitor counter from abacus.jasoncameron.dev, which sees your IP address as any site you open would. The sign-in page may load Cloudflare Turnstile to keep bots out.",
    ],
  },
  {
    title: "Who receives data, and transfers abroad",
    li: [
      "Cloudflare: servers, databases, file storage, the relay, the website and Turnstile.",
      "Resend: sends the sign-in code and payment confirmation emails, so it receives the recipient address and the message.",
      "SlipOK: checks slip images.",
      "GitHub: update checks for the free apps.",
      "Google Firebase Cloud Messaging: phone alerts for PeerapoS Go.",
      "The AI provider the shop chooses: receives what the shop decides to send, under that provider's terms.",
    ],
    after: [
      "These providers may process data outside Thailand. We use them only as far as the services above need, and we sell data to no one.",
    ],
  },
  {
    title: "How long we keep it",
    li: [
      "Sign-in codes 10 minutes, sessions 30 days.",
      "Relay routing records 7 days; held customer-page requests 14 days.",
      "Slip images waiting for a manual check, until we decide.",
      "Problem report copies, until we pull and delete them.",
      "Accounts, orders and linked PCs have no automatic deletion. We keep them while the account exists, and as long as tax and accounting law has us keep sales records.",
    ],
  },
  {
    title: "Your rights and deleting your data",
    p: [
      "Under Thailand's Personal Data Protection Act you may ask to access or get a copy of, correct, delete, restrict or object to our use of your data that we control, and you may complain to the Personal Data Protection Committee.",
      `There is no delete-account button on the website yet. Email ${EMAIL} from the account's email address. We check it is you, then delete or stop using the account's data, except what the law has us keep (such as sales records). We answer within 30 days. To change the account's email, contact us too.`,
      "On your own PC, uninstall the app or delete its data folder and the data is gone. You can unlink a PC on My account.",
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
        <p className="mt-2 text-graphite">แอป บัญชี และบริการของ PeerapoS อัปเดตล่าสุด 6 พฤศจิกายน 2569</p>
        <p className="mt-4 leading-relaxed text-graphite">
          ใช้กับแอปฟรี {APPS_FREE} แอปแบบซื้อขาด {APPS_PAID} และ PeerapoS Go อ่านคู่กับ{" "}
          <a href="/terms" className="text-indigo underline">ข้อกำหนดการใช้งาน</a>
        </p>
        <Secs list={TH} />
      </article>

      <hr className="my-14 border-line" />

      {/* ── English ── */}
      <article lang="en">
        <h2 className="font-display text-4xl font-bold tracking-tight">Privacy Policy</h2>
        <p className="mt-2 text-graphite">PeerapoS apps, accounts and services. Last updated 6 November 2026</p>
        <p className="mt-4 leading-relaxed text-graphite">
          Applies to the free apps {APPS_FREE_EN}, the paid apps {APPS_PAID_EN}, and PeerapoS Go. Read together with the{" "}
          <a href="/terms" className="text-indigo underline">Terms of Use</a>.
        </p>
        <Secs list={EN} />
      </article>
    </main>
  );
}
