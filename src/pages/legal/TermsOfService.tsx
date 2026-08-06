import { LegalLayout } from "@/components/legal/LegalLayout";

export default function TermsOfService() {
  return (
    <LegalLayout
      title="Terms of Service — Kushtet e Shërbimit"
      lastUpdated="15 Janar 2026"
      effectiveDate="15 Janar 2026"
    >
      <section>
        <h2>1. Shërbimi</h2>
        <p>
          Pulse AI SH.P.K. ofron platformë SaaS për automatizim biznesi: Inbox AI (WhatsApp/Instagram/Facebook), CRM, Sales Automation, CEO Dashboard dhe AI Agents.
        </p>
      </section>
      <section>
        <h2>2. Pagesat e palëve të treta — RËNDËSISHME</h2>
        <p>
          Këto pagesa shkojnë <strong>drejtpërdrejt te kompanitë e treta</strong>, JO te Pulse AI:
        </p>
        <ul>
          <li>Meta Ads (buxheti reklamave) → Meta Platforms</li>
          <li>Google Ads → Google LLC</li>
          <li>WhatsApp Business API → Meta/BSP</li>
          <li>Twilio (SMS) → Twilio Inc.</li>
          <li>Stripe processing (2.9%+€0.30) → Stripe Inc.</li>
        </ul>
      </section>
      <section>
        <h2>3. Rimbursimi — 14 ditë garanci</h2>
        <ul>
          <li>✅ Brenda 14 ditëve të para: 100% rimbursim</li>
          <li>❌ Pas ditës 14: pa rimbursim monetar</li>
          <li>❌ Pagesat te Meta/Google/Twilio: jashtë kontrollit tonë</li>
          <li>❌ AI credits të konsumuar</li>
        </ul>
        <p>Kontakt: billing@kohablerjeve.top</p>
      </section>
      <section>
        <h2>4. E ndaluar</h2>
        <ul>
          <li>Spam, phishing, komunikim mashtrimtar</li>
          <li>Dërgim masiv pa konsentin e marrësve</li>
          <li>Keqpërdorim i AI për dezinformacion</li>
          <li>Tentativa hakimi ose manipulimi i platformës</li>
        </ul>
      </section>
      <section>
        <h2>5. Ligji i Aplikueshëm</h2>
        <p>
          Ligji i Republikës së Shqipërisë. Mosmarrëveshjet: arbitrazh te Dhoma e Tregtisë Tiranë.
        </p>
      </section>
    </LegalLayout>
  );
}
