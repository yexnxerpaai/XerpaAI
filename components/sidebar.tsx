"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Eye,
} from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: false },
  { icon: Users, label: "User Growth", href: "/user-growth", active: false },
  { icon: Eye, label: "Panorama Loop", href: "/panorama-loop", active: false },
  { icon: TrendingUp, label: "Influence Growth", href: "/influence-growth", active: true },
  { icon: FileText, label: "Order Review", href: "/order-review", active: false },
  { icon: CreditCard, label: "Billing", href: "/billing", active: false },
  { icon: Settings, label: "Settings", href: "/settings", active: false },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">X</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">XerpaAI</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent/10"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-10",
              item.active
                ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                : "text-sidebar-foreground hover:bg-sidebar-accent/10",
              collapsed && "justify-center px-2",
            )}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
            {!collapsed && item.active && (
              <Badge variant="secondary" className="ml-auto bg-green-800 text-white border-green-700">
                Active
              </Badge>
            )}
          </Button>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">admin@xerpaai.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
