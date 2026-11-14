export type PageCopy = {
  metaDescription: string;
  useCase: string;
  faq: { q: string; a: string }[];
};

export type AppPage = { th: PageCopy; en: PageCopy };

export const APP_PAGES: Record<string, AppPage> = {
  "wash": {
    "th": {
      "metaDescription": "PeerapoS Wash โปรแกรมฟรีสำหรับร้านซักรีดและร้านสะดวกซัก รับผ้า ติดตามสถานะ ออกใบเสร็จ PromptPay ดูเครื่องและรายรับรายจ่าย",
      "useCase": "เหมาะกับเจ้าของร้านซักรีดที่ต้องรับผ้า เช็กราคา นัดรับ และออกใบเสร็จพร้อม QR พร้อมเพย์ รวมถึงร้านสะดวกซักที่ต้องดูเครื่องหยอดเหรียญ งานซ่อมบำรุง ค่าใช้จ่าย และรายงานการเงิน",
      "faq": [
        {
          "q": "ร้านซักรีดกับร้านสะดวกซักใช้โปรแกรมเดียวกันได้ไหม",
          "a": "ใช้ได้ทั้งสองแบบ PeerapoS Wash รับผ้า ติดตามสถานะ ออกใบเสร็จพร้อม QR พร้อมเพย์ และดูแลเครื่องหยอดเหรียญในร้าน"
        },
        {
          "q": "โปรแกรมซักรีดติดตามผ้าและวันนัดรับได้ไหม",
          "a": "ติดตามสถานะผ้าและวันนัดรับได้ ใช้รับผ้า ตั้งตารางราคา ออกใบเสร็จ และเก็บข้อมูลลูกค้าประจำกับแพ็กเกจ"
        },
        {
          "q": "ร้านเครื่องซักหยอดเหรียญดูเครื่องและงานซ่อมได้ไหม",
          "a": "ดูแลเครื่องหยอดเหรียญและงานซ่อมบำรุงได้ บันทึกค่าใช้จ่ายและดูรายงานการเงินเพื่อเห็นรายรับรายจ่ายของร้าน"
        },
        {
          "q": "PeerapoS Wash ฟรีจริงไหมและลงยังไง",
          "a": "ฟรีจริงภายในขีดจำกัดของรุ่นฟรี ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ใช้งานออฟไลน์บน Windows 10 และ 11 แบบ 64-bit ข้อมูลเก็บในคอมของคุณเอง ดาวน์โหลดไฟล์ เปิดไฟล์ให้ติดตั้งอัตโนมัติ ถ้า Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway จากนั้นเปิดจากเดสก์ท็อปหรือเมนู Start ถ้าอยากปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก"
        }
      ]
    },
    "en": {
      "metaDescription": "Free laundry and laundromat logbook for orders, status, PromptPay receipts, coin machines, expenses and finance reports.",
      "useCase": "Best for laundry shop owners who need to take in orders, check prices, set pickup dates and issue receipts with a PromptPay QR, as well as laundromats that need to look after coin machines, maintenance, expenses and finance reports.",
      "faq": [
        {
          "q": "Can one program work for both a laundry shop and a laundromat?",
          "a": "Yes, it works for both. PeerapoS Wash takes in orders, tracks status, issues receipts with a PromptPay QR and helps look after coin machines in the shop."
        },
        {
          "q": "Can this laundry program track clothes and pickup dates?",
          "a": "Yes, it can track order status and pickup dates. Use it to take in orders, set a price list, issue receipts, and keep regular customer and package records."
        },
        {
          "q": "Can a coin-operated laundromat track machines and maintenance?",
          "a": "Yes, it can look after coin machines and maintenance work. Record expenses and view finance reports to see money in and out of the shop."
        },
        {
          "q": "Is PeerapoS Wash really free and how do I install it?",
          "a": "Yes, it is free within the free version limits. There are no ads, no account needed, it works offline on Windows 10 and 11 64-bit, and your data stays on your own PC. Download the file and open it to install automatically. If Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway. Then open it from the desktop or Start menu. If you want to lift the limits, the optional PeerapoS Pro subscription is available."
        }
      ]
    }
  },
  "stock": {
    "th": {
      "metaDescription": "โปรแกรมสต็อกฟรีสำหรับร้านและโกดังย่อม รับเข้า เบิกออก ตรวจนับด้วยบาร์โค้ด คิดต้นทุนเฉลี่ย เตือนของใกล้หมด",
      "useCase": "เหมาะกับร้านค้าหรือโกดังย่อมที่ต้องรู้ว่าสินค้าเหลือเท่าไร รับเข้าเท่าไร เบิกออกหรือขายไปเท่าไร และอยากตรวจนับด้วยบาร์โค้ดโดยไม่ต้องต่ออินเทอร์เน็ต ข้อมูลอยู่ในคอมของร้านเอง ใช้บน Windows 10 และ 11 แบบ 64-bit",
      "faq": [
        {
          "q": "โปรแกรมสต็อกนี้ทำอะไรได้บ้าง",
          "a": "จัดการรับเข้า เบิกออก ขาย ตรวจนับ และดูรายงานสต็อกคงเหลือได้ในโปรแกรมเดียว โปรแกรมช่วยคิดต้นทุนเฉลี่ยอัตโนมัติ และเตือนของใกล้หมดก่อนสินค้าขาด"
        },
        {
          "q": "ตรวจนับสินค้าด้วยบาร์โค้ดได้ไหม",
          "a": "ตรวจนับด้วยบาร์โค้ดได้ โปรแกรมรองรับการตรวจนับสินค้า สร้างบาร์โค้ด EAN-13 ของร้าน พิมพ์ฉลาก และกำหนดตำแหน่งจัดเก็บสินค้า"
        },
        {
          "q": "รุ่นฟรีของ PeerapoS Stock จำกัดอะไรบ้าง",
          "a": "รุ่นฟรีเพิ่มสินค้าได้สูงสุด 2,000 รายการและเพิ่มบริษัทได้สูงสุด 3 บริษัท ใช้ได้เฉพาะเครื่องหลัก ถ้าต้องการปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิก ซึ่งเพิ่มสินค้าและบริษัทได้ไม่จำกัด เชื่อมคอมพิวเตอร์เครื่องอื่นในร้านผ่าน LAN ได้สูงสุด 5 เครื่อง ใช้ตัวเชื่อม AI โดยเปิดใช้เองในแอป และสำรองข้อมูลไป Google Drive ของคุณเอง"
        },
        {
          "q": "โปรแกรมสต็อกใช้บนเครื่องไหนและติดตั้งอย่างไร",
          "a": "ใช้ได้บน Windows 10 และ 11 แบบ 64-bit บนคอมพิวเตอร์ กดปุ่มดาวน์โหลด เปิดไฟล์ที่โหลดมา แล้วรอติดตั้งจนเสร็จ ถ้า Windows ขึ้นกรอบ Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway โปรแกรมใช้งานออฟไลน์ได้ ไม่มีโฆษณา ไม่ต้องสมัครบัญชี และข้อมูลเก็บอยู่ในเครื่องคุณเอง"
        }
      ]
    },
    "en": {
      "metaDescription": "Free inventory app for shops and small warehouses: receive, issue, count by barcode, average cost, low-stock alerts, Windows 10/11 offline.",
      "useCase": "Made for shops or small warehouses that need to know stock on hand, received stock, issued or sold stock, and want to count items with a barcode scanner without needing the internet. Your data stays on the shop's own PC, and the app runs on Windows 10 and 11 64-bit.",
      "faq": [
        {
          "q": "What can this inventory program do?",
          "a": "It manages receiving, issuing, selling, stock counting and stock-on-hand reports in one program. The app calculates moving-average cost automatically and shows low-stock alerts before items run out."
        },
        {
          "q": "Can I count stock with a barcode scanner?",
          "a": "Yes, you can count stock with barcodes. The app supports product stock counts, creates in-store EAN-13 barcodes, prints labels, and stores a storage location for each product."
        },
        {
          "q": "What are the limits in the free version of PeerapoS Stock?",
          "a": "The free version supports up to 2,000 products and up to 3 companies. It runs on the main PC only. If you want to lift the limits, the optional PeerapoS Pro subscription gives unlimited products and companies, connects up to 5 other PCs in the shop over LAN, lets you use the AI connector by turning it on in the app, and backs up to your own Google Drive."
        },
        {
          "q": "Which computer does the inventory program run on, and how do I install it?",
          "a": "It runs on Windows 10 and 11 64-bit desktops. Press the download button, open the downloaded file, and wait for the install to finish. If Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway. The app works offline, has no ads, needs no account, and keeps your data on your own PC."
        }
      ]
    }
  },
  "file": {
    "th": {
      "metaDescription": "PeerapoS File โปรแกรมออกใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จ ใบกำกับภาษี คิด VAT หัก ณ ที่จ่าย เขียนยอดเงินเป็นตัวหนังสือ บันทึก PDF",
      "useCase": "เหมาะกับร้านและธุรกิจ SME ที่ต้องออกเอกสารขาย ซื้อ รับเงิน และจ่ายเงินเป็นประจำ ใช้ทำใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จ ใบกำกับภาษี ใบส่งสินค้า ใบสั่งซื้อ และใบสำคัญได้ในโปรแกรมเดียว ร้านที่ไม่ได้จด VAT ก็ออกใบส่งสินค้า/ใบแจ้งหนี้ได้ และเมื่อใบเสนอราคาลูกค้าตกลงแล้วแปลงเป็นใบแจ้งหนี้ได้ทันที",
      "faq": [
        {
          "q": "โปรแกรมออกใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จ ใบกำกับภาษีได้ไหม",
          "a": "ออกได้ครบในโปรแกรมเดียว รองรับใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จและใบกำกับภาษี ใบส่งสินค้า/ใบแจ้งหนี้ ใบสั่งซื้อ ใบสำคัญรับ ใบสำคัญจ่าย และใบรับรองแทนใบเสร็จ"
        },
        {
          "q": "ร้านไม่ได้จด VAT ใช้ PeerapoS File ได้ไหม",
          "a": "ใช้ได้สำหรับร้านที่ไม่ได้จด VAT ออกใบส่งสินค้า/ใบแจ้งหนี้ได้ และถ้าต้องคิดภาษี โปรแกรมรองรับ VAT 7% หัก ณ ที่จ่าย และเขียนยอดเงินเป็นตัวหนังสือให้เอง"
        },
        {
          "q": "ใบเสนอราคาที่ลูกค้าตกลงแล้วทำต่อเป็นใบแจ้งหนี้ได้ไหม",
          "a": "แปลงเป็นใบแจ้งหนี้ได้ทันที ใบเสนอราคายังใส่ QR พร้อมเพย์ได้ และบันทึกเอกสารเป็น PDF หรือรูปภาพได้"
        },
        {
          "q": "PeerapoS File ฟรีจริงไหม ติดตั้งบน Windows ยังไง",
          "a": "ฟรีจริงภายในขีดจำกัดของรุ่นฟรี ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ใช้งานออฟไลน์บน Windows 10 และ 11 64-bit และข้อมูลเก็บอยู่ในเครื่องคุณเอง กดปุ่มดาวน์โหลดด้านล่าง เปิดไฟล์ที่โหลดมา โปรแกรมจะติดตั้งเอง หาก Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway จากนั้นเปิดโปรแกรมจากเดสก์ท็อปหรือเมนู Start หากต้องการปลดขีดจำกัดเลือก PeerapoS Pro ได้"
        }
      ]
    },
    "en": {
      "metaDescription": "PeerapoS File creates quotes, invoices, receipts, tax invoices, VAT and withholding tax, amount in Thai words, PDF or image exports.",
      "useCase": "Made for shops and SMEs that regularly create sales, purchase, receipt and payment documents. Create quotations, invoices, receipts, tax invoices, delivery notes, purchase orders and vouchers in one app. Businesses without VAT registration can issue delivery note/invoices, and an accepted quote turns into an invoice right away.",
      "faq": [
        {
          "q": "Can this program create quotations, invoices, receipts and tax invoices?",
          "a": "Yes, it creates them all in one program. It supports quotations, invoices, receipts and tax invoices, delivery note/invoices, purchase orders, receipt vouchers, payment vouchers and substitute receipts."
        },
        {
          "q": "Can a business that is not VAT registered use PeerapoS File?",
          "a": "Yes, it works for businesses that are not VAT registered. You can issue delivery note/invoices, and when tax is needed the app supports VAT 7%, withholding tax and the amount in Thai words."
        },
        {
          "q": "Can an accepted quotation be turned into an invoice?",
          "a": "Yes, it turns into an invoice right away. Quotations can also include a PromptPay QR, and documents can be saved as PDF or images."
        },
        {
          "q": "Is PeerapoS File really free, and how do I install it on Windows?",
          "a": "Yes, within the free version's limits. There are no ads, no account is needed, it works offline on Windows 10 and 11 64-bit, and your data stays on your own PC. Press the download button below, open the downloaded file, and it installs on its own. If Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway. Then open the app from the desktop icon or the Start menu. Choose PeerapoS Pro if you want to lift the limits."
        }
      ]
    }
  },
  "pay": {
    "th": {
      "metaDescription": "โปรแกรมเงินเดือนและงานบุคคลสำหรับ SME 5–50 คน คำนวณเงินเดือน OT วันลา ประกันสังคม ภาษี ออกสลิปและรายงาน ภ.ง.ด.1",
      "useCase": "เหมาะกับร้านและธุรกิจ SME ที่มีพนักงาน 5–50 คน ต้องการทำเงินเดือน OT วันลา ประกันสังคม และภาษีหัก ณ ที่จ่ายในโปรแกรมเดียว พร้อมออกสลิปเงินเดือนและรายงาน ภ.ง.ด.1 สปส.1-10 50 ทวิ",
      "faq": [
        {
          "q": "โปรแกรมเงินเดือน SME คำนวณอะไรได้บ้าง",
          "a": "PeerapoS Pay คำนวณเงินเดือน OT วันลา ประกันสังคม และภาษีหัก ณ ที่จ่ายได้ในโปรแกรมเดียว เหมาะกับธุรกิจที่มีพนักงาน 5–50 คนและต้องการลดงานคำนวณเงินเดือนซ้ำ ๆ"
        },
        {
          "q": "ออกสลิปเงินเดือนและรายงานยื่นหน่วยงานได้ไหม",
          "a": "ออกสลิปเงินเดือนและรายงาน ภ.ง.ด.1 สปส.1-10 และ 50 ทวิ ได้จากโปรแกรมเลย ใช้รวมงานเงินเดือน เอกสารพนักงาน และรายงานที่เกี่ยวข้องไว้ในที่เดียว"
        },
        {
          "q": "บันทึกข้อมูลลูกจ้างต่างด้าวได้ไหม",
          "a": "บันทึกข้อมูลลูกจ้างต่างด้าวได้ รองรับข้อมูลบัตรชมพู พาสปอร์ต และใบอนุญาตทำงานสำหรับงานบุคคล"
        },
        {
          "q": "PeerapoS Pay ฟรีจริงไหม ใช้บน Windows ได้ไหม",
          "a": "ฟรีจริงภายในขีดจำกัดของรุ่นฟรี ไม่มีโฆษณา ไม่ต้องสมัครบัญชี และใช้งานออฟไลน์บน Windows 10 และ 11 64-bit ข้อมูลเก็บอยู่ในเครื่องคุณเอง ถ้าต้องการปลดขีดจำกัด เช่น เพิ่มพนักงานเกิน 25 คน เพิ่มบริษัทเกิน 3 บริษัท หรือเชื่อมคอมเครื่องอื่นในร้านผ่าน LAN มี PeerapoS Pro แบบสมัครสมาชิกให้เลือก"
        }
      ]
    },
    "en": {
      "metaDescription": "Payroll and HR app for SMEs with 5–50 staff. Calculate salary, OT, leave, social security, tax, payslips and PND1 reports.",
      "useCase": "Best for shops and SMEs with 5–50 staff that want payroll, overtime, leave, social security and withholding tax in one app, with payslips and ภ.ง.ด.1, สปส.1-10 and 50 ทวิ reports.",
      "faq": [
        {
          "q": "What can this SME payroll program calculate?",
          "a": "PeerapoS Pay calculates salary, overtime, leave, social security and withholding tax in one app. It fits businesses with 5–50 staff that want to reduce repeated payroll calculation work."
        },
        {
          "q": "Can it issue payslips and reports for filing?",
          "a": "It can issue payslips and ภ.ง.ด.1, สปส.1-10 and 50 ทวิ reports straight from the app. You can keep payroll work, employee documents and related reports together in one place."
        },
        {
          "q": "Can it record migrant worker information?",
          "a": "It can record migrant worker information. It supports pink card, passport and work permit details for HR work."
        },
        {
          "q": "Is PeerapoS Pay really free, and does it work on Windows?",
          "a": "Yes, it is free within the free version limits, with no ads, no account needed, and offline use on Windows 10 and 11 64-bit. Your data stays on your own PC. If you want to lift limits, such as adding more than 25 employees, more than 3 companies, or connecting other PCs in the shop over LAN, an optional PeerapoS Pro subscription is available."
        }
      ]
    }
  },
  "garage": {
    "th": {
      "metaDescription": "โปรแกรมอู่ซ่อมรถและร้านซ่อมมอเตอร์ไซค์ รับรถ ใบเสนอราคา เคลมประกัน สต็อกอะไหล่ กำไรต่องาน และเตือนก่อนปล่อยรถเมื่อค้างจ่าย",
      "useCase": "เหมาะกับอู่ซ่อมรถและร้านซ่อมมอเตอร์ไซค์ที่ต้องคุมงานซ่อมตั้งแต่รับรถจนส่งมอบ ออกใบเสนอราคา แยกอะไหล่กับค่าแรง ทำเคลมประกัน ตัดสต็อกอะไหล่ เห็นต้นทุนและกำไรของแต่ละงาน รวมถึงขายอะไหล่หน้าร้านโดยไม่ต้องเปิดงานซ่อม",
      "faq": [
        {
          "q": "โปรแกรมอู่ซ่อมรถนี้ทำใบรับรถกับใบเสนอราคาได้ไหม",
          "a": "ทำใบรับรถและใบเสนอราคาได้ในระบบเดียว ใบเสนอราคาแยกอะไหล่กับค่าแรงให้เห็นชัดก่อนออกเอกสารต่อไป"
        },
        {
          "q": "อู่ที่รับงานเคลมประกันใช้ PeerapoS Garage ได้ไหม",
          "a": "ใช้ทำงานเคลมประกันได้ ใส่ยอดที่ประกันอนุมัติทีละรายการ แล้วเดินงานต่อถึงใบแจ้งหนี้ ใบเสร็จ และรับเงินได้"
        },
        {
          "q": "ขายอะไหล่หน้าร้านและคุมสต็อกอะไหล่ได้ไหม",
          "a": "ขายอะไหล่หน้าร้านได้โดยไม่ต้องเปิดงานซ่อม โปรแกรมมีสต็อกอะไหล่และตัดสต็อกให้เมื่อใช้อะไหล่ในงาน"
        },
        {
          "q": "โปรแกรมฟรีจริงไหมและใช้กับคอมแบบไหน",
          "a": "ฟรีจริงภายในขีดจำกัดของ PeerapoS Garage ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ใช้งานออฟไลน์บน Windows 10 และ 11 แบบ 64-bit ข้อมูลเก็บอยู่ในเครื่องคุณเอง และถ้าต้องการปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก"
        }
      ]
    },
    "en": {
      "metaDescription": "Garage software for car and motorcycle repair shops: job cards, quotes, insurance claims, parts stock, job profit and payment checks before hand-over.",
      "useCase": "Built for car garages and motorcycle repair shops that need to control a job from check-in to hand-over, issue quotes, separate parts from labour, handle insurance claims, deduct parts stock, see cost and profit per job, and sell parts over the counter without opening a repair job.",
      "faq": [
        {
          "q": "Can this garage software create job cards and quotes?",
          "a": "Yes, job cards and quotes are handled in the same system. Quotes show parts and labour separately before you move on to the next document."
        },
        {
          "q": "Can garages that handle insurance claims use PeerapoS Garage?",
          "a": "Yes, it can handle insurance claim work. You can enter the insurer-approved amount line by line, then continue through invoice, receipt and payment."
        },
        {
          "q": "Can I sell parts over the counter and manage parts stock?",
          "a": "Yes, you can sell parts over the counter without opening a repair job. The app includes parts stock and deducts stock when parts are used in a job."
        },
        {
          "q": "Is the app really free and what computer does it run on?",
          "a": "Yes, it is free within PeerapoS Garage limits. There are no ads, no account is needed, it works offline on Windows 10 and 11 64-bit, your data stays on your own PC, and the optional PeerapoS Pro subscription can lift the limits."
        }
      ]
    }
  },
  "room": {
    "th": {
      "metaDescription": "PeerapoS Room โปรแกรมหอพักและห้องเช่า จดมิเตอร์ ออกบิลรายเดือน QR พร้อมเพย์ สัญญาเช่า และคิดเงินย้ายออก",
      "useCase": "เหมาะกับเจ้าของหอพัก อพาร์ตเมนต์ และห้องเช่า 10–200 ห้อง ที่ต้องจดมิเตอร์น้ำไฟ ออกบิลรายเดือนพร้อม QR พร้อมเพย์ ทำใบเสร็จ จัดการสัญญาเช่ารายเดือน รายสัปดาห์ หรือรายวัน และสรุปข้อมูลทุกห้องส่งออก Excel",
      "faq": [
        {
          "q": "โปรแกรมหอพักจดมิเตอร์น้ำไฟแล้วออกบิลรายเดือนได้ไหม",
          "a": "ทำได้ จดมิเตอร์น้ำไฟทั้งตึกในตารางเดียว หรือกรอกผ่าน Excel แล้วออกบิลรายเดือนพร้อม QR พร้อมเพย์ได้ รองรับค่าน้ำขั้นต่ำรายห้องและทำใบเสร็จได้ด้วย"
        },
        {
          "q": "ถ้าผู้เช่าย้ายออก โปรแกรมคิดเงินมัดจำคืนได้ไหม",
          "a": "คิดได้ PeerapoS Room มีงานคิดเงินย้ายออกสำหรับปิดบัญชีผู้เช่า ช่วยรวมรายการที่ต้องคิดก่อนคืนมัดจำเมื่อผู้เช่าย้ายออก"
        },
        {
          "q": "ห้องเช่ารายวันรายสัปดาห์ใช้โปรแกรมนี้ได้ไหม",
          "a": "ใช้ได้ โปรแกรมรองรับสัญญาเช่ารายเดือน รายสัปดาห์ และรายวัน จึงใช้ได้ทั้งหอพักรายเดือนและห้องเช่าที่รับรายวันหรือรายสัปดาห์"
        },
        {
          "q": "โปรแกรม PeerapoS Room ฟรีไหม ใช้กับ Windows อะไร",
          "a": "ฟรีจริงภายในขีดจำกัดของรุ่นฟรี รุ่นฟรีเพิ่มห้องได้สูงสุด 60 ห้องและเพิ่มบริษัทได้สูงสุด 3 บริษัท ใช้งานออฟไลน์บน Windows 10 และ 11 64-bit ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ข้อมูลเก็บอยู่ในเครื่องคุณเอง ถ้าอยากปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก"
        }
      ]
    },
    "en": {
      "metaDescription": "PeerapoS Room for dorms and rentals: meter readings, monthly bills with PromptPay QR, leases, and move-out settlement.",
      "useCase": "Made for dorm, apartment, and rental owners with 10–200 rooms who need to read water and power meters, issue monthly bills with a PromptPay QR, create receipts, manage monthly, weekly, or daily leases, and export all-room monthly summaries to Excel.",
      "faq": [
        {
          "q": "Can this dorm program read water and power meters and issue monthly bills?",
          "a": "Yes. You can read water and power meters for the whole building in one grid, or fill them in through Excel, then issue monthly bills with a PromptPay QR. It also supports a minimum water charge per room and receipts."
        },
        {
          "q": "When a tenant moves out, can the program calculate the deposit return?",
          "a": "Yes. PeerapoS Room has move-out settlement for closing a tenant’s account. It helps collect the items to calculate before returning the deposit when a tenant moves out."
        },
        {
          "q": "Can daily and weekly rentals use this program?",
          "a": "Yes. The program supports monthly, weekly, and daily leases. It can be used for monthly dorms and rentals that also take daily or weekly stays."
        },
        {
          "q": "Is PeerapoS Room free, and which Windows versions does it run on?",
          "a": "Yes, within the free version’s limits. The free version supports up to 60 rooms and up to 3 companies. It works offline on Windows 10 and 11 64-bit, has no ads, needs no account, and keeps your data on your own PC. If you want to lift the limits, an optional PeerapoS Pro subscription is available."
        }
      ]
    }
  },
  "class": {
    "th": {
      "metaDescription": "PeerapoS Class โปรแกรมโรงเรียนกวดวิชา ขายแพ็กเกจชั่วโมงหรือรายครั้ง จัดตาราง เช็กชื่อ ตัดชั่วโมง ใบเสร็จ ผ่อนชำระ และค่าสอนครู",
      "useCase": "เหมาะกับโรงเรียนกวดวิชาและสถาบันสอนพิเศษที่ขายแพ็กเกจเรียนเป็นชั่วโมงหรือเป็นครั้ง ต้องการเก็บข้อมูลนักเรียน จัดตารางสอน เช็กชื่อแล้วตัดชั่วโมง และดูแลใบเสร็จ ผ่อนชำระ กับค่าสอนครูในโปรแกรมเดียว",
      "faq": [
        {
          "q": "โปรแกรมโรงเรียนกวดวิชาขายคอร์สเป็นชั่วโมงได้ไหม",
          "a": "ขายแพ็กเกจเป็นชั่วโมงหรือเป็นครั้งได้ เช็กชื่อนักเรียนแล้วโปรแกรมตัดชั่วโมงให้เอง พร้อมเก็บข้อมูลนักเรียน ใบเสร็จ และผ่อนชำระ"
        },
        {
          "q": "จัดตารางสอนแล้วรู้ไหมว่าครูหรือห้องชนกัน",
          "a": "รู้ทันทีเมื่อครูหรือห้องชนกัน จัดตารางสอนได้ในโปรแกรม และโปรแกรมจะแจ้งเมื่อมีตารางที่ชนกัน"
        },
        {
          "q": "คิดค่าสอนครูในโปรแกรมได้ไหม",
          "a": "จัดการค่าสอนครูได้ PeerapoS Class มีฟีเจอร์ค่าสอนครูร่วมกับตารางสอนและการเช็กชื่อ"
        },
        {
          "q": "โปรแกรมฟรีจริงไหม",
          "a": "ฟรีจริง ใช้ได้ภายในขีดจำกัดของ PeerapoS Class ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ใช้งานออฟไลน์บน Windows 10 และ 11 (64-bit) ข้อมูลเก็บอยู่ในเครื่องคุณเอง ถ้าอยากปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก"
        }
      ]
    },
    "en": {
      "metaDescription": "PeerapoS Class for tutoring centers: packages, timetable, check-in balance deduction, receipts, instalments and teacher pay.",
      "useCase": "For tutoring centers and small schools that sell learning packages by hour or by session, need student records, timetable planning, check-in with automatic balance deduction, plus receipts, instalments and teacher pay in one app.",
      "faq": [
        {
          "q": "Can tutoring center software sell courses by the hour?",
          "a": "It can sell packages by hour or by session. When you check a student in, the app deducts the balance automatically and also keeps student records, receipts and instalments."
        },
        {
          "q": "Will the timetable show teacher or room clashes?",
          "a": "It shows teacher or room clashes right away. You can build the timetable in the app, and the app flags clashing schedules."
        },
        {
          "q": "Can I manage teacher pay in the app?",
          "a": "You can manage teacher pay. PeerapoS Class includes teacher pay alongside timetable and check-in features."
        },
        {
          "q": "Is the program really free?",
          "a": "Yes, within PeerapoS Class limits. There are no ads, no account needed, it works offline on Windows 10 and 11 (64-bit), and your data stays on your own PC. The optional PeerapoS Pro subscription lifts the limits."
        }
      ]
    }
  },
  "crm": {
    "th": {
      "metaDescription": "PeerapoS CRM สมุดลูกค้า ติดตามงานขาย นัดติดตาม บันทึกการคุย วันเกิดลูกค้า และรายงานยอดขาย ใช้ฟรีภายในขีดจำกัด",
      "useCase": "เหมาะกับร้านและธุรกิจ SME ที่ต้องตามลูกค้าหลายคนพร้อมกัน ใช้เก็บรายชื่อลูกค้า ดูสถานะดีล วางนัดติดตามรายวัน จดบันทึกการคุย จำวันเกิดลูกค้า และดูรายงานยอดขายโดยไม่ต้องจำเอง",
      "faq": [
        {
          "q": "โปรแกรม CRM นี้ช่วยติดตามลูกค้ายังไง",
          "a": "ช่วยให้เห็นทันทีว่าวันนี้ต้องทักใคร ใครเลยนัด และดีลไหนใกล้ปิด เปิดโปรแกรมมาแล้วดูนัดติดตามรายวัน สถานะการขาย และรายชื่อลูกค้าได้ในที่เดียว"
        },
        {
          "q": "จดประวัติคุยกับลูกค้าและวันเกิดได้ไหม",
          "a": "จดบันทึกการคุยและเก็บวันเกิดลูกค้าได้ ใช้เป็นสมุดลูกค้าที่ช่วยให้กลับมาดูประวัติการติดต่อก่อนทักซ้ำหรือติดตามงานขาย"
        },
        {
          "q": "PeerapoS CRM ฟรีจริงไหม และจำกัดอะไรบ้าง",
          "a": "ฟรีจริงภายในขีดจำกัดของ PeerapoS CRM รุ่นฟรีเพิ่มรายชื่อได้สูงสุด 3,000 รายชื่อ เพิ่มกิจการได้สูงสุด 3 กิจการ ใช้ได้เฉพาะเครื่องหลัก ไม่มีโฆษณา ไม่ต้องสมัครบัญชี และมี PeerapoS Pro แบบสมัครสมาชิกให้เลือกเพื่อปลดขีดจำกัด"
        },
        {
          "q": "ติดตั้ง PeerapoS CRM บนคอมยังไง",
          "a": "ติดตั้งได้บน Windows 10 และ 11 64-bit กดปุ่มดาวน์โหลด เปิดไฟล์ที่โหลดมา แล้วโปรแกรมจะติดตั้งเอง ถ้า Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway จากนั้นเปิดโปรแกรมจากเดสก์ท็อปหรือเมนู Start"
        }
      ]
    },
    "en": {
      "metaDescription": "PeerapoS CRM is a customer book for follow-ups, deals, conversation notes, birthdays and sales reports, free within limits.",
      "useCase": "Made for shops and SMEs that need to follow up with many customers at once. Use it to keep customer lists, view deal stages, set daily follow-ups, log conversations, remember customer birthdays and check sales reports without keeping everything in your head.",
      "faq": [
        {
          "q": "How does this CRM help me follow up with customers?",
          "a": "It shows who to contact today, who is overdue and which deals are close to closing. Open the app and see daily follow-ups, sales stages and your customer list in one place."
        },
        {
          "q": "Can I record customer conversations and birthdays?",
          "a": "Yes, you can log conversations and keep customer birthdays. It works as a customer book that helps you review contact history before reaching out again or following up on sales."
        },
        {
          "q": "Is PeerapoS CRM really free, and what are the limits?",
          "a": "Yes, it is free within PeerapoS CRM's limits. The free version supports up to 3,000 contacts, up to 3 businesses and only the main PC, with no ads and no account needed. An optional PeerapoS Pro subscription is available to lift the limits."
        },
        {
          "q": "How do I install PeerapoS CRM on my PC?",
          "a": "Install it on Windows 10 and 11 64-bit. Press the download button, open the downloaded file and it installs on its own. If Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway. Then open the app from the desktop or Start menu."
        }
      ]
    }
  },
  "campaign": {
    "th": {
      "metaDescription": "วางแผนคอนเทนต์บนปฏิทินการตลาดไทย จดงบโฆษณาและผลลัพธ์ แล้วสรุปรายงานหน้าเดียว PDF/PNG/Excel",
      "useCase": "เหมาะกับเจ้าของร้านและทีมการตลาด SME ที่ต้องวางคอนเทนต์รายเดือนให้ตรงวันเซลล์ วันหยุด และวันเงินเดือนออก พร้อมจดงบโฆษณากับผลลัพธ์ไว้ที่เดียว แล้วดูภาพรวมแคมเปญจากรายงานหน้าเดียว",
      "faq": [
        {
          "q": "โปรแกรมวางแผนแคมเปญนี้ช่วยวางคอนเทนต์อะไรได้บ้าง",
          "a": "PeerapoS Campaign ใช้วางคอนเทนต์รายเดือนบนปฏิทินการตลาดไทยได้ ปฏิทินใส่วันเซลล์ วันหยุด และวันเงินเดือนออกไว้ให้แล้ว จึงช่วยจัดจังหวะแคมเปญให้ตรงช่วงสำคัญของร้าน"
        },
        {
          "q": "จดงบโฆษณากับผลลัพธ์แล้วได้รายงานแบบไหน",
          "a": "โปรแกรมสรุปแคมเปญเป็นรายงานหน้าเดียวได้ บันทึกงบโฆษณาและผลลัพธ์ แล้วให้โปรแกรมคำนวณตัวชี้วัดอัตโนมัติ รายงานส่งออกได้เป็น PDF/PNG/Excel"
        },
        {
          "q": "ใช้วางแผนหลายแบรนด์หรือหลายบริษัทได้ไหม",
          "a": "รุ่นฟรีเพิ่มได้สูงสุด 3 แบรนด์และ 3 บริษัท ถ้าต้องการปลดขีดจำกัด PeerapoS Pro เพิ่มแบรนด์และบริษัทได้ไม่จำกัด และเชื่อมคอมพิวเตอร์เครื่องอื่นในร้านผ่าน LAN ได้สูงสุด 5 เครื่องนอกจากเครื่องหลัก"
        },
        {
          "q": "โปรแกรมวางแผนแคมเปญฟรีใช้ฟรีจริงไหม",
          "a": "ฟรีจริงภายในขีดจำกัดของรุ่นฟรี ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ใช้งานออฟไลน์บน Windows 10 และ 11 แบบ 64-bit และข้อมูลเก็บอยู่ในเครื่องคุณเอง ถ้าต้องการติดตั้งให้กดดาวน์โหลด เปิดไฟล์ที่โหลดมา ถ้า Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway"
        }
      ]
    },
    "en": {
      "metaDescription": "Plan content on a Thai marketing calendar, log ad spend and results, then export a one-page PDF/PNG/Excel report.",
      "useCase": "Made for SME owners and marketing teams that plan monthly content around sale days, holidays and paydays, keep ad spend and results in one place, and review campaign performance from a one-page report.",
      "faq": [
        {
          "q": "What content can this campaign planning app help me plan?",
          "a": "PeerapoS Campaign lets you plan monthly content on a Thai marketing calendar. The calendar already includes sale days, holidays and paydays, so you can time campaigns around the important periods for your shop."
        },
        {
          "q": "What kind of report do I get after logging ad spend and results?",
          "a": "The app summarizes each campaign as a one-page report. Log ad spend and results, then let the app calculate metrics for you. Reports can be exported as PDF/PNG/Excel."
        },
        {
          "q": "Can I plan for multiple brands or companies?",
          "a": "The free version supports up to 3 brands and 3 companies. If you want to lift the limits, PeerapoS Pro gives you unlimited brands and companies, and can connect up to 5 other PCs in the shop over LAN in addition to the main PC."
        },
        {
          "q": "Is this campaign planning app really free to use?",
          "a": "Yes, within the free version limits. There are no ads, no account is needed, it works offline on Windows 10 and 11 64-bit, and your data stays on your own PC. To install, press download, open the downloaded file, and if Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway."
        }
      ]
    }
  },
  "plan": {
    "th": {
      "metaDescription": "วางแผนโปรเจกต์และงานด้วยลิสต์ บอร์ด ปฏิทิน ไทม์ไลน์ สปรินต์ เป้าหมาย บันทึกเวลา และส่งออก PDF/Excel",
      "useCase": "เหมาะกับทีมที่ต้องรวมงานหลายโปรเจกต์ไว้ที่เดียว ติดตามงานเป็นลิสต์ บอร์ด ปฏิทิน หรือไทม์ไลน์ วางสปรินต์และเป้าหมาย บันทึกเวลา และส่งออกรายงาน PDF/Excel จากคอมพิวเตอร์ Windows",
      "faq": [
        {
          "q": "รวมงานหลายโปรเจกต์ใน PeerapoS Plan ได้ยังไง",
          "a": "รวมงานทุกโปรเจกต์ไว้ที่เดียวได้ ดูงานได้ทั้งลิสต์ บอร์ด ปฏิทิน และไทม์ไลน์เพื่อเลือกมุมมองที่เหมาะกับงานแต่ละแบบ"
        },
        {
          "q": "โปรแกรมวางแผนงานนี้มีสปรินต์ เป้าหมาย และบันทึกเวลาไหม",
          "a": "มีสปรินต์ เป้าหมาย และบันทึกเวลา ใช้ติดตามงานในแผนและเวลาที่บันทึกไว้ในแต่ละงาน"
        },
        {
          "q": "ข้อมูล PeerapoS Plan เก็บไว้ที่ไหนและส่งออกรายงานได้ไหม",
          "a": "ข้อมูลเข้ารหัสไว้ในเครื่องและส่งออก PDF/Excel ได้ พิมพ์รายงานเป็น PDF ได้จากข้อมูลโปรเจกต์ที่บันทึกไว้"
        },
        {
          "q": "PeerapoS Plan ฟรีจริงไหม ใช้บน Windows ได้หรือเปล่า",
          "a": "ฟรีจริงภายในขีดจำกัดของ PeerapoS Plan รุ่นฟรีเพิ่มคนได้สูงสุด 5 คน เพิ่มบริษัทได้สูงสุด 3 บริษัท และใช้ได้เฉพาะเครื่องหลัก ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ใช้งานออฟไลน์บน Windows 10 และ 11 (64-bit) ข้อมูลเก็บอยู่ในเครื่องคุณเอง และเลือก PeerapoS Pro ได้ถ้าต้องการปลดขีดจำกัด"
        }
      ]
    },
    "en": {
      "metaDescription": "Plan projects and tasks with list, board, calendar, timeline, sprints, goals, time tracking, and PDF/Excel export.",
      "useCase": "For teams that need to keep multiple projects in one place, track work as a list, board, calendar or timeline, plan sprints and goals, record time, and export PDF/Excel reports from a Windows PC.",
      "faq": [
        {
          "q": "How do I bring multiple projects together in PeerapoS Plan?",
          "a": "You can keep every project in one place. View work as a list, board, calendar or timeline so you can choose the view that fits each kind of work."
        },
        {
          "q": "Does this project planner have sprints, goals and time tracking?",
          "a": "Yes, it has sprints, goals and time tracking. Use them to track the work in a plan and the time recorded for each task."
        },
        {
          "q": "Where is PeerapoS Plan data kept and can it export reports?",
          "a": "The data is encrypted on your PC and can be exported to PDF/Excel. You can print PDF reports from the project data you have saved."
        },
        {
          "q": "Is PeerapoS Plan really free and does it run on Windows?",
          "a": "Yes, it is free within PeerapoS Plan's limits. The free version supports up to 5 people, up to 3 companies and the main PC only, with no ads and no account needed. It works offline on Windows 10 and 11 (64-bit), your data stays on your own PC, and the optional PeerapoS Pro subscription lifts the limits."
        }
      ]
    }
  },
  "bcp": {
    "th": {
      "metaDescription": "PeerapoS BCP ช่วยธุรกิจเล็กทำแผนฉุกเฉิน ประเมินความเสี่ยง เตรียมผู้ติดต่อ ซ้อมแผน และใช้โหมดเกิดเหตุ",
      "useCase": "เหมาะกับร้านค้า สำนักงาน และธุรกิจเล็กที่ต้องมีแผนรับมือเหตุฉุกเฉินไว้ใช้งานจริง ใช้รวบรวมความเสี่ยง งานสำคัญ ทรัพยากร รายชื่อผู้ติดต่อ คู่มือรับมือเหตุ และบันทึกการซ้อมแผนในที่เดียว",
      "faq": [
        {
          "q": "โปรแกรมทำแผนฉุกเฉินสำหรับร้านเล็กใช้ทำอะไรได้บ้าง",
          "a": "ใช้เขียนแผนฉุกเฉินและแผนธุรกิจต่อเนื่องสำหรับธุรกิจเล็กได้ โปรแกรมช่วยประเมินความเสี่ยง ระบุงานสำคัญและทรัพยากร ทำรายชื่อผู้ติดต่อและสายด่วน เตรียมคู่มือรับมือเหตุ ซ้อมแผน และเปิดใช้โหมดเกิดเหตุเมื่อเกิดเหตุจริง"
        },
        {
          "q": "PeerapoS BCP พิมพ์เอกสารอะไรได้บ้าง",
          "a": "พิมพ์แผน บัตรพกพา และโปสเตอร์ได้ เหมาะสำหรับเก็บแผนไว้ในร้าน แจกข้อมูลสำคัญให้ทีม และใช้เตือนขั้นตอนรับมือเหตุฉุกเฉิน"
        },
        {
          "q": "โปรแกรมฟรีจริงไหม",
          "a": "ฟรีจริง ใช้ได้ภายในขีดจำกัดของ PeerapoS BCP ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ถ้าอยากปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก ใช้งานออฟไลน์บน Windows 10 และ 11 ข้อมูลเก็บอยู่ในเครื่องคุณเอง"
        },
        {
          "q": "ติดตั้ง PeerapoS BCP บนคอมพิวเตอร์อย่างไร",
          "a": "ติดตั้งได้ด้วยการดาวน์โหลดไฟล์แล้วเปิดไฟล์ที่โหลดมา โปรแกรมจะติดตั้งเองโดยไม่ต้องกดอะไรเพิ่ม ถ้า Windows ขึ้นกรอบ Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway จากนั้นเปิดโปรแกรมจากเดสก์ท็อปหรือเมนู Start ใช้ได้กับ Windows 10 และ 11 แบบ 64-bit บนคอมพิวเตอร์"
        }
      ]
    },
    "en": {
      "metaDescription": "PeerapoS BCP helps small businesses plan emergencies, assess risks, prepare contacts, run drills and use incident mode.",
      "useCase": "Best for shops, offices and small businesses that need an emergency plan they can actually use. Keep risks, critical work, resources, contacts, response playbooks and drill records in one place.",
      "faq": [
        {
          "q": "What can a small shop use an emergency planning app for?",
          "a": "You can use it to write an emergency and business continuity plan for a small business. The app helps assess risks, identify critical work and resources, create contacts and hotlines, prepare response playbooks, run drills and turn on incident mode when something actually happens."
        },
        {
          "q": "What documents can PeerapoS BCP print?",
          "a": "It can print the plan, wallet cards and a poster. This helps keep the plan in the shop, give key information to the team and remind people of emergency response steps."
        },
        {
          "q": "Are the free apps really free?",
          "a": "Yes, within PeerapoS BCP limits. No ads, no account needed, and the optional PeerapoS Pro subscription lifts the limits. It works offline on Windows 10 and 11, and your data stays on your own PC."
        },
        {
          "q": "How do I install PeerapoS BCP on my computer?",
          "a": "Install it by downloading the file and opening the downloaded file. It installs on its own, with nothing else to click. If Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway. Then open the app from the desktop or Start menu. It works on Windows 10 and 11 64-bit desktops."
        }
      ]
    }
  },
  "school": {
    "th": {
      "metaDescription": "PeerapoS School โปรแกรมสมุดครูสำหรับตารางสอน เช็คชื่อ กรอกคะแนน ตัดเกรด งานครูประจำชั้น พิมพ์ ปพ.5 และ Excel สำหรับ SGS",
      "useCase": "เหมาะสำหรับครูที่ต้องการสมุดครูออฟไลน์ไว้จัดตารางสอน เช็คชื่อ ตามการบ้าน กรอกคะแนน ตัดเกรด และเก็บงานครูประจำชั้น เช่น เยี่ยมบ้าน SDQ และคะแนนความประพฤติ พร้อมพิมพ์ ปพ.5 และส่งออก Excel สำหรับ SGS",
      "faq": [
        {
          "q": "โปรแกรมสมุดครูนี้ตัดเกรดตามหลักสูตรแกนกลางได้ไหม",
          "a": "ตัดเกรดได้จากคะแนนที่กรอกตามหลักสูตรแกนกลาง รองรับผล ร มส ผ มผ และพิมพ์ ปพ.5 ได้"
        },
        {
          "q": "ใช้เช็คชื่อนักเรียนรายคาบกับหน้าเสาธงได้ไหม",
          "a": "ใช้เช็คชื่อได้ทั้งรายคาบและหน้าเสาธง พร้อมตามการบ้านรายวันในโปรแกรมเดียว"
        },
        {
          "q": "งานครูประจำชั้นมีอะไรบ้าง",
          "a": "มีงานครูประจำชั้นสำหรับเยี่ยมบ้าน คัดกรอง SDQ และบันทึกคะแนนความประพฤติ ช่วยเก็บงานประจำชั้นไว้กับสมุดครู"
        },
        {
          "q": "PeerapoS School ฟรีจริงไหมและติดตั้งยังไง",
          "a": "ใช้ฟรีได้ภายในขีดจำกัดของรุ่นฟรี ไม่มีโฆษณา ไม่ต้องสมัครบัญชี และข้อมูลเก็บอยู่ในเครื่องคุณเอง ใช้งานออฟไลน์บน Windows 10 และ 11 แบบ 64-bit ดาวน์โหลดไฟล์ เปิดไฟล์ให้ติดตั้งเอง ถ้า Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway จากนั้นเปิดโปรแกรมจากเดสก์ท็อปหรือ Start ถ้าอยากปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก"
        }
      ]
    },
    "en": {
      "metaDescription": "PeerapoS School is a teacher gradebook for timetables, attendance, scores, grading, homeroom work, ปพ.5 printing and Excel for SGS.",
      "useCase": "Ideal for teachers who want an offline teacher gradebook for timetables, attendance, homework tracking, score entry, grading and homeroom records such as home visits, SDQ and conduct points, with ปพ.5 printing and Excel export for SGS.",
      "faq": [
        {
          "q": "Can this teacher gradebook calculate grades to the Thai core curriculum?",
          "a": "It can calculate grades from the scores you enter to the Thai core curriculum. It supports ร, มส, ผ and มผ results and can print the ปพ.5 report."
        },
        {
          "q": "Can I take per-period and morning-assembly attendance?",
          "a": "You can take attendance both per period and at morning assembly, with daily homework tracking in the same app."
        },
        {
          "q": "What homeroom work does it cover?",
          "a": "It includes homeroom work for home visits, SDQ screening and conduct points. It helps keep homeroom records inside the teacher gradebook."
        },
        {
          "q": "Is PeerapoS School really free and how do I install it?",
          "a": "You can use it for free within the free limits. There are no ads, no account is needed, and your data stays on your own PC. It works offline on Windows 10 and 11 64-bit. Download the file, open it and let it install itself. If Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway. After that, open the app from the desktop or Start. If you want to lift the limits, an optional PeerapoS Pro subscription is available."
        }
      ]
    }
  },
  "trip": {
    "th": {
      "metaDescription": "PeerapoS Trip โปรแกรมบริษัททัวร์ขนาดเล็ก เปิดรอบ รับจอง จัดห้อง ออกใบกำกับภาษี คืนเงิน ตรวจพาสปอร์ต และดูกำไรรายกรุ๊ป",
      "useCase": "ใช้เป็นหลังบ้านของบริษัททัวร์ขนาดเล็ก ตั้งแต่เปิดรอบเดินทาง รับจองและเก็บข้อมูลผู้เดินทาง จัดห้องพัก รับเงิน ออกใบเสร็จและใบกำกับภาษี คืนเงินพร้อมใบลดหนี้ ตรวจอายุพาสปอร์ต ส่งรายชื่อให้บริษัทประกัน และดูต้นทุนกำไรรายกรุ๊ป",
      "faq": [
        {
          "q": "PeerapoS Trip เหมาะกับบริษัททัวร์แบบไหน",
          "a": "เหมาะกับบริษัททัวร์ขนาดเล็กที่ต้องจัดการรอบเดินทางและการจองในที่เดียว ใช้เปิดรอบเดินทาง ดูที่นั่ง เก็บข้อมูลผู้เดินทาง จัดห้องพัก และพิมพ์โปรแกรมทัวร์"
        },
        {
          "q": "โปรแกรมทัวร์ออกใบกำกับภาษีและคืนเงินได้ไหม",
          "a": "ออกเอกสารขายและคืนเงินได้ในโปรแกรม ทำใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จและใบกำกับภาษี ใส่ QR พร้อมเพย์บนใบเสนอราคาและใบแจ้งหนี้ และยกเลิกคืนเงินพร้อมใบลดหนี้"
        },
        {
          "q": "ดูต้นทุนและกำไรของแต่ละกรุ๊ปได้ไหม",
          "a": "ดูต้นทุนและกำไรรายกรุ๊ปได้ บันทึกต้นทุนของรอบเดินทางแล้วติดตามกำไรแยกตามกรุ๊ป"
        },
        {
          "q": "โปรแกรมบริษัททัวร์ฟรีจริงไหม และติดตั้งอย่างไร",
          "a": "ฟรีจริงภายในขีดจำกัดของ PeerapoS Trip ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ใช้งานออฟไลน์บน Windows 10 และ 11 (64-bit) และข้อมูลเก็บอยู่ในคอมพิวเตอร์ของคุณเอง รุ่นฟรีเพิ่มรอบเดินทางที่ยังไม่จบได้สูงสุด 10 รอบ เพิ่มบริษัทได้สูงสุด 3 บริษัท และใช้เฉพาะเครื่องหลัก ถ้าอยากปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก กดปุ่มดาวน์โหลด เปิดไฟล์ที่โหลดมา ถ้า Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway จากนั้นรอติดตั้งเสร็จแล้วเปิดจากเดสก์ท็อปหรือ Start"
        }
      ]
    },
    "en": {
      "metaDescription": "PeerapoS Trip for small tour operators: departures, bookings, rooming, tax invoices, refunds, passport checks and profit per group.",
      "useCase": "Use it as the back office for a small tour company, from opening departures, taking bookings and storing traveller details to assigning rooms, collecting payments, issuing receipts and tax invoices, refunding with credit notes, checking passport expiry, sending name lists to insurers and viewing cost and profit per group.",
      "faq": [
        {
          "q": "What kind of tour company is PeerapoS Trip for?",
          "a": "It is for small tour operators that need to manage departures and bookings in one place. Use it to open departures, view seats, store traveller details, assign rooms and print itineraries."
        },
        {
          "q": "Can the tour software issue tax invoices and handle refunds?",
          "a": "It can issue sales documents and refunds in the app. Create quotes, invoices, receipts and tax invoices, add PromptPay QR to quotes and invoices, and cancel with refunds and credit notes."
        },
        {
          "q": "Can I see cost and profit for each tour group?",
          "a": "You can see cost and profit per group. Record costs for a departure and track profit separately by group."
        },
        {
          "q": "Is the tour company software really free, and how do I install it?",
          "a": "Yes, it is free within PeerapoS Trip's limits. There are no ads, no account is needed, it works offline on Windows 10 and 11 (64-bit), and your data stays on your own PC. The free version allows up to 10 upcoming departures, up to 3 companies and use on the main PC only. If you want to lift the limits, an optional PeerapoS Pro subscription is available. Press the download button, open the downloaded file, and if Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway. Wait for the install to finish, then open it from the desktop or Start."
        }
      ]
    }
  },
  "pilates": {
    "th": {
      "metaDescription": "โปรแกรมหน้าเคาน์เตอร์สตูดิโอพิลาทิส จองคลาสตามจำนวนเครื่องจริง รายชื่อรอ แพ็กเกจเครดิต พร้อมเพย์ และสรุปค่าสอนครู",
      "useCase": "เหมาะกับสตูดิโอพิลาทิสที่มีเครื่องรีฟอร์มเมอร์จำกัด ต้องจัดตารางคลาสรายสัปดาห์ จัดคิวเมื่อคลาสเต็ม ขายแพ็กเกจเครดิต พักแพ็กเกจ เก็บความยินยอมข้อมูลสุขภาพ ออกใบเสร็จพร้อม QR พร้อมเพย์ และสรุปค่าสอนครูจากหน้าเคาน์เตอร์เดียว",
      "faq": [
        {
          "q": "โปรแกรมจองคลาสพิลาทิสจำกัดตามจำนวนเครื่องได้ไหม",
          "a": "จำกัดได้ตามจำนวนเครื่องรีฟอร์มเมอร์ที่ใช้งานได้จริง ตั้งตารางคลาสรายสัปดาห์และให้ที่นั่งไม่เกินจำนวนเครื่องที่เปิดใช้งาน"
        },
        {
          "q": "ถ้าคลาสเต็มแล้วลูกค้ามีรายชื่อรอได้ไหม",
          "a": "มีรายชื่อรอสำหรับคลาสเต็ม เมื่อมีคนยกเลิก คนในรายชื่อรอได้ที่เอง"
        },
        {
          "q": "ขายแพ็กเกจเครดิตและคิดค่าสอนครูได้ไหม",
          "a": "ขายและพักแพ็กเกจเครดิตได้ในโปรแกรมเดียว รองรับนโยบายยกเลิกไม่ทันเวลาและไม่มา ออกใบเสร็จหรือใบกำกับภาษีพร้อม QR พร้อมเพย์ คืนเงิน ใบลดหนี้ และสรุปค่าสอนครู"
        },
        {
          "q": "โปรแกรมพิลาทิสฟรีจริงไหมและติดตั้งยังไง",
          "a": "ฟรีจริงภายในขีดจำกัดของรุ่นฟรี ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ใช้งานออฟไลน์บน Windows 10 และ 11 (64-bit) ข้อมูลเก็บอยู่ในเครื่องคุณเอง ถ้าต้องการปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก วิธีติดตั้งคือกดดาวน์โหลด เปิดไฟล์ที่โหลดมา ถ้า Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway จากนั้นเปิดโปรแกรมจากเดสก์ท็อปหรือเมนู Start"
        }
      ]
    },
    "en": {
      "metaDescription": "Front-desk app for Pilates studios: class booking by reformers in service, waitlist, credit packs, PromptPay receipts and instructor pay.",
      "useCase": "Made for Pilates studios with a limited number of reformers that need a weekly class board, full-class waitlists, credit pack sales, pack pausing, health-data consent, receipts with a PromptPay QR, and instructor pay totals from one front desk.",
      "faq": [
        {
          "q": "Can Pilates class booking be capped by the number of machines?",
          "a": "Yes, spots are capped at the reformers actually in service. Set up a weekly class board and keep bookings within the number of machines in use."
        },
        {
          "q": "Can clients join a waitlist when a class is full?",
          "a": "Yes, there is a waitlist for full classes. When someone cancels, a person on the waitlist gets the spot automatically."
        },
        {
          "q": "Can I sell credit packs and calculate instructor pay?",
          "a": "Yes, you can sell and pause credit packs in the same app. It also supports late-cancel and no-show policies, receipts or tax invoices with a PromptPay QR, refunds, credit notes, and instructor pay totals."
        },
        {
          "q": "Is the Pilates app really free, and how do I install it?",
          "a": "Yes, it is free within the free version's limits. There are no ads, no account is needed, it works offline on Windows 10 and 11 (64-bit), and your data stays on your own PC. If you want to lift the limits, an optional PeerapoS Pro subscription is available. To install, press download, open the downloaded file, and if Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway. After that, open the app from the desktop or Start menu."
        }
      ]
    }
  },
  "repair": {
    "th": {
      "metaDescription": "โปรแกรมร้านซ่อมมือถือ รับเครื่อง พิมพ์ใบรับซ่อม ป้ายติดเครื่อง ส่งราคา ตัดสต็อกอะไหล่ กระดานงานซ่อม ใบรับประกัน และค่าคอมช่าง",
      "useCase": "เหมาะกับร้านซ่อมมือถือที่ต้องการจัดการหน้าเคาน์เตอร์ตั้งแต่รับเครื่อง พิมพ์ใบรับซ่อมและป้ายติดเครื่อง ส่งราคาให้ลูกค้าตกลงก่อนซ่อม ดูงานทั้งร้านบนกระดาน ตัดสต็อกอะไหล่ ส่งมอบพร้อมใบรับประกัน และสรุปค่าคอมช่างในเครื่องของร้าน",
      "faq": [
        {
          "q": "โปรแกรมร้านซ่อมมือถือ PeerapoS Repair ช่วยรับเครื่องหน้าร้านได้อย่างไร",
          "a": "ช่วยออกใบรับซ่อมและป้ายติดเครื่องได้ในขั้นตอนรับเครื่อง เก็บรหัสปลดล็อกแบบซ่อนไว้ และบันทึกราคาที่ลูกค้าตกลงก่อนเริ่มซ่อม"
        },
        {
          "q": "ติดตามงานซ่อมและอะไหล่ในร้านได้ไหม",
          "a": "ติดตามได้จากกระดานงานซ่อมและสต็อกอะไหล่ ใช้ดูงานทั้งร้าน ตัดสต็อกอะไหล่ และขายอะไหล่หน้าร้านได้"
        },
        {
          "q": "ส่งมอบเครื่องพร้อมเอกสารให้ลูกค้ายังไง",
          "a": "ส่งมอบพร้อมใบรับประกันได้ โปรแกรมรองรับใบเสร็จหรือใบกำกับภาษีพร้อม QR พร้อมเพย์ การคืนเงิน ใบลดหนี้ งานเคลม ข้อความ LINE แจ้งลูกค้า และสรุปค่าคอมช่าง"
        },
        {
          "q": "PeerapoS Repair ฟรีจริงไหม ใช้กับคอมอะไร",
          "a": "ฟรีจริงภายในขีดจำกัดของรุ่นฟรี ไม่มีโฆษณา ไม่ต้องสมัครบัญชี และใช้แบบออฟไลน์บน Windows 10 และ 11 (64-bit) ข้อมูลเก็บอยู่ในเครื่องของร้าน ถ้าต้องการปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิก เช่น เพิ่มช่าง บริษัท เครื่องอื่นในร้านผ่าน LAN ตัวเชื่อม AI และสำรองข้อมูลไป Google Drive ของคุณเอง"
        }
      ]
    },
    "en": {
      "metaDescription": "Repair shop front desk app for tickets, device tags, quotes, parts stock, job board, warranty handover, PromptPay QR and tech commission.",
      "useCase": "Best for phone repair shops that want to handle the front desk from device check-in, printed repair tickets and device tags, customer-approved quotes, a shop-wide job board, parts stock, warranty handover, and technician commission summaries on the shop's PC.",
      "faq": [
        {
          "q": "How does PeerapoS Repair help with front-desk check-in at a phone repair shop?",
          "a": "It creates repair tickets and device tags during device check-in. It also stores unlock codes hidden and records the quote that the customer approved before repair work starts."
        },
        {
          "q": "Can I track repair jobs and parts in the shop?",
          "a": "Yes, you can track them with the repair job board and parts stock. Use it to see shop-wide jobs, draw parts from stock, and sell parts at the counter."
        },
        {
          "q": "How do I hand a repaired device back with documents?",
          "a": "You can hand over the device with a warranty slip. The app supports receipts or tax invoices with PromptPay QR, refunds, credit notes, warranty claims, LINE messages to customers, and technician commission summaries."
        },
        {
          "q": "Is PeerapoS Repair really free, and what computer does it run on?",
          "a": "Yes, it is free within the free version's limits. There are no ads and no account needed, it works offline on Windows 10 and 11 (64-bit), and the shop's data stays on its own PC. To lift limits, there is an optional PeerapoS Pro subscription, such as more technicians, companies, other shop PCs over LAN, the AI connector, and backup to your own Google Drive."
        }
      ]
    }
  },
  "studio": {
    "th": {
      "metaDescription": "โปรแกรมหน้าเคาน์เตอร์ห้องซ้อมดนตรีและห้องอัด ดูห้องว่าง รับจองมัดจำ วอล์กอิน คิดเวลาเกิน แพ็กชั่วโมง พร้อมปิดยอดเงินสด",
      "useCase": "เหมาะกับห้องซ้อมดนตรีและห้องอัดที่ต้องคุมตารางห้องหน้าเคาน์เตอร์ในที่เดียว รับจองพร้อมมัดจำ รับลูกค้าวอล์กอิน บันทึกเวลาเข้าห้องออกห้อง คิดเวลาเกิน ขายแพ็กชั่วโมง ให้เช่าอุปกรณ์เสริม และปิดยอดเงินสดประจำวัน",
      "faq": [
        {
          "q": "โปรแกรมห้องซ้อมดนตรีนี้เหมาะกับร้านแบบไหน",
          "a": "เหมาะกับห้องซ้อมดนตรีและห้องอัดที่ต้องจัดการหน้าเคาน์เตอร์ ใช้ดูห้องว่างทั้งร้านบนตารางรายวันหรือรายสัปดาห์ รับจอง รับวอล์กอิน และปิดยอดประจำวันได้ในโปรแกรมเดียว"
        },
        {
          "q": "รับจองพร้อมมัดจำและกันจองซ้อนได้ไหม",
          "a": "รับจองพร้อมมัดจำและช่วยกันจองซ้อนได้ โปรแกรมมีตารางห้องรายวันและรายสัปดาห์ ให้เห็นเวลาว่างของแต่ละห้องก่อนรับจอง"
        },
        {
          "q": "คิดเวลาเกิน ขายแพ็กชั่วโมง และให้เช่าอุปกรณ์ได้ไหม",
          "a": "ทำได้ใน PeerapoS Studio โปรแกรมบันทึกเข้าห้องออกห้องแล้วคิดเวลาเกินให้เอง รองรับแพ็กชั่วโมง อุปกรณ์เสริม ซาวด์เอนจิเนียร์ และราคาตามช่วงเวลา"
        },
        {
          "q": "โปรแกรมฟรีจริงไหมและติดตั้งยังไง",
          "a": "ฟรีจริงภายในขีดจำกัดของรุ่นฟรี ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ใช้งานออฟไลน์บน Windows 10 และ 11 แบบ 64-bit ข้อมูลเก็บอยู่ในเครื่องคุณเอง ถ้าต้องการปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก วิธีติดตั้งคือกดดาวน์โหลด เปิดไฟล์ที่โหลดมา ถ้า Windows ขึ้นกรอบ Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway จากนั้นรอให้ติดตั้งเสร็จและเปิดจากเดสก์ท็อปหรือเมนู Start"
        }
      ]
    },
    "en": {
      "metaDescription": "Front desk software for rehearsal and recording studios: room board, deposits, walk-ins, overtime, hour packs, gear rental and daily close.",
      "useCase": "Built for rehearsal and recording studios that need one front-desk place to manage the room schedule, take bookings with deposits, handle walk-ins, record check-in and check-out times, calculate overtime, sell hour packs, rent extra gear, and close the daily cash total.",
      "faq": [
        {
          "q": "What kind of studio is this rehearsal studio software for?",
          "a": "It is for rehearsal and recording studios that need to manage the front desk. Use it to see every free room on a daily or weekly board, take bookings, handle walk-ins, and close the day in one app."
        },
        {
          "q": "Can it take bookings with deposits and prevent double-booking?",
          "a": "Yes, it supports bookings with deposits and helps prevent double-booking. The app has a daily and weekly room board, so you can see each room's available times before taking a booking."
        },
        {
          "q": "Can it calculate overtime, sell hour packs, and rent gear?",
          "a": "Yes, PeerapoS Studio can do that. The app records check-in and check-out, works out overtime, and supports hour packs, extra gear, sound engineers, and time-of-day pricing."
        },
        {
          "q": "Is the program really free, and how do I install it?",
          "a": "Yes, it is free within the free version's limits. There are no ads, no account is needed, it works offline on Windows 10 and 11 64-bit, and your data stays on your own PC. If you want to lift the limits, the optional PeerapoS Pro subscription is available. To install, press download, open the downloaded file, and if Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway. Wait for the install to finish and open it from the desktop or Start menu."
        }
      ]
    }
  },
  "pharmacy": {
    "th": {
      "metaDescription": "PeerapoS Pharmacy โปรแกรมขายหน้าร้านสำหรับร้านขายยาเล็ก จัดการล็อต วันหมดอายุ แพ้ยา ฉลากยา และบัญชี ข.ย.9–13",
      "useCase": "เหมาะกับร้านขายยาเล็กที่ต้องการขายหน้าร้านด้วยบาร์โค้ดหรือปุ่มรูปสินค้า รับสินค้าเป็นล็อตพร้อมวันหมดอายุ ตัดสต็อกล็อตที่หมดอายุก่อน เตือนแพ้ยาและยาที่ต้องมีใบสั่งยา พิมพ์ฉลากยาหลังรับเงิน และออกบัญชี ข.ย.9–13 ได้เมื่อต้องใช้",
      "faq": [
        {
          "q": "ร้านขายยาเล็กใช้ PeerapoS Pharmacy ทำอะไรได้บ้าง",
          "a": "ใช้ขายหน้าร้านและจัดการงานร้านยาได้ในโปรแกรมเดียว รองรับการขายด้วยบาร์โค้ดหรือปุ่มรูปสินค้า ใบเสร็จ ใบกำกับภาษี QR พร้อมเพย์ โปรโมชัน แต้มสะสม ลิ้นชักเก็บเงิน และรายงานยอดขาย กำไร กับของใกล้หมดอายุ"
        },
        {
          "q": "โปรแกรมร้านขายยาตัดล็อตยาใกล้หมดอายุให้ไหม",
          "a": "ตัดล็อตที่หมดอายุก่อนให้อัตโนมัติเมื่อขายสินค้า โปรแกรมรับสินค้าแบบมีล็อตและวันหมดอายุได้ มีใบสั่งซื้อ รับสินค้า คืนสินค้า ตรวจนับสต็อก และรายงานของใกล้หมดอายุ"
        },
        {
          "q": "โปรแกรมเตือนแพ้ยาและพิมพ์ฉลากยาได้ไหม",
          "a": "เตือนแพ้ยาและยาที่ต้องมีใบสั่งยาได้ โปรแกรมช่วยพิมพ์ฉลากยาหลังรับเงิน และสร้างบาร์โค้ด EAN-13 ของร้านได้"
        },
        {
          "q": "PeerapoS Pharmacy ฟรีจริงไหม ใช้บนเครื่องไหนได้บ้าง",
          "a": "ฟรีจริงภายในขีดจำกัดของรุ่นฟรี ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ใช้งานออฟไลน์บน Windows 10 และ 11 (64-bit) ข้อมูลเก็บอยู่ในเครื่องคุณเอง รุ่นฟรีใส่สินค้าได้สูงสุด 10,000 รายการ เพิ่มบริษัทได้สูงสุด 3 บริษัท และใช้ได้เฉพาะเครื่องหลัก ถ้าต้องการปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก"
        }
      ]
    },
    "en": {
      "metaDescription": "PeerapoS Pharmacy is POS software for small pharmacies, with lots, expiry, allergy alerts, dosage labels and Thai FDA registers.",
      "useCase": "Best for a small pharmacy that needs point-of-sale selling with barcodes or picture buttons, stock receiving with lot and expiry dates, first-expiry-first-out stock draws, allergy and prescription alerts, dosage labels after payment, and Thai FDA ข.ย.9–13 registers whenever needed.",
      "faq": [
        {
          "q": "What can a small pharmacy use PeerapoS Pharmacy for?",
          "a": "You can use it to sell at the counter and manage pharmacy work in one app. It supports barcode or picture-button selling, receipts, tax invoices, PromptPay QR, promotions, loyalty points, a cash drawer, and reports for sales, profit and near-expiry items."
        },
        {
          "q": "Does this pharmacy software draw stock from the lot expiring first?",
          "a": "It automatically draws from the lot that expires first when an item is sold. The app can receive stock with lots and expiry dates, handle purchase orders, receiving, supplier returns, stock counts, and near-expiry reports."
        },
        {
          "q": "Can the app warn about drug allergies and print dosage labels?",
          "a": "It can warn about drug allergies and medicines that need a prescription. The app can print dosage labels after payment and create in-store EAN-13 barcodes."
        },
        {
          "q": "Is PeerapoS Pharmacy really free, and what computer does it run on?",
          "a": "Yes, it is free within the free version limits. There are no ads, no account is needed, it works offline on Windows 10 and 11 (64-bit), and your data stays on your own PC. The free version supports up to 10,000 items, up to 3 companies, and the main PC only. If you want to lift the limits, an optional PeerapoS Pro subscription is available."
        }
      ]
    }
  },
  "pos": {
    "th": {
      "metaDescription": "PeerapoS POS ระบบหน้าร้านฟรีสำหรับร้านอาหาร คาเฟ่ และร้านขายของ เปิดโต๊ะ ส่งใบสั่ง แยกบิล ตัดสต๊อก และปิดกะบน Windows",
      "useCase": "เหมาะกับร้านอาหาร คาเฟ่ และร้านขายของเล็กที่ต้องขายหน้าร้านจริง เปิดโต๊ะจากผังร้านหรือขายหน้าเคาน์เตอร์ ส่งใบสั่งเข้าครัวและบาร์ แยกบิล คิด VAT และค่าบริการ รับเงินหลายแบบ ตัดวัตถุดิบตามสูตร และปิดกะพร้อมนับเงินในลิ้นชัก ใช้ฟรีได้ถึง 20 โต๊ะ 200 เมนู และไม่จำกัดจำนวนบิล",
      "faq": [
        {
          "q": "ร้านอาหาร คาเฟ่ และร้านขายของเล็กใช้ PeerapoS POS ได้ไหม",
          "a": "ได้ PeerapoS POS เปิดโต๊ะจากผังร้านหรือขายที่เคาน์เตอร์ได้ ร้านอาหารและคาเฟ่ส่งใบสั่งไปครัวหรือบาร์ ส่วนร้านขายของใช้โหมดร้านขายของและสแกนบาร์โค้ดได้"
        },
        {
          "q": "PeerapoS POS แยกบิลและคิดค่าบริการได้ไหม",
          "a": "ได้ PeerapoS POS แยกบิลตามรายการหรือหารเท่ากันได้ ระบบคิด VAT และค่าบริการ ออกใบเสร็จ ใบกำกับภาษีอย่างย่อหรือเต็มรูป และแสดง QR พร้อมเพย์ได้"
        },
        {
          "q": "POS ตัดสต๊อกวัตถุดิบและปิดกะได้ไหม",
          "a": "ได้ PeerapoS POS ตัดวัตถุดิบตามสูตรทุกครั้งที่ขายได้ ดูต้นทุนอาหาร เปิดปิดกะ นับเงินในลิ้นชัก และดูรายงานยอดขาย เมนูขายดี กำไรขั้นต้น ยอดตามพนักงาน และภาษีขายได้"
        },
        {
          "q": "โปรแกรม POS ฟรีจริงไหมและติดตั้งบน Windows ยังไง",
          "a": "ฟรีจริง ใช้ได้ภายในขีดจำกัดของ PeerapoS POS ไม่มีโฆษณา ไม่ต้องสมัครบัญชี ใช้งานออฟไลน์บน Windows 10 และ 11 แบบ 64-bit และข้อมูลเก็บอยู่ในเครื่องคุณเอง ดาวน์โหลดไฟล์ เปิดไฟล์ที่โหลดมา ถ้า Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway จากนั้นรอติดตั้งเสร็จและเปิดจากเดสก์ท็อปหรือเมนู Start"
        }
      ]
    },
    "en": {
      "metaDescription": "Free POS for restaurants, cafés and small shops: tables, kitchen tickets, split bills, stock by recipe, shifts and Windows offline use.",
      "useCase": "Best for a restaurant, café or small shop that sells in person: open tables from the floor plan or sell at the counter, send orders to the kitchen and bar, split bills, add VAT and service charge, take multiple payment types, deduct ingredients by recipe and close shifts with a cash-drawer count. Free up to 20 tables and 200 menu items, with no limit on bills.",
      "faq": [
        {
          "q": "Can a restaurant, café or small shop use PeerapoS POS?",
          "a": "Yes, PeerapoS POS can open tables from a floor plan or sell at the counter. Restaurants and cafés can send orders to the kitchen or bar, while shops can use retail shop mode and scan barcodes."
        },
        {
          "q": "Can PeerapoS POS split bills and add service charge?",
          "a": "Yes, PeerapoS POS can split a bill by item or evenly. It adds VAT and service charge, issues receipts and abbreviated or full tax invoices, and can show a PromptPay QR."
        },
        {
          "q": "Can the POS deduct ingredient stock and close shifts?",
          "a": "Yes, PeerapoS POS deducts ingredients by recipe with every sale. You can see food cost, open and close shifts, count the cash drawer, and view sales, top-item, gross-profit, per-staff and sales-tax reports."
        },
        {
          "q": "Is the POS really free, and how do I install it on Windows?",
          "a": "Yes, it is free within PeerapoS POS limits. There are no ads, no account is needed, it works offline on Windows 10 and 11 64-bit, and your data stays on your own PC. Download the file, open the downloaded file, and if Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway. Wait for the install to finish and open it from the desktop or Start menu."
        }
      ]
    }
  },
  "massage": {
    "th": {
      "metaDescription": "โปรแกรมหน้าร้านร้านนวดและสปาเล็ก ดูเตียง คิวหมอ จองล่วงหน้า คอร์สนวด ค่ามือ ปิดยอด ใช้ฟรี ออฟไลน์ ข้อมูลอยู่ในเครื่อง",
      "useCase": "เหมาะกับร้านนวดและสปาเล็กที่ต้องเห็นสถานะเตียงกับห้องทั้งร้าน จัดคิวหมอตามเวลาเข้างาน รับลูกค้าเดินเข้าและจองล่วงหน้าโดยไม่ให้หมอกับเตียงซ้อนเวลา ใช้คุมการต่อเวลา คอร์สนวด ค่ามือ ใบสรุป และปิดยอดประจำวันในเครื่องของร้าน",
      "faq": [
        {
          "q": "โปรแกรมร้านนวดดูเตียงว่างและเวลาที่เหลือได้ไหม",
          "a": "ได้ โปรแกรมแสดงเตียงและห้องเป็นการ์ดพร้อมเวลาที่เหลือของแต่ละเตียง เห็นทันทีว่าเตียงไหนว่าง เตียงไหนกำลังนวด และมีเตือนเมื่อใกล้หมดเวลาหรือเกินเวลา"
        },
        {
          "q": "โปรแกรมร้านนวดจัดคิวหมอและรับจองล่วงหน้าได้ไหม",
          "a": "ได้ โปรแกรมเรียงคิวหมอให้เองตามเวลาเข้างานและเลือกรีเควสหมอได้ รับได้ทั้งลูกค้าเดินเข้าและจองล่วงหน้า โดยช่วยไม่ให้หมอกับเตียงซ้อนเวลา"
        },
        {
          "q": "โปรแกรมคิดค่ามือหมอนวด คอร์สนวด และปิดยอดได้ไหม",
          "a": "ได้ โปรแกรมรองรับค่ามือแบบบาทต่อครั้งหรือเปอร์เซ็นต์ พร้อมประกันมือ ทิป และเบิกล่วงหน้า ออกใบสรุปค่ามือตามช่วงวันที่จ่าย ตัดชั่วโมงคอร์สนวดทีละครั้ง และปิดยอดประจำวันด้วยการนับเงินในลิ้นชัก"
        },
        {
          "q": "PeerapoS Massage ฟรีจริงไหม ใช้กับ Windows อะไร",
          "a": "ฟรีจริง ใช้ได้ภายในขีดจำกัดของรุ่นฟรี ไม่มีโฆษณา ไม่ต้องสมัครบัญชี และใช้งานออฟไลน์บน Windows 10 และ 11 (64-bit) ข้อมูลเก็บอยู่ในเครื่องของร้าน ถ้าอยากปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก"
        }
      ]
    },
    "en": {
      "metaDescription": "Free front desk software for small massage shops and spas: bed cards, therapist queue, bookings, courses, therapist pay and day close.",
      "useCase": "Made for small massage shops and spas that need to see every bed and room status, queue therapists by clock-in time, and take walk-ins and bookings without double-booking a therapist or bed. Use it to manage extensions, massage courses, therapist pay, payout slips and daily closing on the shop's own PC.",
      "faq": [
        {
          "q": "Can massage shop software show free beds and time left?",
          "a": "Yes. The app shows beds and rooms as cards with the time left on each bed, so you can see which bed is free and which session is running, with alerts when time is nearly up or over time."
        },
        {
          "q": "Can massage shop software manage therapist queues and advance bookings?",
          "a": "Yes. The app automatically orders the therapist queue by clock-in time and supports therapist requests, while taking both walk-ins and advance bookings without double-booking a therapist or bed."
        },
        {
          "q": "Can it calculate therapist pay, massage courses and day closing?",
          "a": "Yes. The app supports therapist pay per session or by percentage, with daily minimum, tips and advances, creates payout slips by pay period, uses massage courses hour by hour, and closes the day with a cash-drawer count."
        },
        {
          "q": "Is PeerapoS Massage really free, and which Windows does it support?",
          "a": "Yes, within the free version limits. There are no ads, no account needed, and it works offline on Windows 10 and 11 (64-bit), with data kept on the shop's own PC. The optional PeerapoS Pro subscription lifts the limits."
        }
      ]
    }
  },
  "budget": {
    "th": {
      "metaDescription": "คุมงบหลายบริษัท วางแผนงบรายปี อนุมัติหลายขั้น กันงบด้วย PO ดูงบเทียบใช้จริงและพยากรณ์สิ้นปี ใช้ฟรีออฟไลน์",
      "useCase": "เหมาะกับเจ้าของกิจการหรือทีมการเงินของกลุ่มบริษัทเล็กที่ต้องคุมงบประจำปีหลายบริษัทในที่เดียว ตั้งงบเป็นหัวข้อและรายการย่อย กระจายงบรายเดือน ส่งอนุมัติ ปรับงบ โอนงบ กันงบด้วย PO และติดตามยอดใช้จริงกับพยากรณ์สิ้นปีจากข้อมูลในเครื่อง",
      "faq": [
        {
          "q": "โปรแกรมคุมงบหลายบริษัททำแผนงบประจำปีในที่เดียวได้ไหม",
          "a": "ได้ ใช้วางแผนงบของทุกบริษัทและทุกปีงบในไฟล์เดียว แยกหัวข้อกับรายการย่อย แยกงบประจำกับงบโครงการ และกระจายงบรายเดือนได้แบบเท่ากัน รายไตรมาส ครั้งเดียว หรือกำหนดเอง"
        },
        {
          "q": "PeerapoS Budget คุมอนุมัติ ปรับงบ โอนงบ และ PO ได้อย่างไร",
          "a": "คุมได้ผ่านเอกสารและขั้นอนุมัติที่บันทึกผู้อนุมัติทุกขั้น หลังแผนงบอนุมัติแล้ว การปรับงบหรือโอนงบต้องทำผ่านเอกสารที่มีผู้อนุมัติ และ PO ที่อนุมัติแล้วจะกันงบทันที"
        },
        {
          "q": "ดูงบเทียบใช้จริงและพยากรณ์สิ้นปีได้ไหม",
          "a": "ได้ ค่าใช้จ่ายที่ Post แล้วจะกลายเป็นยอดใช้จริง และดูงบเทียบใช้จริง Pivot แดชบอร์ด และพยากรณ์สิ้นปีได้ มีรายงานมาตรฐาน 15 แบบ ส่งออก Excel, CSV และ PDF รวมถึงนำเข้างบจาก Excel พร้อมกระทบยอด"
        },
        {
          "q": "PeerapoS Budget ฟรีจริงไหม ใช้บนเครื่องแบบไม่ต่อเน็ตได้ไหม",
          "a": "ฟรีจริง ใช้ได้ภายในขีดจำกัด ไม่มีโฆษณา ไม่ต้องสมัครบัญชี และใช้งานออฟไลน์บน Windows 10 และ 11 (64-bit) ข้อมูลอยู่ในเครื่องของคุณเอง รุ่นฟรีเพิ่มได้สูงสุด 3 บริษัทและใช้ได้เฉพาะเครื่องหลัก ถ้าอยากปลดขีดจำกัดมี PeerapoS Pro แบบสมัครสมาชิกให้เลือก"
        }
      ]
    },
    "en": {
      "metaDescription": "Control multi-company budgets with annual plans, approvals, PO commitments, budget vs actual and year-end forecasts. Free and offline.",
      "useCase": "Built for owners or finance teams in small groups of companies that need to control annual budgets for several companies in one place. Set budgets as headers and sub-lines, spread them monthly, submit approvals, adjust or transfer budgets, reserve budget with POs, and track actuals with the year-end forecast from data on your own PC.",
      "faq": [
        {
          "q": "Can I manage annual budgets for several companies in one place?",
          "a": "Yes, you can plan every company and fiscal year in one file. Split budgets into headers and sub-lines, separate recurring and project budgets, and spread them monthly as even, quarterly, one-time or custom amounts."
        },
        {
          "q": "How does PeerapoS Budget control approvals, adjustments, transfers and POs?",
          "a": "It controls them through documents and approval steps that record every approver. After a budget plan is approved, adjustments and transfers must go through approved documents, and an approved PO reserves budget immediately."
        },
        {
          "q": "Can I see budget vs actual and the year-end forecast?",
          "a": "Yes, posted expenses become actuals, and you can see budget vs actual, pivot, dashboard and year-end forecast. There are 15 standard reports exported to Excel, CSV and PDF, plus Excel budget import with reconciliation."
        },
        {
          "q": "Is PeerapoS Budget really free and can it run offline on one PC?",
          "a": "Yes, it is free within its limits, with no ads, no account needed, and offline use on Windows 10 and 11 (64-bit). Your data stays on your own PC. The free version supports up to 3 companies and the main PC only, and the optional PeerapoS Pro subscription lifts the limits."
        }
      ]
    }
  },
  "account": {
    "th": {
      "metaDescription": "PeerapoS Account โปรแกรมบัญชีซื้อขาดสำหรับบริษัทและสำนักงานบัญชี ออกใบกำกับภาษี ภ.พ.30 50 ทวิ ปิดงบ ใช้ผ่าน LAN",
      "useCase": "เหมาะกับบริษัทและสำนักงานบัญชีที่ต้องการทำบัญชีคู่จากเอกสารประจำวัน ออกเอกสารขายและภาษี จัดทำ ภ.พ.30 ภ.ง.ด.3/53 และปิดงบปลายปี โดยเก็บข้อมูลบัญชีเข้ารหัสไว้ในคอมพิวเตอร์ของตัวเอง ใช้ได้กับ Windows 10 และ 11 64-bit บนคอมพิวเตอร์ ราคาซื้อขาด ฿9,990 อัปเดตฟรีตลอด ไม่มีค่ารายเดือน ใช้หลายเครื่องในออฟฟิศผ่าน LAN ได้ตามสิทธิ์ของแอป",
      "faq": [
        {
          "q": "โปรแกรมบัญชีนี้ทำบัญชีคู่และปิดงบได้ไหม",
          "a": "ทำบัญชีคู่และปิดงบปลายปีได้ โปรแกรมมีสมุดรายวัน บัญชีแยกประเภท งบทดลอง งบการเงินตามรายการของ DBD และกระดาษทำการภาษีเงินได้นิติบุคคล"
        },
        {
          "q": "ออกใบกำกับภาษี ภ.พ.30 และ 50 ทวิ ได้ในโปรแกรมเดียวไหม",
          "a": "ออกเอกสารภาษีและรายงานที่ใช้ประจำได้ในโปรแกรมเดียว รองรับใบเสนอราคา ใบแจ้งหนี้ ใบกำกับภาษี ใบเสร็จ ใบลดหนี้ ใบเพิ่มหนี้ รายงานภาษีซื้อภาษีขาย ตัวเลข ภ.พ.30 หนังสือรับรอง 50 ทวิ และ ภ.ง.ด.3/53 พร้อมไฟล์สำหรับ RD Prep"
        },
        {
          "q": "ย้ายข้อมูลจากโปรแกรมบัญชีเดิมได้ไหม",
          "a": "ย้ายข้อมูลจากโปรแกรมเดิมได้ รองรับการนำเข้าด้วย Excel, CSV หรือ DBF"
        },
        {
          "q": "ซื้อ PeerapoS Account แล้วติดตั้งอย่างไร",
          "a": "ซื้อแล้วดาวน์โหลดตัวติดตั้งจากหน้าบัญชีได้ เข้า /account ด้วยบัญชี Google ที่ใช้ซื้อ เปิดไฟล์ที่โหลดมาแล้วรอติดตั้ง หาก Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway"
        }
      ]
    },
    "en": {
      "metaDescription": "PeerapoS Account, one-time accounting software for companies and accounting offices. Tax invoices, PP.30, 50 Tawi, year-end close, LAN use.",
      "useCase": "Built for companies and accounting offices that need to turn daily documents into double-entry books, issue sales and tax documents, prepare PP.30 and PND 3/53, and close the year while keeping encrypted accounting data on their own PCs. Runs on Windows 10 and 11 64-bit desktops. One-time price ฿9,990, free updates for life, no monthly fee, and multi-PC office LAN use within the app license.",
      "faq": [
        {
          "q": "Can this accounting program do double-entry accounting and year-end close?",
          "a": "It can do double-entry accounting and year-end close. The program includes journals, ledgers, a trial balance, DBD line-item financial statements, and a corporate income tax worksheet."
        },
        {
          "q": "Can I issue tax invoices, PP.30 figures and 50 Tawi in one program?",
          "a": "You can issue regular tax documents and reports in one program. It supports quotations, invoices, tax invoices, receipts, credit notes, debit notes, purchase and sales tax reports, PP.30 figures, 50 Tawi certificates, and PND 3/53 with the RD Prep file."
        },
        {
          "q": "Can I move data from my old accounting program?",
          "a": "You can move data in from your old program. Import is supported via Excel, CSV or DBF."
        },
        {
          "q": "After buying PeerapoS Account, how do I install it?",
          "a": "After buying, download the installer from your account page. Go to /account using the Google account you bought with, open the downloaded file and wait for the install. If Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway."
        }
      ]
    }
  },
  "wholesale": {
    "th": {
      "metaDescription": "PeerapoS Wholesale โปรแกรมร้านวัสดุก่อสร้าง ขายหน้าร้าน ขายเชื่อ ส่งของ วางบิล ตามหนี้ สต็อกหลายหน่วย ราคา ฿8,990",
      "useCase": "เหมาะกับร้านวัสดุก่อสร้างและร้านขายส่งที่ต้องขายหน้าร้าน ทำใบเสนอราคา ขายเชื่อ ส่งของด้วยรถ ออกใบส่งของ วางบิล และติดตามหนี้ลูกค้าในงานเดียวกัน สินค้าหนึ่งรายการนับได้หลายหน่วย เช่น เหล็กเส้นเป็นเส้นหรือเป็นตัน ราคาซื้อขาด ฿8,990 อัปเดตฟรีตลอด ไม่มีค่ารายเดือน ใช้ได้ 2 เครื่องในร้านเดียวกันผ่าน LAN และ 2 บริษัท",
      "faq": [
        {
          "q": "โปรแกรมร้านวัสดุก่อสร้างขายเชื่อและส่งของได้ไหม",
          "a": "ได้ PeerapoS Wholesale รองรับขายหน้าร้าน เสนอราคา ขายเชื่อ และส่งของด้วยรถ มีเอกสารใบส่งของ ใบกำกับภาษี และใบแจ้งหนี้ในใบเดียว พร้อมติดตามของค้างส่ง"
        },
        {
          "q": "สินค้าอย่างเหล็กเส้นนับสต็อกหลายหน่วยได้ไหม",
          "a": "ได้ สินค้าหนึ่งรายการตั้งได้หลายหน่วย เช่น เหล็กเส้นนับเป็นเส้นหรือเป็นตันได้ รองรับราคา 5 ระดับ ซื้อของเข้า นับสต็อก และพิมพ์ป้ายราคา"
        },
        {
          "q": "วางบิลและตามหนี้ลูกค้าได้ไหม",
          "a": "ได้ มีงานวางบิล ใบเสร็จ หัก ณ ที่จ่าย เช็ค และอายุหนี้ลูกหนี้ ช่วยดูเครดิตลูกค้าและตามยอดค้างชำระ"
        },
        {
          "q": "ซื้อ PeerapoS Wholesale แล้วติดตั้งและใช้ได้กี่เครื่อง",
          "a": "ซื้อครั้งเดียว ฿8,990 ใช้ได้ 2 เครื่องในร้านเดียวกันผ่าน LAN และ 2 บริษัท หลังซื้อให้ดาวน์โหลดตัวติดตั้งจากหน้า /account ด้วยบัญชี Google ที่ใช้ซื้อ เปิดไฟล์ติดตั้ง รอจนเสร็จ แล้วเปิดจากเดสก์ท็อปหรือเมนู Start ใช้ได้กับ Windows 10 และ 11 64-bit บนคอมพิวเตอร์"
        }
      ]
    },
    "en": {
      "metaDescription": "PeerapoS Wholesale for building-material shops: counter sales, credit, deliveries, billing, receivables, multi-unit stock. ฿8,990.",
      "useCase": "Built for building-material shops and small wholesalers that need counter sales, quotations, credit sales, truck deliveries, delivery notes, billing runs and customer debt tracking in one workflow. A product can be counted in several units, such as rebar by the piece or by the tonne. One-time price ฿8,990, free updates for life, no monthly fee. Covers 2 PCs on the same LAN and 2 companies.",
      "faq": [
        {
          "q": "Can a building-material shop program handle credit sales and deliveries?",
          "a": "Yes. PeerapoS Wholesale supports counter sales, quotations, credit sales and truck deliveries. It includes a combined delivery note, tax invoice and invoice, plus undelivered-goods tracking."
        },
        {
          "q": "Can stock such as rebar be counted in several units?",
          "a": "Yes. One product can use several units, such as counting rebar by the piece or by the tonne. It also supports 5 price levels, purchases, stock counts and price labels."
        },
        {
          "q": "Can it handle billing runs and customer debt tracking?",
          "a": "Yes. It includes billing runs, receipts, withholding tax, cheques and receivables ageing. This helps you check customer credit and follow up outstanding balances."
        },
        {
          "q": "After buying PeerapoS Wholesale, how do I install it and how many PCs can use it?",
          "a": "Buy once for ฿8,990 and use it on 2 PCs on the same LAN and 2 companies. After purchase, download the installer from /account using the Google account you bought with, open the file, wait for installation to finish, then open it from the desktop or Start menu. It runs on Windows 10 and 11 64-bit desktops."
        }
      ]
    }
  },
  "property": {
    "th": {
      "metaDescription": "โปรแกรมหอพักและอพาร์ตเมนต์ จดมิเตอร์ ออกบิลทั้งอาคาร ตามค่าเช่าค้าง ดูแลสัญญา ย้ายออกและคืนมัดจำ",
      "useCase": "เหมาะกับเจ้าของหอพักและอพาร์ตเมนต์ที่ดูแลหลายห้องหรือหลายอาคาร ต้องการทำงานตั้งแต่จองห้อง ย้ายเข้า สัญญาเช่า จดมิเตอร์ ออกบิล รับเงิน ตามค่าเช่าค้าง ไปจนถึงย้ายออกและคืนเงินมัดจำในโปรแกรมเดียว",
      "faq": [
        {
          "q": "โปรแกรมหอพักนี้เหมาะกับหลายอาคารไหม",
          "a": "เหมาะกับหอพักและอพาร์ตเมนต์ที่มีหลายห้องและหลายอาคาร จัดการห้อง อาคาร ผู้เช่า สัญญาเช่า และข้อมูลหลายบริษัทได้ในระบบเดียว แอปซื้อขาดรวม 2 บริษัท"
        },
        {
          "q": "จดมิเตอร์แล้วออกบิลทั้งอาคารได้ไหม",
          "a": "ออกบิลทั้งอาคารได้ในครั้งเดียวหลังจดมิเตอร์ โปรแกรมช่วยทำบิลรายเดือน พร้อมใบเสร็จและใบกำกับภาษี รวมถึงงานหัก ณ ที่จ่าย"
        },
        {
          "q": "ตามค่าเช่าค้างและคืนเงินมัดจำตอนย้ายออกได้ไหม",
          "a": "ตามค่าเช่าค้างและจัดการย้ายออกพร้อมคืนเงินมัดจำได้ โปรแกรมดูแลตั้งแต่จองห้อง ย้ายเข้า ใบตรวจสภาพห้อง ต่อสัญญา ไปจนถึงย้ายออก"
        },
        {
          "q": "PeerapoS Property ราคาเท่าไรและติดตั้งอย่างไร",
          "a": "PeerapoS Property ราคา ฿7,990 จ่ายครั้งเดียว อัปเดตฟรีตลอด ไม่มีค่ารายเดือน ใช้ได้ 2 เครื่องในร้านเดียวกันผ่าน LAN และ 2 บริษัท หลังซื้อให้ดาวน์โหลดตัวติดตั้งจากหน้า /account ด้วยบัญชี Google ที่ใช้ซื้อ เปิดไฟล์แล้วรอติดตั้งจนเสร็จ ใช้ได้กับ Windows 10 และ 11 แบบ 64-bit บนคอมพิวเตอร์"
        }
      ]
    },
    "en": {
      "metaDescription": "Dorm and apartment software for meter reading, batch billing, arrears, leases, move-out and deposit refunds.",
      "useCase": "Made for dorm and apartment owners who manage many rooms or several buildings and want one program for bookings, move-in, leases, meter readings, billing, payments, arrears, move-out and deposit refunds.",
      "faq": [
        {
          "q": "Is this dorm software suitable for several buildings?",
          "a": "It is suitable for dorms and apartments with many rooms and several buildings. Manage rooms, buildings, tenants, leases and multiple companies in one system. The paid app includes 2 companies."
        },
        {
          "q": "Can I read meters and bill a whole building at once?",
          "a": "You can bill a whole building in one go after entering meter readings. The app helps create monthly bills, receipts and tax invoices, including withholding tax work."
        },
        {
          "q": "Can it follow up rent arrears and refund deposits at move-out?",
          "a": "It can follow up arrears and handle move-out with deposit refunds. The app covers bookings, move-in, room condition reports, lease renewals and move-out."
        },
        {
          "q": "How much is PeerapoS Property and how do I install it?",
          "a": "PeerapoS Property costs ฿7,990 as a one-time payment with free updates for life and no monthly fee. It covers 2 PCs on the same LAN and 2 companies. After buying, download the installer from /account using the Google account you bought with, open the file and wait for installation to finish. It runs on Windows 10 and 11 64-bit desktops."
        }
      ]
    }
  },
  "academy": {
    "th": {
      "metaDescription": "โปรแกรมค่าเทอมและเงินเดือนครู สำหรับโรงเรียนเอกชนและอนุบาล ออกบิล ใบเสร็จ ส่วนลดพี่น้อง ทุน และประกันสังคม",
      "useCase": "เหมาะกับโรงเรียนเอกชนและอนุบาลที่ต้องการดูทะเบียนครอบครัว ผู้ปกครอง และนักเรียน วางแผนค่าเทอม ส่วนลดพี่น้อง ทุนการศึกษา ออกบิลทั้งโรงเรียนแบบแบ่งงวด ออกใบเสร็จรายครอบครัว และทำเงินเดือนครูพร้อมกองทุนสงเคราะห์ ประกันสังคม ใบลา และสลิปเงินเดือนในโปรแกรมเดียว",
      "faq": [
        {
          "q": "โปรแกรมค่าเทอมโรงเรียนเอกชนออกบิลทั้งโรงเรียนได้ไหม",
          "a": "ออกบิลค่าเทอมทั้งโรงเรียนได้ และแบ่งงวดได้ตามแผนค่าเทอม รองรับส่วนลดพี่น้อง ทุนการศึกษา ใบเสร็จรายครอบครัว เช็ค ใบลดหนี้ และคืนเงินประกัน"
        },
        {
          "q": "โปรแกรมโรงเรียนนี้ทำเงินเดือนครูได้ไหม",
          "a": "ทำเงินเดือนครูได้ พร้อมกองทุนสงเคราะห์และประกันสังคม ใช้จัดการใบลาและออกสลิปเงินเดือนได้ในงานเดียวกัน"
        },
        {
          "q": "PeerapoS Academy ราคาเท่าไรและใช้ได้กี่เครื่อง",
          "a": "PeerapoS Academy ราคา ฿7,990 จ่ายครั้งเดียว อัปเดตฟรีตลอด ไม่มีค่ารายเดือน ใช้ได้ 2 เครื่องในร้านเดียวกันผ่าน LAN และ 2 บริษัท หากต้องการมากกว่านี้ PeerapoS Pro เพิ่มได้สูงสุด 50 บริษัท และ 10 เครื่องรวมเครื่องหลัก"
        },
        {
          "q": "ติดตั้ง PeerapoS Academy บน Windows ยังไง",
          "a": "ติดตั้งได้จากไฟล์ในหน้า /account หลังซื้อแอปด้วยบัญชี Google ที่ใช้ซื้อ เปิดไฟล์ที่โหลดมาแล้วโปรแกรมจะติดตั้งเอง หาก Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway จากนั้นเปิดโปรแกรมจากเดสก์ท็อปหรือเมนู Start ใช้ได้กับ Windows 10 และ 11 แบบ 64-bit บนคอมพิวเตอร์ ยังไม่มีเวอร์ชัน Mac มือถือ และแท็บเล็ต"
        }
      ]
    },
    "en": {
      "metaDescription": "School fee and teacher payroll app for private schools and kindergartens, with billing, receipts, discounts, scholarships and social security.",
      "useCase": "Best for private schools and kindergartens that need to manage family, guardian and student records, set up fee plans, sibling discounts and scholarships, bill the whole school in instalments, issue family receipts, and run teacher payroll with the welfare fund, social security, leave and payslips in one program.",
      "faq": [
        {
          "q": "Can this private-school fee program bill the whole school?",
          "a": "It can bill term fees for the whole school and split them into instalments based on fee plans. It supports sibling discounts, scholarships, family receipts, cheques, credit notes and deposit refunds."
        },
        {
          "q": "Can this school program handle teacher payroll?",
          "a": "It can handle teacher payroll, including the welfare fund and social security. You can also manage leave and issue payslips in the same workflow."
        },
        {
          "q": "How much is PeerapoS Academy and how many PCs does it cover?",
          "a": "PeerapoS Academy is ฿7,990 as a one-time payment, with free updates for life and no monthly fee. It covers 2 PCs on the same LAN and 2 companies. If you need more, PeerapoS Pro increases this to up to 50 companies and 10 PCs including the main PC."
        },
        {
          "q": "How do I install PeerapoS Academy on Windows?",
          "a": "Install it from the file in /account after buying the app with the Google account you used to buy it. Open the downloaded file and it installs on its own. If Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway. Then open the app from the desktop or Start menu. It works on Windows 10 and 11 64-bit desktops only, with no Mac, phone or tablet versions yet."
        }
      ]
    }
  },
  "service": {
    "th": {
      "metaDescription": "PeerapoS Service แอปใบงานซ่อมและงานบริการสำหรับร้านที่มีช่างหลายคน แจกงานให้ช่าง วางบิลลูกค้าบริษัท ออกใบกำกับภาษี",
      "useCase": "เหมาะกับร้านซ่อมรถ มือถือ คอมพิวเตอร์ แอร์ และเครื่องใช้ไฟฟ้าที่มีช่างหลายคน ใช้รับงานและเปิดใบงานซ่อม แจกงานให้ช่างบนกระดานงานของแต่ละคน ติดตามงานนอกสถานที่ ดูแลงานลูกค้าบริษัท ฟลีท และบริษัทประกัน พร้อมเครดิต วางบิล ใบเสร็จ ใบกำกับภาษี หัก ณ ที่จ่าย สัญญา PM และรูปถ่ายประกอบงานเคลม",
      "faq": [
        {
          "q": "โปรแกรมใบงานซ่อม PeerapoS Service ราคาเท่าไร ต้องจ่ายรายเดือนไหม",
          "a": "PeerapoS Service ราคา ฿5,990 จ่ายครั้งเดียว ไม่มีค่ารายเดือน อัปเดตฟรีตลอด ใช้ได้ 2 เครื่องในร้านเดียวกันผ่าน LAN และ 2 บริษัท"
        },
        {
          "q": "ร้านซ่อมมีช่างหลายคน แบ่งงานให้ช่างแต่ละคนได้ไหม",
          "a": "แบ่งงานให้ช่างแต่ละคนบนกระดานงานได้ รับงานและเปิดใบงานซ่อม แล้วติดตามงานของช่างแต่ละคนได้จากกระดานงาน"
        },
        {
          "q": "ร้านที่รับงานบริษัท ฟลีท หรือบริษัทประกัน ใช้ได้ไหม",
          "a": "ใช้กับลูกค้าบริษัท ฟลีท และบริษัทประกันได้ รองรับเครดิตและวางบิล ใบเสร็จ ใบกำกับภาษี หัก ณ ที่จ่าย และรูปถ่ายประกอบงานเคลม"
        },
        {
          "q": "ติดตั้ง PeerapoS Service บนเครื่องอะไร และติดตั้งยังไง",
          "a": "ใช้ได้กับ Windows 10 และ 11 (64-bit) บนคอมพิวเตอร์เท่านั้น ยังไม่มีเวอร์ชัน Mac มือถือ และแท็บเล็ต หลังซื้อให้ดาวน์โหลดตัวติดตั้งจาก /account ด้วยบัญชี Google ที่ใช้ซื้อ เปิดไฟล์แล้วโปรแกรมจะติดตั้งเอง หาก Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway"
        }
      ]
    },
    "en": {
      "metaDescription": "PeerapoS Service is job ticket software for multi-technician service shops, with technician boards, company billing and tax invoices.",
      "useCase": "Built for car garages, phone and computer repair shops, aircon service shops and appliance service shops with several technicians. Use it to take jobs and create repair tickets, assign jobs to each technician’s board, track on-site jobs, handle company, fleet and insurer customers, and manage credit terms, billing runs, receipts, tax invoices, withholding tax, PM contracts and claim photos.",
      "faq": [
        {
          "q": "How much is PeerapoS Service job ticket software, and is there a monthly fee?",
          "a": "PeerapoS Service is ฿5,990, paid once with no monthly fee. It includes free updates for life and covers 2 PCs on the same LAN and 2 companies."
        },
        {
          "q": "Can a repair shop with several technicians assign jobs to each technician?",
          "a": "You can assign jobs to each technician on a job board. Take in jobs, create repair tickets and track each technician’s work from the board."
        },
        {
          "q": "Can shops that serve companies, fleets or insurers use it?",
          "a": "It supports company, fleet and insurer customers. It covers credit terms and billing runs, receipts, tax invoices, withholding tax and claim photos on the job."
        },
        {
          "q": "What device can PeerapoS Service be installed on, and how do I install it?",
          "a": "It runs on Windows 10 and 11 (64-bit) desktops only. There are no Mac, phone or tablet versions yet. After buying, download the installer from /account using the Google account you bought with, then open the file and it installs on its own. If Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway."
        }
      ]
    }
  },
  "contractor": {
    "th": {
      "metaDescription": "โปรแกรมผู้รับเหมา ทำ BOQ ใบเสนอราคา สัญญาแบ่งงวด เบิกงวด คืนเงินประกันผลงาน คุมต้นทุนงาน และจ่ายค่าแรงทีมช่าง",
      "useCase": "เหมาะกับผู้รับเหมาสร้างบ้าน รีโนเวต และงานตกแต่ง ที่ต้องเริ่มจาก BOQ ทำใบเสนอราคา ทำสัญญาแบ่งงวด เบิกงวด จัดการงานเพิ่ม-ลด คืนเงินประกันผลงาน คุมต้นทุนจริงเทียบงบ และจ่ายค่าแรงทีมช่างในโปรแกรมเดียว",
      "faq": [
        {
          "q": "โปรแกรมผู้รับเหมาทำ BOQ และใบเสนอราคาได้ไหม",
          "a": "ทำ BOQ หลายเวอร์ชันและออกใบเสนอราคาได้ ดึงราคาจากคลังต้นทุนเพื่อช่วยตั้งราคางาน แล้วนำไปทำสัญญาแบ่งงวดสำหรับงานรับเหมาได้"
        },
        {
          "q": "โปรแกรมนี้ช่วยเบิกงวด เงินล่วงหน้า และเงินประกันผลงานอย่างไร",
          "a": "จัดการเบิกงวด เงินล่วงหน้า และเงินประกันผลงานในงานเดียวกันได้ ออกใบเสร็จและใบกำกับภาษีพร้อมหัก ณ ที่จ่ายได้ตามข้อมูลของงาน"
        },
        {
          "q": "คุมต้นทุนงานก่อสร้างและค่าแรงช่างได้ไหม",
          "a": "คุมต้นทุนจริงเทียบงบและจ่ายค่าแรงทีมช่างได้ บันทึกซื้อของ บิลผู้ขาย งานจ้างช่วง ลงเวลาช่าง เบิกล่วงหน้า ค่าแรง และประกันสังคมได้"
        },
        {
          "q": "PeerapoS Contractor ซื้อแล้วใช้ได้กี่เครื่อง ติดตั้งยังไง",
          "a": "PeerapoS Contractor ราคา ฿5,990 จ่ายครั้งเดียว ใช้ได้ 2 เครื่องในร้านเดียวกันผ่าน LAN และ 2 บริษัท อัปเดตฟรีตลอด ไม่มีค่ารายเดือน ใช้ได้กับ Windows 10 และ 11 (64-bit) บนคอมพิวเตอร์ ซื้อแล้วดาวน์โหลดตัวติดตั้งจาก /account ด้วยบัญชี Google ที่ใช้ซื้อ เปิดไฟล์ที่โหลดมาแล้วรอติดตั้งจนเสร็จ หาก Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway"
        }
      ]
    },
    "en": {
      "metaDescription": "Contractor software for BOQ, quotations, staged contracts, progress claims, retention, job costs and crew pay in one Windows app.",
      "useCase": "Built for house builders, renovation contractors and fit-out teams that need to start from a BOQ, create quotations, make staged contracts, bill progress claims, manage variations, release retention, compare actual costs with budget and pay crew wages in one app.",
      "faq": [
        {
          "q": "Can this contractor program create BOQs and quotations?",
          "a": "It can create multiple BOQ versions and issue quotations. Use prices from the cost library to help price the job, then turn it into a staged contract for contractor work."
        },
        {
          "q": "How does this program handle progress claims, advances and retention?",
          "a": "It manages progress claims, advances and retention in the same job. You can issue receipts and tax invoices with withholding tax from the job data."
        },
        {
          "q": "Can it control construction costs and crew wages?",
          "a": "It tracks actual costs against budget and pays the crew. You can record purchases, supplier bills, sub-contracts, crew attendance, wage advances, wages and social security."
        },
        {
          "q": "After buying PeerapoS Contractor, how many PCs can I use and how do I install it?",
          "a": "PeerapoS Contractor costs ฿5,990, paid once, and covers 2 PCs on the same LAN and 2 companies. Updates are free for life and there is no monthly fee. It runs on Windows 10 and 11 (64-bit) desktops. After buying, download the installer from /account using the Google account you bought with, open the downloaded file and wait for installation to finish. If Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway."
        }
      ]
    }
  },
  "wellness": {
    "th": {
      "metaDescription": "PeerapoS Wellness โปรแกรมร้านนวด สปา พิลาทิส จัดคิว คลาส แพ็กเกจ ค่ามือ ทิป รายงาน จ่ายครั้งเดียว ฿4,990",
      "useCase": "เหมาะกับร้านนวด สปา และสตูดิโอพิลาทิสหรือโยคะที่ต้องจัดคิวหมอนวด รับลูกค้าเดินเข้า จัดคลาสตามจำนวนเครื่องที่ใช้ได้จริง ขายแพ็กเกจเป็นครั้งหรือเป็นนาที และสรุปค่ามือหมอนวดกับค่าสอนครูในโปรแกรมเดียว ซื้อขาด ฿4,990 อัปเดตฟรี ไม่มีค่ารายเดือน ใช้ได้ 2 เครื่องในร้านเดียวกันผ่าน LAN และ 2 บริษัท บน Windows 10 และ 11 64-bit",
      "faq": [
        {
          "q": "โปรแกรมร้านนวดใช้จัดคิวหมอนวดและลูกค้าเดินเข้าได้ไหม",
          "a": "ใช้จัดคิวหมอนวดและลูกค้าเดินเข้าได้ มีลูกค้าและแบบประเมินสุขภาพพร้อมความยินยอม กระดานนัดหมายตามหมอนวดและเวลา และรับเงินมัดจำ ทิป ค่าบริการได้"
        },
        {
          "q": "โปรแกรมสตูดิโอพิลาทิสจำกัดจำนวนคนตามเครื่องได้ไหม",
          "a": "จำกัดจำนวนคนตามจำนวนเครื่องที่ใช้ได้จริงได้ มีตารางคลาสพร้อมรายชื่อรอ เหมาะกับสตูดิโอพิลาทิสหรือโยคะที่ต้องคุมจำนวนที่นั่งตามเครื่องในแต่ละคลาส"
        },
        {
          "q": "ขายแพ็กเกจเป็นครั้งหรือเป็นนาทีได้ไหม",
          "a": "ขายแพ็กเกจเป็นครั้งหรือเป็นนาทีได้ แพ็กเกจพักได้ โอนได้ และคืนเงินได้ จึงใช้ได้ทั้งร้านที่ขายคอร์สนวดและสตูดิโอที่ขายคลาส"
        },
        {
          "q": "PeerapoS Wellness ราคาเท่าไร ติดตั้งยังไง",
          "a": "PeerapoS Wellness ราคา ฿4,990 จ่ายครั้งเดียว อัปเดตฟรีตลอด ไม่มีค่ารายเดือน ใช้ได้ 2 เครื่องในร้านเดียวกันผ่าน LAN และ 2 บริษัท หลังซื้อให้ดาวน์โหลดตัวติดตั้งจาก /account ด้วยบัญชี Google ที่ใช้ซื้อ เปิดไฟล์แล้วโปรแกรมติดตั้งเอง ถ้า Windows ขึ้น Windows protected your PC ให้กด More info ตรวจว่า Publisher เป็น PeerapoS แล้วกด Run anyway จากนั้นเปิดจากเดสก์ท็อปหรือเมนู Start"
        }
      ]
    },
    "en": {
      "metaDescription": "PeerapoS Wellness for massage, spa and pilates: appointments, classes, packages, therapist pay, tips and reports. Pay once ฿4,990",
      "useCase": "Built for massage and spa shops and pilates or yoga studios that need to book therapists, handle walk-ins, run classes capped at the machines in service, sell packages by session or by minute, and summarize therapist and instructor pay in one program. One-time purchase ฿4,990 with free updates and no monthly fee. Covers 2 PCs on the same LAN, 2 companies, and Windows 10 and 11 64-bit.",
      "faq": [
        {
          "q": "Can this massage shop software manage therapist appointments and walk-ins?",
          "a": "Yes, it can manage therapist appointments and walk-ins. It includes customer records with consented health screening, an appointment board by therapist and time, and checkout with deposits, tips and service charge."
        },
        {
          "q": "Can this pilates studio software cap class size by available machines?",
          "a": "Yes, it can cap class size by the machines in service. It includes a class timetable with a waitlist, suitable for pilates or yoga studios that need to control seats by machine in each class."
        },
        {
          "q": "Can I sell packages by session or by minute?",
          "a": "Yes, you can sell packages by session or by minute. Packages can be paused, transferred and refunded, so they work for both massage course sales and studio class sales."
        },
        {
          "q": "How much is PeerapoS Wellness and how do I install it?",
          "a": "PeerapoS Wellness is ฿4,990, paid once, with free updates for life and no monthly fee. It covers 2 PCs on the same LAN and 2 companies. After buying, download the installer from /account using the Google account you bought with. Open the file and it installs on its own. If Windows shows Windows protected your PC, press More info, check that the Publisher is PeerapoS, then press Run anyway. Then open it from the desktop or Start menu."
        }
      ]
    }
  }
};
