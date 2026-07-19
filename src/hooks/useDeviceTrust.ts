import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export type DeviceTrustOutcome =
  | "idle"
  | "checking"
  | "allowed"
  | "pending_approval"
  | "blocked";

export type DeviceTrustRiskLevel = "low" | "medium" | "high" | "unknown";

export interface UseDeviceTrustResult {
  outcome: DeviceTrustOutcome;
  riskLevel: DeviceTrustRiskLevel;
  checkDeviceTrust: () => Promise<DeviceTrustOutcome>;
}

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/check-device-trust`;

export function useDeviceTrust(): UseDeviceTrustResult {
  const navigate = useNavigate();
  const [outcome, setOutcome] = useState<DeviceTrustOutcome>("idle");
  const [riskLevel, setRiskLevel] = useState<DeviceTrustRiskLevel>("unknown");

  const checkDeviceTrust = useCallback(async (): Promise<DeviceTrustOutcome> => {
    setOutcome("checking");
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) {
        setOutcome("allowed");
        return "allowed";
      }

      const res = await fetch(FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_agent: navigator.userAgent,
          platform: navigator.platform,
        }),
      });

      if (!res.ok) {
        setOutcome("allowed");
        return "allowed";
      }

      const json = (await res.json()) as {
        outcome?: DeviceTrustOutcome;
        risk_level?: DeviceTrustRiskLevel;
        riskLevel?: DeviceTrustRiskLevel;
      };

      const result: DeviceTrustOutcome = json.outcome ?? "allowed";
      const risk: DeviceTrustRiskLevel = json.riskLevel ?? json.risk_level ?? "unknown";
      setOutcome(result);
      setRiskLevel(risk);

      if (result === "pending_approval") {
        navigate("/waiting-approval");
      } else if (result === "blocked") {
        await supabase.auth.signOut();
        navigate("/login?blocked=true");
      }

      return result;
    } catch {
      setOutcome("allowed");
      return "allowed";
    }
  }, [navigate]);

  return { outcome, riskLevel, checkDeviceTrust };
}
