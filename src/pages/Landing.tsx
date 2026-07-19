import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Inbox,
  Brain,
  Target,
  TrendingUp,
  LayoutDashboard,
  Shield,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/public-lead-capture`;

const features = [
  { icon: Inbox, title: "Inbox i Unifikuar", desc: "WhatsApp, Instagram, Email dhe Telegram ne nje vend." },
  { icon: Brain, title: "AI me Memorie", desc: "Kupton klientin, mban historikun dhe pergjigjet ne kohe reale." },
  { icon: Target, title: "Lead Capture", desc: "Kap cdo vizitor dhe konverto ne klient me forma inteligjente." },
  { icon: TrendingUp, title: "Revenue Intelligence", desc: "Analiza te thella per shitjet dhe konvertimet." },
  { icon: LayoutDashboard, title: "CEO Dashboard", desc: "Metriket kryesore te biznesit ne nje pamje te vetme." },
  { icon: Shield, title: "Siguria Enterprise", desc: "RLS, 2FA, audit logs dhe kontroll pajisjesh." },
];

const plans = [
  { name: "Starter", price: 50, features: ["1 Business", "500 mesazhe/muaj", "Inbox baze", "Support email"] },
  { name: "Growth", price: 70, features: ["3 Businesses", "5,000 mesazhe/muaj", "AI Replies", "Automations"], highlight: true },
  { name: "Pro", price: 120, features: ["Unlimited biznese", "50,000 mesazhe/muaj", "Content Studio", "Priority support"] },
];

const testimonials = [
  { name: "Arben K.", role: "Pronar, Cafe Tirana", quote: "Automatizuam pergjigjet ne Instagram dhe rritem rezervimet me 40%." },
  { name: "Elira M.", role: "Marketing Lead, Fashion Shop", quote: "Inbox-i i unifikuar na kurseu 3 ore ne dite per ekipin e sherbimit." },
  { name: "Blerim T.", role: "CEO, Real Estate Agency", quote: "Lead capture-i sjell 5-10 kontakte te kualifikuar cdo dite." },
];

export default function Landing() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch(FN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "landing_hero" }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Zap className="w-5 h-5 text-primary" />
            Pulse AI
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Fillo falas</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          AI qe punon 24/7 per biznesin tuaj
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Automatizoni komunikimin, kapni lead-e dhe rrisni te ardhurat me platformen
          e vetme te AI qe kupton biznesin tuaj.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2 mb-6">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 h-11 px-4 rounded-md border border-border bg-background text-sm"
          />
          <Button type="submit" disabled={status === "loading"} className="h-11">
            {status === "loading" ? "..." : "Prova falas"}
          </Button>
        </form>
        {status === "success" && (
          <p className="text-sm text-emerald-500">Faleminderit! Do t'ju kontaktojme se shpejti.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-destructive">Deshtoi. Provoni perseri.</p>
        )}

        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
          <Stat value="90%" label="DM me AI" />
          <Stat value="15 min" label="Onboarding" />
          <Stat value="24/7" label="Gjithmone aktive" />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Cdo gje qe ju duhet</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-lg border border-border p-6">
              <f.icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Cmime te thjeshta</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-lg border p-6 ${
                p.highlight ? "border-primary ring-1 ring-primary" : "border-border"
              }`}
            >
              <div className="text-sm text-muted-foreground">{p.name}</div>
              <div className="mt-2 mb-4">
                <span className="text-4xl font-bold">{p.price}€</span>
                <span className="text-sm text-muted-foreground">/muaj</span>
              </div>
              <ul className="space-y-2 mb-6">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button variant={p.highlight ? "default" : "outline"} className="w-full">
                  Zgjidh {p.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Cfare thone bizneset</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-lg border border-border p-6">
              <p className="text-sm mb-4 italic">"{t.quote}"</p>
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4" /> Pulse AI © {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl md:text-3xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  );
}
