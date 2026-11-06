import type { Metadata } from "next";

// Terms of use for PeerapoS apps and the accounts / Pro / Max / paid-app sales (linked from /buy and the footers).
// Facts checked against peerapos-licence feat/accounts (prices, 14-day grace, 30-day check-by, PC caps 2 / 6 / 10,
// PromptPay + slip check, no auto-renewal). Not reviewed by a lawyer.

export const metadata: Metadata = {
  title: "ข้อกำหนดการใช้งาน · Terms of Use — PeerapoS",
  description: "Terms of use for the PeerapoS apps, PeerapoS Pro, PeerapoS Max and the paid apps, by PeerapoS.",
  // override the layout's "/" canonical and og:url
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms" },
};

const EMAIL = "contact@peerapongsm.dev";

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
    title: "1. ใครให้บริการ",
    p: [
      "ผู้ให้บริการคือ พีระพอส (PeerapoS) ผู้ประกอบการบุคคลธรรมดา จดทะเบียนพาณิชย์ในประเทศไทย ข้อกำหนดนี้ใช้กับแอปของ PeerapoS บัญชีบนเว็บไซต์ peerapongsm.dev PeerapoS Pro PeerapoS Max แอปแบบซื้อขาด และบริการออนไลน์ที่ให้เปิดใช้เอง (รีเลย์ PeerapoS Go ตัวเชื่อม AI หน้าลูกค้า)",
      "ติ๊กยอมรับตอนสั่งซื้อ หรือใช้แอปต่อไปหลังเราประกาศข้อกำหนดนี้ ถือว่าคุณตกลงตามนี้",
    ],
  },
  {
    title: "2. แอปฟรี แอปซื้อขาด Pro และ Max",
    li: [
      "แอปฟรีใช้ได้ฟรีตามขีดจำกัดของแต่ละแอป เช่น จำนวนเครื่อง ดูรายละเอียดในแอป",
      "แอปแบบซื้อขาด (PeerapoS Account, Wholesale, Property, Service, Contractor, Academy, Wellness) จ่ายครั้งเดียว อัปเดตให้ฟรีตลอด ราคาดูที่หน้า /buy",
      "PeerapoS Pro 159 บาทต่อเดือน หรือ 1,590 บาทต่อปี เปิดฟีเจอร์ Pro ในแอปฟรีทั้งหมด",
      "PeerapoS Max 349 บาทต่อเดือน หรือ 3,490 บาทต่อปี เปิดฟีเจอร์ Pro ในแอปฟรีทั้งหมด และเปิดแอปซื้อขาดทุกตัว รวมตัวที่เพิ่มมาทีหลัง",
      "Pro และ Max มีแค่รายเดือนกับรายปี ราคาที่คิดคือราคาบนหน้า /buy ตอนที่คุณสั่ง",
    ],
    after: ["สิทธิ์ใช้โอนให้คนอื่นไม่ได้ และใช้ได้เฉพาะกิจการตามชื่อที่ลงไว้ในบัญชี"],
  },
  {
    title: "3. หนึ่งบัญชี หนึ่งชื่อ หนึ่งสิทธิ์",
    p: ["บัญชีหนึ่งมีหนึ่งชื่อ (ชื่อร้าน บริษัท หรือชื่อคุณ) และหนึ่งชุดสิทธิ์ ชื่อนี้แสดงในแอป ไม่มีรหัสหรือคีย์ให้พิมพ์ เครื่องได้สิทธิ์ด้วยการเชื่อมเครื่องกับบัญชี"],
    li: [
      "เชื่อมเครื่อง: เปิดแอป กด \"เปิดใช้\" แล้วยืนยันบนเว็บหรือสแกนด้วยมือถือ",
      "จำนวนเครื่องที่เชื่อมได้: แอปซื้อขาดอย่างเดียว 2 เครื่อง มี Pro 6 เครื่อง (แอปซื้อขาดยังได้เฉพาะ 2 เครื่องแรก) มี Max 10 เครื่องสำหรับทุกอย่าง",
      "ยกเลิกการเชื่อมได้เองที่หน้าบัญชีของฉัน เครื่องที่ยกเลิกจะเสียสิทธิ์ทันทีที่ออนไลน์ครั้งถัดไป",
      "ถ้า Pro หรือ Max หมดและจำนวนเครื่องเกินที่เหลือ เราไม่ตัดเครื่องไหนทิ้ง แต่สิทธิ์จะเรียงตามลำดับที่เชื่อมไว้ และเชื่อมเครื่องใหม่ไม่ได้จนกว่าจะไม่เกิน",
    ],
  },
  {
    title: "4. จ่ายเงิน",
    p: [
      "จ่ายผ่าน PromptPay QR ที่หน้า /buy ยอดมีเศษสตางค์ไม่ซ้ำกัน เพื่อจับคู่กับคำสั่งซื้อ แล้วแนบสลิป เราตรวจสลิปผ่านบริการตรวจสลิป ถ้าตรวจอัตโนมัติไม่ได้ เราจะตรวจเอง และถ้าไม่ผ่านจะแจ้งทางอีเมล",
      "เมื่อชำระแล้ว เราส่งอีเมลยืนยันการชำระเงินไปที่อีเมลที่คุณกรอกไว้ในคำสั่งซื้อ อีเมลนี้เป็นหลักฐานการชำระเงิน ไม่ใช่ใบกำกับภาษี",
      "Pro และ Max ไม่ต่ออายุเอง เราไม่ตัดเงินซ้ำ คุณต่ออายุเองเมื่อต้องการ ถ้าต่อก่อนหมด วันใหม่ต่อจากวันสิ้นสุดเดิม",
    ],
  },
  {
    title: "5. เมื่อ Pro หรือ Max หมดอายุ",
    li: [
      "หลังวันสิ้นสุด มีช่วงผ่อนผัน 14 วัน ช่วงนี้ยังใช้ฟีเจอร์ Pro ได้ตามปกติ",
      "เกิน 14 วัน ฟีเจอร์ Pro จะหยุด ซึ่งรวมบริการออนไลน์ที่ต้องมี Pro ด้วย",
      "เครื่องที่ไม่ได้ออนไลน์เช็กสิทธิ์เกิน 30 วัน ก็เข้าช่วงผ่อนผัน 14 วันแบบเดียวกัน แล้วกลับมาปกติเมื่อเช็กสำเร็จ",
      "แอปยังใช้งานต่อได้ ข้อมูลไม่ถูกล็อก ดูและส่งออกข้อมูลได้เสมอ",
      "ถ้าร้านมีข้อมูลเกินขีดจำกัดของรุ่นฟรี ข้อมูลทั้งหมดยังอยู่และใช้ได้ แค่เพิ่มเกินขีดจำกัดไม่ได้",
      "แอปซื้อขาดที่คุณซื้อเองเป็นของคุณตลอด ไม่ผูกกับ Pro หรือ Max และไม่ล็อกเมื่อออฟไลน์ เว้นแต่เครื่องนั้นถูกยกเลิกการเชื่อมจากบัญชี ส่วนแอปที่ได้สิทธิ์เพราะ Max อย่างเดียว จะหยุดเมื่อ Max หมด",
    ],
  },
  {
    title: "6. ไม่คืนเงิน",
    p: [
      "ทุกการขายถือเป็นที่สิ้นสุด เราไม่คืนเงิน ยกเว้นมีข้อบกพร่องที่เราแก้ไม่ได้ หรือกฎหมายบังคับให้คืน",
      "Pro และ Max ยกเลิกได้ทุกเมื่อ โดยไม่ต้องต่ออายุ สิทธิ์ใช้ได้ถึงสิ้นรอบที่จ่ายไว้แล้ว ไม่คืนเงินตามสัดส่วนวันที่เหลือ",
      "ข้อนี้ไม่จำกัดสิทธิ์ของคุณตามกฎหมายคุ้มครองผู้บริโภคของไทย",
    ],
  },
  {
    title: "7. PeerapoS ไม่ใช่นักบัญชี ที่ปรึกษาภาษี หรือทนายความ",
    p: [
      "แอปช่วยจดบันทึก คำนวณ และออกเอกสาร ไม่ได้ให้คำปรึกษาด้านบัญชี ภาษี แรงงาน หรือกฎหมาย และเราไม่รับรองว่าตัวเลขหรือเอกสารจากแอปจะผ่านการตรวจของหน่วยงานใด",
      "คุณต้องตรวจข้อมูลของตัวเอง และรับผิดชอบการยื่นแบบและการส่งเอกสารให้หน่วยงานรัฐ ถ้าไม่แน่ใจ ถามผู้เชี่ยวชาญ",
    ],
  },
  {
    title: "8. ให้ใช้ตามสภาพ และขอบเขตความรับผิด",
    p: [
      "เราให้ซอฟต์แวร์และบริการตามสภาพที่เป็นอยู่ ไม่รับประกันว่าจะไม่มีข้อผิดพลาดหรือใช้ได้ไม่สะดุด คุณควรสำรองข้อมูลเป็นประจำ",
      "เท่าที่กฎหมายอนุญาต ความรับผิดทั้งหมดของเราต่อคุณมีเพดานดังนี้ แอปซื้อขาด: ไม่เกินราคาที่คุณจ่ายสำหรับแอปนั้น Pro หรือ Max: ไม่เกินค่าบริการที่คุณจ่ายใน 12 เดือนที่ผ่านมา แอปฟรีที่ไม่ได้จ่ายเงิน: เท่าที่กฎหมายบังคับเท่านั้น",
      "เพดานนี้ไม่ใช้กับความเสียหายที่เกิดจากเจตนาหรือความประมาทเลินเล่ออย่างร้ายแรงของเรา และไม่ตัดสิทธิ์ที่กฎหมายไม่ให้ตัด",
    ],
  },
  {
    title: "9. ข้อมูลของคุณ",
    p: [
      "ข้อมูลธุรกิจที่คุณกรอกในแอปอยู่ในเครื่องคุณ ร้านเป็นผู้ควบคุมข้อมูลของลูกค้าและพนักงานของร้านเอง และรับผิดชอบเรื่องความยินยอมและการแจ้งเจ้าของข้อมูล เราไม่เห็นข้อมูลนั้น",
      "ถ้าคุณเปิดบริการออนไลน์ (รีเลย์ PeerapoS Go ตัวเชื่อม AI หน้าลูกค้า) เราทำหน้าที่ผู้ประมวลผลข้อมูลให้ร้านเท่าที่จำเป็นต่อการเดินบริการ เรา: ประมวลผลตามที่ร้านสั่งด้วยการเปิดใช้บริการ ไม่เอาข้อมูลไปใช้เพื่อประโยชน์ของเราเอง ใช้ผู้ประมวลผลช่วงตามรายชื่อในนโยบายความเป็นส่วนตัว และลบตามระยะเวลาที่นโยบายนั้นบอก",
      "ข้อมูลบัญชี คำสั่งซื้อ และรายงานปัญหาที่ส่งมา เราเป็นผู้ควบคุมข้อมูลเอง รายละเอียดอยู่ในนโยบายความเป็นส่วนตัว",
    ],
  },
  {
    title: "10. ใช้งานอย่างเหมาะสม",
    li: [
      "ห้ามถอดรหัส ย้อนวิศวกรรม แก้ไข หรือหาทางเลี่ยงระบบตรวจสิทธิ์ของแอป",
      "ห้ามคัดลอกไฟล์สิทธิ์ แบ่งบัญชีให้กิจการอื่น หรือขายต่อแอปซื้อขาด",
      "ห้ามใช้บริการออนไลน์ส่งสแปม โจมตี ทำให้ระบบล่ม หรือผิดกฎหมาย",
      "ห้ามส่งข้อมูลที่คุณไม่มีสิทธิ์ใช้ผ่านบริการออนไลน์",
    ],
    after: ["ถ้าฝ่าฝืน เราอาจระงับการเชื่อมเครื่องหรือบริการออนไลน์ของบัญชีนั้น ไม่คืนเงิน ยกเว้นกฎหมายบังคับ"],
  },
  {
    title: "11. เงินของลูกค้าคุณ และข้อความถึงลูกค้าคุณ",
    p: [
      "เงินที่ลูกค้าของร้านจ่ายให้ร้านไม่ผ่านเรา แอปแค่ทำ QR และบันทึกยอด ร้านรับเงินเข้าบัญชีของร้านเอง",
      "เราไม่ส่งข้อความถึงลูกค้าของร้าน ไม่ว่าทางใด ข้อความที่ลูกค้าเห็นมาจากร้านเท่านั้น",
    ],
  },
  {
    title: "12. เปลี่ยนแปลงและยุติบริการออนไลน์",
    p: [
      "บริการออนไลน์ (เว็บไซต์ บัญชี รีเลย์ PeerapoS Go ตัวเชื่อม AI หน้าลูกค้า การอัปเดตแอปซื้อขาด) เราอาจปรับ ระงับ หรือเลิกได้ ถ้าจะเลิกบริการที่คุณใช้อยู่ เราแจ้งล่วงหน้าทางอีเมลของบัญชีหรือบนเว็บไซต์",
      "แอปที่ติดตั้งแล้วใช้งานในเครื่องต่อได้ และข้อมูลของคุณยังอยู่ในเครื่อง",
    ],
  },
  {
    title: "13. ข้อกำหนดนี้เปลี่ยนได้",
    p: [
      "ถ้าเปลี่ยนข้อกำหนด เราลงฉบับใหม่ที่หน้านี้พร้อมวันที่ใหม่ การสั่งซื้อครั้งใหม่ใช้ฉบับที่ประกาศอยู่ตอนนั้น ถ้าการเปลี่ยนมีผลต่อสิทธิ์ของคุณอย่างสำคัญ เราแจ้งล่วงหน้าทางอีเมลของบัญชี",
    ],
  },
  {
    title: "14. กฎหมายและภาษา",
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
      "The provider is พีระพอส (PeerapoS), a sole proprietorship registered for commerce in Thailand. These Terms cover the PeerapoS apps, your account on peerapongsm.dev, PeerapoS Pro, PeerapoS Max, the one-time paid apps, and the opt-in online services (relay, PeerapoS Go, the AI connector, customer pages).",
      "Ticking the box when you order, or continuing to use the apps after we publish these Terms, means you agree to them.",
    ],
  },
  {
    title: "2. Free apps, paid apps, Pro and Max",
    li: [
      "Free apps are free to use within each app's limits, such as the number of PCs. The app shows the details.",
      "The paid apps (PeerapoS Account, Wholesale, Property, Service, Contractor, Academy, Wellness) are a one-time purchase with free updates forever. Prices are on /buy.",
      "PeerapoS Pro is 159 baht a month or 1,590 baht a year. It turns on Pro features in all the free apps.",
      "PeerapoS Max is 349 baht a month or 3,490 baht a year. It turns on Pro features in all the free apps and opens every paid app, including ones added later.",
      "Pro and Max are monthly or annual only. The price charged is the one on /buy when you order.",
    ],
    after: ["The right to use cannot be transferred, and is for the business named on the account."],
  },
  {
    title: "3. One account, one name, one licence",
    p: ["An account has one name (shop, company or your own name) and one set of rights. The name shows in the apps. There are no keys to type: a PC gets its rights by being linked to the account."],
    li: [
      "To link a PC: open the app, press \"เปิดใช้\" (Activate), then approve on the web or scan with your phone.",
      "PC limits: paid apps alone 2 PCs; with Pro 6 PCs (paid apps still only on the first 2); with Max 10 PCs for everything.",
      "You can unlink a PC yourself on My account. An unlinked PC loses its rights the next time it is online.",
      "If Pro or Max ends and you have more PCs than the remaining limit, we do not remove any. Rights follow the order the PCs were linked, and you cannot link a new PC until you are back under the limit.",
    ],
  },
  {
    title: "4. Payment",
    p: [
      "You pay by PromptPay QR on /buy. The amount carries a unique satang tag so we can match your order, then you attach the slip. We check the slip through a slip-checking service. If the automatic check cannot settle it, we check by hand, and tell you by email if it is not approved.",
      "After payment we email a payment confirmation to the receipt email you entered on the order. It is proof of payment, not a tax invoice.",
      "Pro and Max do not renew by themselves. We never charge you again. You renew when you want to; renewing before the end adds on from the old end date.",
    ],
  },
  {
    title: "5. When Pro or Max ends",
    li: [
      "After the end date there is a 14-day grace period. Pro features keep working during it.",
      "After 14 days Pro features stop. This includes the online services that need Pro.",
      "A PC that has not checked in online for more than 30 days enters the same 14-day grace, and returns to normal after a successful check.",
      "The app keeps working. Your data is never locked: you can always read and export it.",
      "If a shop holds more data than the free limit allows, it keeps all of it and can use all of it. Only adding more stops.",
      "A paid app you bought yourself stays yours, whether or not Pro or Max is active, and does not lock when offline, unless that PC is unlinked from the account. A paid app you could use only because of Max stops when Max ends.",
    ],
  },
  {
    title: "6. No refunds",
    p: [
      "All sales are final. We do not give refunds, except for a defect we cannot fix, or where the law requires a refund.",
      "You can cancel Pro or Max at any time by not renewing. It runs to the end of the period you paid for, with no pro-rata refund.",
      "This does not limit your rights under Thai consumer law.",
    ],
  },
  {
    title: "7. PeerapoS is not an accountant, tax adviser or lawyer",
    p: [
      "The apps help you record, calculate and issue documents. They are not accounting, tax, labour or legal advice, and we do not promise that any figure or document will pass any authority's review.",
      "You must check your own data and you are responsible for your own filings and submissions. If unsure, ask a professional.",
    ],
  },
  {
    title: "8. As is, and limit of liability",
    p: [
      "We provide the software and services as is. We do not promise they are error-free or uninterrupted. Back up your data regularly.",
      "To the extent the law allows, our total liability to you is capped as follows. Paid app: the price you paid for that app. Pro or Max: the fees you paid in the last 12 months. Free apps you did not pay for: only what the law requires.",
      "The cap does not apply to harm caused by our intent or gross negligence, and does not remove rights the law does not let us remove.",
    ],
  },
  {
    title: "9. Your data",
    p: [
      "The business data you enter in the apps stays on your PC. The shop is the data controller for its own customers and staff, and is responsible for consent and notices to them. We do not see that data.",
      "If you turn on an online service (relay, PeerapoS Go, the AI connector, customer pages), we act as a data processor for the shop, only as far as needed to run the service. We: process on the shop's instruction given by turning the service on, do not use the data for our own purposes, use the sub-processors listed in the Privacy Policy, and delete on the schedule that policy gives.",
      "For account data, orders and the problem reports you send, we are the data controller. Details are in the Privacy Policy.",
    ],
  },
  {
    title: "10. Acceptable use",
    li: [
      "No decompiling, reverse engineering, modifying, or bypassing the apps' licence checks.",
      "No copying licence files, sharing one account across other businesses, or reselling a paid app.",
      "No using the online services for spam, attacks, overloading the system, or anything unlawful.",
      "No storing or sending through the online services data you have no right to use.",
    ],
    after: ["If you break these rules we may suspend the account's linked PCs or online services, without a refund unless the law requires one."],
  },
  {
    title: "11. Your customers' money and messages",
    p: [
      "Money your customers pay your shop never passes through us. The apps only make a QR and record the amount. Your shop receives the money in its own account.",
      "We never message a shop's customers, by any channel. Anything your customers see comes from your shop.",
    ],
  },
  {
    title: "12. Changing or ending online services",
    p: [
      "We may change, pause or end the online services (the website, accounts, relay, PeerapoS Go, the AI connector, customer pages, paid-app updates). If we end one you use, we tell you ahead by email to the account or on the website.",
      "Apps already installed keep working on your PC, and your data stays on it.",
    ],
  },
  {
    title: "13. Changes to these Terms",
    p: [
      "If we change the Terms we publish the new version here with a new date. A new order uses the version in force at that time. If a change affects your rights in an important way, we tell you ahead by email to the account.",
    ],
  },
  {
    title: "14. Law and language",
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
        <p className="mt-2 text-graphite">แอปและบริการของ PeerapoS มีผล 6 พฤศจิกายน 2569</p>
        <p className="mt-4 leading-relaxed text-graphite">
          อ่านคู่กับ <a href="/privacy" className="text-indigo underline">นโยบายความเป็นส่วนตัว</a>
        </p>
        <Secs list={TH} />
      </article>

      <hr className="my-14 border-line" />

      {/* ── English ── */}
      <article lang="en">
        <h2 className="font-display text-4xl font-bold tracking-tight">Terms of Use</h2>
        <p className="mt-2 text-graphite">PeerapoS apps and services. In force from 6 November 2026</p>
        <p className="mt-4 leading-relaxed text-graphite">
          Read together with the <a href="/privacy" className="text-indigo underline">Privacy Policy</a>.
        </p>
        <Secs list={EN} />
      </article>
    </main>
  );
}
