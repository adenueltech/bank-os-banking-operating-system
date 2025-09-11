"use client"
import React from "react"
import { AdminLayout } from "@/components/admin-layout"

export default function AuthPage() {
  return (
    <AdminLayout activeModule="auth">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">User Authentication</h2>
            <p className="text-muted-foreground mt-2">Manage user access and security</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
            <p className="text-2xl font-bold text-primary">1,234</p>
            <p className="text-sm text-muted-foreground">Current logins</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Failed Logins</h3>
            <p className="text-2xl font-bold text-destructive">45</p>
            <p className="text-sm text-muted-foreground">Last 24 hours</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">2FA Enabled</h3>
            <p className="text-2xl font-bold text-green-600">78%</p>
            <p className="text-sm text-muted-foreground">Users secured</p>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Authentication Events</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Login #AUTH-001</span>
              <span className="text-green-600">Success</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Logout #AUTH-002</span>
              <span className="text-primary">Normal</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Failed #AUTH-003</span>
              <span className="text-destructive">Blocked</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}