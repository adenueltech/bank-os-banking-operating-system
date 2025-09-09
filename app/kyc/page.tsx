import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Download,
  Search,
  Filter,
  Fingerprint,
  FileCheck,
} from "lucide-react"

// Mock data for KYC & Compliance
const kycStats = {
  totalApplications: 1247,
  pendingVerification: 156,
  approved: 1034,
  rejected: 57,
  complianceScore: 96.8,
  amlChecks: 2341,
}

const verificationQueue = [
  {
    id: "KYC-001",
    customer: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+234-801-234-5678",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "pending_review",
    riskLevel: "low",
    documents: ["National ID", "Proof of Address"],
    biometric: "completed",
    amlStatus: "clear",
    submittedAt: "2 hours ago",
    assignedTo: "Agent Smith",
  },
  {
    id: "KYC-002",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+233-20-123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "document_issues",
    riskLevel: "medium",
    documents: ["Passport", "Bank Statement"],
    biometric: "pending",
    amlStatus: "flagged",
    submittedAt: "5 hours ago",
    assignedTo: "Agent Johnson",
  },
  {
    id: "KYC-003",
    customer: {
      name: "Michael Johnson",
      email: "m.johnson@email.com",
      phone: "+254-700-123-456",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "approved",
    riskLevel: "low",
    documents: ["Driver's License", "Utility Bill"],
    biometric: "completed",
    amlStatus: "clear",
    submittedAt: "1 day ago",
    assignedTo: "Agent Davis",
  },
  {
    id: "KYC-004",
    customer: {
      name: "Sarah Wilson",
      email: "sarah.w@email.com",
      phone: "+27-82-123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "biometric_failed",
    riskLevel: "high",
    documents: ["National ID", "Proof of Income"],
    biometric: "failed",
    amlStatus: "under_review",
    submittedAt: "3 hours ago",
    assignedTo: "Agent Brown",
  },
]

const complianceReports = [
  {
    id: "RPT-001",
    title: "Monthly AML Compliance Report",
    type: "AML",
    status: "completed",
    generatedAt: "2024-01-01",
    size: "2.4 MB",
  },
  {
    id: "RPT-002",
    title: "KYC Audit Trail - Q4 2023",
    type: "KYC",
    status: "pending",
    generatedAt: "2024-01-15",
    size: "1.8 MB",
  },
  {
    id: "RPT-003",
    title: "Regulatory Compliance Summary",
    type: "Regulatory",
    status: "completed",
    generatedAt: "2023-12-31",
    size: "3.2 MB",
  },
]

const amlAlerts = [
  {
    id: "AML-001",
    customer: "John Doe",
    reason: "PEP (Politically Exposed Person) match",
    severity: "high",
    status: "investigating",
    detectedAt: "1 hour ago",
  },
  {
    id: "AML-002",
    customer: "Jane Smith",
    reason: "Sanctions list match - partial name",
    severity: "medium",
    status: "false_positive",
    detectedAt: "3 hours ago",
  },
  {
    id: "AML-003",
    customer: "Robert Brown",
    reason: "High-risk jurisdiction",
    severity: "low",
    status: "cleared",
    detectedAt: "1 day ago",
  },
]

export default function KYCCompliancePage() {
  return (
    <DashboardLayout activeModule="kyc">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground text-balance">KYC & Compliance</h2>
            <p className="text-muted-foreground mt-2">Customer verification and regulatory compliance management</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <Shield className="w-3 h-3 mr-1" />
              Compliance Score: {kycStats.complianceScore}%
            </Badge>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {kycStats.totalApplications.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{kycStats.pendingVerification}</div>
              <p className="text-xs text-muted-foreground">Awaiting verification</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Approval Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {((kycStats.approved / kycStats.totalApplications) * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">{kycStats.approved} approved</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">AML Checks</CardTitle>
              <Shield className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{kycStats.amlChecks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main content tabs */}
        <Tabs defaultValue="verification" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="verification">Verification Queue</TabsTrigger>
            <TabsTrigger value="aml">AML Monitoring</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          {/* Verification Queue */}
          <TabsContent value="verification" className="space-y-6">
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
              <Badge variant="secondary">{verificationQueue.length} applications in queue</Badge>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Customer Verification Queue</CardTitle>
                <CardDescription>Pending KYC applications requiring review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verificationQueue.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={application.customer.avatar || "/placeholder.svg"}
                            alt={application.customer.name}
                          />
                          <AvatarFallback>
                            {application.customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{application.customer.name}</span>
                            <Badge
                              variant={
                                application.status === "approved"
                                  ? "outline"
                                  : application.status === "pending_review"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {application.status.replace("_", " ")}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                application.riskLevel === "high"
                                  ? "border-destructive text-destructive"
                                  : application.riskLevel === "medium"
                                    ? "border-accent text-accent"
                                    : "border-primary text-primary"
                              }
                            >
                              {application.riskLevel} risk
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {application.customer.email} • {application.submittedAt}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <FileCheck className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{application.documents.length} docs</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Fingerprint
                                className={`w-3 h-3 ${
                                  application.biometric === "completed"
                                    ? "text-primary"
                                    : application.biometric === "failed"
                                      ? "text-destructive"
                                      : "text-muted-foreground"
                                }`}
                              />
                              <span className="text-xs text-muted-foreground">{application.biometric}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Shield
                                className={`w-3 h-3 ${
                                  application.amlStatus === "clear"
                                    ? "text-primary"
                                    : application.amlStatus === "flagged"
                                      ? "text-destructive"
                                      : "text-accent"
                                }`}
                              />
                              <span className="text-xs text-muted-foreground">AML {application.amlStatus}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        {application.status === "pending_review" && (
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AML Monitoring */}
          <TabsContent value="aml" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">AML Alerts & Monitoring</CardTitle>
                <CardDescription>Anti-Money Laundering screening and watchlist monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {amlAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            alert.severity === "high"
                              ? "bg-destructive"
                              : alert.severity === "medium"
                                ? "bg-accent"
                                : "bg-secondary"
                          }`}
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{alert.id}</span>
                            <Badge
                              variant={
                                alert.status === "investigating"
                                  ? "destructive"
                                  : alert.status === "cleared"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {alert.status.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground">{alert.customer}</p>
                          <p className="text-sm text-muted-foreground">{alert.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            alert.severity === "high"
                              ? "border-destructive text-destructive"
                              : alert.severity === "medium"
                                ? "border-accent text-accent"
                                : "border-secondary text-secondary"
                          }
                        >
                          {alert.severity}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{alert.detectedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Reports */}
          <TabsContent value="compliance" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Regulatory Compliance Reports</CardTitle>
                <CardDescription>Generated reports for regulatory authorities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{report.title}</span>
                            <Badge
                              variant={report.status === "completed" ? "outline" : "secondary"}
                              className={report.status === "completed" ? "text-primary border-primary/20" : ""}
                            >
                              {report.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {report.type} • Generated on {report.generatedAt} • {report.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {report.status === "completed" && (
                          <Button size="sm" variant="default">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Trail */}
          <TabsContent value="audit" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Compliance Metrics</CardTitle>
                  <CardDescription>Key performance indicators for regulatory compliance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">KYC Completion Rate</span>
                      <span className="font-medium text-foreground">94.2%</span>
                    </div>
                    <Progress value={94.2} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">AML Screening Coverage</span>
                      <span className="font-medium text-foreground">100%</span>
                    </div>
                    <Progress value={100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Document Verification Rate</span>
                      <span className="font-medium text-foreground">91.8%</span>
                    </div>
                    <Progress value={91.8} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Biometric Success Rate</span>
                      <span className="font-medium text-foreground">87.5%</span>
                    </div>
                    <Progress value={87.5} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Recent Audit Events</CardTitle>
                  <CardDescription>Latest compliance and verification activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm font-medium text-primary">KYC Application Approved</p>
                    <p className="text-xs text-muted-foreground mt-1">John Doe - Agent Smith - 2 hours ago</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-sm font-medium text-accent">AML Alert Generated</p>
                    <p className="text-xs text-muted-foreground mt-1">Jane Smith - PEP Match - 3 hours ago</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                    <p className="text-sm font-medium text-secondary">Compliance Report Generated</p>
                    <p className="text-xs text-muted-foreground mt-1">Monthly AML Report - System - 1 day ago</p>
                  </div>
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm font-medium text-destructive">KYC Application Rejected</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Robert Brown - Document Issues - Agent Davis - 2 days ago
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
