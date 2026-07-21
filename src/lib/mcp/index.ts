import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listLeadsTool from "./tools/list-leads";
import listInboxThreadsTool from "./tools/list-inbox-threads";
import searchKnowledgeTool from "./tools/search-knowledge";
import createLeadTool from "./tools/create-lead";

// Direct supabase.co host is required for the OAuth issuer (the .lovable.cloud
// proxy publishes a different issuer in discovery and tokens would be rejected).
// VITE_SUPABASE_PROJECT_ID is inlined by Vite at build time — no runtime env read.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "menaxheri-mcp",
  title: "Menaxheri",
  version: "0.1.0",
  instructions:
    "Tools for the Menaxheri platform: read and manage the signed-in user's leads, inbox threads, and knowledge base. All data access is scoped to the caller's workspace via RLS.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listLeadsTool, listInboxThreadsTool, searchKnowledgeTool, createLeadTool],
});