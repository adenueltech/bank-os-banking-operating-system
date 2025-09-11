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
import { Search, Filter, Download, MoreHorizontal } from "lucide-react"

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastLogin: string;
  tier: string;
}

export default function CustomersPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("")
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)
  const [selectedCustomers, setSelectedCustomers] = React.useState(new Set<string>())
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage] = React.useState(5)
  const [isEditing, setIsEditing] = React.useState(false)

  const allCustomers = React.useMemo((): Customer[] => {
    return [
      {
        id: "CUST-001",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1-234-567-8901",
        status: "active" as const,
        joinDate: "2023-01-15",
        lastLogin: "2024-09-11 10:30",
        tier: "Premium"
      },
      {
        id: "CUST-002",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1-234-567-8902",
        status: "active" as const,
        joinDate: "2022-05-20",
        lastLogin: "2024-09-11 09:45",
        tier: "Standard"
      },
      {
        id: "CUST-003",
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        phone: "+1-234-567-8903",
        status: "inactive" as const,
        joinDate: "2023-03-10",
        lastLogin: "2024-08-15 14:20",
        tier: "Basic"
      },
      {
        id: "CUST-004",
        name: "Alice Brown",
        email: "alice.brown@example.com",
        phone: "+1-234-567-8904",
        status: "active" as const,
        joinDate: "2021-11-05",
        lastLogin: "2024-09-11 11:15",
        tier: "Premium"
      },
      {
        id: "CUST-005",
        name: "Charlie Wilson",
        email: "charlie.wilson@example.com",
        phone: "+1-234-567-8905",
        status: "pending" as const,
        joinDate: "2024-09-01",
        lastLogin: "",
        tier: "Standard"
      },
      {
        id: "CUST-006",
        name: "Diana Davis",
        email: "diana.davis@example.com",
        phone: "+1-234-567-8906",
        status: "active" as const,
        joinDate: "2020-07-12",
        lastLogin: "2024-09-10 16:00",
        tier: "Business"
      },
      {
        id: "CUST-007",
        name: "Eve Evans",
        email: "eve.evans@example.com",
        phone: "+1-234-567-8907",
        status: "active" as const,
        joinDate: "2023-06-18",
        lastLogin: "2024-09-11 09:00",
        tier: "Premium"
      },
      {
        id: "CUST-008",
        name: "Frank Foster",
        email: "frank.foster@example.com",
        phone: "+1-234-567-8908",
        status: "inactive" as const,
        joinDate: "2022-09-25",
        lastLogin: "2024-07-30 12:45",
        tier: "Basic"
      },
      {
        id: "CUST-009",
        name: "Grace Green",
        email: "grace.green@example.com",
        phone: "+1-234-567-8909",
        status: "active" as const,
        joinDate: "2019-02-14",
        lastLogin: "2024-09-11 08:30",
        tier: "Business"
      },
      {
        id: "CUST-010",
        name: "Henry Harris",
        email: "henry.harris@example.com",
        phone: "+1-234-567-8910",
        status: "pending" as const,
        joinDate: "2024-09-09",
        lastLogin: "",
        tier: "Standard"
      },
    ]
  }, [])

  const customers = React.useMemo(() => {
    return allCustomers.filter((customer) => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.id.includes(searchTerm) ||
                            customer.email.includes(searchTerm) ||
                            customer.phone.includes(searchTerm)
      const matchesStatus = statusFilter === "" || customer.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter, allCustomers])

  const paginatedCustomers = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return customers.slice(startIndex, startIndex + itemsPerPage)
  }, [customers, currentPage, itemsPerPage])

  const totalPages = Math.ceil(customers.length / itemsPerPage)

  const toggleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedCustomers(new Set(paginatedCustomers.map(cust => cust.id)))
    } else {
      setSelectedCustomers(new Set())
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedCustomers)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedCustomers(newSelected)
  }

  const bulkDeactivate = () => {
    setSelectedCustomers(new Set())
    alert(`Deactivated ${selectedCustomers.size} customers`)
  }

  const exportCSV = () => {
    const csv = customers.map(cust => 
      `${cust.id},${cust.name},${cust.email},${cust.phone},${cust.status},${cust.tier}`
    ).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'customers.csv'
    a.click()
  }

  const updateCustomerStatus = (status: 'active' | 'inactive' | 'pending') => {
    if (selectedCustomer) {
      alert(`Customer ${selectedCustomer.id} status updated to ${status}`)
      setOpenModal(false)
    }
  }

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsEditing(true)
    setOpenModal(true)
  }

  const getStatusBadge = (status: string): JSX.Element => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsEditing(false)
    setOpenModal(true)
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.status === 'active').length
  const newThisMonth = customers.filter(c => new Date(c.joinDate) > new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)).length

  return (
    <AdminLayout activeModule="customers">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Customer Management</h2>
            <p className="text-muted-foreground mt-2">Manage customer profiles and support</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search customers..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportCSV} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {selectedCustomers.size > 0 && (
          <div className="bg-accent p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span>{selectedCustomers.size} customers selected</span>
              <div className="space-x-2">
                <Button variant="destructive" size="sm" onClick={bulkDeactivate}>
                  Deactivate Selected
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedCustomers(new Set())}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{totalCustomers}</p>
              <p className="text-sm text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
              <p className="text-sm text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-accent">{newThisMonth}</p>
              <p className="text-sm text-muted-foreground">Joined recently</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Customers List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedCustomers.size === paginatedCustomers.length && paginatedCustomers.length > 0}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedCustomers.has(customer.id)}
                          onCheckedChange={() => toggleSelect(customer.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell>{customer.lastLogin || 'Never'}</TableCell>
                      <TableCell>{customer.tier}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                              View / Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateCustomerStatus(customer.status === 'inactive' ? 'active' : 'inactive')}
                              className="text-destructive"
                            >
                              {customer.status === 'inactive' ? 'Activate' : 'Deactivate'}
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
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, customers.length)} of {customers.length} results
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
              <DialogTitle>{isEditing ? 'Edit Customer' : 'Customer Details'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Update customer information' : `Manage customer ${selectedCustomer?.id}`}
              </DialogDescription>
            </DialogHeader>
            {selectedCustomer && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  {isEditing ? (
                    <Input 
                      value={selectedCustomer.name} 
                      onChange={(e) => setSelectedCustomer({ ...selectedCustomer, name: e.target.value })} 
                    />
                  ) : (
                    <p>{selectedCustomer.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  {isEditing ? (
                    <Input 
                      value={selectedCustomer.email} 
                      onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })} 
                    />
                  ) : (
                    <p>{selectedCustomer.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  {isEditing ? (
                    <Input 
                      value={selectedCustomer.phone} 
                      onChange={(e) => setSelectedCustomer({ ...selectedCustomer, phone: e.target.value })} 
                    />
                  ) : (
                    <p>{selectedCustomer.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  {isEditing ? (
                    <Select 
                      value={selectedCustomer.status} 
                      onValueChange={(value: 'active' | 'inactive' | 'pending') => 
                        setSelectedCustomer({ ...selectedCustomer, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div>{getStatusBadge(selectedCustomer.status)}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Join Date</Label>
                  <p>{selectedCustomer.joinDate}</p>
                </div>
                <div className="space-y-2">
                  <Label>Last Login</Label>
                  <p>{selectedCustomer.lastLogin || 'Never'}</p>
                </div>
                <div className="space-y-2">
                  <Label>Tier</Label>
                  <p>{selectedCustomer.tier}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              {isEditing && (
                <Button onClick={() => { alert('Customer updated!'); setOpenModal(false); }}>
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