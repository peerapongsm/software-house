// Windows desktop apps from ../electron, downloaded as the NSIS installer from each repo's GitHub
// release. version = the release tag without "v"; bump it on every new release.

type Copy = { tagline: string; description: string; chips: string[]; features: string[] };

export type DesktopApp = {
  name: string;
  version: string;
  icon: string;
  shots: number; // screenshot count in /apps/shots/<icon-name>-<1..n>.webp
  uiLang: "th" | "en";
  th: Copy;
  en: Copy;
};

// Goes through the peerapos-dl Worker (electron/peerapos-dl), which counts the download and 302s
// to the GitHub release asset; GitHub answers with Content-Disposition: attachment, so the download
// starts in place. Slug comes from the icon name (/apps/wash.png → wash).
export const downloadUrl = (a: DesktopApp) => {
  const slug = a.icon.slice("/apps/".length, -".png".length);
  return `https://dl.peerapongsm.dev/${slug}/${a.version}`;
};

// Screenshots are named after the icon: /apps/wash.png → /apps/shots/wash-1.webp … wash-n.webp
export const shotUrls = (a: DesktopApp) =>
  Array.from({ length: a.shots }, (_, i) => a.icon.replace("/apps/", "/apps/shots/").replace(".png", `-${i + 1}.webp`));

export const APPS: DesktopApp[] = [
  {
    name: "PeerapoS Wash",
    version: "2.1.2",
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
    version: "1.1.0",
    icon: "/apps/stock.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "สต็อกสินค้า ร้านเล็กถึงโกดังย่อม",
      description:
        "รับเข้า เบิกออก ตรวจนับด้วยบาร์โค้ด ต้นทุนเฉลี่ยคิดให้เอง ของใกล้หมดก็รู้ก่อนขาด",
      chips: ["สินค้า", "บาร์โค้ด", "ตรวจนับ", "ต้นทุนเฉลี่ย"],
      features: ["รับสินค้าเข้าพร้อมต้นทุน", "เบิกออกและขาย", "ตรวจนับด้วยบาร์โค้ด", "ต้นทุนเฉลี่ยอัตโนมัติ", "เตือนของใกล้หมด", "รายงานสต็อกคงเหลือ"],
    },
    en: {
      tagline: "Inventory for shops and small warehouses.",
      description:
        "Receive, issue and count stock with a barcode scanner. Moving-average cost is worked out for you, and low stock shows up before you run out.",
      chips: ["Products", "Barcodes", "Stock count", "Avg cost"],
      features: ["Receive stock with cost", "Issue and sell", "Barcode stock count", "Automatic moving-average cost", "Low-stock alerts", "Stock-on-hand report"],
    },
  },
  {
    name: "PeerapoS File",
    version: "1.1.0",
    icon: "/apps/file.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "ออกเอกสารธุรกิจครบในที่เดียว",
      description:
        "ใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จ ใบกำกับภาษี คิด VAT หัก ณ ที่จ่าย และเขียนยอดเงินเป็นตัวหนังสือให้เอง ใบเสนอราคาที่ลูกค้าตกลงแล้วก็แปลงเป็นใบแจ้งหนี้ได้ทันที",
      chips: ["ใบเสนอราคา", "ใบกำกับภาษี", "VAT 7%", "หัก ณ ที่จ่าย", "PDF"],
      features: ["ใบเสนอราคา", "ใบแจ้งหนี้", "ใบเสร็จและใบกำกับภาษี", "VAT 7% และหัก ณ ที่จ่าย", "ยอดเงินเป็นตัวหนังสือ", "ส่งออก PDF"],
    },
    en: {
      tagline: "Every business document in one place.",
      description:
        "Quotations, invoices, receipts and full tax invoices. VAT, withholding tax and the amount in Thai words are done for you, and an accepted quote turns into an invoice in one click.",
      chips: ["Quotation", "Tax invoice", "VAT 7%", "Withholding", "PDF"],
      features: ["Quotations", "Invoices", "Receipts and tax invoices", "VAT 7% and withholding tax", "Amount in Thai words", "PDF export"],
    },
  },
  {
    name: "PeerapoS Pay",
    version: "1.1.1",
    icon: "/apps/pay.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "เงินเดือนและงานบุคคล 5–50 คน",
      description:
        "คิดเงินเดือน OT วันลา ประกันสังคม และภาษีหัก ณ ที่จ่ายให้ครบ ออกสลิปเงินเดือน รายงาน ภ.ง.ด.1 สปส.1-10 และ 50 ทวิ ได้จากโปรแกรมเลย",
      chips: ["เงินเดือน", "OT", "วันลา", "ประกันสังคม", "ภ.ง.ด.1"],
      features: ["คำนวณเงินเดือนและ OT", "วันลาและโควตา", "ประกันสังคม", "ภาษีหัก ณ ที่จ่าย", "สลิปเงินเดือน", "ภ.ง.ด.1 สปส.1-10 50 ทวิ"],
    },
    en: {
      tagline: "Payroll and HR for 5–50 staff.",
      description:
        "Salary, overtime, leave, social security and withholding tax, all calculated. Payslips and the Thai filings (ภ.ง.ด.1, สปส.1-10, 50 ทวิ) come straight out of the app.",
      chips: ["Payroll", "Overtime", "Leave", "Social security", "PND1"],
      features: ["Salary and overtime", "Leave and quotas", "Social security", "Withholding tax", "Payslips", "ภ.ง.ด.1, สปส.1-10 and 50 ทวิ filings"],
    },
  },
  {
    name: "PeerapoS Garage",
    version: "1.1.0",
    icon: "/apps/garage.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "อู่ซ่อมรถและร้านซ่อมมอเตอร์ไซค์",
      description:
        "ดูแลงานตั้งแต่รับรถ ใบเสนอราคา เคลมประกัน จนถึงรับเงินและส่งมอบ ตัดสต็อกอะไหล่ให้เอง ถ้าลูกค้ายังค้างจ่าย โปรแกรมจะเตือนก่อนปล่อยรถ",
      chips: ["ใบรับรถ", "ใบเสนอราคา", "เคลมประกัน", "อะไหล่", "ใบเสร็จ"],
      features: ["ใบรับรถ", "ใบเสนอราคาและใบแจ้งหนี้", "เคลมประกัน", "สต็อกอะไหล่", "ใบเสร็จ", "เตือนนัดเช็กระยะ"],
    },
    en: {
      tagline: "For car garages and motorcycle shops.",
      description:
        "From check-in, quote and insurance claim to payment and hand-over. Parts come off stock automatically, and the app stops you before releasing a car that still has money owing.",
      chips: ["Job card", "Quote", "Insurance claim", "Parts", "Receipt"],
      features: ["Job cards", "Quotes and invoices", "Insurance claims", "Parts stock", "Receipts", "Service reminders"],
    },
  },
  {
    name: "PeerapoS Room",
    version: "1.1.1",
    icon: "/apps/room.png",
    shots: 4,
    uiLang: "th",
    th: {
      tagline: "หอพักและห้องเช่า 10–200 ห้อง",
      description:
        "จดมิเตอร์น้ำไฟทั้งตึกในตารางเดียว ออกบิลรายเดือนพร้อม QR พร้อมเพย์ ส่งรูปบิลเข้า LINE ได้ พอผู้เช่าย้ายออกก็คิดเงินมัดจำคืนให้",
      chips: ["มิเตอร์", "บิลรายเดือน", "พร้อมเพย์", "สัญญาเช่า", "ย้ายออก"],
      features: ["ผังห้องพัก", "จดมิเตอร์น้ำไฟ", "บิลรายเดือนพร้อม QR พร้อมเพย์", "ใบเสร็จ", "สัญญาเช่า", "คิดเงินย้ายออก"],
    },
    en: {
      tagline: "Dorms and rentals, 10–200 rooms.",
      description:
        "Read every water and power meter in one grid, issue monthly bills with a PromptPay QR, send bill images over LINE, and settle deposits when a tenant moves out.",
      chips: ["Meters", "Monthly bills", "PromptPay", "Leases", "Move-out"],
      features: ["Room map", "Water and power meter readings", "Monthly bills with PromptPay QR", "Receipts", "Leases", "Move-out settlement"],
    },
  },
  {
    name: "PeerapoS Class",
    version: "1.2.1",
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
    version: "1.1.1",
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
    version: "1.1.1",
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
    version: "2.1.1",
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
    version: "1.1.1",
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
    version: "1.2.0",
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
    version: "1.1.2",
    icon: "/apps/trip.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "งานบริษัททัวร์ขนาดเล็ก",
      description:
        "เปิดรอบเดินทาง รับจอง จัดห้องพัก รับเงินแล้วออกใบเสร็จและใบกำกับภาษีให้เอง คืนเงินพร้อมใบลดหนี้ ตรวจอายุพาสปอร์ต ส่งรายชื่อให้บริษัทประกัน และดูกำไรของแต่ละกรุ๊ป",
      chips: ["รอบเดินทาง", "การจอง", "ใบกำกับภาษี", "จัดห้อง", "กำไรรายกรุ๊ป"],
      features: ["รอบเดินทางและที่นั่ง", "การจองและผู้เดินทาง", "ใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จ/ใบกำกับภาษี", "ยกเลิกและคืนเงินพร้อมใบลดหนี้", "จัดห้องพัก", "ตรวจพาสปอร์ตและรายชื่อส่งประกัน", "ต้นทุนและกำไรรายกรุ๊ป", "พิมพ์โปรแกรมทัวร์"],
    },
    en: {
      tagline: "Small tour operator back office.",
      description:
        "Open departures, take bookings, assign rooms, collect payments and issue receipts and tax invoices. Refunds with credit notes, passport expiry checks, insurer name lists and profit per group.",
      chips: ["Departures", "Bookings", "Tax invoices", "Rooming", "Group profit"],
      features: ["Departures and seats", "Bookings and travellers", "Quotes, invoices, receipts/tax invoices", "Cancellations and refunds with credit notes", "Rooming lists", "Passport checks and insurer name lists", "Cost and profit per group", "Printable itineraries"],
    },
  },
  {
    name: "PeerapoS Pilates",
    version: "1.1.1",
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
    version: "1.1.2",
    icon: "/apps/repair.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "หน้าเคาน์เตอร์ร้านซ่อมมือถือ",
      description:
        "รับเครื่องแล้วพิมพ์ใบรับซ่อมกับป้ายติดเครื่อง ส่งราคาให้ลูกค้าตกลงก่อนซ่อม ตัดสต็อกอะไหล่ ดูงานทั้งร้านบนกระดาน ส่งมอบพร้อมใบรับประกัน และสรุปค่าคอมช่าง รหัสปลดล็อกเครื่องเข้ารหัสเก็บในคอมของร้าน",
      chips: ["ใบรับซ่อม", "สต็อกอะไหล่", "รับประกัน", "พร้อมเพย์", "ค่าคอมช่าง"],
      features: ["ใบรับซ่อมและป้ายติดเครื่อง", "ฝากรหัสปลดล็อกแบบซ่อนไว้", "ส่งราคาและบันทึกการตกลงของลูกค้า", "กระดานงานซ่อม", "สต็อกอะไหล่", "ใบเสร็จ/ใบกำกับภาษีและ QR พร้อมเพย์", "คืนเงินและใบลดหนี้", "ส่งมอบเครื่องและใบรับประกัน", "งานเคลม", "ข้อความ LINE แจ้งลูกค้า", "ค่าคอมช่าง"],
    },
    en: {
      tagline: "Front desk for a phone repair shop.",
      description:
        "Check devices in with a printed repair ticket and tag, get the customer's OK on a quote before work starts, draw parts from stock, track every job on one board, and hand back with a warranty slip. Unlock codes stay encrypted on the shop's PC.",
      chips: ["Repair tickets", "Parts stock", "Warranty", "PromptPay", "Tech commission"],
      features: ["Repair tickets and device tags", "Hidden unlock-code storage", "Quotes with customer approval", "Repair job board", "Parts stock", "Receipts/tax invoices with PromptPay QR", "Refunds and credit notes", "Handover with warranty slip", "Warranty claims", "LINE messages to customers", "Technician commission"],
    },
  },
  {
    name: "PeerapoS Studio",
    version: "1.1.1",
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
    version: "1.0.0",
    icon: "/apps/pharmacy.png",
    shots: 5,
    uiLang: "th",
    th: {
      tagline: "ระบบหน้าร้านสำหรับร้านขายยาเล็ก",
      description:
        "ขายด้วยสแกนเนอร์ ตัดยาตามล็อตที่หมดอายุก่อน เตือนเมื่อลูกค้าแพ้ยา พิมพ์ฉลากยาให้เอง รับสินค้าพร้อมล็อตและวันหมดอายุ และออกบัญชี ข.ย.9–13 ได้ทุกเมื่อ ไม่จำกัดจำนวนสินค้าหรือบิล",
      chips: ["ขายหน้าร้าน", "ล็อตและวันหมดอายุ", "แพ้ยา", "ฉลากยา", "บัญชี ข.ย."],
      features: ["ขายด้วยบาร์โค้ดหรือปุ่มรูปสินค้า", "ตัดล็อตที่หมดอายุก่อนให้อัตโนมัติ", "เตือนแพ้ยาและยาที่ต้องมีใบสั่งยา", "พิมพ์ฉลากยาหลังรับเงิน", "ใบเสร็จ/ใบกำกับภาษีและ QR พร้อมเพย์", "ใบสั่งซื้อ รับสินค้า และคืนสินค้า", "ตรวจนับสต็อก", "บัญชี ข.ย.9–13", "โปรโมชันและแต้มสะสม", "ลิ้นชักเก็บเงิน", "รายงานยอดขาย กำไร และของใกล้หมดอายุ"],
    },
    en: {
      tagline: "Point of sale for a small pharmacy.",
      description:
        "Sell with a barcode scanner, draw stock from the lot that expires first, get warned about a customer's drug allergy, print dosage labels automatically, receive stock with lot and expiry, and print the Thai FDA ข.ย.9–13 registers whenever you need them. No limits on items or bills.",
      chips: ["Point of sale", "Lots and expiry", "Allergy alerts", "Drug labels", "FDA registers"],
      features: ["Barcode and picture-button selling", "First-expiry-first-out lots", "Allergy and prescription checks", "Dosage labels after payment", "Receipts/tax invoices with PromptPay QR", "Purchase orders, receiving and supplier returns", "Stock count", "Thai FDA ข.ย.9–13 registers", "Promotions and loyalty points", "Cash drawer", "Sales, profit and expiry reports"],
    },
  },
];
