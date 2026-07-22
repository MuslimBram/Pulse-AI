import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, Clock, BookOpen, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { usePartnerAccount, usePartnerBusinesses } from "@/hooks/usePartner";

type Commission = {
  id: string;
  amount: number;
  status: string;
  created_at: string;
};

export default function ResellerDashboard() {
  const { user } = useAuth();
  const { data: partner } = usePartnerAccount();
  const { data: clients } = usePartnerBusinesses(partner?.id ?? null);
  const [commissions, setCommissions] = useState<Commission[]>([]);

  useEffect(() => {
    if (!partner?.id) return;
    (async () => {
      const { data } = await (supabase as any)
        .from("partner_commissions")
        .select("id, amount, status, created_at")
        .eq("partner_id", partner.id)
        .order("created_at", { ascending: false });
      setCommissions((data as Commission[]) || []);
    })();
  }, [partner?.id]);

  const totalEarnings = commissions
    .filter((c) => c.status === "paid" || c.status === "approved")
    .reduce((s, c) => s + Number(c.amount || 0), 0);
  const pending = commissions.filter((c) => c.status === "pending").reduce((s, c) => s + Number(c.amount || 0), 0);
  const activeClients = clients?.length ?? 0;

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Reseller Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your clients, commissions, and resources.</p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{activeClients}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">${pending.toFixed(2)}</div></CardContent>
          </Card>
        </div>

        <Tabs defaultValue="clients">
          <TabsList>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="mt-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Managed Businesses</CardTitle></CardHeader>
              <CardContent>
                {activeClients === 0 ? (
                  <p className="text-sm text-muted-foreground">No clients yet.</p>
                ) : (
                  <ul className="divide-y">
                    {clients!.map((c: any) => (
                      <li key={c.id} className="py-2 flex items-center justify-between">
                        <span className="text-sm">{c.workspaces?.name || c.workspace_id}</span>
                        <span className="text-xs text-muted-foreground">Added {new Date(c.added_at).toLocaleDateString()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commissions" className="mt-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Commission History</CardTitle></CardHeader>
              <CardContent>
                {commissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No commissions recorded.</p>
                ) : (
                  <ul className="divide-y">
                    {commissions.map((c) => (
                      <li key={c.id} className="py-2 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">${Number(c.amount).toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</div>
                        </div>
                        <Badge variant={c.status === "paid" ? "default" : c.status === "pending" ? "outline" : "secondary"}>
                          {c.status}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="mt-4">
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><BookOpen className="h-4 w-4" /> Partner Resources</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <a className="flex items-center gap-2 text-primary hover:underline" href="/pricing" target="_blank" rel="noreferrer">
                  Pricing overview <ExternalLink className="h-3 w-3" />
                </a>
                <a className="flex items-center gap-2 text-primary hover:underline" href="/terms" target="_blank" rel="noreferrer">
                  Terms & payment policy <ExternalLink className="h-3 w-3" />
                </a>
                <p className="text-muted-foreground pt-2">Contact your account manager for co-marketing materials.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}