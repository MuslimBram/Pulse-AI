import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Decision = {
  id: string;
  action_type: string;
  title?: string | null;
  description?: string | null;
  status?: string | null;
  created_at?: string | null;
};

const TABS = [
  { key: "posts", label: "Posts" },
  { key: "offers", label: "Offers" },
  { key: "replies", label: "Replies" },
  { key: "campaigns", label: "Campaigns" },
  { key: "seo", label: "SEO" },
  { key: "competitors", label: "Competitors" },
];

export default function AIDecisions() {
  const [params, setParams] = useSearchParams();
  const focus = params.get("focus") || "posts";
  const [tab, setTab] = useState(focus);
  const [items, setItems] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => setTab(focus), [focus]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await (supabase as any)
        .from("ai_decisions")
        .select("*")
        .order("created_at", { ascending: false });
      setItems((data as Decision[]) || []);
      setLoading(false);
    })();
  }, []);

  const update = async (id: string, status: string) => {
    const { error } = await (supabase as any).from("ai_decisions").update({ status }).eq("id", id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    setItems((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  const filtered = items.filter((d) => (d.action_type || "").toLowerCase() === tab);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" /> AI Suggestions
          </h1>
          <p className="text-sm text-muted-foreground">Review and approve AI-generated recommendations.</p>
        </div>
        <Tabs value={tab} onValueChange={(v) => { setTab(v); setParams({ focus: v }); }}>
          <TabsList className="flex-wrap h-auto">
            {TABS.map((t) => (
              <TabsTrigger key={t.key} value={t.key}>{t.label}</TabsTrigger>
            ))}
          </TabsList>
          {TABS.map((t) => (
            <TabsContent key={t.key} value={t.key} className="space-y-3 mt-4">
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : filtered.length === 0 ? (
                <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">No {t.label.toLowerCase()} suggestions yet.</CardContent></Card>
              ) : (
                filtered.map((d) => (
                  <Card key={d.id}>
                    <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
                      <div className="flex items-start gap-2">
                        <Brain className="h-4 w-4 text-primary mt-1" />
                        <div>
                          <CardTitle className="text-base">{d.title || "AI Suggestion"}</CardTitle>
                          {d.description && <p className="text-sm text-muted-foreground mt-1">{d.description}</p>}
                        </div>
                      </div>
                      <Badge variant={d.status === "approved" ? "default" : d.status === "dismissed" ? "secondary" : "outline"}>
                        {d.status || "pending"}
                      </Badge>
                    </CardHeader>
                    <CardContent className="flex gap-2 pt-2">
                      <Button size="sm" onClick={() => update(d.id, "approved")}>
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => update(d.id, "dismissed")}>
                        <X className="h-4 w-4 mr-1" /> Dismiss
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}