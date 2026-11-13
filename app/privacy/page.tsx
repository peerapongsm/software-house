import type { Metadata } from "next";

// Privacy policy for the Windows desktop apps (linked from the site footer).
// Facts verified against app code 2026-10-07 (Pharmacy, POS, Massage, Budget 2026-11-11): data stays local; network = GitHub update
// check + user-sent feedback/crash reports via feedback.peerapongsm.dev,
// which emails the report and uses the IP only for rate limiting.
// LINE OA chat section verified against peerapos-chat 2026-11-13: Claude API replies, last turns kept 24 h in
// Cloudflare KV keyed by a hash of the LINE user ID, daily/monthly counters, 12 h pause after a handoff.

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว · Privacy Policy — PeerapoS",
  description: "Privacy policy for the PeerapoS Windows desktop apps and the PeerapoS LINE Official Account chat.",
  // override the layout's "/" canonical and og:url
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

const EMAIL = "contact@peerapongsm.dev";
const APPS =
  "PeerapoS Wash, Stock, File, Pay, Garage, Room, Class, CRM, Campaign, Plan, BCP, School, Trip, Pilates, Repair, Studio, Pharmacy, POS, Massage and Budget";

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-8 scroll-mt-6">
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
        <p className="mt-2 text-graphite">โปรแกรม Windows และแชต LINE ของ PeerapoS อัปเดตล่าสุด 13 พฤศจิกายน 2569</p>
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
            </li>
            <li>
              <strong>รายงานปัญหาหรือส่งความเห็น</strong> ส่งเฉพาะตอนที่คุณกดส่งเองเท่านั้น
              รายงานมีข้อความที่คุณพิมพ์ อีเมลสำหรับให้เราตอบกลับ (ถ้าคุณใส่) ชื่อและเวอร์ชันแอป เวอร์ชัน Windows
              และรายละเอียดข้อผิดพลาด ก่อนส่ง แอปจะลบชื่อผู้ใช้ Windows และที่อยู่โฟลเดอร์ในเครื่องออกให้
              รายงานส่งผ่าน feedback.peerapongsm.dev แล้วส่งต่อเป็นอีเมลถึงผู้พัฒนา พร้อมประเทศและเวลาที่ได้รับ
              ที่อยู่ IP ใช้แค่จำกัดจำนวนครั้งที่ส่งได้ ไม่ได้เก็บไว้ วันละครั้ง ระบบส่งรายงานที่ได้รับไปให้ Claude ของ Anthropic ช่วยสรุปให้ผู้พัฒนาอ่าน Anthropic ไม่เอาไปฝึก AI เราใช้รายงานเพื่อแก้บั๊กเท่านั้น ไม่ขายหรือแบ่งปันให้ใคร
            </li>
          </ul>
        </Section>

        <Section title="แชตกับ PeerapoS ทาง LINE">
          <p>
            ข้อความที่คุณส่งมาที่ LINE Official Account ของ PeerapoS (@peerapos) บอท AI จะตอบก่อน บอทใช้ Claude ของ Anthropic
            ข้อความของคุณจึงถูกส่งไปที่ Anthropic เพื่อเขียนคำตอบ Anthropic ไม่เอาข้อความนี้ไปฝึก AI
          </p>
          <p>
            เพื่อให้บอทจำได้ว่าคุยอะไรกันอยู่ เราเก็บข้อความล่าสุดไว้ 24 ชั่วโมงแล้วลบทิ้งเอง โดยผูกกับรหัสที่แปลงมาจาก LINE user ID
            ไม่ใช่ชื่อหรือรูปโปรไฟล์ของคุณ และนับจำนวนคำถามต่อวันเพื่อจำกัดโควตา ถ้าคุณพิมพ์ คุยกับแอดมิน หรือบอทตอบเรื่องไหนไม่ได้ บอทจะหยุดตอบคุณ 12 ชั่วโมง และส่งข้อความล่าสุดของคุณทางอีเมลถึงแอดมินเพื่อให้มาตอบเอง
          </p>
          <p>
            บอทมองไม่เห็นข้อมูลในโปรแกรมบนเครื่องคุณ อย่าส่งรหัสผ่านหรือข้อมูลลูกค้าของคุณมาในแชต แอดมินอ่านแชตได้ผ่านระบบของ LINE
            และ LINE เก็บแชตตามนโยบายของ LINE เอง
          </p>
        </Section>

        <Section id="delete" title="ลบข้อมูล">
          <p>
            ถอนการติดตั้งแอปหรือลบโฟลเดอร์ข้อมูลของแอป ข้อมูลก็หายจากเครื่องคุณ ถ้าเคยส่งรายงานแล้วอยากให้ลบ เขียนมาที่{" "}
            <a href={`mailto:${EMAIL}`} className="text-indigo underline">{EMAIL}</a>
          </p>
          <p>
            ข้อความที่คุยกับบอทใน LINE ลบเองภายใน 24 ชั่วโมง ถ้าอยากให้ลบทันที ส่งอีเมลมาที่อยู่เดียวกัน
            บอกช่องทางที่คุยและเวลาคร่าว ๆ ที่ส่งข้อความ
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
        <p className="mt-2 text-graphite">Windows desktop apps and LINE chat by PeerapoS. Last updated 13 November 2026</p>
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
              is sent.
            </li>
            <li>
              <strong>Problem reports and feedback</strong>, only when you choose to send one. A report contains the text
              you type, an optional reply email, the app name and version, the Windows version and error details. Your
              Windows user name and local folder paths are removed before sending. Reports go through
              feedback.peerapongsm.dev and are forwarded by email to the developer, with the country and time received.
              Your IP address is used only for rate limiting and is not stored. Once a day, received reports are sent to
              Claude by Anthropic to write a summary for the developer; Anthropic does not use them to train AI. Reports are
              used only to fix bugs and are never sold or shared.
            </li>
          </ul>
        </Section>

        <Section title="Chatting with PeerapoS on LINE">
          <p>
            Messages you send to the PeerapoS LINE Official Account (@peerapos) are answered first by an AI bot built on
            Claude by Anthropic, so your message is sent to Anthropic to write the reply. Anthropic does not use it to
            train AI.
          </p>
          <p>
            So the bot can follow the conversation, we keep your latest messages for 24 hours and then they are deleted
            automatically. They are keyed to a code derived from your LINE user ID, not your name or profile picture. We
            also count questions per day to enforce a quota. If you type คุยกับแอดมิน (talk to an admin), or the bot can't
            answer, the bot stays quiet for you for 12 hours and emails your latest message to the admin so a person can
            reply.
          </p>
          <p>
            The bot cannot see the data in the apps on your PC. Please don't send passwords or your customers' details in
            the chat. The admin can read chats through LINE, and LINE keeps chats under its own policy.
          </p>
        </Section>

        <Section id="delete-en" title="Deleting data">
          <p>
            Uninstall the app or delete its data folder to remove your data. To have a report you sent deleted, email{" "}
            <a href={`mailto:${EMAIL}`} className="text-indigo underline">{EMAIL}</a>.
          </p>
          <p>
            Chat messages with the LINE bot are deleted automatically within 24 hours. To have them deleted sooner,
            email the same address with the chat channel and roughly when you sent the messages.
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
