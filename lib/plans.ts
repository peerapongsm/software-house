import type { Msg } from "./api.ts";

// Mirror of caps() in electron/peerapos-licence/worker/src/devices.ts. Change both together.
export const ACCOUNT_PCS = { paid: 2, pro: 6, proPaid: 10 } as const;

/** /pro plan table: 4 plan columns. */
export const PLAN_NAMES: Msg[] = [
  { th: "ฟรี", en: "Free" },
  { th: "แอปซื้อขาด", en: "Paid apps" },
  { th: "Pro", en: "Pro" },
  { th: "Pro + แอปซื้อขาด", en: "Pro + paid apps" },
];

/** /pro plan table: 4 rows, one cell per plan column. */
export const PLAN_ROWS: { label: Msg; cells: Msg[] }[] = [
  {
    label: { th: "ต้องมีบัญชี", en: "Account needed" },
    cells: [
      { th: "ไม่ต้อง", en: "No" },
      { th: "ต้อง", en: "Yes" },
      { th: "ต้อง", en: "Yes" },
      { th: "ต้อง", en: "Yes" },
    ],
  },
  {
    label: { th: "คอมที่เชื่อมกับบัญชี", en: "PCs linked to the account" },
    cells: [
      { th: "ไม่ต้องเชื่อม", en: "No link needed" },
      { th: `${ACCOUNT_PCS.paid} เครื่อง`, en: `${ACCOUNT_PCS.paid} PCs` },
      { th: `${ACCOUNT_PCS.pro} เครื่อง`, en: `${ACCOUNT_PCS.pro} PCs` },
      { th: `${ACCOUNT_PCS.proPaid} เครื่อง`, en: `${ACCOUNT_PCS.proPaid} PCs` },
    ],
  },
  {
    label: { th: "ได้อะไร", en: "What you get" },
    cells: [
      { th: "รุ่นฟรีของทุกแอปฟรี", en: "Free version of every free app" },
      { th: "แอปที่ซื้อ ครบทุกฟีเจอร์", en: "Every feature in the apps you bought" },
      { th: "ฟีเจอร์ Pro ในทุกแอป", en: "Pro features in every app" },
      { th: "ทั้งสองอย่าง", en: "Both of the above" },
    ],
  },
  {
    label: { th: "หมดอายุ", en: "Ends" },
    cells: [
      { th: "ไม่มี", en: "Never" },
      { th: "ไม่หมดอายุ", en: "Never expires" },
      { th: "ตามรอบที่จ่าย", en: "At the end of the paid period" },
      { th: "แอปซื้อขาดไม่หมดอายุ ส่วน Pro ตามรอบที่จ่าย", en: "Paid apps never expire; Pro ends with its period" },
    ],
  },
];

/** Notes under the plan table (/pro) and the one line on /buy. */
export const PLAN_NOTES = {
  devices: {
    th: "มือถือ แท็บเล็ต และคอมในร้านที่ต่อเข้าเครื่องหลักไม่นับในแถวคอมที่เชื่อมกับบัญชี จำนวนของแต่ละแอปดูที่หน้าแอปนั้น",
    en: "Phones, tablets and other shop PCs that connect to the main PC do not count in the linked PCs row. Each app's own limit is on its app page.",
  },
  deletion: {
    th: "ถ้าลบบัญชี แอปซื้อขาดและ Pro ที่เหลือจะหายไปถาวร ดูข้อ 4 ในข้อกำหนด",
    en: "Deleting the account removes paid apps and remaining Pro for good. See Terms §4.",
  },
} satisfies Record<string, Msg>;
