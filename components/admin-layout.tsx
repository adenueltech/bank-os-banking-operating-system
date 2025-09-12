"use client"

import type React from "react"
import { ArrowUpDown, FileText } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Shield,
  UserCheck,
  CreditCard,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  User,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useAuth } from "@/lib/auth"

interface AdminLayoutProps {
  children: React.ReactNode
  activeModule?: string
}

const adminNavigationItems = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { id: "core-banking", label: "Core Banking", icon: CreditCard, href: "/admin/core-banking" },
  { id: "accounts", label: "Account Management", icon: Users, href: "/admin/accounts" },
  { id: "payments", label: "Payment Processing", icon: ArrowUpDown, href: "/admin/payments" },
  { id: "fraud", label: "Fraud Detection", icon: Shield, href: "/admin/fraud" },
  { id: "kyc", label: "KYC & Compliance", icon: UserCheck, href: "/admin/kyc" },
  { id: "loans", label: "Loan Processing", icon: CreditCard, href: "/admin/loans" },
  { id: "analytics", label: "Analytics Hub", icon: BarChart3, href: "/admin/analytics" },
  { id: "customers", label: "Customer Management", icon: Users, href: "/admin/customers" },
  { id: "auth", label: "User Authentication", icon: Shield, href: "/admin/auth" },
  { id: "reports", label: "Regulatory Reports", icon: FileText, href: "/admin/reports" },
  { id: "settings", label: "System Settings", icon: Settings, href: "/admin/settings" },
]

export function AdminLayout({ children, activeModule = "overview" }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold text-sidebar-foreground">BankOS</span>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden cursor-pointer" onClick={() => setSidebarOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {adminNavigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeModule === item.id

              return (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start text-left cursor-pointer",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Admin info */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name} />
                <AvatarFallback>
                  {mounted && !loading ? (user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "AD") : "AD"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{mounted && !loading ? (user?.name || "Admin User") : "Admin User"}</p>
                <p className="text-xs text-muted-foreground truncate">System Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="lg:hidden cursor-pointer" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {adminNavigationItems.find((item) => item.id === activeModule)?.label || "Dashboard"}
              </h1>
              <p className="text-sm text-muted-foreground">Banking Operations Control Center</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* System Status */}
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              System Online
            </Badge>

            {/* Search */}
            <Button variant="ghost" size="sm" className="cursor-pointer">
              <Search className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative cursor-pointer">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-destructive" />
            </Button>

            {/* Admin Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name} />
                    <AvatarFallback>
                      {mounted && !loading ? (user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "AD") : "AD"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{mounted && !loading ? (user?.name || "Admin User") : "Admin User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">System Administrator</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/admin/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Admin Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
