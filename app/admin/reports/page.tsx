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
import { Search, Filter, Download, MoreHorizontal, FileText, Calendar } from "lucide-react"
import jsPDF from 'jspdf'

interface Report {
  id: string;
  type: 'daily' | 'monthly' | 'annual' | 'custom';
  generatedDate: string;
  status: 'generated' | 'generating' | 'failed';
  fileSize: string;
  pages: number;
}

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [openGenerateModal, setOpenGenerateModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [selectedReports, setSelectedReports] = useState(new Set<string>())
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [generateType, setGenerateType] = useState<'daily' | 'monthly' | 'annual' | 'custom'>('daily')
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const allReports = React.useMemo(() => {
    return [
      {
        id: "REP-001",
        type: "daily",
        generatedDate: "2024-09-11",
        status: "generated",
        fileSize: "1.2 MB",
        pages: 5
      },
      {
        id: "REP-002",
        type: "monthly",
        generatedDate: "2024-09-01",
        status: "generated",
        fileSize: "5.8 MB",
        pages: 25
      },
      {
        id: "REP-003",
        type: "annual",
        generatedDate: "2024-01-01",
        status: "generated",
        fileSize: "12.3 MB",
        pages: 120
      },
      {
        id: "REP-004",
        type: "custom",
        generatedDate: "2024-09-10",
        status: "generating",
        fileSize: "N/A",
        pages: 0
      },
      {
        id: "REP-005",
        type: "daily",
        generatedDate: "2024-09-10",
        status: "failed",
        fileSize: "N/A",
        pages: 0
      },
      {
        id: "REP-006",
        type: "monthly",
        generatedDate: "2024-08-01",
        status: "generated",
        fileSize: "4.5 MB",
        pages: 20
      },
      {
        id: "REP-007",
        type: "annual",
        generatedDate: "2023-01-01",
        status: "generated",
        fileSize: "11.7 MB",
        pages: 110
      },
      {
        id: "REP-008",
        type: "custom",
        generatedDate: "2024-09-09",
        status: "generated",
        fileSize: "2.1 MB",
        pages: 10
      },
      {
        id: "REP-009",
        type: "daily",
        generatedDate: "2024-09-09",
        status: "generated",
        fileSize: "1.0 MB",
        pages: 4
      },
      {
        id: "REP-010",
        type: "monthly",
        generatedDate: "2024-07-01",
        status: "failed",
        fileSize: "N/A",
        pages: 0
      },
    ] as const satisfies Report[]
  }, [])

  const reports = React.useMemo(() => {
    return allReports.filter((report) => {
      const matchesSearch = report.id.includes(searchTerm) ||
                            report.type.includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === "all" || typeFilter === "" || report.type === typeFilter
      const matchesStatus = statusFilter === "all" || statusFilter === "" || report.status === statusFilter
      return matchesSearch && matchesType && matchesStatus
    })
  }, [searchTerm, typeFilter, statusFilter, allReports])

  const paginatedReports = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return reports.slice(startIndex, startIndex + itemsPerPage)
  }, [reports, currentPage, itemsPerPage])

  const totalPages = Math.ceil(reports.length / itemsPerPage)

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReports(new Set(paginatedReports.map(rep => rep.id)))
    } else {
      setSelectedReports(new Set())
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedReports)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedReports(newSelected)
  }

  const generateReport = () => {
    if (generateType === 'custom' && (!startDate || !endDate)) {
      alert('Please select date range for custom report')
      return
    }
    // Simulate generation
    setTimeout(() => {
      alert(`Generated ${generateType} report`)
      setOpenGenerateModal(false)
      setStartDate("")
      setEndDate("")
    }, 1000)
  }

  const exportCSV = () => {
    const exportReports = selectedReports.size > 0 ? reports.filter(r => selectedReports.has(r.id)) : reports
    const csv = exportReports.map(rep => 
      `${rep.id},${rep.type},${rep.generatedDate},${rep.status},${rep.fileSize},${rep.pages}`
    ).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'reports.csv'
    a.click()
  }

  const exportPDF = () => {
    const exportReports = selectedReports.size > 0 ? reports.filter(r => selectedReports.has(r.id)) : reports
    const doc = new jsPDF()
    doc.text('Banking Reports', 20, 20)
    let y = 30
    exportReports.forEach((rep, index) => {
      doc.text(`${rep.id} - ${rep.type} - ${rep.status} - ${rep.generatedDate}`, 20, y)
      y += 10
      if (y > 280) {
        doc.addPage()
        y = 20
      }
    })
    doc.save('reports.pdf')
  }

  const viewReport = (report: Report) => {
    alert(`Viewing report ${report.id} - Download or view details`)
  }

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case "generated":
        return <Badge variant="default" className="bg-green-100 text-green-800">Generated</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "generating":
        return <Badge variant="outline">Generating</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTypeBadge = (type: Report['type']) => {
    const typeNames = {
      daily: 'Daily',
      monthly: 'Monthly',
      annual: 'Annual',
      custom: 'Custom'
    }
    return <Badge variant="secondary">{typeNames[type]}</Badge>
  }

  const totalReports = reports.length
  const generatedReports = reports.filter(r => r.status === 'generated').length
  const failedReports = reports.filter(r => r.status === 'failed').length

  return (
    <AdminLayout activeModule="reports">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Reports Management</h2>
            <p className="text-muted-foreground mt-2">Generate and manage financial reports</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="generated">Generated</SelectItem>
                <SelectItem value="generating">Generating</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setOpenGenerateModal(true)}>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            {selectedReports.size > 0 && (
              <div className="space-x-2">
                <Button onClick={exportCSV} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  CSV
                </Button>
                <Button onClick={exportPDF} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  PDF
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{totalReports}</p>
              <p className="text-sm text-muted-foreground">Generated reports</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Successful</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{generatedReports}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">{failedReports}</p>
              <p className="text-sm text-muted-foreground">Errors occurred</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Reports List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedReports.size === paginatedReports.length && paginatedReports.length > 0}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Generated Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>File Size</TableHead>
                    <TableHead>Pages</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedReports.has(report.id)}
                          onCheckedChange={() => toggleSelect(report.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{getTypeBadge(report.type)}</TableCell>
                      <TableCell>{report.generatedDate}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>{report.fileSize}</TableCell>
                      <TableCell>{report.pages}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => viewReport(report)}>
                              View Report
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              // Simulate download
                              alert(`Downloading ${report.id}`)
                            }}>
                              Download
                            </DropdownMenuItem>
                            {report.status === 'failed' && (
                              <DropdownMenuItem 
                                onClick={() => alert(`Regenerating ${report.id}`)}
                                className="text-destructive"
                              >
                                Regenerate
                              </DropdownMenuItem>
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
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, reports.length)} of {reports.length} results
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

        <Dialog open={openGenerateModal} onOpenChange={setOpenGenerateModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
              <DialogDescription>
                Select report type and parameters
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={generateType} onValueChange={(value) => setGenerateType(value as 'daily' | 'monthly' | 'annual' | 'custom')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Report</SelectItem>
                    <SelectItem value="monthly">Monthly Report</SelectItem>
                    <SelectItem value="annual">Annual Report</SelectItem>
                    <SelectItem value="custom">Custom Date Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {generateType === 'custom' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={generateReport}>
                Generate
              </Button>
              <Button variant="outline" onClick={() => setOpenGenerateModal(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
