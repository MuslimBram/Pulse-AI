
# Plan: Raport i Plotë Auditimi i Projektit (PDF, Shqip)

## Objektivi
Të prodhoj një raport PDF të shkarkueshëm në shqip me të 18 seksionet e kërkuara, bazuar 100% në skanimin real të kodit, bazës së të dhënave, edge functions, rrugëve, komponentëve dhe konfigurimit — pa supozime, pa "demo".

## Faza 1 — Mbledhja e të dhënave (read-only)

1. **Inventari i kodit**
   - `src/pages/**` — listim i çdo route + lidhja me `src/App.tsx` router
   - `src/components/**` — grupim sipas modulit (admin, billing, crm, helpdesk, media, partner, security, pwa…)
   - `src/hooks/**`, `src/lib/**`, `src/integrations/**`
   - `vite.config.ts`, `index.html`, `public/manifest.json` për PWA

2. **Inventari i backend-it**
   - `supabase/functions/**` — listim i çdo edge function + verb HTTP, auth, qëllim
   - `supabase/migrations/**` — historiku i skemës
   - Live nga DB: `information_schema.tables`, `pg_policies`, `pg_proc`, foreign keys, row counts për tabelat (përdorur/papërdorur)

3. **Konfigurimi i platformës**
   - Secrets (emrat), buckets, cron jobs (`pg_cron`), connectors
   - `supabase--linter` për warnings RLS/security
   - `security--run_security_scan` për gjetjet aktive
   - `supabase--db_health` për gjendjen e instancës

4. **Historiku i kërkesave**
   - `chat_search--recall_chat_history` për të nxjerrë çdo feature të kërkuar nga përdoruesi që nga fillimi (për seksionet 2–5)

## Faza 2 — Analiza
- Klasifikim i çdo feature: Completed / Partially / Started / Not Started / Missing
- Llogaritje përqindjesh bazuar në artefaktet reale (tabela ekziston? RLS? edge function aktiv? UI page e lidhur? thirret nga client?)
- Identifikim i tabelave orfane (pa lexime nga kodi), edge functions të padeploy-uar, faqeve "placeholder", të dhënave mock, hardcoded URLs/keys
- Krahasim i kërkesave nga historiku me realitetin aktual

## Faza 3 — Gjenerimi i PDF-së
- Script Python me **ReportLab** (Platypus) → `/mnt/documents/Auditimi_Projektit_v1.pdf`
- Strukturë:
  - Faqja e kopertinës (emri i projektit, data 19 Qershor 2026, versioni)
  - Tabela e përmbajtjes me linqe brendsh­me
  - 18 seksione me titujt e kërkuar (në shqip)
  - Tabela të strukturuara për inventarët (tables/pages/APIs)
  - Scorecard përfundimtar me përqindje
  - Roadmap P0/P1/P2/P3 me prioritete
  - "Verdikti i ndershëm" — pa fshehur problemet
- Tipografia: Helvetica, ngjyrat e brand (navy `#0b1020` + accent), tabelat me rreshta të alternuar
- QA: konvertim në imazhe me `pdftoppm`, inspektim faqe-për-faqe, rikrijim nëse ka overflow/clipping
- Versionim: nëse kërkohen rishikime → `_v2.pdf`, `_v3.pdf`

## Faza 4 — Dorëzimi
- Tag `<presentation-artifact>` me PDF-në
- Përmbledhje 2-rreshtore në chat me totalin e tabelave/faqeve/funksioneve të skanuara dhe scorecard-in përmbledhës

## Çfarë NUK bëhet
- Pa ndryshime në kod ose në DB
- Pa "shtuar" feature gjatë auditit — vetëm dokumentim i gjendjes ekzistuese
- Pa rrumbullakime ose përgjigje vague — çdo pohim do të ketë referencë (file:line ose emër tabele/funksioni)

## Koha e pritshme
~3–5 minuta skanim + ~1 minutë gjenerim PDF + QA vizual.
