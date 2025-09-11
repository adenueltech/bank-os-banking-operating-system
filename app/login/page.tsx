"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Building2, Shield, Users } from "lucide-react"
import { useAuth } from "@/lib/auth"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login, user } = useAuth()


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const success = await login(username, password)
      if (success) {
        // Wait a bit for state to update, then redirect manually
        setTimeout(() => {
          if (username === "admin") {
            console.log("[LoginPage] Redirecting admin to /admin")
            window.location.href = "/admin"
          } else if (username === "customer") {
            console.log("[LoginPage] Redirecting customer to /portal")
            window.location.href = "/portal"
          }
        }, 200)
      } else {
        setError("Invalid username or password")
      }
    } catch (error) {
      setError("An error occurred during login")
      console.error("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-primary rounded-full p-3">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">BankOS</h1>
          <p className="text-slate-600">Banking Operating System</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-0">
            <div className="flex justify-between items-center mb-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Home
              </Link>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <div className="w-0" /> {/* Spacer for alignment */}
            </div>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Demo Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-slate-600" />
                <span className="font-medium text-slate-900">Admin Access</span>
              </div>
              <p className="text-sm text-slate-600">
                Username: <code className="bg-slate-200 px-1 rounded">admin</code>
              </p>
              <p className="text-sm text-slate-600">
                Password: <code className="bg-slate-200 px-1 rounded">admin123</code>
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-slate-600" />
                <span className="font-medium text-slate-900">Customer Access</span>
              </div>
              <p className="text-sm text-slate-600">
                Username: <code className="bg-slate-200 px-1 rounded">customer</code>
              </p>
              <p className="text-sm text-slate-600">
                Password: <code className="bg-slate-200 px-1 rounded">customer123</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
