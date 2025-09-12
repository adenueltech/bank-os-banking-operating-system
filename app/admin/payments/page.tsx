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

interface Transaction {
  id: string;
  customerName: string;
  amount: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  reference: string;
  notes?: string;
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null)
  const [selectedTransactions, setSelectedTransactions] = React.useState(new Set<string>())
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage] = React.useState(5)
  const [processNotes, setProcessNotes] = React.useState("")

  const allTransactions = React.useMemo(() => {
    return [
      {
        id: "TXN-001",
        customerName: "John Doe",
        amount: "$1,000.00",
        type: "deposit" as const,
        status: "completed",
        date: "2024-09-11",
        reference: "REF-001"
      },
      {
        id: "TXN-002",
        customerName: "Jane Smith",
        amount: "$500.00",
        type: "withdrawal" as const,
        status: "pending",
        date: "2024-09-11",
        reference: "REF-002"
      },
      {
        id: "TXN-003",
        customerName: "Bob Johnson",
        amount: "$2,500.00",
        type: "transfer" as const,
        status: "failed",
        date: "2024-09-10",
        reference: "REF-003",
        notes: "Insufficient funds"
      },
      {
        id: "TXN-004",
        customerName: "Alice Brown",
        amount: "$750.00",
        type: "deposit" as const,
        status: "completed",
        date: "2024-09-11",
        reference: "REF-004"
      },
      {
        id: "TXN-005",
        customerName: "Charlie Wilson",
        amount: "$1,200.00",
        type: "transfer" as const,
        status: "pending",
        date: "2024-09-10",
        reference: "REF-005"
      },
      {
        id: "TXN-006",
        customerName: "Diana Davis",
        amount: "$3,000.00",
        type: "withdrawal" as const,
        status: "completed",
        date: "2024-09-09",
        reference: "REF-006"
      },
      {
        id: "TXN-007",
        customerName: "Eve Evans",
        amount: "$800.00",
        type: "deposit" as const,
        status: "completed",
        date: "2024-09-11",
        reference: "REF-007"
      },
      {
        id: "TXN-008",
        customerName: "Frank Foster",
        amount: "$400.00",
        type: "transfer" as const,
        status: "failed",
        date: "2024-09-10",
        reference: "REF-008",
        notes: "Network error"
      },
      {
        id: "TXN-009",
        customerName: "Grace Green",
        amount: "$1,500.00",
        type: "withdrawal" as const,
        status: "pending",
        date: "2024-09-11",
        reference: "REF-009"
      },
      {
        id: "TXN-010",
        customerName: "Henry Harris",
        amount: "$600.00",
        type: "deposit" as const,
        status: "completed",
        date: "2024-09-09",
        reference: "REF-010"
      },
    ] as const satisfies Transaction[]
  }, [])

  const transactions = React.useMemo(() => {
    return allTransactions.filter((txn) => {
      const matchesSearch = txn.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            txn.id.includes(searchTerm) ||
                            txn.reference.includes(searchTerm)
      const matchesType = typeFilter === "all" || typeFilter === "" || txn.type === typeFilter
      const matchesStatus = statusFilter === "all" || statusFilter === "" || txn.status === statusFilter
      return matchesSearch && matchesType && matchesStatus
    })
  }, [searchTerm, typeFilter, statusFilter, allTransactions])

  const paginatedTransactions = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return transactions.slice(startIndex, startIndex + itemsPerPage)
  }, [transactions, currentPage, itemsPerPage])

  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(new Set(paginatedTransactions.map(txn => txn.id)))
    } else {
      setSelectedTransactions(new Set())
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedTransactions)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedTransactions(newSelected)
  }

  const bulkProcess = () => {
    setSelectedTransactions(new Set())
    alert(`Processed ${selectedTransactions.size} transactions`)
  }

  const exportCSV = () => {
    const csv = transactions.map(txn => 
      `${txn.id},${txn.customerName},${txn.amount},${txn.type},${txn.status},${txn.date},${txn.reference}`
    ).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'payments.csv'
    a.click()
  }

  const processTransaction = () => {
    if (selectedTransaction && !processNotes) {
      alert('Please add notes for processing')
      return
    }
    alert(`Transaction ${selectedTransaction?.id} processed with notes: ${processNotes || 'N/A'}`)
    setOpenModal(false)
    setProcessNotes("")
  }

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setProcessNotes(transaction.notes || "")
    setOpenModal(true)
  }

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTypeBadge = (type: Transaction['type']) => {
    switch (type) {
      case "deposit":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Deposit</Badge>
      case "withdrawal":
        return <Badge variant="destructive">Withdrawal</Badge>
      case "transfer":
        return <Badge variant="secondary">Transfer</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const pendingTransactions = transactions.filter(t => t.status === 'pending').length
  const successfulTransactions = transactions.filter(t => t.status === 'completed').length
  const failedTransactions = transactions.filter(t => t.status === 'failed').length

  return (
    <AdminLayout activeModule="payments">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Payment Processing</h2>
            <p className="text-muted-foreground mt-2">Manage payment gateways and transaction processing</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search transactions..."
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
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportCSV} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {selectedTransactions.size > 0 && (
          <div className="bg-accent p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span>{selectedTransactions.size} transactions selected</span>
              <div className="space-x-2">
                <Button variant="default" size="sm" onClick={bulkProcess}>
                  Process Selected
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedTransactions(new Set())}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-accent">{pendingTransactions}</p>
              <p className="text-sm text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Successful</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{successfulTransactions}</p>
              <p className="text-sm text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">{failedTransactions}</p>
              <p className="text-sm text-muted-foreground">Error rate: {(failedTransactions / (successfulTransactions + failedTransactions + pendingTransactions) * 100).toFixed(1)}%</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedTransactions.size === paginatedTransactions.length && paginatedTransactions.length > 0}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedTransactions.has(transaction.id)}
                          onCheckedChange={() => toggleSelect(transaction.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.customerName}</TableCell>
                      <TableCell className={`text-right font-medium ${transaction.type === 'withdrawal' ? 'text-destructive' : 'text-primary'}`}>{transaction.amount}</TableCell>
                      <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.reference}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(transaction)}>
                              View / Process
                            </DropdownMenuItem>
                            {transaction.status === 'failed' && (
                              <DropdownMenuItem 
                                onClick={() => alert(`Refund initiated for ${transaction.id}`)}
                                className="text-blue-600"
                              >
                                Refund
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
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, transactions.length)} of {transactions.length} results
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

        <Dialog open={openModal} onOpenChange={(open) => { setOpenModal(open); if (!open) setProcessNotes(""); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Process Transaction</DialogTitle>
              <DialogDescription>
                Manage transaction {selectedTransaction?.id}
              </DialogDescription>
            </DialogHeader>
            {selectedTransaction && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Customer Name</Label>
                  <p className="font-medium">{selectedTransaction.customerName}</p>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <p className="text-lg font-semibold">{selectedTransaction.amount}</p>
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <p>{getTypeBadge(selectedTransaction.type)}</p>
                </div>
                <div className="space-y-2">
                  <Label>Current Status</Label>
                  <p>{getStatusBadge(selectedTransaction.status)}</p>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <p>{selectedTransaction.date}</p>
                </div>
                <div className="space-y-2">
                  <Label>Reference</Label>
                  <p>{selectedTransaction.reference}</p>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Input 
                    value={processNotes} 
                    onChange={(e) => setProcessNotes(e.target.value)} 
                    placeholder="Add notes for processing"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={processTransaction}>
                Process Payment
              </Button>
              <Button variant="outline" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
