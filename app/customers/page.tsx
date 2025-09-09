import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  CreditCard,
  DollarSign,
  Send,
  Download,
  Bell,
  Shield,
  MessageCircle,
  Search,
  Filter,
  Plus,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
} from "lucide-react"

// Mock customer data
const customerProfile = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+234-801-234-5678",
  accountNumber: "****4521",
  balance: 25750.5,
  availableCredit: 15000,
  memberSince: "2022-03-15",
  avatar: "/placeholder.svg?height=80&width=80",
}

const recentTransactions = [
  {
    id: "TXN-001",
    type: "transfer",
    description: "Transfer to Jane Smith",
    amount: -500,
    date: "2024-01-15",
    status: "completed",
    category: "Transfer",
  },
  {
    id: "TXN-002",
    type: "deposit",
    description: "Salary Deposit",
    amount: 3500,
    date: "2024-01-14",
    status: "completed",
    category: "Income",
  },
  {
    id: "TXN-003",
    type: "payment",
    description: "Grocery Store Payment",
    amount: -125.5,
    date: "2024-01-13",
    status: "completed",
    category: "Shopping",
  },
  {
    id: "TXN-004",
    type: "withdrawal",
    description: "ATM Withdrawal",
    amount: -200,
    date: "2024-01-12",
    status: "completed",
    category: "Cash",
  },
]

const customerLoans = [
  {
    id: "LA-001",
    type: "Personal Loan",
    amount: 50000,
    balance: 42500,
    monthlyPayment: 2100,
    nextDue: "2024-02-01",
    status: "active",
    term: 24,
    rate: 12.5,
  },
  {
    id: "LA-002",
    type: "Business Loan",
    amount: 25000,
    balance: 0,
    monthlyPayment: 0,
    nextDue: null,
    status: "completed",
    term: 18,
    rate: 10.8,
  },
]

const customerAlerts = [
  {
    id: "ALT-001",
    type: "security",
    title: "New device login detected",
    message: "Login from new device in Lagos, Nigeria",
    timestamp: "2 hours ago",
    read: false,
    severity: "medium",
  },
  {
    id: "ALT-002",
    type: "payment",
    title: "Payment due reminder",
    message: "Your loan payment of $2,100 is due in 3 days",
    timestamp: "1 day ago",
    read: false,
    severity: "low",
  },
  {
    id: "ALT-003",
    type: "transaction",
    title: "Large transaction alert",
    message: "Transaction of $500 was processed successfully",
    timestamp: "2 days ago",
    read: true,
    severity: "low",
  },
]

const disputes = [
  {
    id: "DSP-001",
    transaction: "TXN-005",
    amount: 75.0,
    description: "Unauthorized charge at Restaurant XYZ",
    status: "investigating",
    submittedAt: "2024-01-10",
    expectedResolution: "2024-01-24",
  },
  {
    id: "DSP-002",
    transaction: "TXN-006",
    amount: 150.0,
    description: "Double charge for online purchase",
    status: "resolved",
    submittedAt: "2023-12-15",
    expectedResolution: "2023-12-29",
  },
]

export default function CustomerPortalPage() {
  return (
    <DashboardLayout activeModule="customers">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground text-balance">Customer Portal</h2>
            <p className="text-muted-foreground mt-2">Self-service banking and account management</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Transaction
          </Button>
        </div>

        {/* Customer Profile Card */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={customerProfile.avatar || "/placeholder.svg"} alt={customerProfile.name} />
                  <AvatarFallback>
                    {customerProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{customerProfile.name}</h3>
                  <p className="text-muted-foreground">{customerProfile.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Account: {customerProfile.accountNumber} • Member since{" "}
                    {new Date(customerProfile.memberSince).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">${customerProfile.balance.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-sm text-accent">Credit: ${customerProfile.availableCredit.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main content tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Send className="w-4 h-4 mr-2" />
                    Send Money
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Apply for Loan
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Statement
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentTransactions.slice(0, 4).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                      <span
                        className={`text-sm font-medium ${transaction.amount > 0 ? "text-primary" : "text-foreground"}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Active Loans */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Active Loans</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {customerLoans
                    .filter((loan) => loan.status === "active")
                    .map((loan) => (
                      <div key={loan.id} className="p-3 rounded-lg bg-muted/30">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-foreground">{loan.type}</p>
                            <p className="text-xs text-muted-foreground">Balance: ${loan.balance.toLocaleString()}</p>
                          </div>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Next payment: ${loan.monthlyPayment.toLocaleString()} due {loan.nextDue}
                        </p>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions */}
          <TabsContent value="transactions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Transaction History</CardTitle>
                <CardDescription>Complete record of your account activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.amount > 0 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {transaction.type === "transfer" ? (
                            <Send className="w-4 h-4" />
                          ) : transaction.type === "deposit" ? (
                            <DollarSign className="w-4 h-4" />
                          ) : (
                            <CreditCard className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.date} • {transaction.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-lg font-medium ${
                            transaction.amount > 0 ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                        </span>
                        <Badge variant="outline" className="ml-2">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loans */}
          <TabsContent value="loans" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Your Loans</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Apply for New Loan
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {customerLoans.map((loan) => (
                <Card key={loan.id} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-card-foreground">{loan.type}</CardTitle>
                      <Badge variant={loan.status === "active" ? "secondary" : "outline"}>{loan.status}</Badge>
                    </div>
                    <CardDescription>Loan ID: {loan.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Original Amount</p>
                        <p className="text-lg font-semibold text-foreground">${loan.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                        <p className="text-lg font-semibold text-foreground">${loan.balance.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="text-lg font-semibold text-foreground">{loan.rate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Term</p>
                        <p className="text-lg font-semibold text-foreground">{loan.term} months</p>
                      </div>
                    </div>
                    {loan.status === "active" && (
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <p className="text-sm font-medium text-accent">Next Payment</p>
                        <p className="text-xs text-muted-foreground">
                          ${loan.monthlyPayment.toLocaleString()} due on {loan.nextDue}
                        </p>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      {loan.status === "active" && (
                        <Button size="sm" className="flex-1">
                          Make Payment
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Alerts */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Notifications & Alerts</CardTitle>
                <CardDescription>Stay informed about your account activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg border ${
                        alert.read ? "bg-muted/30 border-border" : "bg-accent/10 border-accent/20"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          alert.severity === "high"
                            ? "bg-destructive/20 text-destructive"
                            : alert.severity === "medium"
                              ? "bg-accent/20 text-accent"
                              : "bg-primary/20 text-primary"
                        }`}
                      >
                        {alert.type === "security" ? (
                          <Shield className="w-4 h-4" />
                        ) : alert.type === "payment" ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <Bell className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">{alert.title}</p>
                          <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disputes */}
          <TabsContent value="disputes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Transaction Disputes</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                File New Dispute
              </Button>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Your Disputes</CardTitle>
                <CardDescription>Track the status of your dispute cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disputes.map((dispute) => (
                    <div
                      key={dispute.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            dispute.status === "resolved"
                              ? "bg-primary/20 text-primary"
                              : dispute.status === "investigating"
                                ? "bg-accent/20 text-accent"
                                : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {dispute.status === "resolved" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : dispute.status === "investigating" ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <AlertTriangle className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{dispute.id}</p>
                          <p className="text-sm text-muted-foreground">{dispute.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Amount: ${dispute.amount.toLocaleString()} • Submitted: {dispute.submittedAt}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            dispute.status === "resolved"
                              ? "outline"
                              : dispute.status === "investigating"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {dispute.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Expected: {dispute.expectedResolution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={customerProfile.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={customerProfile.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={customerProfile.phone} />
                  </div>
                  <Button className="w-full">Update Profile</Button>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Security & Notifications</CardTitle>
                  <CardDescription>Manage your security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">SMS Alerts</p>
                      <p className="text-xs text-muted-foreground">Receive transaction alerts via SMS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Get account updates via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Login Alerts</p>
                      <p className="text-xs text-muted-foreground">Alert on new device logins</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Large Transaction Alerts</p>
                      <p className="text-xs text-muted-foreground">Alert for transactions over $1,000</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-transparent" variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Setup 2FA
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card className="bg-card border-border lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Customer Support</CardTitle>
                  <CardDescription>Get help when you need it</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <MessageCircle className="w-6 h-6 mb-2" />
                      <span>Live Chat</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Phone className="w-6 h-6 mb-2" />
                      <span>Call Support</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Mail className="w-6 h-6 mb-2" />
                      <span>Email Support</span>
                    </Button>
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
