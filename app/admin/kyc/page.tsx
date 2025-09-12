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
import { Search, Filter, Download, MoreHorizontal, FileText, CheckCircle, XCircle } from "lucide-react"

interface KYCRequest {
  id: string;
  customerName: string;
  documents: 'id' | 'address' | 'selfie' | 'all';
  verificationStatus: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  notes?: string;
}

export default function KYCPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedRequest, setSelectedRequest] = React.useState<KYCRequest | null>(null)
  const [selectedRequests, setSelectedRequests] = React.useState(new Set<string>())
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage] = React.useState(5)
  const [verificationNotes, setVerificationNotes] = React.useState("")

  const allRequests = React.useMemo(() => {
    return [
      {
        id: "KY-001",
        customerName: "John Doe",
        documents: "all",
        verificationStatus: "approved",
        submittedDate: "2024-09-11"
      },
      {
        id: "KY-002",
        customerName: "Jane Smith",
        documents: "id",
        verificationStatus: "pending",
        submittedDate: "2024-09-10"
      },
      {
        id: "KY-003",
        customerName: "Bob Johnson",
        documents: "address",
        verificationStatus: "rejected",
        submittedDate: "2024-09-09",
        notes: "Invalid address proof"
      },
      {
        id: "KY-004",
        customerName: "Alice Brown",
        documents: "all",
        verificationStatus: "approved",
        submittedDate: "2024-09-08"
      },
      {
        id: "KY-005",
        customerName: "Charlie Wilson",
        documents: "selfie",
        verificationStatus: "pending",
        submittedDate: "2024-09-07"
      },
      {
        id: "KY-006",
        customerName: "Diana Davis",
        documents: "id",
        verificationStatus: "rejected",
        submittedDate: "2024-09-06",
        notes: "ID expired"
      },
      {
        id: "KY-007",
        customerName: "Eve Evans",
        documents: "all",
        verificationStatus: "approved",
        submittedDate: "2024-09-05"
      },
      {
        id: "KY-008",
        customerName: "Frank Foster",
        documents: "address",
        verificationStatus: "pending",
        submittedDate: "2024-09-04"
      },
      {
        id: "KY-009",
        customerName: "Grace Green",
        documents: "selfie",
        verificationStatus: "approved",
        submittedDate: "2024-09-03"
      },
      {
        id: "KY-010",
        customerName: "Henry Harris",
        documents: "all",
        verificationStatus: "rejected",
        submittedDate: "2024-09-02",
        notes: "Poor quality selfie"
      },
    ] as const satisfies KYCRequest[]
  }, [])

  const requests = React.useMemo(() => {
    return allRequests.filter((request) => {
      const matchesSearch = request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            request.id.includes(searchTerm)
      const matchesStatus = statusFilter === "all" || statusFilter === "" || request.verificationStatus === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter, allRequests])

  const paginatedRequests = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return requests.slice(startIndex, startIndex + itemsPerPage)
  }, [requests, currentPage, itemsPerPage])

  const totalPages = Math.ceil(requests.length / itemsPerPage)

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRequests(new Set(paginatedRequests.map(req => req.id)))
    } else {
      setSelectedRequests(new Set())
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedRequests)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRequests(newSelected)
  }

  const bulkApprove = () => {
    setSelectedRequests(new Set())
    alert(`Approved ${selectedRequests.size} KYC requests`)
  }

  const bulkReject = () => {
    setSelectedRequests(new Set())
    alert(`Rejected ${selectedRequests.size} KYC requests`)
  }

  const exportCSV = () => {
    const csv = requests.map(req => 
      `${req.id},${req.customerName},${req.documents},${req.verificationStatus},${req.submittedDate},${req.notes || ''}`
    ).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'kyc-requests.csv'
    a.click()
  }

  const updateVerificationStatus = (status: 'pending' | 'approved' | 'rejected') => {
    if (selectedRequest) {
      if (status === 'rejected' && !verificationNotes) {
        alert('Please provide a reason for rejection')
        return
      }
      alert(`KYC ${selectedRequest.id} ${status} with notes: ${verificationNotes || 'N/A'}`)
      setOpenModal(false)
      setVerificationNotes("")
    }
  }

  const handleEdit = (request: KYCRequest) => {
    setSelectedRequest(request)
    setVerificationNotes(request.notes || "")
    setOpenModal(true)
  }

  const getStatusBadge = (status: KYCRequest['verificationStatus']) => {
    switch (status) {
      case "approved":
        return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getDocumentsBadge = (docs: KYCRequest['documents']) => {
    const docNames = {
      id: 'ID',
      address: 'Address',
      selfie: 'Selfie',
      all: 'All'
    }
    return <Badge variant="secondary">{docNames[docs]}</Badge>
  }

  const pendingRequests = requests.filter(r => r.verificationStatus === 'pending').length
  const approvedRequests = requests.filter(r => r.verificationStatus === 'approved').length
  const rejectedRequests = requests.filter(r => r.verificationStatus === 'rejected').length

  return (
    <AdminLayout activeModule="kyc">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">KYC & Compliance</h2>
            <p className="text-muted-foreground mt-2">Manage customer verification and compliance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search KYC requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportCSV} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {selectedRequests.size > 0 && (
          <div className="bg-accent p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span>{selectedRequests.size} requests selected</span>
              <div className="space-x-2">
                <Button variant="default" size="sm" onClick={bulkApprove}>
                  Approve Selected
                </Button>
                <Button variant="destructive" size="sm" onClick={bulkReject}>
                  Reject Selected
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedRequests(new Set())}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Pending Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-accent">{pendingRequests}</p>
              <p className="text-sm text-muted-foreground">New applications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{approvedRequests}</p>
              <p className="text-sm text-muted-foreground">Verified customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">{rejectedRequests}</p>
              <p className="text-sm text-muted-foreground">Compliance issues</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">KYC Requests List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedRequests.size === paginatedRequests.length && paginatedRequests.length > 0}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRequests.has(request.id)}
                          onCheckedChange={() => toggleSelect(request.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.customerName}</TableCell>
                      <TableCell>{getDocumentsBadge(request.documents)}</TableCell>
                      <TableCell>{getStatusBadge(request.verificationStatus)}</TableCell>
                      <TableCell>{request.submittedDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(request)}>
                              Review Documents
                            </DropdownMenuItem>
                            {request.verificationStatus === 'pending' && (
                              <>
                                <DropdownMenuItem 
                                  onClick={() => updateVerificationStatus('approved')}
                                  className="text-green-600"
                                >
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => updateVerificationStatus('rejected')}
                                  className="text-destructive"
                                >
                                  Reject
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
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, requests.length)} of {requests.length} results
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

        <Dialog open={openModal} onOpenChange={(open) => { setOpenModal(open); if (!open) setVerificationNotes(""); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>KYC Verification - {selectedRequest?.id}</DialogTitle>
              <DialogDescription>
                Review and verify customer {selectedRequest?.customerName} documents
              </DialogDescription>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Customer Name</Label>
                  <p className="font-medium">{selectedRequest.customerName}</p>
                </div>
                <div className="space-y-2">
                  <Label>Documents Submitted</Label>
                  <p>{getDocumentsBadge(selectedRequest.documents)}</p>
                </div>
                <div className="space-y-2">
                  <Label>Current Status</Label>
                  <p>{getStatusBadge(selectedRequest.verificationStatus)}</p>
                </div>
                <div className="space-y-2">
                  <Label>Submitted Date</Label>
                  <p>{selectedRequest.submittedDate}</p>
                </div>
                {selectedRequest.verificationStatus === 'rejected' && selectedRequest.notes && (
                  <div className="space-y-2">
                    <Label>Rejection Notes</Label>
                    <p>{selectedRequest.notes}</p>
                  </div>
                )}
                {selectedRequest.verificationStatus === 'pending' && (
                  <div className="space-y-2">
                    <Label>Verification Notes</Label>
                    <Input 
                      value={verificationNotes} 
                      onChange={(e) => setVerificationNotes(e.target.value)} 
                      placeholder="Add notes for approval/rejection"
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Mock ID Document</Label>
                    <p className="text-sm text-muted-foreground mt-1">ID verified</p>
                  </div>
                  <div>
                    <Label>Mock Address Proof</Label>
                    <p className="text-sm text-muted-foreground mt-1">Address confirmed</p>
                  </div>
                  <div>
                    <Label>Mock Selfie</Label>
                    <p className="text-sm text-muted-foreground mt-1">Face match successful</p>
                  </div>
                  <div>
                    <Label>Overall Compliance</Label>
                    <p className="text-sm text-muted-foreground mt-1">All documents received</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              {selectedRequest?.verificationStatus === 'pending' && (
                <>
                  <Button onClick={() => updateVerificationStatus('approved')}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="destructive" onClick={() => updateVerificationStatus('rejected')}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
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