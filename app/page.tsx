import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, UserCheck, CreditCard, BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"

// Mock data for dashboard overview
const mockStats = {
  totalTransactions: 125847,
  fraudDetected: 23,
  kycPending: 156,
  loansProcessed: 89,
  systemHealth: 99.8,
}

const recentAlerts = [
  {
    id: 1,
    type: "fraud",
    message: "Suspicious transaction detected - Account #4521",
    time: "2 min ago",
    severity: "high",
  },
  { id: 2, type: "kyc", message: "KYC verification completed - John Doe", time: "15 min ago", severity: "low" },
  {
    id: 3,
    type: "loan",
    message: "Loan application requires review - #LA-2024-001",
    time: "1 hour ago",
    severity: "medium",
  },
  { id: 4, type: "system", message: "System backup completed successfully", time: "2 hours ago", severity: "low" },
]

export default function DashboardOverview() {
  return (
    <DashboardLayout activeModule="overview">
      <div className="space-y-6">
        {/* Welcome section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground text-balance">Welcome to BankOS</h2>
            <p className="text-muted-foreground mt-2">Your unified banking operating system dashboard</p>
          </div>
          <Badge variant="outline" className="bg-card text-card-foreground">
            System Status: Online
          </Badge>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Transactions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {mockStats.totalTransactions.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Fraud Alerts</CardTitle>
              <Shield className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{mockStats.fraudDetected}</div>
              <p className="text-xs text-muted-foreground">
                <AlertTriangle className="inline w-3 h-3 mr-1" />
                Requires immediate attention
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">KYC Pending</CardTitle>
              <UserCheck className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{mockStats.kycPending}</div>
              <p className="text-xs text-muted-foreground">
                <Clock className="inline w-3 h-3 mr-1" />
                Awaiting verification
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Loans Processed</CardTitle>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockStats.loansProcessed}</div>
              <p className="text-xs text-muted-foreground">
                <CheckCircle className="inline w-3 h-3 mr-1" />
                This week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent alerts and quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent alerts */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Alerts</CardTitle>
              <CardDescription>Latest system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === "high"
                        ? "bg-destructive"
                        : alert.severity === "medium"
                          ? "bg-accent"
                          : "bg-primary"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Review Fraud Alerts
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <UserCheck className="w-4 h-4 mr-2" />
                Process KYC Applications
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <CreditCard className="w-4 h-4 mr-2" />
                Approve Loan Applications
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">System Health</CardTitle>
            <CardDescription>Current system performance and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-foreground">All systems operational</span>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {mockStats.systemHealth}% Uptime
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
