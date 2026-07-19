import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const POLL_SECONDS = 30;

export default function WaitingApproval() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(POLL_SECONDS);
  const [checking, setChecking] = useState(false);

  const checkOutcome = useCallback(async () => {
    setChecking(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        navigate("/login");
        return;
      }

      const { data, error } = await (supabase as any)
        .from("login_attempts")
        .select("outcome, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !data) {
        setSeconds(POLL_SECONDS);
        return;
      }

      if (data.outcome === "approved") {
        navigate("/dashboard");
      } else if (data.outcome === "rejected") {
        await supabase.auth.signOut();
        navigate("/login?rejected=true");
      } else {
        setSeconds(POLL_SECONDS);
      }
    } finally {
      setChecking(false);
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          checkOutcome();
          return POLL_SECONDS;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [checkOutcome]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
          <Shield className="w-8 h-8 text-amber-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Pajisje e re e panjohur</h1>
          <p className="text-sm text-muted-foreground">
            Admini u njoftua per hyrjen tuaj nga nje pajisje e re. Kerkesa juaj do te
            aprovohet ose refuzohet shume shpejt.
          </p>
        </div>

        <div className="rounded-lg border border-border p-4 space-y-3">
          <div className="text-sm text-muted-foreground">
            Verifikim automatik ne <span className="font-medium text-foreground">{seconds}s</span>
          </div>
          <Button
            onClick={checkOutcome}
            disabled={checking}
            className="w-full"
          >
            {checking ? "Duke verifikuar..." : "Verifiko tani"}
          </Button>
        </div>

        <button
          onClick={handleSignOut}
          className="text-xs text-muted-foreground hover:underline"
        >
          Dil nga llogaria
        </button>
      </div>
    </div>
  );
}
