"use client"
import React from "react"
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
import { Search, Filter, Download, MoreHorizontal, DollarSign, Calendar } from "lucide-react"

interface Loan {
  id: string;
  customerName: string;
  amount: string;
  interestRate: number;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  dueDate: string;
  reason?: string;
}

export default function LoansPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("")
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedLoan, setSelectedLoan] = React.useState<Loan | null>(null)
  const [selectedLoans, setSelectedLoans] = React.useState(new Set<string>())
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage] = React.useState(5)
  const [isEditing, setIsEditing] = React.useState(false)
  const [rejectReason, setRejectReason] = React.useState("")

  const allLoans = React.useMemo(() => {
    return [
      {
        id: "LN-001",
        customerName: "John Doe",
        amount: "$10,000",
        interestRate: 5.5,
        status: "approved" as const,
        appliedDate: "2024-09-01",
        dueDate: "2025-09-01"
      },
      {
        id: "LN-002",
        customerName: "Jane Smith",
        amount: "$25,000",
        interestRate: 4.2,
        status: "pending" as const,
        appliedDate: "2024-09-05",
        dueDate: "2025-12-05"
      },
      {
        id: "LN-003",
        customerName: "Bob Johnson",
        amount: "$5,000",
        interestRate: 6.0,
        status: "rejected" as const,
        appliedDate: "2024-09-03",
        dueDate: "2025-03-03",
        reason: "Insufficient credit score"
      },
      {
        id: "LN-004",
        customerName: "Alice Brown",
        amount: "$15,000",
        interestRate: 4.8,
        status: "approved" as const,
        appliedDate: "2024-09-07",
        dueDate: "2025-09-07"
      },
      {
        id: "LN-005",
        customerName: "Charlie Wilson",
        amount: "$8,000",
        interestRate: 5.0,
        status: "pending" as const,
        appliedDate: "2024-09-10",
        dueDate: "2025-06-10"
      },
      {
        id: "LN-006",
        customerName: "Diana Davis",
        amount: "$50,000",
        interestRate: 3.9,
        status: "approved" as const,
        appliedDate: "2024-08-15",
        dueDate: "2025-08-15"
      },
      {
        id: "LN-007",
        customerName: "Eve Evans",
        amount: "$12,000",
        interestRate: 5.2,
        status: "pending" as const,
        appliedDate: "2024-09-08",
        dueDate: "2025-09-08"
      },
      {
        id: "LN-008",
        customerName: "Frank Foster",
        amount: "$3,000",
        interestRate: 7.1,
        status: "rejected" as const,
        appliedDate: "2024-09-04",
        dueDate: "2025-03-04",
        reason: "High debt-to-income ratio"
      },
      {
        id: "LN-009",
        customerName: "Grace Green",
        amount: "$30,000",
        interestRate: 4.5,
        status: "approved" as const,
        appliedDate: "2024-09-02",
        dueDate: "2025-12-02"
      },
      {
        id: "LN-010",
        customerName: "Henry Harris",
        amount: "$7,500",
        interestRate: 5.8,
        status: "pending" as const,
        appliedDate: "2024-09-09",
        dueDate: "2025-06-09"
      },
    ] as const satisfies Loan[]
  }, [])

  const loans = React.useMemo(() => {
    return allLoans.filter((loan) => {
      const matchesSearch = loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            loan.id.includes(searchTerm) ||
                            loan.amount.includes(searchTerm)
      const matchesStatus = statusFilter === "" || loan.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter, allLoans])

  const paginatedLoans = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return loans.slice(startIndex, startIndex + itemsPerPage)
  }, [loans, currentPage, itemsPerPage])

  const totalPages = Math.ceil(loans.length / itemsPerPage)

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLoans(new Set(paginatedLoans.map(loan => loan.id)))
    } else {
      setSelectedLoans(new Set())
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedLoans)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedLoans(newSelected)
  }

  const bulkApprove = () => {
    setSelectedLoans(new Set())
    alert(`Approved ${selectedLoans.size} loans`)
  }

  const bulkReject = () => {
    setSelectedLoans(new Set())
    alert(`Rejected ${selectedLoans.size} loans`)
  }

  const exportCSV = () => {
    const csv = loans.map(loan => 
      `${loan.id},${loan.customerName},${loan.amount},${loan.interestRate},${loan.status},${loan.appliedDate},${loan.dueDate}`
    ).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'loans.csv'
    a.click()
  }

  const updateLoanStatus = (status: 'pending' | 'approved' | 'rejected') => {
    if (selectedLoan) {
      if (status === 'rejected' && !rejectReason) {
        alert('Please provide a reason for rejection')
        return
      }
      alert(`Loan ${selectedLoan.id} ${status === 'approved' ? 'approved' : 'rejected'} with reason: ${rejectReason || 'N/A'}`)
      setOpenModal(false)
      setRejectReason("")
    }
  }

  const handleEdit = (loan: Loan) => {
    setSelectedLoan(loan)
    setIsEditing(true)
    setRejectReason(loan.reason || "")
    setOpenModal(true)
  }

  const getStatusBadge = (status: Loan['status']) => {
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

  const pendingLoans = loans.filter(l => l.status === 'pending').length
  const approvedLoans = loans.filter(l => l.status === 'approved').length
  const totalOutstanding = loans.filter(l => l.status === 'approved').reduce((sum, l) => sum + parseFloat(l.amount.replace('$', '').replace(',', '')), 0).toLocaleString()

  return (
    <AdminLayout activeModule="loans">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Loan Processing</h2>
            <p className="text-muted-foreground mt-2">Manage loan applications and approvals</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search loans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
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

        {selectedLoans.size > 0 && (
          <div className="bg-accent p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span>{selectedLoans.size} loans selected</span>
              <div className="space-x-2">
                <Button variant="default" size="sm" onClick={bulkApprove}>
                  Approve Selected
                </Button>
                <Button variant="destructive" size="sm" onClick={bulkReject}>
                  Reject Selected
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedLoans(new Set())}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Pending Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-accent">{pendingLoans}</p>
              <p className="text-sm text-muted-foreground">Under review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Approved Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{approvedLoans}</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Total Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">${totalOutstanding}</p>
              <p className="text-sm text-muted-foreground">Active loans</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Loan Applications List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedLoans.size === paginatedLoans.length && paginatedLoans.length > 0}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Interest Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLoans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedLoans.has(loan.id)}
                          onCheckedChange={() => toggleSelect(loan.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{loan.id}</TableCell>
                      <TableCell>{loan.customerName}</TableCell>
                      <TableCell className="text-right font-medium">{loan.amount}</TableCell>
                      <TableCell>{loan.interestRate}%</TableCell>
                      <TableCell>{getStatusBadge(loan.status)}</TableCell>
                      <TableCell>{loan.appliedDate}</TableCell>
                      <TableCell>{loan.dueDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(loan)}>
                              View / Edit Details
                            </DropdownMenuItem>
                            {loan.status === 'pending' && (
                              <>
                                <DropdownMenuItem 
                                  onClick={() => updateLoanStatus('approved')}
                                  className="text-green-600"
                                >
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => updateLoanStatus('rejected')}
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
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, loans.length)} of {loans.length} results
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

        <Dialog open={openModal} onOpenChange={(open) => { setOpenModal(open); if (!open) { setIsEditing(false); setRejectReason(""); } }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Loan Application' : 'Loan Details'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Update loan information' : `Manage loan ${selectedLoan?.id}`}
              </DialogDescription>
            </DialogHeader>
            {selectedLoan && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Customer Name</Label>
                  <p className="font-medium">{selectedLoan.customerName}</p>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  {isEditing ? (
                    <Input 
                      value={selectedLoan.amount.replace('$', '')} 
                      onChange={(e) => setSelectedLoan({ ...selectedLoan, amount: `$${e.target.value}` })} 
                      type="number"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{selectedLoan.amount}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Interest Rate</Label>
                  {isEditing ? (
                    <Input 
                      value={selectedLoan.interestRate} 
                      onChange={(e) => setSelectedLoan({ ...selectedLoan, interestRate: parseFloat(e.target.value) })} 
                      type="number"
                      step="0.1"
                    />
                  ) : (
                    <p>{selectedLoan.interestRate}%</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  {isEditing ? (
                    <Select value={selectedLoan.status} onValueChange={(value: 'pending' | 'approved' | 'rejected') => setSelectedLoan({ ...selectedLoan, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p>{getStatusBadge(selectedLoan.status)}</p>
                  )}
                </div>
                {selectedLoan.status === 'rejected' && (
                  <div className="space-y-2">
                    <Label>Rejection Reason</Label>
                    <p>{selectedLoan.reason}</p>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Applied Date</Label>
                  <p>{selectedLoan.appliedDate}</p>
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <p>{selectedLoan.dueDate}</p>
                </div>
                {(isEditing && selectedLoan.status === 'rejected') && (
                  <div className="space-y-2">
                    <Label>Rejection Reason</Label>
                    <Input 
                      value={rejectReason} 
                      onChange={(e) => setRejectReason(e.target.value)} 
                      placeholder="Enter reason for rejection"
                    />
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              {isEditing && (
                <>
                  <Button onClick={() => updateLoanStatus('approved')}>
                    Approve
                  </Button>
                  <Button variant="destructive" onClick={() => updateLoanStatus('rejected')}>
                    Reject
                  </Button>
                  <Button variant="outline" onClick={() => { setOpenModal(false); setRejectReason(""); }}>
                    Cancel
                  </Button>
                </>
              )}
              {!isEditing && (
                <Button onClick={() => setOpenModal(false)}>
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}