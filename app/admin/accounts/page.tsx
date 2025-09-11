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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Download, MoreHorizontal } from "lucide-react"

interface Account {
  id: string;
  customerName: string;
  accountNumber: string;
  balance: string;
  status: 'active' | 'suspended' | 'pending';
  lastActivity: string;
  type: string;
  branch: string;
  openedDate: string;
}

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedAccount, setSelectedAccount] = React.useState<Account | null>(null)
  const [selectedAccounts, setSelectedAccounts] = React.useState(new Set<string>())
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage] = React.useState(5)
  const [isEditing, setIsEditing] = React.useState(false)
  const [currentAction, setCurrentAction] = React.useState<'view' | 'edit' | null>(null)

  const allAccounts = React.useMemo(() => {
    return [
      {
        id: "ACC-001",
        customerName: "John Doe",
        accountNumber: "1234567890",
        balance: "$5,234.56",
        status: "active",
        lastActivity: "2024-09-11 10:30",
        type: "Savings",
        branch: "Main Branch",
        openedDate: "2023-01-15"
      },
      {
        id: "ACC-002",
        customerName: "Jane Smith",
        accountNumber: "0987654321",
        balance: "$12,890.00",
        status: "active",
        lastActivity: "2024-09-11 09:45",
        type: "Checking",
        branch: "Downtown",
        openedDate: "2022-05-20"
      },
      {
        id: "ACC-003",
        customerName: "Bob Johnson",
        accountNumber: "1122334455",
        balance: "$1,234.78",
        status: "suspended",
        lastActivity: "2024-09-10 15:20",
        type: "Savings",
        branch: "Main Branch",
        openedDate: "2023-03-10"
      },
      {
        id: "ACC-004",
        customerName: "Alice Brown",
        accountNumber: "5566778899",
        balance: "$8,765.43",
        status: "active",
        lastActivity: "2024-09-11 11:15",
        type: "Checking",
        branch: "Suburban",
        openedDate: "2021-11-05"
      },
      {
        id: "ACC-005",
        customerName: "Charlie Wilson",
        accountNumber: "9988776655",
        balance: "$3,210.99",
        status: "pending",
        lastActivity: "2024-09-11 08:00",
        type: "Savings",
        branch: "Main Branch",
        openedDate: "2024-09-01"
      },
      {
        id: "ACC-006",
        customerName: "Diana Davis",
        accountNumber: "4433221100",
        balance: "$21,543.21",
        status: "active",
        lastActivity: "2024-09-11 10:00",
        type: "Business",
        branch: "Corporate",
        openedDate: "2020-07-12"
      },
      {
        id: "ACC-007",
        customerName: "Eve Evans",
        accountNumber: "6677889900",
        balance: "$6,789.00",
        status: "active",
        lastActivity: "2024-09-11 09:00",
        type: "Savings",
        branch: "Downtown",
        openedDate: "2023-06-18"
      },
      {
        id: "ACC-008",
        customerName: "Frank Foster",
        accountNumber: "4455667788",
        balance: "$0.00",
        status: "suspended",
        lastActivity: "2024-09-10 16:30",
        type: "Checking",
        branch: "Suburban",
        openedDate: "2022-09-25"
      },
      {
        id: "ACC-009",
        customerName: "Grace Green",
        accountNumber: "1122334456",
        balance: "$15,678.90",
        status: "active",
        lastActivity: "2024-09-11 12:00",
        type: "Business",
        branch: "Corporate",
        openedDate: "2019-02-14"
      },
      {
        id: "ACC-010",
        customerName: "Henry Harris",
        accountNumber: "7788990011",
        balance: "$2,345.67",
        status: "pending",
        lastActivity: "2024-09-10 14:45",
        type: "Savings",
        branch: "Main Branch",
        openedDate: "2024-09-09"
      },
    ] as const satisfies Account[]
  }, [])

  const accounts = React.useMemo(() => {
    return allAccounts.filter((account) => {
      const matchesSearch = account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            account.id.includes(searchTerm) ||
                            account.accountNumber.includes(searchTerm)
      const matchesStatus = statusFilter === "all" || account.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter, allAccounts])

  const paginatedAccounts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return accounts.slice(startIndex, startIndex + itemsPerPage)
  }, [accounts, currentPage, itemsPerPage])

  const totalPages = Math.ceil(accounts.length / itemsPerPage)

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAccounts(new Set(paginatedAccounts.map(acc => acc.id)))
    } else {
      setSelectedAccounts(new Set())
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedAccounts)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedAccounts(newSelected)
  }

  const bulkSuspend = () => {
    setSelectedAccounts(new Set())
    // In real app, send API request
    alert(`Suspended ${selectedAccounts.size} accounts`)
  }

  const exportCSV = () => {
    const csv = accounts.map(acc =>
      `${acc.id},${acc.customerName},${acc.accountNumber},${acc.balance},${acc.status}`
    ).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'accounts.csv'
    a.click()
  }

  const updateAccountStatus = (status: 'active' | 'suspended' | 'pending') => {
    if (selectedAccount) {
      const updatedAccounts = allAccounts.map(acc =>
        acc.id === selectedAccount.id ? { ...acc, status } : acc
      )
      // Update the memoized allAccounts by re-creating it
      // For demo, we'll just update local state; in real, API call
      alert(`Account ${selectedAccount.id} status updated to ${status}`)
      setOpenModal(false)
    }
  }

  const handleEdit = (account: Account) => {
    setSelectedAccount(account)
    setIsEditing(true)
    setOpenModal(true)
  }

  const getStatusBadge = (status: Account['status']) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleAction = (action: 'view' | 'edit', account: Account) => {
    setCurrentAction(action)
    setSelectedAccount(account)
    setIsEditing(action === 'edit')
    setOpenModal(true)
  }

  return (
    <AdminLayout activeModule="accounts">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Account Management</h2>
            <p className="text-muted-foreground mt-2">Manage customer accounts and profiles</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search accounts..."
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportCSV} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {selectedAccounts.size > 0 && (
          <div className="bg-accent p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span>{selectedAccounts.size} accounts selected</span>
              <div className="space-x-2">
                <Button variant="destructive" size="sm" onClick={bulkSuspend}>
                  Suspend Selected
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedAccounts(new Set())}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Total Accounts</h3>
            <p className="text-2xl font-bold text-primary">{accounts.length}</p>
            <p className="text-sm text-muted-foreground">Filtered results</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">New Accounts</h3>
            <p className="text-2xl font-bold text-primary">1,234</p>
            <p className="text-sm text-muted-foreground">This month</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Suspended</h3>
            <p className="text-2xl font-bold text-destructive">56</p>
            <p className="text-sm text-muted-foreground">Under review</p>
          </div>
        </div>
        
        <Card className="bg-card border rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Accounts List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedAccounts.size === paginatedAccounts.length && paginatedAccounts.length > 0}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Account #</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Opened</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedAccounts.has(account.id)}
                          onCheckedChange={() => toggleSelect(account.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{account.id}</TableCell>
                      <TableCell>{account.customerName}</TableCell>
                      <TableCell>{account.accountNumber}</TableCell>
                      <TableCell className="text-right font-medium">{account.balance}</TableCell>
                      <TableCell>{getStatusBadge(account.status)}</TableCell>
                      <TableCell>{account.lastActivity}</TableCell>
                      <TableCell>{account.type}</TableCell>
                      <TableCell>{account.branch}</TableCell>
                      <TableCell>{account.openedDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAction('view', account)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction('edit', account)}>
                              Edit Account
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                const newStatus = account.status === 'suspended' ? 'active' : 'suspended'
                                setSelectedAccount(account)
                                updateAccountStatus(newStatus)
                              }}
                              className="text-destructive"
                            >
                              {account.status === 'suspended' ? 'Activate' : 'Suspend'}
                            </DropdownMenuItem>
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
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, accounts.length)} of {accounts.length} results
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

        <Dialog open={openModal} onOpenChange={(open) => { setOpenModal(open); if (!open) setIsEditing(false); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Account' : 'Account Details'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Update account information' : `Manage account ${selectedAccount?.id}`}
              </DialogDescription>
            </DialogHeader>
            {selectedAccount && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Customer Name</Label>
                  {isEditing ? (
                    <Input
                      value={selectedAccount.customerName}
                      onChange={(e) => setSelectedAccount(prev => prev ? { ...prev, customerName: e.target.value } : prev)}
                    />
                  ) : (
                    <p>{selectedAccount.customerName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <p>{selectedAccount.accountNumber}</p>
                </div>
                <div className="space-y-2">
                  <Label>Balance</Label>
                  <p className="text-lg font-semibold">{selectedAccount.balance}</p>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  {isEditing ? (
                    <Select value={selectedAccount.status} onValueChange={(value) => setSelectedAccount(prev => prev ? { ...prev, status: value as Account['status'] } : prev)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p>{getStatusBadge(selectedAccount.status)}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <p>{selectedAccount.type}</p>
                </div>
                <div className="space-y-2">
                  <Label>Branch</Label>
                  <p>{selectedAccount.branch}</p>
                </div>
                <div className="space-y-2">
                  <Label>Opened Date</Label>
                  <p>{selectedAccount.openedDate}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              {isEditing && (
                <Button onClick={() => { alert('Account updated!'); setOpenModal(false); }}>
                  Save Changes
                </Button>
              )}
              <Button variant="outline" onClick={() => setOpenModal(false)}>
                {isEditing ? 'Cancel' : 'Close'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
