// Facts shared by the page, the JSON-LD in layout.tsx and /llms.txt, so search engines and
// AI assistants read the same answers a visitor sees. Keep every claim true to the page copy.

export const SITE_URL = "https://peerapongsm.dev";
// UAT build (npm run build:uat): no SEO signals at all, so search engines and AI crawlers only ever see production.
export const IS_UAT = process.env.PEERAPOS_UAT === "true";
export const EMAIL = "contact@peerapongsm.dev";
// LINE Official Account, linked by its premium ID @peerapos (basic ID @470cwgcv still works if the premium ID lapses).
export const LINE_URL = "https://line.me/R/ti/p/@peerapos";
export const FACEBOOK_URL = "https://www.facebook.com/peerapos/";
export const TIKTOK_URL = "https://www.tiktok.com/@peera.pos";

export const FASTWORK_URL = "https://fastwork.com/user/peerapos";

// Starting prices as listed on Fastwork (checked 2026-10-16). Update both here and the FAQ text when they change.
export const SERVICES = [
  { th: "รับทำ Web App ระบบงานภายในธุรกิจ (สต็อก แจ้งซ่อม อนุมัติ รายงาน)", en: "Business web app (inventory, maintenance requests, approvals, reports)", type: "Web application development", price: 4500, unit: "project" },
  { th: "รับทำ LINE Bot / LINE OA อัตโนมัติ", en: "LINE Bot / LINE OA automation", type: "Chatbot development", price: 2500, unit: "project" },
  { th: "รับทำ Landing Page เว็บหน้าเดียว", en: "One-page landing page", type: "Website development", price: 2500, unit: "project" },
] as const;

export type Faq = { q: string; a: string };

export const FAQ: Record<"th" | "en", Faq[]> = {
  th: [
    {
      q: "PeerapoS รับทำแอปแบบไหนบ้าง",
      a: "รับทำระบบงานหลังบ้านให้ธุรกิจ เช่น สต็อกสินค้า ส่งของและออกบิล แจ้งซ่อมและบำรุงรักษาเครื่องจักร งานหลังบ้านของโรงเรียน และ LINE Bot แจ้งเตือน มีทั้งเว็บแอปที่เปิดได้ทั้งมือถือ แท็บเล็ต และคอมพิวเตอร์ กับโปรแกรม Windows ที่ใช้ออฟไลน์ได้ ถ้างานของคุณยังอยู่ในสมุดหรือ Excel ก็คุยกันได้",
    },
    {
      q: "ราคาเท่าไร",
      a: "ขึ้นกับขนาดระบบ ระบบเล็กราว 5,000 บาท เช่น LINE Bot แจ้งเตือน เว็บหน้าเดียว หรือแอปที่ทำงานเดียว ระบบขนาดกลางราว 90,000 บาท เช่น ระบบส่งของและออกบิลของโรงงาน หรือระบบงานหลังบ้านของโรงเรียน ส่วนระบบใหญ่ที่ใช้หลายสาขา หลายแผนก หรือมีแอปมือถือกับ dashboard ไม่มีราคาตายตัว ต้องดูขอบเขตงานก่อน เล่างานมาทาง LINE หรืออีเมล เราจะส่งแบบสำรวจความต้องการให้กรอกฟรี แล้วบอกราคากับระยะเวลาให้ชัดก่อนเริ่ม ราคานี้ไม่มี VAT เพราะเราไม่ได้จดทะเบียน VAT หรือจ้างผ่าน Fastwork ก็ได้",
    },
    {
      q: "มีค่ารายเดือนไหม",
      a: "ค่าทำระบบจ่ายครั้งเดียว ไม่มีค่ารายเดือนให้เรา ถ้าระบบอยู่บนคลาวด์ คุณเปิดบัญชีคลาวด์กับโดเมนในชื่อบริษัทคุณเอง แล้วจ่ายตรงกับผู้ให้บริการ ส่วนใหญ่หลักพันบาทต่อเดือน ส่วนสัญญาดูแลรายปีหลังหมดประกันจะต่อหรือไม่ต่อก็ได้",
    },
    {
      q: "ข้อมูลและซอร์สโค้ดเป็นของใคร",
      a: "เป็นของคุณทั้งคู่ ข้อมูลส่งออกเป็น Excel หรือ CSV ได้ทุกเมื่อ พอจ่ายงวดสุดท้าย เราส่งมอบซอร์สโค้ด คู่มือ และรหัสผู้ดูแลระบบให้ครบ มีข้อเดียวคือ ถ้ามีคนอื่นแก้โค้ดโดยไม่ได้ตกลงกับเราก่อน เราจะรับดูแลระบบต่อไม่ได้",
    },
    {
      q: "ทำระบบหนึ่งตัวใช้เวลานานแค่ไหน",
      a: "ระบบเล็กใช้ไม่กี่วันถึงไม่กี่สัปดาห์ ระบบขนาดกลางราว 2–4 เดือน ระบบใหญ่ราว 5–7 เดือน ระหว่างทางเราเอาของจริงมาให้ลองเป็นระยะ ไม่ต้องรอจนเสร็จ ถ้าข้อมูลหรือคำตอบจากฝั่งคุณมาช้า วันส่งมอบก็เลื่อนตามเท่านั้นวัน",
    },
    {
      q: "ต้องเตรียมเอกสารสเปกก่อนไหม",
      a: "ไม่ต้อง เล่างานด้วยภาษาธรรมดาก่อน แล้วเราส่งแบบสำรวจความต้องการให้กรอก ข้อไหนไม่แน่ใจก็ตอบว่าไม่แน่ใจได้ จากนั้นเราทำข้อเสนอให้ดู ตกลงแล้วก็เซ็นสัญญาออนไลน์ ถ้าอยากเพิ่มงานนอกขอบเขต เราแจ้งราคาและเวลาเป็นลายลักษณ์อักษรให้คุณอนุมัติก่อนเริ่มทุกครั้ง",
    },
    {
      q: "แบ่งจ่ายเงินยังไง",
      a: "ระบบขนาดกลางขึ้นไปส่วนใหญ่แบ่ง 3 งวด 30% ตอนเซ็นสัญญา 30% ตอนทดสอบผ่าน และ 40% หลังใช้งานจริงและตรวจรับแล้ว โอนผ่านธนาคาร ถ้าเป็นบริษัทหัก ณ ที่จ่าย 3% ได้ เราออกใบเสร็จให้ทุกงวด",
    },
    {
      q: "ส่งมอบแล้วมีคนดูแลต่อไหม",
      a: "มี แก้บั๊กฟรีอย่างน้อย 3 เดือนหลังตรวจรับ หลังจากนั้นจะต่อสัญญาดูแลรายปีก็ได้ แจ้งปัญหาทาง LINE หรืออีเมล เราตอบภายใน 1 วันทำการ ถ้าระบบล่มทั้งระบบ เราเริ่มแก้ทันที",
    },
    {
      q: "ใครเป็นคนทำ",
      a: "พีระพงศ์ ศักดิ์สมมนต์ (พี) ตอนนี้เป็น Software Architect ที่ธนาคารแห่งประเทศไทย เคยเป็น Full-Stack Engineer ที่ Agoda จบ ป.โท Information Systems จาก Syracuse University และได้ใบรับรอง Microsoft Azure Solutions Architect Expert",
    },
    {
      q: "โปรแกรมฟรีจริงไหม",
      a: "ฟรีจริง ใช้ได้ภายในขีดจำกัดของแต่ละตัว ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ถ้าอยากปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก ทุกตัวใช้งานออฟไลน์บน Windows 10 และ 11 ข้อมูลเก็บอยู่ในเครื่องคุณเอง",
    },
  ],
  en: [
    {
      q: "What kind of apps does PeerapoS build?",
      a: "Back-office systems for businesses: inventory, deliveries and billing, machine maintenance requests, school administration, and LINE bot alerts. We build web apps that run on phones, tablets and desktops, and Windows programs that work offline. If your work still lives in a notebook or a spreadsheet, we can talk.",
    },
    {
      q: "How much does it cost?",
      a: "It depends on the size of the system. A small system is around 5,000 THB, such as a LINE bot alert, a one-page website or a single-task app. A mid-size system is around 90,000 THB, such as delivery and billing for a factory or a school's back office. A large system with several branches or departments, or with a mobile app and a dashboard, has no fixed price until we see the scope. Tell us about the work on LINE or by email and we send you a free requirements survey, then a clear price and timeline before anything starts. Prices carry no VAT because we are not VAT-registered. You can also hire us through Fastwork.",
    },
    {
      q: "Is there a monthly fee?",
      a: "You pay for the build once; there is no monthly fee to us. If the system runs in the cloud, you open the cloud and domain accounts in your company's name and pay the provider directly, usually a few thousand baht a month or less. A yearly support contract after the warranty is optional.",
    },
    {
      q: "Who owns the data and the source code?",
      a: "Both are yours. You can export your data to Excel or CSV at any time, and on the final payment we hand over the source code, the manuals and the admin accounts. One condition: if someone else changes the code without agreeing it with us first, we can no longer take on support for the system.",
    },
    {
      q: "How long does it take?",
      a: "A small system takes a few days to a few weeks, a mid-size system about 2–4 months, and a large one about 5–7 months. You get working pieces to try along the way instead of waiting for the end. If information or answers from your side arrive late, the delivery date moves by the same number of days.",
    },
    {
      q: "Do I need a spec document first?",
      a: "No. Describe the work in plain words, then fill in our requirements survey; \"not sure\" is a fine answer. We send you a proposal, and once you agree we sign the contract online. Anything outside the agreed scope gets a written price and timeline for you to approve before work starts.",
    },
    {
      q: "How are payments split?",
      a: "Mid-size and larger systems are usually paid in three parts: 30% at signing, 30% when testing passes, and 40% after go-live and your acceptance. Payment is by bank transfer; companies can withhold 3% tax, and we issue a receipt for every payment.",
    },
    {
      q: "Is there support after delivery?",
      a: "Yes. Bug fixes are free for at least 3 months after acceptance, and after that you can sign a yearly support contract. Report problems on LINE or by email: we reply within 1 working day, and if the whole system is down we start fixing it right away.",
    },
    {
      q: "Who builds the apps?",
      a: "Peerapong (Peter) Saksommon, a Software Architect at the Bank of Thailand and a former full-stack engineer at Agoda. He holds an MS in Information Systems from Syracuse University and is a Microsoft Certified Azure Solutions Architect Expert.",
    },
    {
      q: "Are the free apps really free?",
      a: "Yes, within each app's limits. No ads, no account needed, and the optional PeerapoS Pro subscription lifts the limits. Every app works offline on Windows 10 and 11, and your data stays on your own PC.",
    },
  ],
};
