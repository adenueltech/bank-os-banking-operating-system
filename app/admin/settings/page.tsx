"use client"
import React from "react"
import { AdminLayout } from "@/components/admin-layout"

export default function SettingsPage() {
  return (
    <AdminLayout activeModule="settings">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">System Settings</h2>
            <p className="text-muted-foreground mt-2">Configure platform preferences and system parameters</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">System Status</h3>
            <p className="text-2xl font-bold text-primary">Active</p>
            <p className="text-sm text-muted-foreground">Production Environment</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">API Rate Limit</h3>
            <p className="text-2xl font-bold text-accent">1000 / hour</p>
            <p className="text-sm text-muted-foreground">Per user</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Notification Settings</h3>
            <p className="text-2xl font-bold text-green-600">Enabled</p>
            <p className="text-sm text-muted-foreground">Email & SMS</p>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Configuration Changes</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Fraud Threshold #CFG-001</span>
              <span className="text-blue-600">Updated</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>API Key Rotation #CFG-002</span>
              <span className="text-green-600">Completed</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Maintenance Window #CFG-003</span>
              <span className="text-accent">Scheduled</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}