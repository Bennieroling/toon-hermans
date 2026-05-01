import { clsx, type ClassValue } from "clsx"
import {
  AlertTriangle,
  DoorOpen,
  FileText,
  LayoutDashboard,
  Map,
  MonitorSmartphone,
  Phone,
  ShieldCheck,
  Tv,
  Wifi,
  Workflow,
} from "lucide-react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sectionIds = ["hero", "layers", "process", "pricing", "contact"] as const

export const navItems = [
  { key: "expertise", href: "#layers", sectionId: "layers" },
  { key: "process", href: "#process", sectionId: "process" },
  { key: "pricing", href: "#pricing", sectionId: "pricing" },
  { key: "contact", href: "#contact", sectionId: "contact" },
] as const

export const layers = [
  { key: "network", icon: Wifi },
  { key: "access", icon: DoorOpen },
  { key: "platform", icon: LayoutDashboard },
  { key: "meeting", icon: Tv },
  { key: "security", icon: ShieldCheck },
  { key: "telephony", icon: Phone },
  { key: "integrations", icon: Workflow },
  { key: "devices", icon: MonitorSmartphone },
] as const

export const phases = ["intake", "discovery", "inventory", "assessment", "report"] as const

export const deliverables = [
  { key: "report", icon: FileText },
  { key: "findings", icon: AlertTriangle },
  { key: "roadmap", icon: Map },
] as const
