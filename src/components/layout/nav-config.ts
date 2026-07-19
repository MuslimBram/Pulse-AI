import {
  LayoutDashboard,
  Inbox,
  Users,
  Contact,
  Megaphone,
  BarChart3,
  Zap,
  Search,
  Target,
  BookOpen,
  Image as ImageIcon,
  Radio,
  LifeBuoy,
  Plug,
  Link2,
  Code2,
  Building2,
  CreditCard,
  Handshake,
  Shield,
  ShieldCheck,
  Crown,
  Wallet,
  Briefcase,
  Gift,
  Activity,
  Server,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon?: LucideIcon;
  badge?: "live" | string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

const gMain = (items: NavItem[]): NavGroup => ({ label: "Main", items });
const gGrowth = (items: NavItem[]): NavGroup => ({ label: "Growth & AI", items });
const gInteg = (items: NavItem[]): NavGroup => ({ label: "Integrations", items });
const gBiz = (items: NavItem[]): NavGroup => ({ label: "Business & Billing", items });
const gAdmin = (items: NavItem[]): NavGroup => ({ label: "Admin", items });
const gOwner = (items: NavItem[]): NavGroup => ({ label: "Owner", items });
const gPartner = (items: NavItem[]): NavGroup => ({ label: "Partner", items });

export const ownerNavGroups: NavGroup[] = [
  gOwner([
    { label: "Owner Panel", to: "/owner", icon: Crown },
    { label: "Platform Billing", to: "/owner/billing", icon: CreditCard },
    { label: "All Businesses", to: "/owner/businesses", icon: Building2 },
    { label: "System Health", to: "/owner/system", icon: Server },
  ]),
  gAdmin([
    { label: "Admin Panel", to: "/admin", icon: Shield },
    { label: "Analytics", to: "/admin/analytics", icon: Activity },
  ]),
  gMain([
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Inbox", to: "/inbox", icon: Inbox },
    { label: "Leads", to: "/leads", icon: Target },
    { label: "CRM", to: "/crm", icon: Users },
    { label: "Campaigns", to: "/campaigns", icon: Megaphone },
    { label: "Analytics", to: "/analytics", icon: BarChart3 },
  ]),
  gGrowth([
    { label: "Automations", to: "/automations", icon: Zap },
    { label: "Keywords", to: "/keywords", icon: Search },
    { label: "Competitor Intel", to: "/competitors", icon: Target },
    { label: "Knowledge Base", to: "/knowledge", icon: BookOpen },
    { label: "Media Studio", to: "/media", icon: ImageIcon },
    { label: "Broadcast", to: "/broadcast", icon: Radio },
    { label: "Helpdesk", to: "/helpdesk", icon: LifeBuoy },
  ]),
  gInteg([
    { label: "Channels", to: "/channels", icon: Plug },
    { label: "Connections", to: "/connections", icon: Link2 },
    { label: "Public API", to: "/api", icon: Code2 },
  ]),
  gBiz([
    { label: "Business Profile", to: "/business", icon: Building2 },
    { label: "Billing", to: "/billing", icon: CreditCard },
    { label: "Partners", to: "/partners", icon: Handshake },
    { label: "Security", to: "/security", icon: ShieldCheck },
  ]),
];

export const adminNavGroups: NavGroup[] = [
  gAdmin([
    { label: "Admin Panel", to: "/admin", icon: Shield },
    { label: "Analytics", to: "/admin/analytics", icon: Activity },
  ]),
  gMain([
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Inbox", to: "/inbox", icon: Inbox },
    { label: "Leads", to: "/leads", icon: Target },
    { label: "CRM", to: "/crm", icon: Users },
    { label: "Campaigns", to: "/campaigns", icon: Megaphone },
    { label: "Analytics", to: "/analytics", icon: BarChart3 },
  ]),
  gGrowth([
    { label: "Automations", to: "/automations", icon: Zap },
    { label: "Keywords", to: "/keywords", icon: Search },
    { label: "Competitor Intel", to: "/competitors", icon: Target },
    { label: "Knowledge Base", to: "/knowledge", icon: BookOpen },
    { label: "Media Studio", to: "/media", icon: ImageIcon },
    { label: "Broadcast", to: "/broadcast", icon: Radio },
    { label: "Helpdesk", to: "/helpdesk", icon: LifeBuoy },
  ]),
  gInteg([
    { label: "Channels", to: "/channels", icon: Plug },
    { label: "Connections", to: "/connections", icon: Link2 },
    { label: "Public API", to: "/api", icon: Code2 },
  ]),
  gBiz([
    { label: "Business Profile", to: "/business", icon: Building2 },
    { label: "Billing", to: "/billing", icon: CreditCard },
    { label: "Partners", to: "/partners", icon: Handshake },
    { label: "Security", to: "/security", icon: ShieldCheck },
  ]),
];

export const businessNavGroups: NavGroup[] = [
  gMain([
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Inbox", to: "/inbox", icon: Inbox },
    { label: "CRM", to: "/crm", icon: Users },
    { label: "Campaigns", to: "/campaigns", icon: Megaphone },
    { label: "Analytics", to: "/analytics", icon: BarChart3 },
  ]),
  gGrowth([
    { label: "Content Studio", to: "/media", icon: ImageIcon },
    { label: "Business Scanner", to: "/competitors", icon: Search },
    { label: "Automations", to: "/automations", icon: Zap },
    { label: "Knowledge Base", to: "/knowledge", icon: BookOpen },
  ]),
  gInteg([
    { label: "Channels", to: "/channels", icon: Plug },
    { label: "Connections", to: "/connections", icon: Link2 },
  ]),
  gBiz([
    { label: "Business Profile", to: "/business", icon: Building2 },
    { label: "Billing", to: "/billing", icon: CreditCard },
    { label: "Security", to: "/security", icon: ShieldCheck },
  ]),
];

export const freelancerNavGroups: NavGroup[] = [
  gMain([
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Leads", to: "/leads", icon: Target },
    { label: "CRM", to: "/crm", icon: Users },
    { label: "Clients", to: "/clients", icon: Briefcase },
  ]),
  gGrowth([
    { label: "Content Studio", to: "/media", icon: ImageIcon },
    { label: "Knowledge Base", to: "/knowledge", icon: BookOpen },
  ]),
  gBiz([
    { label: "Billing", to: "/billing", icon: CreditCard },
    { label: "Security", to: "/security", icon: ShieldCheck },
  ]),
];

export const agentNavGroups: NavGroup[] = [
  gMain([
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Inbox", to: "/inbox", icon: Inbox, badge: "live" },
    { label: "Contacts", to: "/crm", icon: Contact },
    { label: "Helpdesk", to: "/helpdesk", icon: LifeBuoy },
  ]),
];

export const ambassadorNavGroups: NavGroup[] = [
  gMain([
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  ]),
  gPartner([
    { label: "Partner Program", to: "/partners", icon: Gift },
    { label: "Wallet", to: "/wallet", icon: Wallet },
  ]),
];

const ROLE_PRIORITY: Array<{ role: string; groups: NavGroup[] }> = [
  { role: "super_admin", groups: ownerNavGroups },
  { role: "owner", groups: ownerNavGroups },
  { role: "admin", groups: adminNavGroups },
  { role: "business_owner", groups: businessNavGroups },
  { role: "business", groups: businessNavGroups },
  { role: "freelancer", groups: freelancerNavGroups },
  { role: "agent", groups: agentNavGroups },
  { role: "ambassador", groups: ambassadorNavGroups },
];

export function getNavGroupsForRoles(roles: string[]): NavGroup[] {
  const set = new Set((roles ?? []).map((r) => (r ?? "").toLowerCase()));
  for (const { role, groups } of ROLE_PRIORITY) {
    if (set.has(role)) return groups;
  }
  return businessNavGroups;
}
