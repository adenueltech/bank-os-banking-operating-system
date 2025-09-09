"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown, CreditCard, DollarSign, Users, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"

// Mock data for transactions
const mockTransactions = [
  {
    id: "TXN001",
    type: "deposit",
    amount: 5000,
    currency: "USD",
    accountFrom: "External",
    accountTo: "ACC-001-2024",
    status: "completed",
    timestamp: "2024-01-15T10:30:00Z",
    reference: "DEP-001-2024",
  },
  {
    id: "TXN002",
    type: "withdrawal",
    amount: 1500,
    currency: "USD",
    accountFrom: "ACC-001-2024",
    accountTo: "External",
    status: "processing",
    timestamp: "2024-01-15T11:15:00Z",
    reference: "WTH-002-2024",
  },
  {
    id: "TXN003",
    type: "transfer",
    amount: 2000,
    currency: "USD",
    accountFrom: "ACC-001-2024",
    accountTo: "ACC-002-2024",
    status: "completed",
    timestamp: "2024-01-15T12:00:00Z",
    reference: "TRF-003-2024",
  },
]

const mockAccounts = [
  {
    id: "ACC-001-2024",
    accountNumber: "1234567890",
    accountType: "Checking",
    balance: 15750.5,
    currency: "USD",
    status: "active",
    customerId: "CUST-001",
    customerName: "John Doe",
  },
  {
    id: "ACC-002-2024",
    accountNumber: "1234567891",
    accountType: "Savings",
    balance: 25000.0,
    currency: "USD",
    status: "active",
    customerId: "CUST-002",
    customerName: "Jane Smith",
  },
]

export default function CoreBankingPage() {
  const [selectedAccount, setSelectedAccount] = useState("")
  const [transactionAmount, setTransactionAmount] = useState("")
  const [transactionType, setTransactionType] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      processing: "secondary",
      failed: "destructive",
      pending: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <DashboardLayout activeModule="core-banking">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Core Banking Engine</h1>
          <p className="text-muted-foreground">Real-time transaction processing and account management</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions Today</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs text-muted-foreground">+8% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing Queue</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Transactions pending</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="transactions">Transaction Processing</TabsTrigger>
            <TabsTrigger value="accounts">Account Management</TabsTrigger>
            <TabsTrigger value="ledger">General Ledger</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Transaction Processing Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Process New Transaction</CardTitle>
                  <CardDescription>Execute real-time banking transactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="account">Account</Label>
                    <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockAccounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.accountNumber} - {account.customerName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Transaction Type</Label>
                    <Select value={transactionType} onValueChange={setTransactionType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deposit">Deposit</SelectItem>
                        <SelectItem value="withdrawal">Withdrawal</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(e.target.value)}
                    />
                  </div>

                  <Button className="w-full">Process Transaction</Button>
                </CardContent>
              </Card>

              {/* Real-time Transaction Feed */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Transaction Feed</CardTitle>
                  <CardDescription>Real-time transaction processing status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(transaction.status)}
                          <div>
                            <p className="font-medium">{transaction.reference}</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} • $
                              {transaction.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(transaction.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Balance Management</CardTitle>
                <CardDescription>Real-time account balance updates and maintenance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <CreditCard className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">{account.customerName}</p>
                          <p className="text-sm text-muted-foreground">
                            {account.accountNumber} • {account.accountType}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${account.balance.toLocaleString()}</p>
                        <Badge variant="outline">{account.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ledger" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Ledger</CardTitle>
                <CardDescription>Double-entry bookkeeping system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Total Debits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-red-600">$1,247,850.00</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Total Credits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-green-600">$1,247,850.00</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Recent Ledger Entries</h4>
                    <div className="space-y-2">
                      {mockTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex justify-between items-center py-2 border-b last:border-b-0"
                        >
                          <div>
                            <p className="font-medium">{transaction.reference}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(transaction.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">{transaction.currency}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
