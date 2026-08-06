import { LegalLayout } from "@/components/legal/LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy — Politika e Privatësisë"
      lastUpdated="15 Janar 2026"
      effectiveDate="15 Janar 2026"
    >
      <section>
        <h2>1. Kush jemi ne</h2>
        <p>
          <strong>Pulse AI SH.P.K.</strong> operon platformën te <strong>kohablerjeve.top</strong>. Email: privacy@kohablerjeve.top. Kjo Politikë është në pajtim me <strong>GDPR (BE 2016/679)</strong> dhe <strong>Ligjin Nr. 9887/2008</strong> të Shqipërisë.
        </p>
      </section>
      <section>
        <h2>2. Çfarë të dhënash mbledhim</h2>
        <ul>
          <li><strong>Llogaria:</strong> Emri, emaili, fjalëkalimi (bcrypt hash)</li>
          <li><strong>Biznesi:</strong> Emri, lloji, qyteti, URL-ja</li>
          <li><strong>Pagesat:</strong> Emri i faturimit — kartat NUK ruhen nga ne (Stripe)</li>
          <li><strong>Instagram/WhatsApp:</strong> Token OAuth (AES-256-GCM encrypted), mesazhet</li>
          <li><strong>Automatike:</strong> IP, user-agent, pajisja</li>
        </ul>
      </section>
      <section>
        <h2>3. Enkriptimi dhe Siguria</h2>
        <ul>
          <li>AES-256-GCM encryption për token-et sensitive</li>
          <li>Row Level Security (RLS) — çdo biznes sheh vetëm të dhënat e veta</li>
          <li>TLS 1.3 / HTTPS për të gjitha komunikimet</li>
          <li>Servera në BE: Frankfurt dhe Amsterdam (Supabase EU)</li>
          <li>Stripe/PayPal (PCI-DSS Level 1) — nuk ruajmë karta krediti</li>
        </ul>
      </section>
      <section>
        <h2>4. Të drejtat tuaja (GDPR)</h2>
        <ul>
          <li><strong>Aksesi (Art.15):</strong> Kërkoni çfarë të dhënash kemi</li>
          <li><strong>Fshirja (Art.17):</strong> "E drejta për t'u harruar"</li>
          <li><strong>Portabiliteti (Art.20):</strong> Eksportoni JSON/CSV kurdo</li>
          <li><strong>Kundërshtimi (Art.21):</strong> Kundërshtoni përpunimin marketing</li>
        </ul>
        <p>Kontakt: <strong>privacy@kohablerjeve.top</strong> · Afati: 30 ditë</p>
      </section>
      <section>
        <h2>5. Kontakti</h2>
        <p>
          Pulse AI SH.P.K. · Tiranë, Shqipëri
          <br />
          privacy@kohablerjeve.top · dpo@kohablerjeve.top
        </p>
      </section>
    </LegalLayout>
  );
}
