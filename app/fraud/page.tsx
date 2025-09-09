import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Shield,
  Eye,
  Clock,
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle,
  XCircle,
  Pause,
} from "lucide-react"

// Mock data for fraud detection
const fraudStats = {
  totalTransactions: 45678,
  flaggedTransactions: 234,
  confirmedFraud: 23,
  falsePositives: 45,
  riskScore: 7.2,
  preventedLoss: 125000,
}

const realtimeTransactions = [
  {
    id: "TXN-001",
    amount: 15000,
    account: "****4521",
    riskScore: 95,
    status: "blocked",
    reason: "Unusual amount pattern",
    timestamp: "2 min ago",
    location: "Lagos, Nigeria",
  },
  {
    id: "TXN-002",
    amount: 2500,
    account: "****7834",
    riskScore: 75,
    status: "review",
    reason: "New device login",
    timestamp: "5 min ago",
    location: "Accra, Ghana",
  },
  {
    id: "TXN-003",
    amount: 500,
    account: "****9012",
    riskScore: 25,
    status: "approved",
    reason: "Normal pattern",
    timestamp: "8 min ago",
    location: "Nairobi, Kenya",
  },
  {
    id: "TXN-004",
    amount: 8500,
    account: "****3456",
    riskScore: 85,
    status: "cooling",
    reason: "Large amount verification",
    timestamp: "12 min ago",
    location: "Cape Town, South Africa",
  },
]

const fraudPatterns = [
  { pattern: "Multiple failed OTP attempts", frequency: 45, trend: "up" },
  { pattern: "Unusual time-based transactions", frequency: 32, trend: "down" },
  { pattern: "Geographic anomalies", frequency: 28, trend: "up" },
  { pattern: "Device fingerprint mismatches", frequency: 19, trend: "stable" },
]

const stepUpVerifications = [
  {
    id: "SV-001",
    account: "****4521",
    method: "Biometric + Voice Call",
    status: "pending",
    initiated: "3 min ago",
    amount: 15000,
  },
  {
    id: "SV-002",
    account: "****7834",
    method: "In-app PIN + SMS",
    status: "completed",
    initiated: "15 min ago",
    amount: 2500,
  },
  {
    id: "SV-003",
    account: "****9876",
    method: "Biometric Scan",
    status: "failed",
    initiated: "1 hour ago",
    amount: 12000,
  },
]

export default function FraudDetectionPage() {
  return (
    <DashboardLayout activeModule="fraud">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground text-balance">Fraud Detection & Prevention</h2>
            <p className="text-muted-foreground mt-2">Real-time monitoring and AI-powered fraud prevention</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {fraudStats.flaggedTransactions} Active Alerts
            </Badge>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Transactions Monitored</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {fraudStats.totalTransactions.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{fraudStats.riskScore}/10</div>
              <Progress value={fraudStats.riskScore * 10} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Confirmed Fraud</CardTitle>
              <XCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{fraudStats.confirmedFraud}</div>
              <p className="text-xs text-muted-foreground">
                {((fraudStats.confirmedFraud / fraudStats.flaggedTransactions) * 100).toFixed(1)}% of flagged
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Loss Prevented</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${fraudStats.preventedLoss.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main content tabs */}
        <Tabs defaultValue="realtime" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="realtime">Real-time Monitoring</TabsTrigger>
            <TabsTrigger value="patterns">Fraud Patterns</TabsTrigger>
            <TabsTrigger value="verification">Step-up Verification</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          </TabsList>

          {/* Real-time monitoring */}
          <TabsContent value="realtime" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Live Transaction Monitoring</CardTitle>
                <CardDescription>Real-time transaction analysis with risk scoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {realtimeTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            transaction.status === "blocked"
                              ? "bg-destructive"
                              : transaction.status === "review"
                                ? "bg-accent"
                                : transaction.status === "cooling"
                                  ? "bg-secondary"
                                  : "bg-primary"
                          }`}
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{transaction.id}</span>
                            <Badge
                              variant={
                                transaction.status === "blocked"
                                  ? "destructive"
                                  : transaction.status === "review"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {transaction.account} • ${transaction.amount.toLocaleString()} • {transaction.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-sm font-medium ${
                              transaction.riskScore >= 80
                                ? "text-destructive"
                                : transaction.riskScore >= 50
                                  ? "text-accent"
                                  : "text-primary"
                            }`}
                          >
                            Risk: {transaction.riskScore}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{transaction.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fraud patterns */}
          <TabsContent value="patterns" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">AI-Detected Fraud Patterns</CardTitle>
                <CardDescription>Machine learning insights on emerging fraud trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fraudPatterns.map((pattern, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-accent" />
                        <div>
                          <p className="font-medium text-foreground">{pattern.pattern}</p>
                          <p className="text-sm text-muted-foreground">Detected {pattern.frequency} times this week</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp
                          className={`w-4 h-4 ${
                            pattern.trend === "up"
                              ? "text-destructive"
                              : pattern.trend === "down"
                                ? "text-primary"
                                : "text-muted-foreground"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            pattern.trend === "up"
                              ? "text-destructive"
                              : pattern.trend === "down"
                                ? "text-primary"
                                : "text-muted-foreground"
                          }`}
                        >
                          {pattern.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step-up verification */}
          <TabsContent value="verification" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Step-up Verification Queue</CardTitle>
                <CardDescription>Multi-factor authentication for high-risk transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stepUpVerifications.map((verification) => (
                    <div
                      key={verification.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            verification.status === "pending"
                              ? "bg-accent/20 text-accent"
                              : verification.status === "completed"
                                ? "bg-primary/20 text-primary"
                                : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {verification.status === "pending" ? (
                            <Clock className="w-4 h-4" />
                          ) : verification.status === "completed" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{verification.id}</span>
                            <Badge
                              variant={
                                verification.status === "pending"
                                  ? "secondary"
                                  : verification.status === "completed"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {verification.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {verification.account} • ${verification.amount.toLocaleString()} • {verification.method}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {verification.status === "pending" && (
                          <>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Monitor
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Pause className="w-4 h-4 mr-1" />
                              Block
                            </Button>
                          </>
                        )}
                        <span className="text-xs text-muted-foreground">{verification.initiated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Analysis */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">AI Model Performance</CardTitle>
                  <CardDescription>Machine learning model accuracy and insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Detection Accuracy</span>
                      <span className="font-medium text-foreground">94.2%</span>
                    </div>
                    <Progress value={94.2} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">False Positive Rate</span>
                      <span className="font-medium text-foreground">2.1%</span>
                    </div>
                    <Progress value={2.1} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Model Confidence</span>
                      <span className="font-medium text-foreground">91.8%</span>
                    </div>
                    <Progress value={91.8} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Learning Insights</CardTitle>
                  <CardDescription>Recent AI model adaptations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm font-medium text-primary">New Pattern Detected</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cross-border transaction anomalies during weekend hours
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-sm font-medium text-accent">Model Updated</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enhanced device fingerprinting algorithm deployed
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                    <p className="text-sm font-medium text-secondary">Threshold Adjusted</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Risk scoring sensitivity increased for large transactions
                    </p>
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
