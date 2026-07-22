import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useToast } from "@/hooks/use-toast";

type Member = { id: string; user_id: string; role: string; email?: string | null };
type Invitation = { id: string; email: string; role: string; status: string; created_at: string };

const ROLES = [
  { value: "agent", label: "Agent" },
  { value: "freelancer", label: "Freelancer" },
  { value: "ambassador", label: "Ambassador" },
];

export function WorkspaceTeamRoles() {
  const { user } = useAuth();
  const { workspace } = useWorkspace();
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("agent");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    if (!workspace?.id) return;
    const { data: m } = await (supabase as any)
      .from("workspace_members")
      .select("*")
      .eq("workspace_id", workspace.id);
    setMembers((m as Member[]) || []);
    const { data: inv } = await (supabase as any)
      .from("business_invitations")
      .select("*")
      .eq("workspace_id", workspace.id)
      .order("created_at", { ascending: false });
    setInvitations((inv as Invitation[]) || []);
  };

  useEffect(() => { load(); }, [workspace?.id]);

  const invite = async () => {
    if (!email || !workspace?.id || !user?.id) return;
    setBusy(true);
    const { error } = await (supabase as any).from("business_invitations").insert({
      workspace_id: workspace.id,
      email,
      role,
      status: "pending",
      invited_by: user.id,
    });
    setBusy(false);
    if (error) return toast({ title: "Invite failed", description: error.message, variant: "destructive" });
    toast({ title: "Invitation sent", description: `${email} was invited as ${role}.` });
    setEmail("");
    load();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><UserPlus className="h-4 w-4" /> Invite team member</CardTitle></CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-2">
          <Input placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="md:w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              {ROLES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={invite} disabled={busy || !email}>Send invite</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Current team</CardTitle></CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <p className="text-sm text-muted-foreground">No team members yet.</p>
          ) : (
            <ul className="divide-y">
              {members.map((m) => (
                <li key={m.id} className="py-2 flex items-center justify-between">
                  <span className="text-sm">{m.email || m.user_id}</span>
                  <Badge variant="outline">{m.role}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Mail className="h-4 w-4" /> Pending invitations</CardTitle></CardHeader>
        <CardContent>
          {invitations.filter((i) => i.status === "pending").length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending invitations.</p>
          ) : (
            <ul className="divide-y">
              {invitations.filter((i) => i.status === "pending").map((i) => (
                <li key={i.id} className="py-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm">{i.email}</div>
                    <div className="text-xs text-muted-foreground">Invited {new Date(i.created_at).toLocaleDateString()}</div>
                  </div>
                  <Badge variant="outline">{i.role}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default WorkspaceTeamRoles;