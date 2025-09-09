"use client"

import { CustomerLayout } from "@/components/customer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CreditCard,
  Send,
  Download,
  Bell,
  MessageCircle,
  TrendingUp,
  Plus,
  Eye,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react"

// Mock customer data
const customerData = {
  name: "John Doe",
  accountNumber: "****4521",
  balance: 25750.5,
  availableCredit: 15000,
  savingsBalance: 12500.0,
  avatar: "/placeholder.svg?height=80&width=80",
}

const recentTransactions = [
  {
    id: "TXN-001",
    type: "transfer_out",
    description: "Transfer to Jane Smith",
    amount: -500,
    date: "Today, 2:30 PM",
    status: "completed",
  },
  {
    id: "TXN-002",
    type: "deposit",
    description: "Salary Deposit",
    amount: 3500,
    date: "Yesterday, 9:15 AM",
    status: "completed",
  },
  {
    id: "TXN-003",
    type: "payment",
    description: "Grocery Store Payment",
    amount: -125.5,
    date: "Jan 13, 4:22 PM",
    status: "completed",
  },
  {
    id: "TXN-004",
    type: "withdrawal",
    description: "ATM Withdrawal",
    amount: -200,
    date: "Jan 12, 11:45 AM",
    status: "completed",
  },
]

const quickActions = [
  { name: "Send Money", icon: Send, color: "bg-blue-500", href: "/portal/transfer" },
  { name: "Pay Bills", icon: CreditCard, color: "bg-green-500", href: "/portal/bills" },
  { name: "Apply for Loan", icon: Plus, color: "bg-purple-500", href: "/portal/loans" },
  { name: "Download Statement", icon: Download, color: "bg-orange-500", href: "/portal/statements" },
]

export default function CustomerPortal() {
  return (
    <CustomerLayout activeModule="dashboard">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome back, {customerData.name.split(" ")[0]}!</h2>
            <p className="text-slate-600 mt-1">Here's what's happening with your account today.</p>
          </div>
          <Button>
            <Bell className="w-4 h-4 mr-2" />3 New Alerts
          </Button>
        </div>

        {/* Account Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Account Balance */}
          <Card className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-100 text-sm">Current Account</p>
                  <p className="text-white/80 text-xs">{customerData.accountNumber}</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-200" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">${customerData.balance.toLocaleString()}</div>
                <div className="flex items-center space-x-4 text-sm text-blue-100">
                  <span className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +2.5% this month
                  </span>
                  <span>Available Credit: ${customerData.availableCredit.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Savings Account */}
          <Card className="bg-white border border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Savings Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 mb-2">
                ${customerData.savingsBalance.toLocaleString()}
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +0.5% interest earned
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white border border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Quick Actions</CardTitle>
            <CardDescription>Common banking tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.name}
                  variant="outline"
                  className="h-20 flex-col space-y-2 border-slate-200 hover:bg-slate-50 bg-transparent"
                >
                  <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{action.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card className="bg-white border border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-slate-900">Recent Transactions</CardTitle>
                <CardDescription>Your latest account activity</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.slice(0, 4).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.amount > 0 ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {transaction.amount > 0 ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{transaction.description}</p>
                      <p className="text-xs text-slate-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm font-medium ${transaction.amount > 0 ? "text-green-600" : "text-slate-900"}`}
                    >
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Account Insights */}
          <Card className="bg-white border border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Account Insights</CardTitle>
              <CardDescription>Your spending patterns this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Spent</span>
                  <span className="text-sm font-medium text-slate-900">$2,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Received</span>
                  <span className="text-sm font-medium text-green-600">+$4,200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Net Change</span>
                  <span className="text-sm font-medium text-green-600">+$1,750</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-medium text-slate-900 mb-3">Top Categories</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Groceries</span>
                    <span className="text-sm font-medium text-slate-900">$680</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Transportation</span>
                    <span className="text-sm font-medium text-slate-900">$420</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Utilities</span>
                    <span className="text-sm font-medium text-slate-900">$350</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Section */}
        <Card className="bg-slate-50 border border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Need Help?</h3>
                <p className="text-slate-600 text-sm">Our support team is available 24/7 to assist you.</p>
              </div>
              <Button>
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  )
}
