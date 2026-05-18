import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="page-shell inner-page">
      <section className="panel contact-panel">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h1 className="page-title">連絡先</h1>
          <p className="lede">
            ポートフォリオの内容，開発経験，研究内容についてのご連絡はこちらからお願いします．内容を確認後，必要に応じて返信します．
          </p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
