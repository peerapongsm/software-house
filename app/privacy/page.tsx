import type { Metadata } from "next";

// Privacy policy for the Windows desktop apps (linked from the site footer).
// Facts verified against app code 2026-10-07: data stays local; network = GitHub update
// check + user-sent feedback/crash reports via feedback.peerapongsm.dev,
// which emails the report and uses the IP only for rate limiting.

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว · Privacy Policy — PeerapoS",
  description: "Privacy policy for the PeerapoS Windows desktop apps by PeerapoS.",
  // override the layout's "/" canonical and og:url
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

const EMAIL = "contact@peerapongsm.dev";
const APPS =
  "PeerapoS Wash, Stock, File, Pay, Garage, Room, Class, CRM, Campaign, Plan, BCP, School, Trip, Pilates, Repair, Studio and Account";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <div className="mt-2 space-y-2 leading-relaxed text-graphite">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
      <a href="/" className="font-display font-bold hover:text-indigo">
        PeerapoS
      </a>

      {/* ── ภาษาไทย ── */}
      <article lang="th" className="mt-8">
        <h1 className="font-display text-4xl font-bold tracking-tight">นโยบายความเป็นส่วนตัว</h1>
        <p className="mt-2 text-graphite">โปรแกรม Windows ของ PeerapoS อัปเดตล่าสุด 14 ตุลาคม 2569</p>
        <p className="mt-4 leading-relaxed text-graphite">ใช้กับโปรแกรม {APPS}</p>

        <Section title="ข้อมูลของคุณอยู่ในเครื่องคุณ">
          <p>
            ทุกอย่างที่คุณกรอกในแอป ไม่ว่าจะเป็นสินค้า ลูกค้า พนักงาน หรือเอกสาร เก็บไว้ในคอมพิวเตอร์ของคุณเท่านั้น
            เราไม่มีเซิร์ฟเวอร์เก็บข้อมูลธุรกิจของคุณ และมองไม่เห็นข้อมูลนั้นเลย ไฟล์สำรองหรือไฟล์ที่ส่งออกก็ไปอยู่ในที่ที่คุณเลือกเอง
          </p>
          <p>แอปไม่มีระบบบัญชีผู้ใช้ ไม่มีโฆษณา และไม่มีระบบติดตามการใช้งาน (analytics)</p>
        </Section>

        <Section title="แอปต่ออินเทอร์เน็ตตอนไหน">
          <p>แอปใช้งานออฟไลน์ได้ทั้งหมด มีแค่สองกรณีที่ต่อเน็ต</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>ตรวจหาเวอร์ชันใหม่</strong> แอปจะถาม GitHub Releases ว่ามีเวอร์ชันใหม่ไหม ไม่ส่งข้อมูลของคุณไปด้วย
              ยกเว้น PeerapoS Account ที่ไม่ตรวจเอง เพราะ Microsoft Store อัปเดตให้
            </li>
            <li>
              <strong>รายงานปัญหาหรือส่งความเห็น</strong> ส่งเฉพาะตอนที่คุณกดส่งเองเท่านั้น
              รายงานมีข้อความที่คุณพิมพ์ อีเมลสำหรับให้เราตอบกลับ (ถ้าคุณใส่) ชื่อและเวอร์ชันแอป เวอร์ชัน Windows
              และรายละเอียดข้อผิดพลาด ก่อนส่ง แอปจะลบชื่อผู้ใช้ Windows และที่อยู่โฟลเดอร์ในเครื่องออกให้
              รายงานส่งผ่าน feedback.peerapongsm.dev แล้วส่งต่อเป็นอีเมลถึงผู้พัฒนา พร้อมประเทศและเวลาที่ได้รับ
              ที่อยู่ IP ใช้แค่จำกัดจำนวนครั้งที่ส่งได้ ไม่ได้เก็บไว้ เราใช้รายงานเพื่อแก้บั๊กเท่านั้น ไม่ขายหรือแบ่งปันให้ใคร
            </li>
          </ul>
        </Section>

        <Section title="ลบข้อมูล">
          <p>
            ถอนการติดตั้งแอปหรือลบโฟลเดอร์ข้อมูลของแอป ข้อมูลก็หายจากเครื่องคุณ ถ้าเคยส่งรายงานแล้วอยากให้ลบ เขียนมาที่{" "}
            <a href={`mailto:${EMAIL}`} className="text-indigo underline">{EMAIL}</a>
          </p>
        </Section>

        <Section title="ติดต่อ">
          <p>
            ผู้ให้บริการ: พีระพอส (PeerapoS)
            <br />
            มีคำถามเรื่องความเป็นส่วนตัว ทักมาได้ที่{" "}
            <a href={`mailto:${EMAIL}`} className="text-indigo underline">{EMAIL}</a>
          </p>
        </Section>
      </article>

      <hr className="my-14 border-line" />

      {/* ── English ── */}
      <article lang="en">
        <h2 className="font-display text-4xl font-bold tracking-tight">Privacy Policy</h2>
        <p className="mt-2 text-graphite">Windows desktop apps by PeerapoS. Last updated 14 October 2026</p>
        <p className="mt-4 leading-relaxed text-graphite">Applies to {APPS}.</p>

        <Section title="Your data stays on your PC">
          <p>
            Everything you enter — products, customers, staff, documents — is stored only on your computer. We run no
            server that holds your business data and we never see it. Backups and exports go wherever you choose.
          </p>
          <p>No accounts, no ads, no usage tracking or analytics.</p>
        </Section>

        <Section title="When the apps go online">
          <p>The apps work fully offline. They connect to the internet in only two cases:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Update check.</strong> The app asks GitHub Releases whether a new version exists. None of your data
              is sent. PeerapoS Account skips this: the Microsoft Store updates it.
            </li>
            <li>
              <strong>Problem reports and feedback</strong>, only when you choose to send one. A report contains the text
              you type, an optional reply email, the app name and version, the Windows version and error details. Your
              Windows user name and local folder paths are removed before sending. Reports go through
              feedback.peerapongsm.dev and are forwarded by email to the developer, with the country and time received.
              Your IP address is used only for rate limiting and is not stored. Reports are used only to fix bugs and are
              never sold or shared.
            </li>
          </ul>
        </Section>

        <Section title="Deleting data">
          <p>
            Uninstall the app or delete its data folder to remove your data. To have a report you sent deleted, email{" "}
            <a href={`mailto:${EMAIL}`} className="text-indigo underline">{EMAIL}</a>.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Provider: พีระพอส (PeerapoS)
            <br />
            Privacy questions: <a href={`mailto:${EMAIL}`} className="text-indigo underline">{EMAIL}</a>
          </p>
        </Section>
      </article>
    </main>
  );
}
