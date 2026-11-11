// Windows desktop apps from ../electron, downloaded as the NSIS installer from each repo's GitHub
// release. No version is pinned here: dl.peerapongsm.dev/<slug> always serves the latest release.

type Copy = { tagline: string; description: string; chips: string[]; features: string[] };

export type DesktopApp = {
  name: string;
  icon: string;
  shots: number; // screenshot count in /apps/shots/<icon-name>-<1..n>.webp
  uiLang: "th" | "en";
  price?: number; // paid apps only: one-time price in baht, same as peerapos-licence worker/src/catalogue.ts
  th: Copy;
  en: Copy;
};

// Goes through the peerapos-dl Worker (electron/peerapos-dl), which 302s to the latest GitHub
// release asset; GitHub answers with Content-Disposition: attachment, so the download starts in place. Slug comes from the icon name (/apps/wash.png → wash).
export const downloadUrl = (a: DesktopApp) => {
  const slug = a.icon.slice("/apps/".length, -".png".length);
  return `https://dl.peerapongsm.dev/${slug}`;
};

// Screenshots are named after the icon: /apps/wash.png → /apps/shots/wash-1.webp … wash-n.webp
export const shotUrls = (a: DesktopApp) =>
  Array.from({ length: a.shots }, (_, i) => a.icon.replace("/apps/", "/apps/shots/").replace(".png", `-${i + 1}.webp`));

export const APPS: DesktopApp[] = [
  {
    name: "PeerapoS Wash",
    icon: "/apps/wash.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "สมุดร้านซักรีดและร้านสะดวกซัก",
      description:
        "ใช้ได้ทั้งร้านรับซักรีดและร้านเครื่องซักหยอดเหรียญ รับผ้า ติดตามสถานะ ออกใบเสร็จพร้อม QR พร้อมเพย์ ดูแลเครื่องหยอดเหรียญ และดูรายรับรายจ่าย",
      chips: ["รับผ้า", "สถานะผ้า", "พร้อมเพย์", "เครื่องหยอดเหรียญ", "แพ็กเกจ"],
      features: ["รับผ้าและตารางราคา", "สถานะผ้าและวันนัดรับ", "ใบเสร็จพร้อม QR พร้อมเพย์", "ลูกค้าประจำและแพ็กเกจ", "เครื่องหยอดเหรียญและงานซ่อมบำรุง", "ค่าใช้จ่ายและรายงานการเงิน"],
    },
    en: {
      tagline: "Logbook for laundry shops and laundromats.",
      description:
        "Works for a drop-off laundry and a coin-operated laundromat. Take in orders, track each bag, print receipts with a PromptPay QR, look after the coin machines and see money in and out.",
      chips: ["Orders", "Status", "PromptPay", "Coin machines", "Packages"],
      features: ["Order intake and price list", "Order status and pickup dates", "Receipts with PromptPay QR", "Regular customers and packages", "Coin machines and maintenance", "Expenses and finance reports"],
    },
  },
  {
    name: "PeerapoS Stock",
    icon: "/apps/stock.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "สต็อกสินค้า ร้านเล็กถึงโกดังย่อม",
      description:
        "รับเข้า เบิกออก ตรวจนับด้วยบาร์โค้ด ต้นทุนเฉลี่ยคิดให้เอง ของใกล้หมดก็รู้ก่อนขาด",
      chips: ["สินค้า", "บาร์โค้ด", "ตรวจนับ", "ต้นทุนเฉลี่ย"],
      features: ["รับสินค้าเข้าพร้อมต้นทุน", "เบิกออกและขาย", "ตรวจนับด้วยบาร์โค้ด", "ต้นทุนเฉลี่ยอัตโนมัติ", "เตือนของใกล้หมด", "สร้างบาร์โค้ด EAN-13 ของร้านและพิมพ์ฉลาก", "ตำแหน่งจัดเก็บสินค้า", "รายงานสต็อกคงเหลือ"],
    },
    en: {
      tagline: "Inventory for shops and small warehouses.",
      description:
        "Receive, issue and count stock with a barcode scanner. Moving-average cost is worked out for you, and low stock shows up before you run out.",
      chips: ["Products", "Barcodes", "Stock count", "Avg cost"],
      features: ["Receive stock with cost", "Issue and sell", "Barcode stock count", "Automatic moving-average cost", "Low-stock alerts", "In-store EAN-13 barcodes and labels", "Storage location per product", "Stock-on-hand report"],
    },
  },
  {
    name: "PeerapoS File",
    icon: "/apps/file.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "ออกเอกสารธุรกิจครบในที่เดียว",
      description:
        "ใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จ ใบกำกับภาษี ใบส่งสินค้า ใบสั่งซื้อ และใบสำคัญรับจ่าย คิด VAT หัก ณ ที่จ่าย และเขียนยอดเงินเป็นตัวหนังสือให้เอง ร้านที่ไม่ได้จด VAT ก็ออกใบส่งสินค้า/ใบแจ้งหนี้ได้ ใบเสนอราคาที่ลูกค้าตกลงแล้วก็แปลงเป็นใบแจ้งหนี้ได้ทันที",
      chips: ["ใบเสนอราคา", "ใบกำกับภาษี", "VAT 7%", "หัก ณ ที่จ่าย", "PDF"],
      features: ["ใบเสนอราคา", "ใบแจ้งหนี้", "ใบเสร็จและใบกำกับภาษี", "ใบส่งสินค้า/ใบแจ้งหนี้สำหรับร้านที่ไม่ได้จด VAT", "ใบสั่งซื้อ ใบสำคัญรับ ใบสำคัญจ่าย และใบรับรองแทนใบเสร็จ", "VAT 7% และหัก ณ ที่จ่าย", "ยอดเงินเป็นตัวหนังสือ", "QR พร้อมเพย์บนใบเสนอราคาและใบแจ้งหนี้", "บันทึกเป็น PDF หรือรูปภาพ"],
    },
    en: {
      tagline: "Every business document in one place.",
      description:
        "Quotations, invoices, receipts, full tax invoices, delivery notes, purchase orders, and receipt and payment vouchers. VAT, withholding tax and the amount in Thai words are done for you, a business without VAT registration can issue delivery note/invoices, and an accepted quote turns into an invoice in one click.",
      chips: ["Quotation", "Tax invoice", "VAT 7%", "Withholding", "PDF"],
      features: ["Quotations", "Invoices", "Receipts and tax invoices", "Delivery note/invoices for businesses without VAT", "Purchase orders, receipt and payment vouchers, substitute receipts", "VAT 7% and withholding tax", "Amount in Thai words", "PromptPay QR on quotations and invoices", "Save as PDF or image"],
    },
  },
  {
    name: "PeerapoS Pay",
    icon: "/apps/pay.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "เงินเดือนและงานบุคคล 5–50 คน",
      description:
        "คิดเงินเดือน OT วันลา ประกันสังคม และภาษีหัก ณ ที่จ่ายให้ครบ ออกสลิปเงินเดือน รายงาน ภ.ง.ด.1 สปส.1-10 และ 50 ทวิ ได้จากโปรแกรมเลย",
      chips: ["เงินเดือน", "OT", "วันลา", "ประกันสังคม", "ภ.ง.ด.1"],
      features: ["คำนวณเงินเดือนและ OT", "วันลาและโควตา", "ประกันสังคม", "ภาษีหัก ณ ที่จ่าย", "สลิปเงินเดือน", "ลูกจ้างต่างด้าว (บัตรชมพู พาสปอร์ต ใบอนุญาตทำงาน)", "ภ.ง.ด.1 สปส.1-10 50 ทวิ"],
    },
    en: {
      tagline: "Payroll and HR for 5–50 staff.",
      description:
        "Salary, overtime, leave, social security and withholding tax, all calculated. Payslips and the Thai filings (ภ.ง.ด.1, สปส.1-10, 50 ทวิ) come straight out of the app.",
      chips: ["Payroll", "Overtime", "Leave", "Social security", "PND1"],
      features: ["Salary and overtime", "Leave and quotas", "Social security", "Withholding tax", "Payslips", "Migrant workers (pink card, passport, work permit)", "ภ.ง.ด.1, สปส.1-10 and 50 ทวิ filings"],
    },
  },
  {
    name: "PeerapoS Garage",
    icon: "/apps/garage.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "อู่ซ่อมรถและร้านซ่อมมอเตอร์ไซค์",
      description:
        "ดูแลงานตั้งแต่รับรถ ใบเสนอราคา เคลมประกัน จนถึงรับเงินและส่งมอบ ตัดสต็อกอะไหล่ให้เอง เห็นกำไรของแต่ละงาน ขายอะไหล่หน้าร้านได้โดยไม่ต้องเปิดงานซ่อม ถ้าลูกค้ายังค้างจ่าย โปรแกรมจะเตือนก่อนปล่อยรถ",
      chips: ["ใบรับรถ", "ใบเสนอราคา", "เคลมประกัน", "อะไหล่", "ใบเสร็จ"],
      features: ["ใบรับรถ", "ใบเสนอราคาแยกอะไหล่กับค่าแรง", "ใบแจ้งหนี้พร้อม QR พร้อมเพย์", "เคลมประกัน ใส่ยอดที่ประกันอนุมัติทีละรายการ", "สต็อกอะไหล่", "ขายอะไหล่หน้าร้าน", "ต้นทุนภายในและกำไรต่องาน", "ใบเสร็จ", "เตือนนัดเช็กระยะ"],
    },
    en: {
      tagline: "For car garages and motorcycle shops.",
      description:
        "From check-in, quote and insurance claim to payment and hand-over. Parts come off stock automatically, you see the profit on every job, parts can be sold over the counter without opening a job, and the app stops you before releasing a car that still has money owing.",
      chips: ["Job card", "Quote", "Insurance claim", "Parts", "Receipt"],
      features: ["Job cards", "Quotes with parts and labour side by side", "Invoices with PromptPay QR", "Insurance claims with insurer-approved amounts per line", "Parts stock", "Counter sales of parts", "Internal costs and profit per job", "Receipts", "Service reminders"],
    },
  },
  {
    name: "PeerapoS Room",
    icon: "/apps/room.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "หอพักและห้องเช่า 10–200 ห้อง",
      description:
        "จดมิเตอร์น้ำไฟทั้งตึกในตารางเดียวหรือผ่าน Excel ออกบิลรายเดือนพร้อม QR พร้อมเพย์ ส่งรูปบิลเข้า LINE ได้ รับเช่ารายวันหรือรายสัปดาห์ก็ได้ พอผู้เช่าย้ายออกก็คิดเงินมัดจำคืนให้",
      chips: ["มิเตอร์", "บิลรายเดือน", "พร้อมเพย์", "สัญญาเช่า", "ย้ายออก"],
      features: ["ผังห้องพัก", "จดมิเตอร์น้ำไฟ หรือกรอกผ่าน Excel", "ค่าน้ำขั้นต่ำรายห้อง", "บิลรายเดือนพร้อม QR พร้อมเพย์", "ใบเสร็จ", "สัญญาเช่ารายเดือน รายสัปดาห์ และรายวัน", "คิดเงินย้ายออก", "สรุปรายเดือนทุกห้อง ส่งออก Excel", "นำเข้าห้องและผู้เช่าจาก Excel"],
    },
    en: {
      tagline: "Dorms and rentals, 10–200 rooms.",
      description:
        "Read every water and power meter in one grid or through Excel, issue monthly bills with a PromptPay QR, send bill images over LINE, rent by the day or week too, and settle deposits when a tenant moves out.",
      chips: ["Meters", "Monthly bills", "PromptPay", "Leases", "Move-out"],
      features: ["Room map", "Water and power meter readings, or fill them in Excel", "Minimum water charge per room", "Monthly bills with PromptPay QR", "Receipts", "Monthly, weekly and daily leases", "Move-out settlement", "Monthly summary of all rooms to Excel", "Import rooms and tenants from Excel"],
    },
  },
  {
    name: "PeerapoS Class",
    icon: "/apps/class.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "โรงเรียนกวดวิชาและสถาบันสอนพิเศษ",
      description:
        "ขายแพ็กเกจเป็นชั่วโมงหรือเป็นครั้ง เช็กชื่อแล้วตัดชั่วโมงให้เอง จัดตารางสอนได้ในตัว ถ้าครูหรือห้องชนกัน โปรแกรมจะบอกทันที",
      chips: ["นักเรียน", "แพ็กเกจเรียน", "ตารางสอน", "เช็กชื่อ"],
      features: ["ข้อมูลนักเรียน", "แพ็กเกจชั่วโมงและรายครั้ง", "ตารางสอน", "เช็กชื่อตัดชั่วโมง", "ใบเสร็จและผ่อนชำระ", "ค่าสอนครู"],
    },
    en: {
      tagline: "For tutoring centers and small schools.",
      description:
        "Sell hour or session packages, check students in and the balance updates itself. Build the timetable in-app — teacher or room clashes are flagged right away.",
      chips: ["Students", "Packages", "Timetable", "Check-in"],
      features: ["Student records", "Hour and session packages", "Timetable", "Check-in deducts hours", "Receipts and instalments", "Teacher pay"],
    },
  },
  {
    name: "PeerapoS CRM",
    icon: "/apps/crm.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "สมุดลูกค้าและติดตามงานขาย",
      description:
        "เปิดโปรแกรมมาก็เห็นว่าวันนี้ต้องทักใคร ใครเลยนัด ดีลไหนใกล้ปิด จดบันทึกการคุยได้ในไม่กี่วินาที ไม่ต้องจำเองอีกต่อไป",
      chips: ["ลูกค้า", "ดีล", "นัดติดตาม", "วันเกิด", "PDPA"],
      features: ["รายชื่อลูกค้า", "ดีลและสถานะการขาย", "นัดติดตามรายวัน", "บันทึกการคุย", "วันเกิดลูกค้า", "รายงานยอดขาย"],
    },
    en: {
      tagline: "A customer book with follow-ups.",
      description:
        "Open it and see who to contact today, who's overdue and which deals are about to close. Log a conversation in seconds and stop keeping it all in your head.",
      chips: ["Customers", "Deals", "Follow-ups", "Birthdays", "PDPA"],
      features: ["Customer list", "Deals and sales stages", "Daily follow-ups", "Conversation log", "Customer birthdays", "Sales reports"],
    },
  },
  {
    name: "PeerapoS Campaign",
    icon: "/apps/campaign.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "วางแผนและวัดผลแคมเปญการตลาด",
      description:
        "วางคอนเทนต์บนปฏิทินที่ใส่วันเซลล์ วันหยุด และวันเงินเดือนออกไว้ให้แล้ว จดค่าโฆษณากับผลลัพธ์ แล้วโปรแกรมจะสรุปเป็นรายงานหน้าเดียว",
      chips: ["ปฏิทินการตลาด", "คอนเทนต์", "งบโฆษณา", "รายงาน"],
      features: ["ปฏิทินการตลาดไทย (วันเซลล์ วันหยุด วันเงินเดือนออก)", "วางคอนเทนต์รายเดือน", "บันทึกงบโฆษณาและผลลัพธ์", "คำนวณตัวชี้วัดอัตโนมัติ", "รายงานหน้าเดียว PDF/PNG/Excel"],
    },
    en: {
      tagline: "Plan and measure marketing campaigns.",
      description:
        "Lay out content on a calendar that already knows Thai sale days, holidays and paydays. Log ad spend and results, and get a one-page report.",
      chips: ["Calendar", "Content", "Ad spend", "Report"],
      features: ["Thai marketing calendar (sale days, holidays, paydays)", "Monthly content planning", "Ad spend and results log", "Metrics calculated for you", "One-page report in PDF/PNG/Excel"],
    },
  },
  {
    name: "PeerapoS Plan",
    icon: "/apps/plan.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "วางแผนโปรเจกต์และงาน",
      description:
        "รวมงานทุกโปรเจกต์ไว้ที่เดียว ดูได้ทั้งลิสต์ บอร์ด ปฏิทิน และไทม์ไลน์ มีสปรินต์ เป้าหมาย บันทึกเวลา และพิมพ์รายงานเป็น PDF ข้อมูลเข้ารหัสไว้ในเครื่อง",
      chips: ["บอร์ด", "ไทม์ไลน์", "สปรินต์", "เป้าหมาย", "บันทึกเวลา"],
      features: ["ลิสต์และบอร์ด", "ปฏิทินและไทม์ไลน์", "สปรินต์และเป้าหมาย", "บันทึกเวลา", "แจ้งเตือน", "ส่งออก PDF/Excel"],
    },
    en: {
      tagline: "Project and task planner.",
      description:
        "Every project in one place — list, board, calendar or timeline — with sprints, goals, time tracking and PDF reports. Data is encrypted on your PC.",
      chips: ["Board", "Timeline", "Sprints", "Goals", "Time tracking"],
      features: ["List and board", "Calendar and timeline", "Sprints and goals", "Time tracking", "Reminders", "PDF/Excel export"],
    },
  },
  {
    name: "PeerapoS BCP",
    icon: "/apps/bcp.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "แผนฉุกเฉินและแผนธุรกิจต่อเนื่อง",
      description:
        "ช่วยธุรกิจเล็กเขียนแผนรับมือเหตุฉุกเฉิน ประเมินความเสี่ยง เตรียมรายชื่อผู้ติดต่อ ซ้อมแผน และใช้ตอนเกิดเหตุจริง พิมพ์แผน บัตรพกพา และโปสเตอร์ได้",
      chips: ["ความเสี่ยง", "ผู้ติดต่อ", "ซ้อมแผน", "โหมดเกิดเหตุ"],
      features: ["ประเมินความเสี่ยง", "งานสำคัญและทรัพยากร", "รายชื่อผู้ติดต่อและสายด่วน", "คู่มือรับมือเหตุ", "ซ้อมแผน", "โหมดเกิดเหตุ"],
    },
    en: {
      tagline: "Emergency and business continuity plan.",
      description:
        "Helps a small business write its emergency plan: assess risks, list contacts, run drills and use it when something actually happens. Prints the plan, wallet cards and a poster.",
      chips: ["Risks", "Contacts", "Drills", "Incident mode"],
      features: ["Risk assessment", "Critical work and resources", "Contacts and hotlines", "Response playbooks", "Drills", "Incident mode"],
    },
  },
  {
    name: "PeerapoS School",
    icon: "/apps/school.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "สมุดครูและงานครูประจำชั้น",
      description:
        "จัดตารางสอน เช็คชื่อ กรอกคะแนน แล้วตัดเกรดตามหลักสูตรแกนกลางให้เอง มีงานครูประจำชั้นครบ ทั้งเยี่ยมบ้าน คัดกรอง SDQ และคะแนนความประพฤติ พิมพ์ ปพ.5 และส่งออก Excel ไปกรอก SGS ได้",
      chips: ["ตารางสอน", "เช็คชื่อ", "ตัดเกรด", "SDQ", "ปพ.5"],
      features: ["ตารางสอน", "เช็คชื่อรายคาบและหน้าเสาธง", "ตามการบ้านรายวัน", "กรอกคะแนนและตัดเกรด", "ร มส ผ มผ", "เยี่ยมบ้านและคัดกรอง SDQ", "คะแนนความประพฤติ", "พิมพ์ ปพ.5 และ Excel สำหรับ SGS"],
    },
    en: {
      tagline: "Teacher's gradebook and homeroom tasks.",
      description:
        "Timetable, attendance and scores, with grades calculated to the Thai core curriculum. Homeroom work too — home visits, SDQ screening and conduct points. Prints the ปพ.5 report and exports Excel for SGS.",
      chips: ["Timetable", "Attendance", "Grading", "SDQ", "ปพ.5"],
      features: ["Timetable", "Per-period and morning-assembly attendance", "Daily homework tracking", "Scores and grading", "ร / มส / ผ / มผ results", "Home visits and SDQ screening", "Conduct points", "Print ปพ.5 and Excel for SGS"],
    },
  },
  {
    name: "PeerapoS Trip",
    icon: "/apps/trip.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "งานบริษัททัวร์ขนาดเล็ก",
      description:
        "เปิดรอบเดินทาง รับจอง จัดห้องพัก รับเงินแล้วออกใบเสร็จและใบกำกับภาษีให้เอง คืนเงินพร้อมใบลดหนี้ ตรวจอายุพาสปอร์ต ส่งรายชื่อให้บริษัทประกัน และดูกำไรของแต่ละกรุ๊ป",
      chips: ["รอบเดินทาง", "การจอง", "ใบกำกับภาษี", "จัดห้อง", "กำไรรายกรุ๊ป"],
      features: ["รอบเดินทางและที่นั่ง", "การจองและผู้เดินทาง", "ใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จ/ใบกำกับภาษี", "QR พร้อมเพย์บนใบเสนอราคาและใบแจ้งหนี้", "ยกเลิกและคืนเงินพร้อมใบลดหนี้", "จัดห้องพัก", "ตรวจพาสปอร์ตและรายชื่อส่งประกัน", "ต้นทุนและกำไรรายกรุ๊ป", "พิมพ์โปรแกรมทัวร์"],
    },
    en: {
      tagline: "Small tour operator back office.",
      description:
        "Open departures, take bookings, assign rooms, collect payments and issue receipts and tax invoices. Refunds with credit notes, passport expiry checks, insurer name lists and profit per group.",
      chips: ["Departures", "Bookings", "Tax invoices", "Rooming", "Group profit"],
      features: ["Departures and seats", "Bookings and travellers", "Quotes, invoices, receipts/tax invoices", "PromptPay QR on quotes and invoices", "Cancellations and refunds with credit notes", "Rooming lists", "Passport checks and insurer name lists", "Cost and profit per group", "Printable itineraries"],
    },
  },
  {
    name: "PeerapoS Pilates",
    icon: "/apps/pilates.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "หน้าเคาน์เตอร์สตูดิโอพิลาทิส",
      description:
        "จองคลาสได้ไม่เกินจำนวนเครื่องรีฟอร์มเมอร์ที่ใช้ได้จริง มีคนยกเลิกแล้วคนในรายชื่อรอได้ที่เอง ขายและพักแพ็กเกจเครดิต ออกใบเสร็จพร้อม QR พร้อมเพย์ และสรุปค่าสอนครูให้",
      chips: ["จองคลาส", "รายชื่อรอ", "แพ็กเกจเครดิต", "พร้อมเพย์", "ค่าสอนครู"],
      features: ["ตารางคลาสรายสัปดาห์", "ที่นั่งตามจำนวนเครื่องที่ใช้งานได้", "รายชื่อรอ", "แพ็กเกจเครดิตและการพักแพ็กเกจ", "นโยบายยกเลิกไม่ทันเวลาและไม่มา", "ใบเสร็จ/ใบกำกับภาษีและ QR พร้อมเพย์", "คืนเงินและใบลดหนี้", "ความยินยอมข้อมูลสุขภาพ", "ค่าสอนครู"],
    },
    en: {
      tagline: "Front desk for a Pilates studio.",
      description:
        "Class booking capped at the reformers actually in service, with an auto-filling waitlist. Sell and pause credit packs, issue receipts with a PromptPay QR, and total up instructor pay.",
      chips: ["Booking", "Waitlist", "Credit packs", "PromptPay", "Instructor pay"],
      features: ["Weekly class board", "Spots capped at reformers in service", "Waitlist", "Credit packs and pausing", "Late-cancel and no-show policy", "Receipts/tax invoices with PromptPay QR", "Refunds and credit notes", "Health-data consent", "Instructor pay"],
    },
  },
  {
    name: "PeerapoS Repair",
    icon: "/apps/repair.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "หน้าเคาน์เตอร์ร้านซ่อมมือถือ",
      description:
        "รับเครื่องแล้วพิมพ์ใบรับซ่อมกับป้ายติดเครื่อง ส่งราคาให้ลูกค้าตกลงก่อนซ่อม ตัดสต็อกอะไหล่ ดูงานทั้งร้านบนกระดาน ส่งมอบพร้อมใบรับประกัน และสรุปค่าคอมช่าง รหัสปลดล็อกเครื่องเข้ารหัสเก็บในคอมของร้าน",
      chips: ["ใบรับซ่อม", "สต็อกอะไหล่", "รับประกัน", "พร้อมเพย์", "ค่าคอมช่าง"],
      features: ["ใบรับซ่อมและป้ายติดเครื่อง", "ฝากรหัสปลดล็อกแบบซ่อนไว้", "ส่งราคาและบันทึกการตกลงของลูกค้า", "กระดานงานซ่อม", "สต็อกอะไหล่", "ขายอะไหล่หน้าร้าน", "ใบเสร็จ/ใบกำกับภาษีและ QR พร้อมเพย์", "คืนเงินและใบลดหนี้", "ส่งมอบเครื่องและใบรับประกัน", "งานเคลม", "ข้อความ LINE แจ้งลูกค้า", "ค่าคอมช่าง"],
    },
    en: {
      tagline: "Front desk for a phone repair shop.",
      description:
        "Check devices in with a printed repair ticket and tag, get the customer's OK on a quote before work starts, draw parts from stock, track every job on one board, and hand back with a warranty slip. Unlock codes stay encrypted on the shop's PC.",
      chips: ["Repair tickets", "Parts stock", "Warranty", "PromptPay", "Tech commission"],
      features: ["Repair tickets and device tags", "Hidden unlock-code storage", "Quotes with customer approval", "Repair job board", "Parts stock", "Counter sales of parts", "Receipts/tax invoices with PromptPay QR", "Refunds and credit notes", "Handover with warranty slip", "Warranty claims", "LINE messages to customers", "Technician commission"],
    },
  },
  {
    name: "PeerapoS Studio",
    icon: "/apps/studio.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "หน้าเคาน์เตอร์ห้องซ้อมดนตรีและห้องอัด",
      description:
        "ดูห้องว่างทั้งร้านบนตารางเดียว รับจองพร้อมมัดจำ รับวอล์กอิน บันทึกเข้าห้องออกห้องแล้วคิดเวลาเกินให้เอง ขายแพ็กชั่วโมง ให้เช่าอุปกรณ์เสริม และปิดยอดเงินสดทุกวัน",
      chips: ["จองห้อง", "มัดจำ", "แพ็กชั่วโมง", "พร้อมเพย์", "ปิดยอด"],
      features: ["ตารางห้องรายวันและรายสัปดาห์", "จองพร้อมมัดจำและกันจองซ้อน", "วอล์กอิน", "เข้าห้อง ออกห้อง และคิดเวลาเกิน", "แพ็กชั่วโมง", "อุปกรณ์เสริมและซาวด์เอนจิเนียร์", "ราคาตามช่วงเวลา", "ใบเสร็จ/ใบกำกับภาษีและ QR พร้อมเพย์", "คืนเงินและใบลดหนี้", "ปิดยอดประจำวัน", "ข้อความ LINE แจ้งลูกค้า"],
    },
    en: {
      tagline: "Front desk for a rehearsal and recording studio.",
      description:
        "See every free room on one board, take bookings with deposits and walk-ins, check in and out with overtime worked out for you, sell hour packs, rent out extra gear, and close the cash drawer each day.",
      chips: ["Room booking", "Deposits", "Hour packs", "PromptPay", "Day close"],
      features: ["Daily and weekly room board", "Deposits and double-booking guard", "Walk-ins", "Check-in, check-out and overtime", "Hour packs", "Gear rental and sound engineers", "Time-of-day pricing", "Receipts/tax invoices with PromptPay QR", "Refunds and credit notes", "Daily close", "LINE messages to customers"],
    },
  },
  {
    name: "PeerapoS Pharmacy",
    icon: "/apps/pharmacy.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "ระบบหน้าร้านสำหรับร้านขายยาเล็ก",
      description:
        "ขายด้วยสแกนเนอร์ ตัดยาตามล็อตที่หมดอายุก่อน เตือนเมื่อลูกค้าแพ้ยา พิมพ์ฉลากยาให้เอง รับสินค้าพร้อมล็อตและวันหมดอายุ และออกบัญชี ข.ย.9–13 ได้ทุกเมื่อ ไม่จำกัดจำนวนสินค้าหรือบิล",
      chips: ["ขายหน้าร้าน", "ล็อตและวันหมดอายุ", "แพ้ยา", "ฉลากยา", "บัญชี ข.ย."],
      features: ["ขายด้วยบาร์โค้ดหรือปุ่มรูปสินค้า", "ตัดล็อตที่หมดอายุก่อนให้อัตโนมัติ", "เตือนแพ้ยาและยาที่ต้องมีใบสั่งยา", "พิมพ์ฉลากยาหลังรับเงิน", "ใบเสร็จ/ใบกำกับภาษีและ QR พร้อมเพย์", "ใบสั่งซื้อ รับสินค้า และคืนสินค้า", "ตรวจนับสต็อก", "สร้างบาร์โค้ด EAN-13 ของร้าน", "บัญชี ข.ย.9–13", "โปรโมชันและแต้มสะสม", "ลิ้นชักเก็บเงิน", "รายงานยอดขาย กำไร และของใกล้หมดอายุ"],
    },
    en: {
      tagline: "Point of sale for a small pharmacy.",
      description:
        "Sell with a barcode scanner, draw stock from the lot that expires first, get warned about a customer's drug allergy, print dosage labels automatically, receive stock with lot and expiry, and print the Thai FDA ข.ย.9–13 registers whenever you need them. No limits on items or bills.",
      chips: ["Point of sale", "Lots and expiry", "Allergy alerts", "Drug labels", "FDA registers"],
      features: ["Barcode and picture-button selling", "First-expiry-first-out lots", "Allergy and prescription checks", "Dosage labels after payment", "Receipts/tax invoices with PromptPay QR", "Purchase orders, receiving and supplier returns", "Stock count", "In-store EAN-13 barcodes", "Thai FDA ข.ย.9–13 registers", "Promotions and loyalty points", "Cash drawer", "Sales, profit and expiry reports"],
    },
  },
  {
    name: "PeerapoS POS",
    icon: "/apps/pos.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "ระบบหน้าร้านสำหรับร้านอาหาร คาเฟ่ และร้านขายของเล็ก",
      description:
        "เปิดโต๊ะจากผังร้านหรือขายที่เคาน์เตอร์ ส่งใบสั่งเข้าครัวและบาร์ แยกบิลหรือหารเท่ากันก็ได้ คิด VAT และค่าบริการให้ รับเงินสด พร้อมเพย์ โอน หรือบัตร ตัดวัตถุดิบตามสูตรทุกครั้งที่ขาย และปิดกะพร้อมนับเงินในลิ้นชัก มีจอลูกค้า โปรโมชันลดราคาอัตโนมัติ และ PIN แยกพนักงาน ร้านขายของก็ใช้ได้ ไม่จำกัดจำนวนเมนูหรือบิล",
      chips: ["โต๊ะและเคาน์เตอร์", "ใบสั่งเข้าครัว", "แยกบิล", "จอลูกค้า", "โปรโมชัน", "สมาชิกและแต้ม"],
      features: ["ผังโต๊ะ หรือขายที่เคาน์เตอร์พร้อมเลขคิว", "เมนูมีขนาดและตัวเลือก เช่น เผ็ดน้อย ไข่ดาว", "ส่งใบสั่งแยกตามจุดทำ ครัวหรือบาร์", "ย้ายโต๊ะ รวมโต๊ะ ยกเลิกรายการ พร้อมใบแจ้งครัว", "แยกบิลตามรายการหรือหารเท่ากัน", "VAT และค่าบริการ", "ใบเสร็จ ใบกำกับภาษีอย่างย่อและเต็มรูป พร้อม QR พร้อมเพย์", "สต๊อกวัตถุดิบตัดตามสูตร พร้อมต้นทุนอาหาร", "เปิดปิดกะและนับเงินในลิ้นชัก", "จอลูกค้าบนจอที่สอง พร้อม QR พร้อมเพย์และสไลด์โฆษณา", "โปรโมชันลดราคาอัตโนมัติตามวัน เวลา สมาชิก หรือเมนู", "พนักงานมี PIN ของตัวเอง ชื่อขึ้นในบิลและกะ", "โหมดร้านขายของ สแกนบาร์โค้ด", "สมาชิกและแต้มสะสม", "รายงานยอดขาย เมนูขายดี กำไรขั้นต้น ยอดตามพนักงาน และภาษีขาย"],
    },
    en: {
      tagline: "Point of sale for a small restaurant, café or shop.",
      description:
        "Open a table from the floor plan or sell at the counter, send orders to the kitchen and bar, split a bill by item or evenly, add VAT and service charge, take cash, PromptPay, transfer or card, deduct ingredients by recipe with every sale, and close each shift with a cash count. Comes with a customer display, automatic promotions and a PIN for each staff member, and works for a retail shop too. No limits on menu items or bills.",
      chips: ["Tables and counter", "Kitchen tickets", "Split bills", "Customer display", "Promotions", "Members and points"],
      features: ["Floor plan, or counter mode with queue numbers", "Menu sizes and options", "Tickets per station: kitchen or bar", "Move, merge and void with kitchen slips", "Split by item or evenly", "VAT and service charge", "Receipts and abbreviated/full tax invoices with PromptPay QR", "Recipe-based ingredient stock with food cost", "Shifts with a cash-drawer count", "Customer display on a second screen with PromptPay QR and ad slides", "Automatic promotions by date, time, member or menu item", "Staff PINs, with names on bills and shifts", "Retail shop mode with barcode scanning", "Members and loyalty points", "Sales, top-item, gross-profit, per-staff and sales-tax reports"],
    },
  },
  {
    name: "PeerapoS Massage",
    icon: "/apps/massage.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "ระบบหน้าร้านสำหรับร้านนวดและสปาเล็ก",
      description:
        "ดูเตียงและห้องทั้งร้านเป็นการ์ด เห็นทันทีว่าเตียงไหนว่าง เตียงไหนกำลังนวด และเหลืออีกกี่นาที พอหมอลงเวลาเข้างาน โปรแกรมก็เรียงคิวให้เอง รับลูกค้าเดินเข้าหรือจองล่วงหน้าได้โดยหมอกับเตียงไม่ซ้อนเวลา ต่อเวลา ขายคอร์ส รับพร้อมเพย์ผ่าน QR คิดค่ามือพร้อมใบสรุป แล้วปิดยอดประจำวันด้วยการนับเงินในลิ้นชัก ใช้ฟรี ข้อมูลอยู่ในเครื่องของร้าน ไม่ต้องต่ออินเทอร์เน็ต",
      chips: ["การ์ดเตียง", "คิวหมอนวด", "จองล่วงหน้า", "ค่ามือ", "คอร์สนวด"],
      features: ["การ์ดเตียงและห้อง บอกเวลาที่เหลือของแต่ละเตียง", "เตือนเมื่อใกล้หมดเวลาหรือเกินเวลา", "ตารางเวลาตามหมอนวดหรือตามเตียง", "คิวหมอเรียงให้เองตามเวลาเข้างาน เลือกรีเควสได้", "ลูกค้าเดินเข้าและจองล่วงหน้า หมอกับเตียงไม่ซ้อนเวลา", "ต่อเวลา บริการเสริม ส่วนลด และแบ่งจ่าย", "ใบเสร็จและใบกำกับภาษีเต็มรูป พร้อม QR พร้อมเพย์", "คอร์สนวดตัดชั่วโมงทีละครั้ง เตือนก่อนหมดอายุ", "ค่ามือแบบบาทต่อครั้งหรือเปอร์เซ็นต์ พร้อมประกันมือ ทิป และเบิกล่วงหน้า", "ใบสรุปค่ามือตามช่วงวันที่จ่าย", "ปิดยอดประจำวันและนับเงินในลิ้นชัก", "รายงานยอดขาย ยอดตามหมอนวด และภาษีขาย"],
    },
    en: {
      tagline: "Front desk for a small massage shop or spa.",
      description:
        "See every bed and room as a card with the minutes left on each session, let the therapist queue order itself from clock-in times, take walk-ins and bookings without double-booking a therapist or bed, extend sessions, sell massage courses, take PromptPay by QR, work out therapist pay with payout slips, and close each day with a cash count. Free, with your data kept on the shop's own PC and no internet needed.",
      chips: ["Bed cards", "Therapist queue", "Bookings", "Therapist pay", "Courses"],
      features: ["Bed and room cards with time left", "Near-end and over-time alerts", "Time board by therapist or by bed", "Automatic therapist queue with requests", "Walk-ins and bookings with no double-booking", "Extensions, add-ons, discounts and split payments", "Receipts and full tax invoices with PromptPay QR", "Massage courses used hour by hour, with expiry reminders", "Therapist pay per session or by percentage, with daily minimum, tips and advances", "Payout slips by pay period", "Day close with a cash-drawer count", "Sales, per-therapist and sales-tax reports"],
    },
  },
  {
    name: "PeerapoS Budget",
    icon: "/apps/budget.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "ระบบคุมงบประมาณสำหรับกลุ่มบริษัทเล็ก",
      description:
        "วางแผนงบประจำปีของทุกบริษัทในที่เดียว แตกรายการย่อย กระจายงบรายเดือน แล้วส่งขออนุมัติตามขั้นที่ตั้งไว้ พอแผนอนุมัติแล้ว จะปรับงบหรือโอนงบต้องทำผ่านเอกสารที่มีผู้อนุมัติ PO ที่อนุมัติแล้วกันงบไว้ทันที ค่าใช้จ่ายที่ Post แล้วกลายเป็นยอดใช้จริง และดูงบเทียบใช้จริงกับพยากรณ์สิ้นปีได้ทุกเมื่อ ใช้ฟรี ข้อมูลอยู่ในเครื่องของคุณ ไม่ต้องต่ออินเทอร์เน็ต",
      chips: ["แผนงบประจำปี", "ขั้นอนุมัติ", "ภาระผูกพัน PO", "งบเทียบใช้จริง", "หลายบริษัท"],
      features: ["แผนงบของทุกบริษัทและทุกปีงบในไฟล์เดียว", "รายการหัวข้อและรายการย่อย แยกงบประจำกับงบโครงการ", "กระจายงบรายเดือนแบบเท่ากัน รายไตรมาส ครั้งเดียว หรือกำหนดเอง", "ส่งขออนุมัติหลายขั้น บันทึกชื่อผู้อนุมัติทุกขั้น", "ปรับปรุงงบและโอนงบผ่านเอกสารที่มีผู้อนุมัติ", "PO กันงบ และค่าใช้จ่ายพร้อม VAT หัก ณ ที่จ่าย และไฟล์แนบ", "สัญญาและการต่ออายุ พร้อมเตือนก่อนครบกำหนด", "แดชบอร์ด งบเทียบใช้จริง Pivot และพยากรณ์สิ้นปี", "รายงานมาตรฐาน 15 แบบ ส่งออก Excel, CSV และ PDF", "นำเข้างบจาก Excel พร้อมกระทบยอด", "ประวัติการแก้ไขที่ตรวจย้อนได้ และสำรองข้อมูลแบบเข้ารหัส"],
    },
    en: {
      tagline: "Budget control for a small group of companies.",
      description:
        "Plan every company's annual budget in one place: break it into lines, spread them over the months, and submit the plan through your approval steps. Once a plan is approved, budgets change only through adjustments and transfers that someone approves. An approved PO reserves budget at once, posted expenses become actuals, and budget vs actual and the year-end forecast are always up to date. Free, with your data kept on your own PC and no internet needed.",
      chips: ["Annual plans", "Approval steps", "PO commitments", "Budget vs actual", "Multi-company"],
      features: ["Every company and fiscal year in one file", "Header and sub-lines, recurring and project budgets", "Monthly spread: even, quarterly, one-time or custom", "Multi-step approval with every approver's name recorded", "Adjustments and transfers through approved documents", "POs that reserve budget, and expenses with VAT, withholding tax and attachments", "Contracts and renewals with notice reminders", "Dashboard, budget vs actual, pivot and year-end forecast", "15 standard reports exported to Excel, CSV and PDF", "Excel import with reconciliation", "Tamper-evident change history and encrypted backups"],
    },
  },
];

// Paid apps: not on sale yet, shown as "coming soon". Prices are one-time and must match the licence
// server catalogue (electron/peerapos-licence worker/src/catalogue.ts). Copy from each app's docs/spec.md.
export const PAID_APPS: DesktopApp[] = [
  {
    name: "PeerapoS Account",
    icon: "/apps/account.png",
    shots: 5,
    uiLang: "th",
    price: 9990,
    th: {
      tagline: "โปรแกรมบัญชีสำหรับบริษัทและสำนักงานบัญชี ไม่ขึ้นคลาวด์",
      description:
        "ลงบัญชีคู่จากเอกสารประจำวัน ออกใบกำกับภาษี ทำรายงานภาษีซื้อภาษีขายและตัวเลข ภ.พ.30 ออก 50 ทวิ และ ภ.ง.ด.3/53 พร้อมไฟล์สำหรับ RD Prep ปิดงบปลายปีเรียงตามรายการของกรมพัฒนาธุรกิจการค้า ย้ายข้อมูลจากโปรแกรมเดิมด้วย Excel หรือ DBF ใช้หลายเครื่องในออฟฟิศผ่าน LAN ข้อมูลบัญชีเข้ารหัสและอยู่ในเครื่องของคุณเท่านั้น",
      chips: ["บัญชีคู่", "ใบกำกับภาษี", "ภ.พ.30", "50 ทวิ", "หลายเครื่องผ่าน LAN"],
      features: ["สมุดรายวัน บัญชีแยกประเภท และงบทดลองที่ลงตัวทุกสตางค์", "ใบเสนอราคา ใบแจ้งหนี้ ใบกำกับภาษี ใบเสร็จ ใบลดหนี้ และใบเพิ่มหนี้", "ซื้อและจ่ายเงิน พร้อมหัก ณ ที่จ่ายและหนังสือรับรอง 50 ทวิ", "รายงานภาษีซื้อ ภาษีขาย และตัวเลขสำหรับ ภ.พ.30", "ภ.ง.ด.3 และ ภ.ง.ด.53 พร้อมไฟล์สำหรับ RD Prep", "กระทบยอดธนาคาร เช็ครับและเช็คจ่าย", "สินค้าคงเหลือ และสินทรัพย์ถาวรพร้อมค่าเสื่อมราคา", "ปิดบัญชีปลายปี งบการเงินตามรายการของ DBD และกระดาษทำการภาษีเงินได้นิติบุคคล", "ย้ายข้อมูลจากโปรแกรมเดิมด้วย Excel, CSV หรือ DBF", "หลายบริษัทในเครื่องเดียว", "ใช้หลายเครื่องพร้อมกันผ่าน LAN ข้อมูลที่ส่งถึงกันเข้ารหัส", "ผู้ใช้และสิทธิ์ ประวัติการแก้ไขที่ตรวจย้อนได้ และสำรองข้อมูลแบบเข้ารหัส"],
    },
    en: {
      tagline: "Accounting for companies and accounting offices, without the cloud.",
      description:
        "Turn daily documents into double-entry books. Issue tax invoices, produce the purchase and sales tax reports and the PP.30 figures, issue 50 Tawi certificates and PND 3/53 with the RD Prep file, and close the year with statements in DBD line-item order. Move your data in from your old program via Excel or DBF, and work on the same books from several PCs over the office LAN. Your books are encrypted and stay on your own PCs.",
      chips: ["Double entry", "Tax invoices", "PP.30", "50 Tawi", "Multi-PC over LAN"],
      features: ["Journals, ledgers and a trial balance that balances to the satang", "Quotations, invoices, tax invoices, receipts, credit and debit notes", "Purchases and payments with withholding tax and 50 Tawi certificates", "Purchase and sales tax reports with PP.30 figures", "PND 3 and PND 53 with the RD Prep file", "Bank reconciliation, cheques received and issued", "Inventory, and fixed assets with depreciation", "Year-end close, DBD line-item statements and a corporate income tax worksheet", "Move in from your old program via Excel, CSV or DBF", "Many companies on one PC", "Several PCs at once over the office LAN, encrypted between them", "Users and roles, a tamper-evident change history and encrypted backups"],
    },
  },
  {
    name: "PeerapoS Wholesale",
    icon: "/apps/wholesale.png",
    shots: 5,
    uiLang: "th",
    price: 8990,
    th: {
      tagline: "หน้าร้าน ใบส่งของ และเครดิตลูกค้า สำหรับร้านวัสดุก่อสร้าง",
      description:
        "ขายหน้าร้าน เสนอราคา ขายเชื่อ ส่งของด้วยรถ วางบิล และตามหนี้ลูกค้า สต็อกนับได้หลายหน่วย เช่น เหล็กเส้นเป็นเส้นหรือเป็นตัน เหมาะกับร้านวัสดุก่อสร้างและร้านขายส่ง",
      chips: ["ขายหน้าร้าน", "ขายเชื่อ", "ใบส่งของ", "วางบิล", "ระดับราคา"],
      features: ["ขายหน้าร้านและเสนอราคา", "ขายเชื่อและส่งของด้วยรถ", "ใบส่งของ/ใบกำกับภาษี/ใบแจ้งหนี้ในใบเดียว", "ติดตามของค้างส่ง", "วางบิล ใบเสร็จ และหัก ณ ที่จ่าย", "เช็คและอายุหนี้ลูกหนี้", "ราคา 5 ระดับ และหลายหน่วยต่อสินค้า", "ซื้อของเข้า นับสต็อก และพิมพ์ป้ายราคา", "ปิดกะและปิดวัน", "รายงานสินค้าและวัตถุดิบตามมาตรา 87 และส่งข้อมูลให้นักบัญชี"],
    },
    en: {
      tagline: "Counter, deliveries and customer credit for building-material shops.",
      description:
        "Sell at the counter, quote, sell on credit and deliver by truck, bill customers and chase what they owe. Stock can be counted in several units, such as rebar by the piece or by the tonne. Built for building-material shops and small wholesalers.",
      chips: ["Counter", "Credit sales", "Deliveries", "Billing runs", "Price levels"],
      features: ["Counter sales and quotations", "Credit sales and truck deliveries", "Combined delivery note, tax invoice and invoice", "Undelivered-goods tracking", "Billing runs, receipts and withholding tax", "Cheques and receivables ageing", "5 price levels and several units per product", "Purchases, stock counts and price labels", "Shift and day close", "Section 87 stock registers and accountant export"],
    },
  },
  {
    name: "PeerapoS Property",
    icon: "/apps/property.png",
    shots: 5,
    uiLang: "th",
    price: 7990,
    th: {
      tagline: "หอพักและอพาร์ตเมนต์หลายร้อยห้อง หลายอาคาร",
      description:
        "จดมิเตอร์แล้วออกบิลทั้งอาคารในครั้งเดียว รับเงิน ตามค่าเช่าค้าง ดูแลสัญญาเช่าตั้งแต่จองห้องจนย้ายออกและคืนเงินมัดจำ โปรแกรมเตือนเมื่อเงื่อนไขสัญญาขัดกับประกาศ สคบ. เรื่องธุรกิจให้เช่าที่อยู่อาศัย ใช้ได้หลายอาคารและหลายบริษัท",
      chips: ["มิเตอร์", "บิลรายเดือน", "สัญญาเช่า", "ค่าเช่าค้าง", "เงินมัดจำ"],
      features: ["ห้อง อาคาร และผู้เช่า", "จองห้องและย้ายเข้า พร้อมใบตรวจสภาพห้อง", "สัญญาเช่าและต่อสัญญา", "จดมิเตอร์แล้วออกบิลทั้งอาคารในครั้งเดียว", "ใบเสร็จและใบกำกับภาษี พร้อมหัก ณ ที่จ่าย", "ตามค่าเช่าค้าง", "ย้ายออกและคืนเงินมัดจำ", "ใบสั่งซ่อมและงานบำรุงรักษา", "พัสดุ กุญแจ และทะเบียนรถ", "ส่งข้อมูลรายเดือนให้นักบัญชี"],
    },
    en: {
      tagline: "Dorms and apartments with hundreds of rooms.",
      description:
        "Read the meters and bill a whole building in one go, collect rent, chase arrears, and run each lease from booking to move-out and deposit refund. The app warns you when a lease term clashes with the Thai consumer-protection rules for residential rentals. Handles several buildings and companies.",
      chips: ["Meters", "Monthly bills", "Leases", "Arrears", "Deposits"],
      features: ["Rooms, buildings and tenants", "Bookings and move-in with a condition report", "Leases and renewals", "Meter readings to batch billing", "Receipts and tax invoices with withholding tax", "Arrears follow-up", "Move-out and deposit refund", "Work orders and maintenance", "Parcels, keys and vehicles", "Monthly export for the accountant"],
    },
  },
  {
    name: "PeerapoS Academy",
    icon: "/apps/academy.png",
    shots: 5,
    uiLang: "th",
    price: 7990,
    th: {
      tagline: "ค่าเทอมและเงินเดือนครู สำหรับโรงเรียนเอกชนและอนุบาล",
      description:
        "ตั้งแต่ทะเบียนนักเรียนและครอบครัว แผนค่าเทอม ส่วนลดพี่น้อง ทุนการศึกษา ออกบิลทั้งโรงเรียน และใบเสร็จรายครอบครัว ไปจนถึงเงินเดือนครูพร้อมกองทุนสงเคราะห์และประกันสังคม",
      chips: ["ค่าเทอม", "ส่วนลดพี่น้อง", "ผ่อนชำระ", "เงินเดือนครู", "ใบรับรอง"],
      features: ["ทะเบียนครอบครัว ผู้ปกครอง และนักเรียน", "แผนค่าเทอมและส่วนลดพี่น้อง", "ทุนการศึกษา", "ออกบิลค่าเทอมทั้งโรงเรียน แบ่งงวดได้", "ใบเสร็จรายครอบครัวและเช็ค", "ลาออก ใบลดหนี้ และคืนเงินประกัน", "เช็คชื่อประจำชั้นและใบรับรองนักเรียน", "เงินเดือนครู กองทุนสงเคราะห์ และประกันสังคม", "ใบลาและสลิปเงินเดือน", "นำเข้าจาก Class, School, Pay และ Excel"],
    },
    en: {
      tagline: "School fees and teacher payroll for private schools and kindergartens.",
      description:
        "From student and family records, fee plans, sibling discounts and scholarships to whole-school billing and family receipts, through to teacher payroll with the private-school welfare fund and social security.",
      chips: ["Term fees", "Sibling discount", "Instalments", "Teacher payroll", "Certificates"],
      features: ["Families, guardians and students", "Fee plans and sibling discounts", "Scholarships", "Term billing for the whole school, in instalments", "Family receipts and cheques", "Withdrawals, credit notes and deposit refunds", "Homeroom roll and student certificates", "Teacher payroll, welfare fund and social security", "Leave and payslips", "Import from Class, School, Pay and Excel"],
    },
  },
  {
    name: "PeerapoS Service",
    icon: "/apps/service.png",
    shots: 5,
    uiLang: "th",
    price: 5990,
    th: {
      tagline: "ใบงานซ่อมและงานบริการ สำหรับร้านที่มีช่างหลายคน",
      description:
        "รับงานซ่อมรถ มือถือ คอมพิวเตอร์ แอร์ และเครื่องใช้ไฟฟ้า แจกงานให้ช่างบนกระดานงาน ออกใบกำกับภาษี และวางบิลลูกค้าบริษัท ลูกค้าฟลีท และบริษัทประกันที่หัก ณ ที่จ่าย",
      chips: ["ใบงาน", "กระดานช่าง", "ลูกค้าฟลีท", "งานประกัน", "สัญญา PM"],
      features: ["รับงานและใบงานซ่อม", "กระดานงานของช่างแต่ละคน", "งานนอกสถานที่", "ลูกค้าบริษัท ฟลีท และบริษัทประกัน", "เครดิตและวางบิล", "ใบเสร็จ ใบกำกับภาษี และหัก ณ ที่จ่าย", "สัญญาบำรุงรักษา (PM)", "รูปถ่ายประกอบงานเคลม", "ใช้หลายเครื่องผ่าน LAN", "นำเข้าจาก Repair และ Garage"],
    },
    en: {
      tagline: "Job tickets for service shops with several technicians.",
      description:
        "For car garages, phone and computer repair, and aircon and appliance service. Assign jobs to technicians on a board, issue tax invoices, and bill company, fleet and insurer customers who withhold tax.",
      chips: ["Job tickets", "Technician board", "Fleet", "Insurer jobs", "PM contracts"],
      features: ["Job intake and repair tickets", "A job board per technician", "On-site jobs", "Company, fleet and insurer customers", "Credit terms and billing runs", "Receipts, tax invoices and withholding tax", "Preventive-maintenance contracts", "Claim photos on the job", "Several PCs over LAN", "Import from Repair and Garage"],
    },
  },
  {
    name: "PeerapoS Contractor",
    icon: "/apps/contractor.png",
    shots: 5,
    uiLang: "th",
    price: 5990,
    th: {
      tagline: "ตั้งแต่ BOQ ถึงเบิกงวด สำหรับผู้รับเหมา",
      description:
        "ทำใบเสนอราคาจาก BOQ ทำสัญญาแบ่งงวด เบิกงวด คืนเงินประกันผลงาน คุมต้นทุนแต่ละงาน และจ่ายค่าแรงทีมช่าง ครบในโปรแกรมเดียว เหมาะกับงานสร้างบ้าน รีโนเวต และงานตกแต่ง",
      chips: ["BOQ", "เบิกงวด", "งานเพิ่ม-ลด", "เงินประกันผลงาน", "ค่าแรงช่าง"],
      features: ["BOQ หลายเวอร์ชัน ดึงราคาจากคลังต้นทุน", "ใบเสนอราคาและสัญญาแบ่งงวด", "งานเพิ่ม-ลด", "เบิกงวด เงินล่วงหน้า และเงินประกันผลงาน", "ใบเสร็จและใบกำกับภาษี พร้อมหัก ณ ที่จ่าย", "ตารางงาน Gantt และบันทึกหน้างาน", "ซื้อของ บิลผู้ขาย และงานจ้างช่วง", "ลงเวลาช่าง เบิกล่วงหน้า ค่าแรง และประกันสังคม", "ต้นทุนจริงเทียบงบของแต่ละงาน", "ส่งข้อมูลรายเดือนให้นักบัญชี"],
    },
    en: {
      tagline: "From BOQ to progress claims, for contractors.",
      description:
        "Price a job from a BOQ, sign a contract with payment stages, bill each claim, release retention, track each job's costs and pay your crew, all in one app. Built for house building, renovation and fit-out.",
      chips: ["BOQ", "Progress claims", "Variations", "Retention", "Crew pay"],
      features: ["Versioned BOQ priced from a cost library", "Quotation and staged contract", "Variation orders", "Progress claims, advance and retention", "Receipts and tax invoices with withholding tax", "Gantt schedule and site diary", "Purchases, supplier bills and sub-contracts", "Crew attendance, wage advances, pay and social security", "Job cost against budget", "Monthly export for the accountant"],
    },
  },
  {
    name: "PeerapoS Wellness",
    icon: "/apps/wellness.png",
    shots: 5,
    uiLang: "th",
    price: 4990,
    th: {
      tagline: "คิวนวด คลาสพิลาทิส และแพ็กเกจ ในโปรแกรมเดียว",
      description:
        "สำหรับร้านนวด สปา และสตูดิโอพิลาทิสหรือโยคะ จองคิวหมอนวด จัดตารางคลาสที่รับคนได้ตามจำนวนเครื่องที่ใช้ได้จริง ขายแพ็กเกจเป็นครั้งหรือเป็นนาที และคิดค่ามือหมอนวดกับค่าสอนครูให้",
      chips: ["คิวนวด", "คลาส", "แพ็กเกจ", "ค่ามือ", "ทิป"],
      features: ["ลูกค้าและแบบประเมินสุขภาพ พร้อมความยินยอม", "กระดานนัดหมายตามหมอนวดและเวลา", "คิวและลูกค้าเดินเข้า", "ตารางคลาสตามจำนวนเครื่องที่ใช้ได้ พร้อมรายชื่อรอ", "แพ็กเกจเป็นครั้งหรือเป็นนาที พักได้ โอนได้ คืนเงินได้", "รับเงิน มัดจำ ทิป และค่าบริการ", "ค่ามือหมอนวดและค่าสอนครู", "50 ทวิ ภ.ง.ด.3 และประกันสังคม", "รายงานและส่งข้อมูลให้นักบัญชี", "นำเข้าจาก Pilates, Massage และ Excel"],
    },
    en: {
      tagline: "Appointments, classes and packages for massage shops and pilates studios.",
      description:
        "For massage and spa shops and for pilates and yoga studios. Book therapists, run a class timetable capped at the machines in service, sell packages by session or by minute, and work out therapist and instructor pay.",
      chips: ["Appointments", "Classes", "Packages", "Therapist pay", "Tips"],
      features: ["Customers with consented health screening", "Appointment board by therapist and time", "Queue and walk-ins", "Class timetable capped at machines in service, with waitlist", "Packages by session or minute: pause, transfer, refund", "Checkout with deposits, tips and service charge", "Therapist and instructor pay", "50 Tawi, PND 3 and social security", "Reports and accountant export", "Import from Pilates, Massage and Excel"],
    },
  },
];
