import { Link } from "react-router-dom";
import { Zap, ArrowLeft } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  effectiveDate: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, effectiveDate, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-semibold">Pulse AI</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />Kthehu
          </Link>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-3">{title}</h1>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Përditësuar: <strong>{lastUpdated}</strong></span>
            <span>•</span>
            <span>Efektive: <strong>{effectiveDate}</strong></span>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap mb-8 pb-6 border-b border-border">
          {[
            ["/privacy", "Privatësia"],
            ["/terms", "Kushtet"],
            ["/security", "Siguria"],
            ["/cookies", "Cookies"],
            ["/refund", "Rimbursimi"],
            ["/affiliate-terms", "Partnerët"],
            ["/dpa", "DPA"]
          ].map(([href, label]) => (
            <Link key={href} to={href} className="text-xs text-muted-foreground hover:text-primary underline-offset-2 hover:underline">
              {label}
            </Link>
          ))}
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:text-muted-foreground [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_td]:p-3 [&_td]:border [&_td]:border-border [&_td]:text-sm [&_section]:mb-8 [&_a]:text-primary">
          {children}
        </div>
        <div className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground">
          <p>© 2026 Pulse AI SH.P.K. · Tiranë, Shqipëri · legal@kohablerjeve.top</p>
        </div>
      </div>
    </div>
  );
}
