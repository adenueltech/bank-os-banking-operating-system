"use client"
import React, { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Search, Filter, Download, MoreHorizontal, AlertTriangle, Shield } from "lucide-react"

interface FraudAlert {
  id: string;
  customerName: string;
  type: 'suspicious_transaction' | 'account_takeover' | 'money_laundering' | 'id_theft';
  riskLevel: 'low' | 'medium' | 'high';
  date: string;
  status: 'active' | 'resolved' | 'false_positive';
  amount?: string;
  notes?: string;
}

export default function FraudDetectionPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [riskFilter, setRiskFilter] = React.useState("all")
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedAlert, setSelectedAlert] = React.useState<FraudAlert | null>(null)
  const [selectedAlerts, setSelectedAlerts] = React.useState(new Set<string>())
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage] = React.useState(5)
  const [resolveNotes, setResolveNotes] = React.useState("")

  const allAlerts = React.useMemo(() => {
    return [
      {
        id: "FA-001",
        customerName: "John Doe",
        type: "suspicious_transaction",
        riskLevel: "high",
        date: "2024-09-11",
        status: "active",
        amount: "$10,000"
      },
      {
        id: "FA-002",
        customerName: "Jane Smith",
        type: "account_takeover",
        riskLevel: "medium",
        date: "2024-09-11",
        status: "resolved",
        amount: "$5,500"
      },
      {
        id: "FA-003",
        customerName: "Bob Johnson",
        type: "money_laundering",
        riskLevel: "high",
        date: "2024-09-10",
        status: "active",
        amount: "$25,000"
      },
      {
        id: "FA-004",
        customerName: "Alice Brown",
        type: "id_theft",
        riskLevel: "low",
        date: "2024-09-10",
        status: "false_positive"
      },
      {
        id: "FA-005",
        customerName: "Charlie Wilson",
        type: "suspicious_transaction",
        riskLevel: "medium",
        date: "2024-09-09",
        status: "active",
        amount: "$3,200"
      },
      {
        id: "FA-006",
        customerName: "Diana Davis",
        type: "account_takeover",
        riskLevel: "high",
        date: "2024-09-09",
        status: "resolved",
        amount: "$15,000"
      },
      {
        id: "FA-007",
        customerName: "Eve Evans",
        type: "money_laundering",
        riskLevel: "medium",
        date: "2024-09-08",
        status: "active",
        amount: "$8,000"
      },
      {
        id: "FA-008",
        customerName: "Frank Foster",
        type: "id_theft",
        riskLevel: "low",
        date: "2024-09-08",
        status: "false_positive"
      },
      {
        id: "FA-009",
        customerName: "Grace Green",
        type: "suspicious_transaction",
        riskLevel: "high",
        date: "2024-09-07",
        status: "resolved",
        amount: "$20,000"
      },
      {
        id: "FA-010",
        customerName: "Henry Harris",
        type: "account_takeover",
        riskLevel: "medium",
        date: "2024-09-07",
        status: "active",
        amount: "$4,500"
      },
    ] as const satisfies FraudAlert[]
  }, [])

  const alerts = React.useMemo(() => {
    return allAlerts.filter((alert) => {
      const matchesSearch = alert.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            alert.id.includes(searchTerm) ||
                            alert.type.includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === "all" || typeFilter === "" || alert.type === typeFilter
      const matchesRisk = riskFilter === "all" || riskFilter === "" || alert.riskLevel === riskFilter
      return matchesSearch && matchesType && matchesRisk
    })
  }, [searchTerm, typeFilter, riskFilter, allAlerts])

  const paginatedAlerts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return alerts.slice(startIndex, startIndex + itemsPerPage)
  }, [alerts, currentPage, itemsPerPage])

  const totalPages = Math.ceil(alerts.length / itemsPerPage)

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAlerts(new Set(paginatedAlerts.map(al => al.id)))
    } else {
      setSelectedAlerts(new Set())
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedAlerts)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedAlerts(newSelected)
  }

  const bulkResolve = () => {
    setSelectedAlerts(new Set())
    alert(`Resolved ${selectedAlerts.size} fraud alerts`)
  }

  const exportCSV = () => {
    const csv = alerts.map(al => 
      `${al.id},${al.customerName},${al.type},${al.riskLevel},${al.date},${al.status},${al.amount || ''}`
    ).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fraud-alerts.csv'
    a.click()
  }

  const resolveAlert = () => {
    if (selectedAlert && !resolveNotes) {
      alert('Please add notes for resolution')
      return
    }
    alert(`Alert ${selectedAlert?.id} resolved with notes: ${resolveNotes || 'N/A'}`)
    setOpenModal(false)
    setResolveNotes("")
  }

  const handleEdit = (alert: FraudAlert) => {
    setSelectedAlert(alert)
    setResolveNotes(alert.notes || "")
    setOpenModal(true)
  }

  const getRiskBadge = (risk: FraudAlert['riskLevel']) => {
    switch (risk) {
      case "low":
        return <Badge variant="outline">Low</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "high":
        return <Badge variant="destructive">High</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: FraudAlert['status']) => {
    switch (status) {
      case "active":
        return <Badge variant="outline">Active</Badge>
      case "resolved":
        return <Badge variant="default" className="bg-green-100 text-green-800">Resolved</Badge>
      case "false_positive":
        return <Badge variant="secondary">False Positive</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTypeBadge = (type: FraudAlert['type']) => {
    const typeNames = {
      suspicious_transaction: 'Suspicious Tx',
      account_takeover: 'Account Takeover',
      money_laundering: 'Money Laundering',
      id_theft: 'ID Theft'
    }
    return <Badge variant="secondary">{typeNames[type]}</Badge>
  }

  const activeAlerts = alerts.filter(a => a.status === 'active').length
  const blockedAttempts = alerts.filter(a => a.riskLevel === 'high').length
  const detectionRate = 98.7

  return (
    <AdminLayout activeModule="fraud">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Fraud Detection</h2>
            <p className="text-muted-foreground mt-2">Monitor and manage fraud alerts and investigations</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="suspicious_transaction">Suspicious Transaction</SelectItem>
                <SelectItem value="account_takeover">Account Takeover</SelectItem>
                <SelectItem value="money_laundering">Money Laundering</SelectItem>
                <SelectItem value="id_theft">ID Theft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risks</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportCSV} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {selectedAlerts.size > 0 && (
          <div className="bg-accent p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span>{selectedAlerts.size} alerts selected</span>
              <div className="space-x-2">
                <Button variant="default" size="sm" onClick={bulkResolve}>
                  Resolve Selected
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedAlerts(new Set())}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">{activeAlerts}</p>
              <p className="text-sm text-muted-foreground">High-risk transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Blocked Attempts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{blockedAttempts}</p>
              <p className="text-sm text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Detection Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{detectionRate}%</p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Fraud Alerts List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedAlerts.size === paginatedAlerts.length && paginatedAlerts.length > 0}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedAlerts.has(alert.id)}
                          onCheckedChange={() => toggleSelect(alert.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{alert.id}</TableCell>
                      <TableCell>{alert.customerName}</TableCell>
                      <TableCell>{getTypeBadge(alert.type)}</TableCell>
                      <TableCell>{getRiskBadge(alert.riskLevel)}</TableCell>
                      <TableCell>{alert.date}</TableCell>
                      <TableCell>{getStatusBadge(alert.status)}</TableCell>
                      <TableCell className="text-right">{alert.amount || 'N/A'}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(alert)}>
                              View Case Details
                            </DropdownMenuItem>
                            {alert.status === 'active' && (
                              <>
                                <DropdownMenuItem 
                                  onClick={() => alert(`Resolved ${alert.id} as true positive`)}
                                  className="text-green-600"
                                >
                                  Resolve
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => alert(`Marked ${alert.id} as false positive`)}
                                  className="text-blue-600"
                                >
                                  False Positive
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, alerts.length)} of {alerts.length} results
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>

        <Dialog open={openModal} onOpenChange={(open) => { setOpenModal(open); if (!open) setResolveNotes(""); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Case Details - {selectedAlert?.id}</DialogTitle>
              <DialogDescription>
                Manage fraud case for {selectedAlert?.customerName}
              </DialogDescription>
            </DialogHeader>
            {selectedAlert && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Customer</Label>
                  <p className="font-medium">{selectedAlert.customerName}</p>
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <p>{getTypeBadge(selectedAlert.type)}</p>
                </div>
                <div className="space-y-2">
                  <Label>Risk Level</Label>
                  <p>{getRiskBadge(selectedAlert.riskLevel)}</p>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <p>{selectedAlert.date}</p>
                </div>
                <div className="space-y-2">
                  <Label>Amount Involved</Label>
                  <p>{selectedAlert.amount || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <Label>Current Status</Label>
                  <p>{getStatusBadge(selectedAlert.status)}</p>
                </div>
                {selectedAlert.status === 'active' && (
                  <div className="space-y-2">
                    <Label>Resolution Notes</Label>
                    <Input 
                      value={resolveNotes} 
                      onChange={(e) => setResolveNotes(e.target.value)} 
                      placeholder="Add notes for resolution"
                    />
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              {selectedAlert?.status === 'active' && (
                <>
                  <Button onClick={resolveAlert}>
                    Resolve Case
                  </Button>
                  <Button variant="outline" onClick={() => alert(`Marked as false positive`)}>
                    False Positive
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={() => setOpenModal(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
