import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="page-shell inner-page">
      <section className="panel contact-panel">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h1 className="page-title">公開 API 経由で問い合わせを受ける</h1>
          <p className="lede">
            問い合わせフォームはポートフォリオの公開機能として分離し、内部向け管理 URL や運用情報は画面に出しません。
          </p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
