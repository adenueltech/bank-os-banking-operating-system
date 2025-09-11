"use client"
import React, { useState, useMemo } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, DollarSign, TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  BarChart,
  Bar,
} from 'recharts'
import {
  PieChart,
  Pie,
  Cell,
} from 'recharts'

interface AnalyticsData {
  month: string;
  users: number;
  transactions: number;
  deposits: number;
  retention: number;
}

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState<'30days' | '6months' | 'year'>('6months')

  const mockData: AnalyticsData[] = useMemo(() => {
    const baseData = [
      { month: 'Jan', users: 12000, transactions: 150000, deposits: 500000, retention: 85 },
      { month: 'Feb', users: 12500, transactions: 160000, deposits: 520000, retention: 86 },
      { month: 'Mar', users: 13000, transactions: 170000, deposits: 550000, retention: 87 },
      { month: 'Apr', users: 13500, transactions: 180000, deposits: 580000, retention: 88 },
      { month: 'May', users: 14000, transactions: 190000, deposits: 600000, retention: 89 },
      { month: 'Jun', users: 14500, transactions: 200000, deposits: 630000, retention: 90 },
      { month: 'Jul', users: 15000, transactions: 210000, deposits: 660000, retention: 91 },
      { month: 'Aug', users: 15500, transactions: 220000, deposits: 690000, retention: 92 },
      { month: 'Sep', users: 16000, transactions: 230000, deposits: 720000, retention: 93 },
      { month: 'Oct', users: 16500, transactions: 240000, deposits: 750000, retention: 94 },
      { month: 'Nov', users: 17000, transactions: 250000, deposits: 780000, retention: 95 },
      { month: 'Dec', users: 17500, transactions: 260000, deposits: 810000, retention: 96 },
    ]

    switch (timeFilter) {
      case '30days':
        return baseData.slice(-1) // Simplified for demo
      case '6months':
        return baseData.slice(-6)
      case 'year':
        return baseData
      default:
        return baseData.slice(-6)
    }
  }, [timeFilter])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const totalUsers = mockData.reduce((sum, d) => sum + d.users, 0)
  const totalTransactions = mockData.reduce((sum, d) => sum + d.transactions, 0)
  const avgRetention = Math.round(mockData.reduce((sum, d) => sum + d.retention, 0) / mockData.length)
  const growthRate = ((mockData[mockData.length - 1]?.users - mockData[0]?.users) / mockData[0]?.users * 100).toFixed(1)

  const pieData = [
    { name: 'Active Users', value: totalUsers * 0.92 },
    { name: 'Churned Users', value: totalUsers * 0.08 },
  ]

  return (
    <AdminLayout activeModule="analytics">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Analytics Hub</h2>
            <p className="text-muted-foreground mt-2">Business intelligence and performance metrics</p>
          </div>
          <Select value={timeFilter} onValueChange={(value) => setTimeFilter(value as '30days' | '6months' | 'year')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{growthRate}% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalTransactions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgRetention}%</div>
              <p className="text-xs text-muted-foreground">
                Average retention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1.2M</div>
              <p className="text-xs text-muted-foreground">
                This period
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="transactions" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Retention Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}