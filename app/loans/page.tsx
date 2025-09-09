import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calculator,
  Banknote,
  AlertTriangle,
} from "lucide-react"

// Mock data for Loan Processing
const loanStats = {
  totalApplications: 2847,
  pendingReview: 89,
  approved: 2341,
  disbursed: 2198,
  totalPortfolio: 45600000,
  averageScore: 742,
  approvalRate: 82.2,
  defaultRate: 2.1,
}

const loanApplications = [
  {
    id: "LA-001",
    applicant: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+234-801-234-5678",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 50000,
    purpose: "Business Expansion",
    term: 24,
    creditScore: 785,
    riskGrade: "A",
    status: "pending_approval",
    aiRecommendation: "approve",
    confidence: 94,
    submittedAt: "2 hours ago",
    monthlyIncome: 8500,
    debtToIncome: 0.32,
  },
  {
    id: "LA-002",
    applicant: {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+233-20-123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 25000,
    purpose: "Home Improvement",
    term: 36,
    creditScore: 642,
    riskGrade: "B",
    status: "under_review",
    aiRecommendation: "conditional",
    confidence: 76,
    submittedAt: "5 hours ago",
    monthlyIncome: 4200,
    debtToIncome: 0.45,
  },
  {
    id: "LA-003",
    applicant: {
      name: "Michael Johnson",
      email: "m.johnson@email.com",
      phone: "+254-700-123-456",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 15000,
    purpose: "Education",
    term: 48,
    creditScore: 698,
    riskGrade: "B+",
    status: "approved",
    aiRecommendation: "approve",
    confidence: 88,
    submittedAt: "1 day ago",
    monthlyIncome: 3800,
    debtToIncome: 0.28,
  },
  {
    id: "LA-004",
    applicant: {
      name: "Sarah Wilson",
      email: "sarah.w@email.com",
      phone: "+27-82-123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 75000,
    purpose: "Debt Consolidation",
    term: 60,
    creditScore: 521,
    riskGrade: "D",
    status: "rejected",
    aiRecommendation: "reject",
    confidence: 91,
    submittedAt: "3 hours ago",
    monthlyIncome: 5200,
    debtToIncome: 0.68,
  },
]

const portfolioPerformance = [
  { grade: "A", count: 1245, amount: 18500000, defaultRate: 0.8 },
  { grade: "B", count: 892, amount: 15200000, defaultRate: 1.5 },
  { grade: "C", count: 456, amount: 8900000, defaultRate: 3.2 },
  { grade: "D", count: 123, amount: 3000000, defaultRate: 8.1 },
]

const disbursementQueue = [
  {
    id: "LA-001",
    applicant: "John Doe",
    amount: 50000,
    status: "ready_to_disburse",
    approvedAt: "1 hour ago",
    method: "Bank Transfer",
  },
  {
    id: "LA-005",
    applicant: "Robert Brown",
    amount: 30000,
    status: "disbursed",
    approvedAt: "2 days ago",
    method: "Mobile Money",
  },
  {
    id: "LA-006",
    applicant: "Lisa Davis",
    amount: 20000,
    status: "pending_documents",
    approvedAt: "3 hours ago",
    method: "Bank Transfer",
  },
]

export default function LoanProcessingPage() {
  return (
    <DashboardLayout activeModule="loans">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground text-balance">Loan Processing & Credit Scoring</h2>
            <p className="text-muted-foreground mt-2">AI-powered loan assessment and portfolio management</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Calculator className="w-4 h-4 mr-2" />
              Credit Calculator
            </Button>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              Approval Rate: {loanStats.approvalRate}%
            </Badge>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Portfolio</CardTitle>
              <Banknote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                ${(loanStats.totalPortfolio / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{loanStats.pendingReview}</div>
              <p className="text-xs text-muted-foreground">Awaiting decision</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Average Credit Score</CardTitle>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{loanStats.averageScore}</div>
              <p className="text-xs text-muted-foreground">Portfolio average</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Default Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{loanStats.defaultRate}%</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline w-3 h-3 mr-1" />
                -0.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main content tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Loan Applications</TabsTrigger>
            <TabsTrigger value="scoring">AI Credit Scoring</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio Management</TabsTrigger>
            <TabsTrigger value="disbursement">Disbursement</TabsTrigger>
          </TabsList>

          {/* Loan Applications */}
          <TabsContent value="applications" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Loan Application Queue</CardTitle>
                <CardDescription>Applications requiring review and decision</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loanApplications.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={application.applicant.avatar || "/placeholder.svg"}
                            alt={application.applicant.name}
                          />
                          <AvatarFallback>
                            {application.applicant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{application.applicant.name}</span>
                            <Badge
                              variant={
                                application.status === "approved"
                                  ? "outline"
                                  : application.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {application.status.replace("_", " ")}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                application.riskGrade.startsWith("A")
                                  ? "border-primary text-primary"
                                  : application.riskGrade.startsWith("B")
                                    ? "border-accent text-accent"
                                    : application.riskGrade.startsWith("C")
                                      ? "border-secondary text-secondary"
                                      : "border-destructive text-destructive"
                              }
                            >
                              Grade {application.riskGrade}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ${application.amount.toLocaleString()} • {application.purpose} • {application.term} months
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <CreditCard className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Score: {application.creditScore}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                Income: ${application.monthlyIncome.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span
                                className={`text-xs ${
                                  application.debtToIncome > 0.5 ? "text-destructive" : "text-muted-foreground"
                                }`}
                              >
                                DTI: {(application.debtToIncome * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge
                            variant="outline"
                            className={
                              application.aiRecommendation === "approve"
                                ? "border-primary text-primary"
                                : application.aiRecommendation === "reject"
                                  ? "border-destructive text-destructive"
                                  : "border-accent text-accent"
                            }
                          >
                            AI: {application.aiRecommendation}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{application.confidence}% confidence</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                          {application.status === "pending_approval" && (
                            <>
                              <Button size="sm" variant="default">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive">
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Credit Scoring */}
          <TabsContent value="scoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">AI Scoring Model Performance</CardTitle>
                  <CardDescription>Machine learning model accuracy and metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prediction Accuracy</span>
                      <span className="font-medium text-foreground">92.4%</span>
                    </div>
                    <Progress value={92.4} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Model Confidence</span>
                      <span className="font-medium text-foreground">89.7%</span>
                    </div>
                    <Progress value={89.7} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Alternative Data Usage</span>
                      <span className="font-medium text-foreground">76.3%</span>
                    </div>
                    <Progress value={76.3} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Scoring Factors</CardTitle>
                  <CardDescription>Key factors influencing credit decisions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm font-medium text-primary">Payment History (35%)</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Traditional banking data and transaction patterns
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-sm font-medium text-accent">Income Stability (25%)</p>
                    <p className="text-xs text-muted-foreground mt-1">Employment history and income consistency</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                    <p className="text-sm font-medium text-secondary">Alternative Data (20%)</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Mobile money, utility payments, social indicators
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted border border-border">
                    <p className="text-sm font-medium text-foreground">Debt-to-Income (20%)</p>
                    <p className="text-xs text-muted-foreground mt-1">Current debt obligations and capacity</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Management */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Portfolio Performance by Risk Grade</CardTitle>
                <CardDescription>Loan distribution and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioPerformance.map((grade) => (
                    <div
                      key={grade.grade}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                            grade.grade === "A"
                              ? "bg-primary/20 text-primary"
                              : grade.grade === "B"
                                ? "bg-accent/20 text-accent"
                                : grade.grade === "C"
                                  ? "bg-secondary/20 text-secondary"
                                  : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {grade.grade}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Grade {grade.grade}</p>
                          <p className="text-sm text-muted-foreground">
                            {grade.count} loans • ${(grade.amount / 1000000).toFixed(1)}M portfolio
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={
                              grade.defaultRate < 2
                                ? "border-primary text-primary"
                                : grade.defaultRate < 5
                                  ? "border-accent text-accent"
                                  : "border-destructive text-destructive"
                            }
                          >
                            {grade.defaultRate}% default
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {((grade.amount / loanStats.totalPortfolio) * 100).toFixed(1)}% of portfolio
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disbursement */}
          <TabsContent value="disbursement" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Disbursement Queue</CardTitle>
                <CardDescription>Approved loans ready for disbursement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disbursementQueue.map((loan) => (
                    <div
                      key={loan.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            loan.status === "ready_to_disburse"
                              ? "bg-accent"
                              : loan.status === "disbursed"
                                ? "bg-primary"
                                : "bg-secondary"
                          }`}
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{loan.id}</span>
                            <Badge
                              variant={
                                loan.status === "disbursed"
                                  ? "outline"
                                  : loan.status === "ready_to_disburse"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {loan.status.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {loan.applicant} • ${loan.amount.toLocaleString()} • {loan.method}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {loan.status === "ready_to_disburse" && (
                          <Button size="sm" variant="default">
                            <Banknote className="w-4 h-4 mr-1" />
                            Disburse
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <span className="text-xs text-muted-foreground">{loan.approvedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
