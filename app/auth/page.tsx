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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Shield, Users, Key, CheckCircle, AlertTriangle, UserPlus } from "lucide-react"

// Mock data for users and sessions
const mockUsers = [
  {
    id: "USER-001",
    username: "admin@bankos.com",
    fullName: "Admin User",
    role: "super_admin",
    status: "active",
    lastLogin: "2024-01-15T14:30:00Z",
    mfaEnabled: true,
    permissions: ["all"],
  },
  {
    id: "USER-002",
    username: "manager@bankos.com",
    fullName: "Bank Manager",
    role: "manager",
    status: "active",
    lastLogin: "2024-01-15T13:45:00Z",
    mfaEnabled: true,
    permissions: ["loans", "accounts", "reports"],
  },
  {
    id: "USER-003",
    username: "teller@bankos.com",
    fullName: "Bank Teller",
    role: "teller",
    status: "active",
    lastLogin: "2024-01-15T12:00:00Z",
    mfaEnabled: false,
    permissions: ["accounts", "payments"],
  },
]

const mockSessions = [
  {
    id: "SESS-001",
    userId: "USER-001",
    username: "admin@bankos.com",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome 120.0.0.0",
    loginTime: "2024-01-15T14:30:00Z",
    lastActivity: "2024-01-15T15:45:00Z",
    status: "active",
  },
  {
    id: "SESS-002",
    userId: "USER-002",
    username: "manager@bankos.com",
    ipAddress: "192.168.1.101",
    userAgent: "Firefox 121.0.0.0",
    loginTime: "2024-01-15T13:45:00Z",
    lastActivity: "2024-01-15T15:30:00Z",
    status: "active",
  },
]

const mockApiTokens = [
  {
    id: "TOKEN-001",
    name: "Mobile App API",
    description: "API access for mobile banking app",
    permissions: ["accounts:read", "payments:create"],
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    lastUsed: "2024-01-15T15:00:00Z",
    expiresAt: "2024-12-31T23:59:59Z",
  },
  {
    id: "TOKEN-002",
    name: "Third Party Integration",
    description: "Limited access for partner services",
    permissions: ["accounts:read"],
    status: "active",
    createdAt: "2024-01-10T00:00:00Z",
    lastUsed: "2024-01-14T10:30:00Z",
    expiresAt: "2024-06-30T23:59:59Z",
  },
]

export default function AuthPage() {
  const [newUserRole, setNewUserRole] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserName, setNewUserName] = useState("")

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      suspended: "destructive",
      expired: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      super_admin: "bg-red-100 text-red-800",
      manager: "bg-blue-100 text-blue-800",
      teller: "bg-green-100 text-green-800",
      auditor: "bg-purple-100 text-purple-800",
    } as const

    return (
      <Badge className={colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {role.replace("_", " ").toUpperCase()}
      </Badge>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Authentication & Authorization</h1>
            <p className="text-muted-foreground">User management, role-based access control, and session monitoring</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>Add a new user with role-based permissions</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@bankos.com"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newUserRole} onValueChange={setNewUserRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="teller">Teller</SelectItem>
                      <SelectItem value="auditor">Auditor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Create User</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">+12 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">Currently logged in</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MFA Enabled</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">227 of 247 users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed Logins Today</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">-15% from yesterday</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
            <TabsTrigger value="roles">Role Permissions</TabsTrigger>
            <TabsTrigger value="api">API Authentication</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Users</CardTitle>
                <CardDescription>Manage user accounts and access permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{user.fullName}</p>
                          <p className="text-sm text-muted-foreground">{user.username}</p>
                          <p className="text-xs text-muted-foreground">
                            Last login: {new Date(user.lastLogin).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex items-center space-x-2">
                          {getRoleBadge(user.role)}
                          {getStatusBadge(user.status)}
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-muted-foreground">MFA:</span>
                          {user.mfaEnabled ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active User Sessions</CardTitle>
                <CardDescription>Monitor and manage active user sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Shield className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">{session.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {session.ipAddress} • {session.userAgent}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Login: {new Date(session.loginTime).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        {getStatusBadge(session.status)}
                        <p className="text-xs text-muted-foreground">
                          Last activity: {new Date(session.lastActivity).toLocaleTimeString()}
                        </p>
                        <Button variant="outline" size="sm">
                          Terminate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Role Permissions Matrix</CardTitle>
                  <CardDescription>Configure access permissions by role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2 text-sm font-medium">
                      <div>Permission</div>
                      <div>Admin</div>
                      <div>Manager</div>
                      <div>Teller</div>
                    </div>

                    {[
                      { name: "View Accounts", admin: true, manager: true, teller: true },
                      { name: "Create Accounts", admin: true, manager: true, teller: false },
                      { name: "Process Payments", admin: true, manager: true, teller: true },
                      { name: "Approve Loans", admin: true, manager: true, teller: false },
                      { name: "View Reports", admin: true, manager: true, teller: false },
                      { name: "System Settings", admin: true, manager: false, teller: false },
                    ].map((permission, index) => (
                      <div key={index} className="grid grid-cols-4 gap-2 py-2 border-b">
                        <div className="text-sm">{permission.name}</div>
                        <div className="flex justify-center">
                          <Switch checked={permission.admin} disabled />
                        </div>
                        <div className="flex justify-center">
                          <Switch checked={permission.manager} disabled />
                        </div>
                        <div className="flex justify-center">
                          <Switch checked={permission.teller} disabled />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>System-wide authentication policies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Require MFA</p>
                      <p className="text-sm text-muted-foreground">Force multi-factor authentication</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 min</SelectItem>
                        <SelectItem value="30">30 min</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Password Complexity</p>
                      <p className="text-sm text-muted-foreground">Enforce strong passwords</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Login Attempts</p>
                      <p className="text-sm text-muted-foreground">Max failed attempts before lockout</p>
                    </div>
                    <Select defaultValue="5">
                      <SelectTrigger className="w-16">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Authentication Tokens</CardTitle>
                <CardDescription>Manage API access tokens and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApiTokens.map((token) => (
                    <div key={token.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Key className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">{token.name}</p>
                          <p className="text-sm text-muted-foreground">{token.description}</p>
                          <p className="text-xs text-muted-foreground">Permissions: {token.permissions.join(", ")}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        {getStatusBadge(token.status)}
                        <p className="text-xs text-muted-foreground">
                          Last used: {new Date(token.lastUsed).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expires: {new Date(token.expiresAt).toLocaleDateString()}
                        </p>
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
