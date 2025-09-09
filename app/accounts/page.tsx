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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreditCard, Users, Plus, FileText, DollarSign } from "lucide-react"

// Mock data for accounts
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
    dateOpened: "2024-01-01",
    lastActivity: "2024-01-15",
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
    dateOpened: "2024-01-05",
    lastActivity: "2024-01-14",
  },
  {
    id: "ACC-003-2024",
    accountNumber: "1234567892",
    accountType: "Business",
    balance: 75000.0,
    currency: "USD",
    status: "active",
    customerId: "CUST-003",
    customerName: "Tech Corp Ltd",
    dateOpened: "2024-01-10",
    lastActivity: "2024-01-15",
  },
]

const mockStatements = [
  {
    id: "STMT-001",
    accountId: "ACC-001-2024",
    period: "December 2023",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    openingBalance: 12500.0,
    closingBalance: 15750.5,
    status: "generated",
  },
  {
    id: "STMT-002",
    accountId: "ACC-002-2024",
    period: "December 2023",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    openingBalance: 22000.0,
    closingBalance: 25000.0,
    status: "generated",
  },
]

export default function AccountsPage() {
  const [selectedAccountType, setSelectedAccountType] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [initialDeposit, setInitialDeposit] = useState("")

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      closed: "destructive",
      frozen: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <DashboardLayout activeModule="accounts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Account Management</h1>
            <p className="text-muted-foreground">Account creation, lifecycle management, and statements</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Account</DialogTitle>
                <DialogDescription>Open a new customer account with initial deposit</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer Name</Label>
                  <Input
                    id="customer"
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Account Type</Label>
                  <Select value={selectedAccountType} onValueChange={setSelectedAccountType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="business">Business Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deposit">Initial Deposit</Label>
                  <Input
                    id="deposit"
                    type="number"
                    placeholder="0.00"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(e.target.value)}
                  />
                </div>

                <Button className="w-full">Create Account</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45.2M</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Accounts Today</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Balance</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,521</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="accounts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="accounts">Account Overview</TabsTrigger>
            <TabsTrigger value="statements">Statements</TabsTrigger>
            <TabsTrigger value="hierarchy">Account Hierarchy</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Accounts</CardTitle>
                <CardDescription>Manage customer accounts and balances</CardDescription>
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
                          <p className="text-xs text-muted-foreground">
                            Opened: {new Date(account.dateOpened).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-2xl font-bold">${account.balance.toLocaleString()}</p>
                        {getStatusBadge(account.status)}
                        <p className="text-xs text-muted-foreground">
                          Last activity: {new Date(account.lastActivity).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Statements</CardTitle>
                <CardDescription>Automated statement generation and management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStatements.map((statement) => (
                    <div key={statement.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">{statement.period} Statement</p>
                          <p className="text-sm text-muted-foreground">Account: {statement.accountId}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(statement.startDate).toLocaleDateString()} -{" "}
                            {new Date(statement.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium">Opening: ${statement.openingBalance.toLocaleString()}</p>
                        <p className="font-medium">Closing: ${statement.closingBalance.toLocaleString()}</p>
                        <Badge variant="outline">{statement.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hierarchy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Hierarchy</CardTitle>
                <CardDescription>Joint accounts, beneficiaries, and authorized users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Joint Account Structure</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 pl-4">
                        <Users className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">John & Jane Doe Joint Account</p>
                          <p className="text-sm text-muted-foreground">Account: 1234567893 • Balance: $45,000</p>
                        </div>
                      </div>
                      <div className="pl-8 space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <p className="text-sm">Primary: John Doe</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-secondary rounded-full"></div>
                          <p className="text-sm">Secondary: Jane Doe</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Beneficiaries</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Sarah Doe</p>
                          <p className="text-sm text-muted-foreground">Primary Beneficiary • 60%</p>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Michael Doe</p>
                          <p className="text-sm text-muted-foreground">Secondary Beneficiary • 40%</p>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
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
