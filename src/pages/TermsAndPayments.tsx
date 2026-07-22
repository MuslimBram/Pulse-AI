import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, ShieldCheck, RefreshCcw, FileCheck, Table as TableIcon } from "lucide-react";

export default function TermsAndPayments() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">Pulse AI</span>
          </Link>
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Terms & Payment Policy</h1>
          <p className="text-muted-foreground mt-2">Transparent breakdown of what you pay to Pulse AI and what you pay to third parties.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><ShieldCheck className="h-5 w-5 text-primary" /> 1. Payment Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><strong>Pulse AI subscription</strong> ranges from <strong>$29/month</strong> (Standard) to <strong>$499/month</strong> (Enterprise) and is billed by Pulse AI.</p>
            <p><strong>Third-party costs</strong> — including Meta Ads, Google Ads, Twilio SMS/voice, and Stripe processing fees — are billed and collected <strong>directly by those providers</strong>, not by Pulse AI. We never mark up or resell third-party media spend.</p>
            <p>You are responsible for connecting your own accounts and funding those services separately.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><RefreshCcw className="h-5 w-5 text-primary" /> 2. Refund Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Refundable:</strong> Your first Pulse AI subscription payment, within <strong>14 days</strong> of purchase.</p>
            <p><strong>Not refundable:</strong></p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Third-party platform costs (Meta, Google, Twilio, Stripe, etc.)</li>
              <li>Usage after the 14-day window</li>
              <li>Renewal payments beyond the first billing cycle</li>
              <li>Add-on media generation credits already consumed</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><FileCheck className="h-5 w-5 text-primary" /> 3. Pre-approved Terms During Onboarding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>By completing signup, your business agreed to:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>The Pulse AI subscription price shown at checkout for the selected plan and billing duration.</li>
              <li>Automatic renewal at the end of each billing cycle until canceled.</li>
              <li>Storing operational data (contacts, conversations, AI knowledge) inside your isolated workspace.</li>
              <li>Pulse AI acting as a processor on your behalf for third-party integrations you connect.</li>
              <li>The refund policy in Section 2.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><TableIcon className="h-5 w-5 text-primary" /> 4. Transparency Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="py-2 pr-4">Item</th>
                    <th className="py-2 pr-4">Paid to</th>
                    <th className="py-2 pr-4">Billed by</th>
                    <th className="py-2">Refundable</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="py-2 pr-4">Pulse AI subscription</td><td className="py-2 pr-4">Pulse AI</td><td className="py-2 pr-4">Pulse AI</td><td className="py-2"><Badge variant="default">14 days</Badge></td></tr>
                  <tr><td className="py-2 pr-4">Media add-on credits</td><td className="py-2 pr-4">Pulse AI</td><td className="py-2 pr-4">Pulse AI</td><td className="py-2"><Badge variant="secondary">If unused</Badge></td></tr>
                  <tr><td className="py-2 pr-4">Meta / Google Ads spend</td><td className="py-2 pr-4">Meta / Google</td><td className="py-2 pr-4">Meta / Google</td><td className="py-2"><Badge variant="outline">No</Badge></td></tr>
                  <tr><td className="py-2 pr-4">Twilio SMS / voice</td><td className="py-2 pr-4">Twilio</td><td className="py-2 pr-4">Twilio</td><td className="py-2"><Badge variant="outline">No</Badge></td></tr>
                  <tr><td className="py-2 pr-4">Stripe processing fees</td><td className="py-2 pr-4">Stripe</td><td className="py-2 pr-4">Stripe</td><td className="py-2"><Badge variant="outline">No</Badge></td></tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center pt-4">
          Questions? Contact support@pulse-ai.app · Last updated {new Date().toLocaleDateString()}
        </p>
      </main>
    </div>
  );
}