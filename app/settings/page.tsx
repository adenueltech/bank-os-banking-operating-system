"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Users,
  Bell,
  Database,
  Key,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  SettingsIcon,
  Save,
  RefreshCw,
} from "lucide-react"

export default function SettingsPage() {
  return (
    <DashboardLayout activeModule="settings">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
            <p className="text-muted-foreground">Configure and manage your BankOS system settings</p>
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="security" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Authentication Settings
                  </CardTitle>
                  <CardDescription>Configure system authentication and access controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mfa">Multi-Factor Authentication</Label>
                    <Switch id="mfa" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="biometric">Biometric Authentication</Label>
                    <Switch id="biometric" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Select defaultValue="strict">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="strict">Strict</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    API Security
                  </CardTitle>
                  <CardDescription>Manage API keys and access tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>API Rate Limiting</Label>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="1000" />
                      <span className="text-sm text-muted-foreground">requests/hour</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="api-encryption">API Encryption</Label>
                    <Switch id="api-encryption" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Active API Keys</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm font-mono">prod-key-***7a2b</span>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm font-mono">dev-key-***9c4d</span>
                        <Badge variant="outline">Inactive</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>Configure user roles and permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default User Role</Label>
                    <Select defaultValue="operator">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer</SelectItem>
                        <SelectItem value="operator">Operator</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-approval">Auto-approve new users</Label>
                    <Switch id="auto-approval" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-users">Maximum Active Users</Label>
                    <Input id="max-users" type="number" defaultValue="100" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Users</CardTitle>
                  <CardDescription>Currently active system users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Admin User</p>
                        <p className="text-sm text-muted-foreground">admin@bankos.com</p>
                      </div>
                      <Badge>Administrator</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">John Operator</p>
                        <p className="text-sm text-muted-foreground">john@bankos.com</p>
                      </div>
                      <Badge variant="secondary">Operator</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sarah Analyst</p>
                        <p className="text-sm text-muted-foreground">sarah@bankos.com</p>
                      </div>
                      <Badge variant="outline">Viewer</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure system alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-medium">Fraud Detection Alerts</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="high-risk">High Risk Transactions</Label>
                        <Switch id="high-risk" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="suspicious">Suspicious Activity</Label>
                        <Switch id="suspicious" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ml-alerts">ML Model Alerts</Label>
                        <Switch id="ml-alerts" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">System Notifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="system-errors">System Errors</Label>
                        <Switch id="system-errors" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="maintenance">Maintenance Alerts</Label>
                        <Switch id="maintenance" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="performance">Performance Warnings</Label>
                        <Switch id="performance" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Channels</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="email-notifications">Email</Label>
                      <Input id="email-notifications" placeholder="alerts@bankos.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sms-notifications">SMS</Label>
                      <Input id="sms-notifications" placeholder="+1234567890" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webhook-notifications">Webhook URL</Label>
                      <Input id="webhook-notifications" placeholder="https://..." />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Database Connections
                  </CardTitle>
                  <CardDescription>Manage database and external service connections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Primary Database</p>
                        <p className="text-sm text-muted-foreground">PostgreSQL - Production</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Analytics DB</p>
                        <p className="text-sm text-muted-foreground">ClickHouse - Analytics</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Cache Layer</p>
                        <p className="text-sm text-muted-foreground">Redis - Session Store</p>
                      </div>
                      <Badge variant="destructive">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Disconnected
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    External Services
                  </CardTitle>
                  <CardDescription>Third-party service integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Credit Bureau API</p>
                        <p className="text-sm text-muted-foreground">Experian Integration</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">SMS Gateway</p>
                        <p className="text-sm text-muted-foreground">Twilio Service</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Document Verification</p>
                        <p className="text-sm text-muted-foreground">Jumio KYC</p>
                      </div>
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Compliance</CardTitle>
                  <CardDescription>Configure compliance and audit settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Regulatory Framework</Label>
                    <Select defaultValue="basel-iii">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basel-iii">Basel III</SelectItem>
                        <SelectItem value="pci-dss">PCI DSS</SelectItem>
                        <SelectItem value="gdpr">GDPR</SelectItem>
                        <SelectItem value="sox">SOX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="audit-logging">Audit Logging</Label>
                    <Switch id="audit-logging" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">Data Retention Period (years)</Label>
                    <Input id="retention-period" type="number" defaultValue="7" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-reports">Automated Compliance Reports</Label>
                    <Switch id="auto-reports" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AML Configuration</CardTitle>
                  <CardDescription>Anti-Money Laundering settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="transaction-threshold">Transaction Monitoring Threshold</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="transaction-threshold" placeholder="10000" />
                      <span className="text-sm text-muted-foreground">USD</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="watchlist-screening">Watchlist Screening</Label>
                    <Switch id="watchlist-screening" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Risk Assessment Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5" />
                    System Configuration
                  </CardTitle>
                  <CardDescription>General system settings and maintenance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>System Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="gmt">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Default Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                        <SelectItem value="gbp">GBP</SelectItem>
                        <SelectItem value="ngn">NGN</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <Switch id="maintenance-mode" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Current system status and performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">CPU Usage</span>
                      <Badge variant="secondary">23%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Memory Usage</span>
                      <Badge variant="secondary">67%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Disk Usage</span>
                      <Badge variant="secondary">45%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Connections</span>
                      <Badge variant="secondary">1,247</Badge>
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Status
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
