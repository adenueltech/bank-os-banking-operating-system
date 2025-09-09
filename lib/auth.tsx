"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  username: string
  role: "admin" | "customer"
  name: string
  accountNumber?: string
  sessionId?: string
  lastActivity?: string
}

interface Session {
  id: string
  userId: string
  createdAt: string
  lastActivity: string
  expiresAt: string
  ipAddress?: string
  userAgent?: string
}

interface AuthContextType {
  user: User | null
  session: Session | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  refreshSession: () => void
  loading: boolean
  sessionTimeRemaining: number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Session configuration
const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes in milliseconds
const SESSION_WARNING_TIME = 5 * 60 * 1000 // 5 minutes warning
const ACTIVITY_CHECK_INTERVAL = 60 * 1000 // Check every minute

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(0)
  const router = useRouter()

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const createSession = (userId: string): Session => {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + SESSION_TIMEOUT)

    return {
      id: generateSessionId(),
      userId,
      createdAt: now.toISOString(),
      lastActivity: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      ipAddress: "127.0.0.1", // In production, get real IP
      userAgent: navigator.userAgent,
    }
  }

  const updateSessionActivity = useCallback(() => {
    if (session && user) {
      const now = new Date()
      const updatedSession = {
        ...session,
        lastActivity: now.toISOString(),
        expiresAt: new Date(now.getTime() + SESSION_TIMEOUT).toISOString(),
      }

      setSession(updatedSession)
      localStorage.setItem("bankos_session", JSON.stringify(updatedSession))

      // Update user with session info
      const updatedUser = {
        ...user,
        lastActivity: now.toISOString(),
      }
      setUser(updatedUser)
      localStorage.setItem("bankos_user", JSON.stringify(updatedUser))
      document.cookie = `bankos_user=${JSON.stringify(updatedUser)}; path=/; max-age=86400`
    }
  }, [session, user])

  const isSessionValid = useCallback((sessionData: Session): boolean => {
    const now = new Date()
    const expiresAt = new Date(sessionData.expiresAt)
    return now < expiresAt
  }, [])

  const refreshSession = useCallback(() => {
    updateSessionActivity()
  }, [updateSessionActivity])

  const handleSessionTimeout = useCallback(() => {
    localStorage.removeItem("bankos_user")
    localStorage.removeItem("bankos_session")
    document.cookie = "bankos_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setUser(null)
    setSession(null)
    router.push("/login")
  }, [router])

  useEffect(() => {
    if (!session || !user) return

    const interval = setInterval(() => {
      if (!isSessionValid(session)) {
        handleSessionTimeout()
        return
      }

      // Calculate time remaining
      const now = new Date()
      const expiresAt = new Date(session.expiresAt)
      const timeRemaining = expiresAt.getTime() - now.getTime()
      setSessionTimeRemaining(timeRemaining)

      // Show warning if session is about to expire
      if (timeRemaining <= SESSION_WARNING_TIME && timeRemaining > 0) {
        // In a real app, you might show a modal here
        console.log(`[BankOS] Session expires in ${Math.ceil(timeRemaining / 60000)} minutes`)
      }
    }, ACTIVITY_CHECK_INTERVAL)

    return () => clearInterval(interval)
  }, [session, user, isSessionValid, handleSessionTimeout])

  useEffect(() => {
    const handleActivity = () => {
      updateSessionActivity()
    }

    // Track user activity
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true)
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true)
      })
    }
  }, [updateSessionActivity])

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem("bankos_user")
    const storedSession = localStorage.getItem("bankos_session")

    if (storedUser && storedSession) {
      try {
        const userData = JSON.parse(storedUser)
        const sessionData = JSON.parse(storedSession)

        if (isSessionValid(sessionData)) {
          setUser(userData)
          setSession(sessionData)
          document.cookie = `bankos_user=${storedUser}; path=/; max-age=86400`

          // Update activity on load
          updateSessionActivity()
        } else {
          // Session expired, clean up
          localStorage.removeItem("bankos_user")
          localStorage.removeItem("bankos_session")
          document.cookie = "bankos_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
      } catch (error) {
        console.error("Error parsing stored session data:", error)
        localStorage.removeItem("bankos_user")
        localStorage.removeItem("bankos_session")
      }
    }
    setLoading(false)
  }, [isSessionValid, updateSessionActivity])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication - replace with real API call
    if (username === "admin" && password === "admin123") {
      const adminUser = {
        id: "1",
        username: "admin",
        role: "admin" as const,
        name: "Bank Administrator",
        sessionId: generateSessionId(),
        lastActivity: new Date().toISOString(),
      }

      const userSession = createSession(adminUser.id)

      const userString = JSON.stringify(adminUser)
      localStorage.setItem("bankos_user", userString)
      localStorage.setItem("bankos_session", JSON.stringify(userSession))
      document.cookie = `bankos_user=${userString}; path=/; max-age=86400`

      setUser(adminUser)
      setSession(userSession)
      return true
    } else if (username === "customer" && password === "customer123") {
      const customerUser = {
        id: "2",
        username: "customer",
        role: "customer" as const,
        name: "John Doe",
        accountNumber: "1234567890",
        sessionId: generateSessionId(),
        lastActivity: new Date().toISOString(),
      }

      const userSession = createSession(customerUser.id)

      const userString = JSON.stringify(customerUser)
      localStorage.setItem("bankos_user", userString)
      localStorage.setItem("bankos_session", JSON.stringify(userSession))
      document.cookie = `bankos_user=${userString}; path=/; max-age=86400`

      setUser(customerUser)
      setSession(userSession)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("bankos_user")
    localStorage.removeItem("bankos_session")
    document.cookie = "bankos_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setUser(null)
    setSession(null)
    setSessionTimeRemaining(0)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        login,
        logout,
        refreshSession,
        loading,
        sessionTimeRemaining,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
