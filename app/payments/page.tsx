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
import { Progress } from "@/components/ui/progress"
import { ArrowRightLeft, Clock, CheckCircle, AlertTriangle, DollarSign, CreditCard, Banknote } from "lucide-react"

// Mock data for payments
const mockPayments = [
  {
    id: "PAY-001",
    type: "instant_transfer",
    amount: 2500,
    currency: "USD",
    fromAccount: "1234567890",
    toAccount: "9876543210",
    status: "completed",
    timestamp: "2024-01-15T14:30:00Z",
    reference: "INS-001-2024",
    fee: 2.5,
  },
  {
    id: "PAY-002",
    type: "wire_transfer",
    amount: 15000,
    currency: "USD",
    fromAccount: "1234567891",
    toAccount: "External Bank",
    status: "processing",
    timestamp: "2024-01-15T15:00:00Z",
    reference: "WIRE-002-2024",
    fee: 25.0,
  },
  {
    id: "PAY-003",
    type: "ach_transfer",
    amount: 1000,
    currency: "USD",
    fromAccount: "1234567892",
    toAccount: "5555666677",
    status: "pending",
    timestamp: "2024-01-15T15:30:00Z",
    reference: "ACH-003-2024",
    fee: 1.0,
  },
]

const mockBatchJobs = [
  {
    id: "BATCH-001",
    name: "End of Day Settlement",
    totalTransactions: 15847,
    processedTransactions: 15847,
    totalAmount: 2450000,
    status: "completed",
    startTime: "2024-01-15T23:00:00Z",
    endTime: "2024-01-15T23:45:00Z",
  },
  {
    id: "BATCH-002",
    name: "ACH Processing",
    totalTransactions: 3421,
    processedTransactions: 2890,
    totalAmount: 890000,
    status: "processing",
    startTime: "2024-01-16T02:00:00Z",
    endTime: null,
  },
]

export default function PaymentsPage() {
  const [paymentType, setPaymentType] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [fromAccount, setFromAccount] = useState("")
  const [toAccount, setToAccount] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      processing: "secondary",
      pending: "outline",
      failed: "destructive",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <DashboardLayout activeModule="payments">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Processing</h1>
          <p className="text-muted-foreground">Real-time payments, transfers, and batch processing</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Payment Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3.2M</div>
              <p className="text-xs text-muted-foreground">+15% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions Today</CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,247</div>
              <p className="text-xs text-muted-foreground">+8% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing Queue</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Payments pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.8%</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="realtime" className="space-y-4">
          <TabsList>
            <TabsTrigger value="realtime">Real-time Payments</TabsTrigger>
            <TabsTrigger value="batch">Batch Processing</TabsTrigger>
            <TabsTrigger value="rails">Payment Rails</TabsTrigger>
          </TabsList>

          <TabsContent value="realtime" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Payment Processing Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Process Payment</CardTitle>
                  <CardDescription>Execute instant transfers and payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Payment Type</Label>
                    <Select value={paymentType} onValueChange={setPaymentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instant_transfer">Instant Transfer</SelectItem>
                        <SelectItem value="wire_transfer">Wire Transfer</SelectItem>
                        <SelectItem value="ach_transfer">ACH Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from">From Account</Label>
                    <Input
                      id="from"
                      placeholder="Account number"
                      value={fromAccount}
                      onChange={(e) => setFromAccount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to">To Account</Label>
                    <Input
                      id="to"
                      placeholder="Destination account"
                      value={toAccount}
                      onChange={(e) => setToAccount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>

                  <Button className="w-full">Process Payment</Button>
                </CardContent>
              </Card>

              {/* Live Payment Feed */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Payment Feed</CardTitle>
                  <CardDescription>Real-time payment processing status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPayments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(payment.status)}
                          <div>
                            <p className="font-medium">{payment.reference}</p>
                            <p className="text-sm text-muted-foreground">
                              {payment.type.replace("_", " ").toUpperCase()} • ${payment.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">Fee: ${payment.fee}</p>
                          </div>
                        </div>
                        {getStatusBadge(payment.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="batch" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Batch Processing Jobs</CardTitle>
                <CardDescription>End-of-day settlement and bulk payment processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockBatchJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium">{job.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {job.processedTransactions.toLocaleString()} / {job.totalTransactions.toLocaleString()}{" "}
                            transactions
                          </p>
                        </div>
                        {getStatusBadge(job.status)}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{Math.round((job.processedTransactions / job.totalTransactions) * 100)}%</span>
                        </div>
                        <Progress value={(job.processedTransactions / job.totalTransactions) * 100} />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Amount</p>
                          <p className="font-medium">${job.totalAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Started</p>
                          <p className="font-medium">{new Date(job.startTime).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rails" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ArrowRightLeft className="h-5 w-5" />
                    <span>Instant Payments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge variant="default">Online</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Daily Volume</span>
                      <span className="text-sm font-medium">$1.2M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="text-sm font-medium">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Wire Transfers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge variant="default">Online</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Daily Volume</span>
                      <span className="text-sm font-medium">$1.8M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="text-sm font-medium">99.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Banknote className="h-5 w-5" />
                    <span>ACH Network</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge variant="default">Online</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Daily Volume</span>
                      <span className="text-sm font-medium">$200K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="text-sm font-medium">99.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
