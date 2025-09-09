"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Shield, AlertTriangle } from "lucide-react"

export function SessionMonitor() {
  const { user, session, sessionTimeRemaining, refreshSession, logout } = useAuth()
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Show warning when session has less than 5 minutes remaining
    const fiveMinutes = 5 * 60 * 1000
    if (sessionTimeRemaining > 0 && sessionTimeRemaining <= fiveMinutes) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }
  }, [sessionTimeRemaining])

  if (!user || !session) return null

  const formatTimeRemaining = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getSessionStatus = () => {
    if (sessionTimeRemaining <= 0) return "expired"
    if (sessionTimeRemaining <= 5 * 60 * 1000) return "warning"
    if (sessionTimeRemaining <= 10 * 60 * 1000) return "caution"
    return "active"
  }

  const sessionStatus = getSessionStatus()

  return (
    <>
      {/* Session Status Badge */}
      <div className="fixed top-4 right-4 z-50">
        <Badge
          variant={
            sessionStatus === "expired"
              ? "destructive"
              : sessionStatus === "warning"
                ? "destructive"
                : sessionStatus === "caution"
                  ? "secondary"
                  : "outline"
          }
          className="flex items-center space-x-1"
        >
          <Clock className="w-3 h-3" />
          <span>{formatTimeRemaining(sessionTimeRemaining)}</span>
        </Badge>
      </div>

      {/* Session Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <CardTitle>Session Expiring Soon</CardTitle>
              </div>
              <CardDescription>
                Your session will expire in {formatTimeRemaining(sessionTimeRemaining)}. Would you like to extend your
                session?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span>Session ID:</span>
                  <span className="font-mono">{session.id.slice(-8)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Last Activity:</span>
                  <span>{new Date(session.lastActivity).toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    refreshSession()
                    setShowWarning(false)
                  }}
                  className="flex-1"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Extend Session
                </Button>
                <Button variant="outline" onClick={logout} className="flex-1 bg-transparent">
                  Logout Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
