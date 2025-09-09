import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, TrendingDown, BarChart3, Download, Filter, Users, DollarSign, Shield } from "lucide-react"

// Mock data for Analytics
const analyticsStats = {
  totalRevenue: 2450000,
  revenueGrowth: 12.5,
  activeCustomers: 15847,
  customerGrowth: 8.3,
  transactionVolume: 89234567,
  volumeGrowth: 15.2,
  fraudPrevented: 125000,
  fraudReduction: -23.1,
}

// Transaction analytics data
const transactionTrends = [
  { month: "Jan", volume: 7200000, count: 12450, avgAmount: 578 },
  { month: "Feb", volume: 7800000, count: 13200, avgAmount: 591 },
  { month: "Mar", volume: 8100000, count: 13800, avgAmount: 587 },
  { month: "Apr", volume: 8500000, count: 14200, avgAmount: 599 },
  { month: "May", volume: 8900000, count: 14800, avgAmount: 601 },
  { month: "Jun", volume: 9200000, count: 15200, avgAmount: 605 },
]

// Fraud analytics data
const fraudTrends = [
  { month: "Jan", detected: 45, prevented: 42, falsePositives: 12 },
  { month: "Feb", detected: 38, prevented: 35, falsePositives: 8 },
  { month: "Mar", detected: 52, prevented: 48, falsePositives: 15 },
  { month: "Apr", detected: 41, prevented: 39, falsePositives: 9 },
  { month: "May", detected: 35, prevented: 33, falsePositives: 7 },
  { month: "Jun", detected: 29, prevented: 27, falsePositives: 5 },
]

// Loan portfolio data
const loanPortfolio = [
  { grade: "A", amount: 18500000, count: 1245, color: "#164e63" },
  { grade: "B", amount: 15200000, count: 892, color: "#f97316" },
  { grade: "C", amount: 8900000, count: 456, color: "#4f46e5" },
  { grade: "D", amount: 3000000, count: 123, color: "#dc2626" },
]

// Customer segmentation data
const customerSegments = [
  { segment: "Premium", count: 2847, revenue: 1200000, color: "#164e63" },
  { segment: "Standard", count: 8934, revenue: 890000, color: "#f97316" },
  { segment: "Basic", count: 4066, revenue: 360000, color: "#4f46e5" },
]

// Predictive analytics data
const retentionForecast = [
  { month: "Jul", predicted: 94.2, actual: null },
  { month: "Aug", predicted: 93.8, actual: null },
  { month: "Sep", predicted: 94.5, actual: null },
  { month: "Oct", predicted: 95.1, actual: null },
  { month: "Nov", predicted: 94.7, actual: null },
  { month: "Dec", predicted: 95.3, actual: null },
]

const historicalRetention = [
  { month: "Jan", predicted: 93.5, actual: 94.1 },
  { month: "Feb", predicted: 93.8, actual: 93.2 },
  { month: "Mar", predicted: 94.2, actual: 94.8 },
  { month: "Apr", predicted: 94.0, actual: 93.9 },
  { month: "May", predicted: 94.5, actual: 94.3 },
  { month: "Jun", predicted: 94.8, actual: 95.1 },
]

export default function AnalyticsHubPage() {
  return (
    <DashboardLayout activeModule="analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground text-balance">Analytics Hub</h2>
            <p className="text-muted-foreground mt-2">Business intelligence and predictive analytics dashboard</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="6months">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                ${(analyticsStats.totalRevenue / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />+{analyticsStats.revenueGrowth}% from last period
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {analyticsStats.activeCustomers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />+{analyticsStats.customerGrowth}% growth
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Transaction Volume</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                ${(analyticsStats.transactionVolume / 1000000).toFixed(0)}M
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />+{analyticsStats.volumeGrowth}% volume increase
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Fraud Prevented</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                ${(analyticsStats.fraudPrevented / 1000).toFixed(0)}K
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline w-3 h-3 mr-1" />
                {analyticsStats.fraudReduction}% fraud reduction
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main analytics tabs */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Analytics</TabsTrigger>
            <TabsTrigger value="loans">Loan Portfolio</TabsTrigger>
            <TabsTrigger value="customers">Customer Insights</TabsTrigger>
            <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          </TabsList>

          {/* Transaction Analytics */}
          <TabsContent value="transactions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Transaction Volume Trends</CardTitle>
                  <CardDescription>Monthly transaction volume and growth patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={transactionTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${(value / 1000000).toFixed(1)}M`, "Volume"]} />
                      <Area type="monotone" dataKey="volume" stroke="#164e63" fill="#164e63" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Transaction Count & Average Amount</CardTitle>
                  <CardDescription>Transaction frequency and average transaction size</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={transactionTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="count" fill="#f97316" name="Count" />
                      <Line yAxisId="right" dataKey="avgAmount" stroke="#164e63" name="Avg Amount" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Fraud Analytics */}
          <TabsContent value="fraud" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Fraud Detection Trends</CardTitle>
                  <CardDescription>Monthly fraud detection and prevention metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={fraudTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="detected" stroke="#dc2626" name="Detected" />
                      <Line type="monotone" dataKey="prevented" stroke="#164e63" name="Prevented" />
                      <Line type="monotone" dataKey="falsePositives" stroke="#f97316" name="False Positives" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Fraud Prevention Efficiency</CardTitle>
                  <CardDescription>Model performance and accuracy metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Detection Rate</span>
                      <span className="font-medium text-foreground">94.2%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "94.2%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prevention Rate</span>
                      <span className="font-medium text-foreground">91.8%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "91.8%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">False Positive Rate</span>
                      <span className="font-medium text-foreground">2.1%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-destructive h-2 rounded-full" style={{ width: "2.1%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Loan Portfolio Analytics */}
          <TabsContent value="loans" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Portfolio Distribution by Risk Grade</CardTitle>
                  <CardDescription>Loan portfolio breakdown by risk categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={loanPortfolio}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ grade, count }) => `${grade}: ${count}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {loanPortfolio.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${(value / 1000000).toFixed(1)}M`, "Amount"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Loan Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators for loan portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loanPortfolio.map((grade) => (
                    <div key={grade.grade} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: grade.color }}></div>
                        <div>
                          <p className="font-medium text-foreground">Grade {grade.grade}</p>
                          <p className="text-sm text-muted-foreground">{grade.count} loans</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">${(grade.amount / 1000000).toFixed(1)}M</p>
                        <p className="text-sm text-muted-foreground">
                          {((grade.amount / loanPortfolio.reduce((sum, g) => sum + g.amount, 0)) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customer Insights */}
          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Customer Segmentation</CardTitle>
                  <CardDescription>Customer distribution by segment and revenue contribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={customerSegments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="segment" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="count" fill="#164e63" name="Customers" />
                      <Bar yAxisId="right" dataKey="revenue" fill="#f97316" name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Customer Value Analysis</CardTitle>
                  <CardDescription>Revenue per customer by segment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {customerSegments.map((segment) => (
                    <div key={segment.segment} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: segment.color }}></div>
                        <div>
                          <p className="font-medium text-foreground">{segment.segment}</p>
                          <p className="text-sm text-muted-foreground">{segment.count.toLocaleString()} customers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">${(segment.revenue / segment.count).toFixed(0)}</p>
                        <p className="text-sm text-muted-foreground">per customer</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Predictive Analytics */}
          <TabsContent value="predictive" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Customer Retention Forecast</CardTitle>
                  <CardDescription>Predicted customer retention rates for next 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[...historicalRetention, ...retentionForecast]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[90, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, "Retention"]} />
                      <Legend />
                      <Line type="monotone" dataKey="actual" stroke="#164e63" name="Actual" connectNulls={false} />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#f97316"
                        strokeDasharray="5 5"
                        name="Predicted"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Predictive Insights</CardTitle>
                  <CardDescription>AI-generated business insights and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm font-medium text-primary">Revenue Opportunity</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Premium segment shows 15% growth potential with targeted loan products
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-sm font-medium text-accent">Risk Alert</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Grade C loans showing higher default probability - recommend review
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                    <p className="text-sm font-medium text-secondary">Customer Insight</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Mobile banking adoption increasing 23% - optimize mobile experience
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm font-medium text-destructive">Churn Warning</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      347 customers at high churn risk - implement retention campaign
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
