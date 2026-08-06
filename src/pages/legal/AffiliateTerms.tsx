import { LegalLayout } from "@/components/legal/LegalLayout";

export default function AffiliateTerms() {
  return (
    <LegalLayout
      title="Ambassador & Freelancer Terms"
      lastUpdated="15 Janar 2026"
      effectiveDate="15 Janar 2026"
    >
      <section>
        <h2>1. Ambassador (vetëm referon)</h2>
        <ul>
          <li><strong>35% lifetime komision</strong> — recurring, për sa kohë klienti paguan</li>
          <li>Pagesa mujore deri më 15 të muajit pasardhës</li>
          <li>Minimum 3 referime aktive/muaj për status Ambassador</li>
          <li>Nën 3 referime: status "Referues" me 20%</li>
          <li>Mbi 10 referime: "Ambassador Pro" me 40%</li>
        </ul>
        <p>
          <strong>Shembull:</strong> Klienti paguan Growth 149€/m → Ju merrni 149€ × 35% = <strong>52.15€/muaj</strong>
        </p>
      </section>
      <section>
        <h2>2. Freelancer (referon + menaxhon)</h2>
        <ul>
          <li>35% e abonimit + 40% e management fee tuaj</li>
          <li>Menaxhon bizneset e klientëve në platformë</li>
        </ul>
        <p>
          <strong>Shembull:</strong> Klienti paguan 149€ plan + 80€ management → Ju merrni: 52.15€ + 32€ = <strong>84.15€/muaj</strong>
        </p>
      </section>
      <section>
        <h2>3. Pagesat</h2>
        <table>
          <thead>
            <tr>
              <th>Elementi</th>
              <th>Detaji</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Frekuenca</td>
              <td>Mujore (deri 15 të muajit pasardhës)</td>
            </tr>
            <tr>
              <td>Monedha</td>
              <td>EUR</td>
            </tr>
            <tr>
              <td>Minimumi</td>
              <td>€50</td>
            </tr>
            <tr>
              <td>Baza</td>
              <td>Vlera NETO (pas Stripe fees)</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2>4. White Label</h2>
        <table>
          <thead>
            <tr>
              <th>Elementi</th>
              <th>Çmimi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Setup Fee (1 herë)</td>
              <td>€8,000</td>
            </tr>
            <tr>
              <td>Licencë mujore</td>
              <td>€499/muaj</td>
            </tr>
            <tr>
              <td>Revenue share</td>
              <td>20% e MRR tuaj</td>
            </tr>
          </tbody>
        </table>
      </section>
    </LegalLayout>
  );
}
