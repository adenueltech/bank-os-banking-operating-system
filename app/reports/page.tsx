"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FileText, Download, CalendarIcon, Clock, CheckCircle, AlertTriangle, Building, DollarSign } from "lucide-react"
import { format } from "date-fns"

// Mock data for regulatory reports
const mockReports = [
  {
    id: "RPT-001",
    name: "Daily Transaction Report",
    type: "transaction",
    frequency: "daily",
    status: "completed",
    generatedAt: "2024-01-15T23:59:00Z",
    fileSize: "2.4 MB",
    recordCount: 15847,
    nextDue: "2024-01-16T23:59:00Z",
  },
  {
    id: "RPT-002",
    name: "AML Suspicious Activity Report",
    type: "aml",
    frequency: "weekly",
    status: "processing",
    generatedAt: "2024-01-14T23:59:00Z",
    fileSize: "856 KB",
    recordCount: 23,
    nextDue: "2024-01-21T23:59:00Z",
  },
  {
    id: "RPT-003",
    name: "Central Bank Regulatory Filing",
    type: "regulatory",
    frequency: "monthly",
    status: "completed",
    generatedAt: "2024-01-01T00:00:00Z",
    fileSize: "15.2 MB",
    recordCount: 125000,
    nextDue: "2024-02-01T00:00:00Z",
  },
]

const mockAuditTrail = [
  {
    id: "AUDIT-001",
    timestamp: "2024-01-15T15:30:00Z",
    userId: "USER-001",
    username: "admin@bankos.com",
    action: "ACCOUNT_CREATED",
    resource: "ACC-001-2024",
    details: "Created new checking account for John Doe",
    ipAddress: "192.168.1.100",
  },
  {
    id: "AUDIT-002",
    timestamp: "2024-01-15T15:25:00Z",
    userId: "USER-002",
    username: "manager@bankos.com",
    action: "LOAN_APPROVED",
    resource: "LOAN-456",
    details: "Approved personal loan for $25,000",
    ipAddress: "192.168.1.101",
  },
  {
    id: "AUDIT-003",
    timestamp: "2024-01-15T15:20:00Z",
    userId: "USER-003",
    username: "teller@bankos.com",
    action: "PAYMENT_PROCESSED",
    resource: "PAY-789",
    details: "Processed wire transfer of $5,000",
    ipAddress: "192.168.1.102",
  },
]

const mockComplianceMetrics = [
  {
    category: "Transaction Monitoring",
    totalTransactions: 125000,
    flaggedTransactions: 234,
    falsePositives: 189,
    truePositives: 45,
    complianceRate: 99.8,
  },
  {
    category: "KYC Verification",
    totalCustomers: 12847,
    verifiedCustomers: 12756,
    pendingVerification: 91,
    rejectedApplications: 156,
    complianceRate: 99.3,
  },
  {
    category: "AML Screening",
    totalScreenings: 15000,
    matchesFound: 67,
    falseMatches: 52,
    trueMatches: 15,
    complianceRate: 99.9,
  },
]

export default function ReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState("")
  const [dateRange, setDateRange] = useState<Date>()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      processing: "secondary",
      failed: "destructive",
      scheduled: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <DashboardLayout activeModule="reports">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Regulatory Reporting</h1>
            <p className="text-muted-foreground">
              Automated compliance reports, audit trails, and regulatory submissions
            </p>
          </div>

          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.7%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Audit Events</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,892</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Regulatory Filings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Due this month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="reports" className="space-y-4">
          <TabsList>
            <TabsTrigger value="reports">Automated Reports</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Metrics</TabsTrigger>
            <TabsTrigger value="submissions">Regulatory Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Custom Report</CardTitle>
                  <CardDescription>Create ad-hoc reports for regulatory compliance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Report Type</Label>
                    <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transaction">Transaction Report</SelectItem>
                        <SelectItem value="aml">AML Report</SelectItem>
                        <SelectItem value="kyc">KYC Report</SelectItem>
                        <SelectItem value="regulatory">Regulatory Filing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange ? format(dateRange, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dateRange} onSelect={setDateRange} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button className="w-full">Generate Report</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>Automated report generation status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(report.status)}
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {report.recordCount.toLocaleString()} records • {report.fileSize}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          {getStatusBadge(report.status)}
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Audit Trail</CardTitle>
                <CardDescription>Comprehensive logging of all banking operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAuditTrail.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{entry.action.replace("_", " ")}</p>
                          <p className="text-sm text-muted-foreground">{entry.details}</p>
                          <p className="text-xs text-muted-foreground">
                            {entry.username} • {entry.ipAddress}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{entry.resource}</p>
                        <p className="text-xs text-muted-foreground">{new Date(entry.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <div className="grid gap-4">
              {mockComplianceMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{metric.category}</CardTitle>
                    <CardDescription>Compliance monitoring and performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Processed</p>
                        <p className="text-2xl font-bold">
                          {metric.totalTransactions?.toLocaleString() ||
                            metric.totalCustomers?.toLocaleString() ||
                            metric.totalScreenings?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Flagged/Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">
                          {metric.flaggedTransactions?.toLocaleString() ||
                            metric.pendingVerification?.toLocaleString() ||
                            metric.matchesFound?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">False Positives</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {metric.falsePositives?.toLocaleString() ||
                            metric.rejectedApplications?.toLocaleString() ||
                            metric.falseMatches?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Compliance Rate</p>
                        <p className="text-2xl font-bold text-green-600">{metric.complianceRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Submissions</CardTitle>
                <CardDescription>Central bank and regulatory authority filings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Monthly Filings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Balance Sheet Report</span>
                            <Badge variant="default">Submitted</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Income Statement</span>
                            <Badge variant="default">Submitted</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Capital Adequacy Report</span>
                            <Badge variant="secondary">Processing</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quarterly Filings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Risk Assessment Report</span>
                            <Badge variant="outline">Due Feb 15</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Liquidity Coverage Ratio</span>
                            <Badge variant="outline">Due Feb 15</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Stress Test Results</span>
                            <Badge variant="outline">Due Feb 28</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
