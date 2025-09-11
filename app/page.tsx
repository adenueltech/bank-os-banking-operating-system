"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Shield, CreditCard, BarChart3, Users, Settings, Zap, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-slate-900">BankOS</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="cursor-pointer">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Welcome to <span className="text-primary">BankOS</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            The unified banking operating system designed for African financial institutions. 
            Streamline your operations with advanced fraud detection, seamless KYC compliance, 
            efficient loan processing, and powerful analytics—all in one secure platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <Button size="lg" className="px-8 cursor-pointer">Get Started</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="px-8 cursor-pointer">Learn More</Button>
            </Link>
          </div>
          <div className="mt-12 flex justify-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Providing Comprehensive API Endpoints for Seamless Integration
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Powerful Features for Modern Banking</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              BankOS combines cutting-edge technology with practical solutions tailored for the African market.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Fraud Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Real-time monitoring with AI-powered alerts to protect your customers and minimize losses.</p>
                <Badge variant="outline">98.7% Accuracy</Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Core Banking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Manage accounts, transactions, and payments with our robust core banking engine.</p>
                <Badge variant="outline">24/7 Availability</Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Analytics Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Gain insights with comprehensive dashboards and reporting tools for data-driven decisions.</p>
                <Badge variant="outline">Real-time Data</Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>KYC & Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Streamlined verification processes ensuring regulatory compliance across all operations.</p>
                <Badge variant="outline">Automated Verification</Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>API Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Comprehensive RESTful API endpoints for all system modules, enabling seamless integration with third-party applications, mobile apps, and custom solutions. Connect your ecosystem effortlessly.</p>
                <Badge variant="outline">RESTful APIs</Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Flexible configuration options to customize your banking experience and adapt to business needs.</p>
                <Badge variant="outline">Customizable</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">API-First Architecture</h2>
          <p className="text-xl text-slate-600 mb-8">
            BankOS is built with developers in mind. Our comprehensive API endpoints provide full access to all system functionalities, 
            from transaction processing and customer management to fraud detection and reporting. Integrate BankOS into your existing 
            infrastructure or build innovative solutions on top of our secure, scalable platform. RESTful APIs with comprehensive 
            documentation ensure smooth integration and rapid development.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-left">
              <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold mb-1">Secure & Scalable</h3>
              <p className="text-sm text-slate-600">OAuth 2.0 authentication and rate limiting for enterprise-grade security.</p>
            </div>
            <div className="text-left">
              <Zap className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Real-time Processing</h3>
              <p className="text-sm text-slate-600">WebSocket support for live updates and instant notifications.</p>
            </div>
            <div className="text-left">
              <FileText className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold mb-1">Comprehensive Docs</h3>
              <p className="text-sm text-slate-600">Interactive API documentation with code samples in multiple languages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">Everything you need to know about BankOS</p>
          </div>
          <div className="space-y-6">
            <Card className="border-0">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">What is BankOS?</h3>
                    <p className="text-slate-600">BankOS is a comprehensive banking operating system that provides end-to-end solutions for financial institutions, including core banking, fraud detection, KYC compliance, loan management, and analytics—all accessible via powerful API endpoints.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">How do the API endpoints work?</h3>
                    <p className="text-slate-600">Our RESTful APIs cover all modules, allowing you to create, read, update, and delete resources programmatically. From transaction processing to customer onboarding, integrate BankOS seamlessly into your applications with full documentation and SDK support.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">What support is available?</h3>
                    <p className="text-slate-600">We offer 24/7 technical support, comprehensive documentation, and dedicated account managers. Our team is committed to ensuring your success with BankOS.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Shield className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Is BankOS secure?</h3>
                    <p className="text-slate-600">Security is our top priority. BankOS features enterprise-grade encryption, multi-factor authentication, real-time fraud monitoring, and compliance with international standards like GDPR and PCI-DSS.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">BankOS</span>
          </div>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Revolutionizing banking operations across Africa with secure, scalable, and API-driven solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
          <p className="text-xs text-slate-500 mt-8">&copy; 2025 BankOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
