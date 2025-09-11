"use client"
import React from "react"
import { AdminLayout } from "@/components/admin-layout"

export default function CoreBankingPage() {
  return (
    <AdminLayout activeModule="core-banking">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Core Banking Operations</h2>
            <p className="text-muted-foreground mt-2">Manage core banking functions and transactions</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Account Balances</h3>
            <p className="text-2xl font-bold text-primary">$1,245,678,901</p>
            <p className="text-sm text-muted-foreground">Total across all accounts</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Daily Transactions</h3>
            <p className="text-2xl font-bold text-primary">12,456</p>
            <p className="text-sm text-muted-foreground">Processed today</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">System Load</h3>
            <p className="text-2xl font-bold text-green-600">87%</p>
            <p className="text-sm text-muted-foreground">Current utilization</p>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Transfer #TX-001</span>
              <span className="text-green-600">+$500.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Deposit #TX-002</span>
              <span className="text-blue-600">+$1,200.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Withdrawal #TX-003</span>
              <span className="text-red-600">-$300.00</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
