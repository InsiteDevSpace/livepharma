
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Filter, 
  Plus, 
  Package, 
  Search, 
  Edit, 
  Trash2,
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock data for products
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    quantity: 42,
    expiryDate: "2023-12-15",
    supplier: "MediPharm",
    category: "Pain Relief",
    batchNumber: "BT1234",
    threshold: 20,
    status: "normal", // normal, low, expired
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    quantity: 8,
    expiryDate: "2023-10-20",
    supplier: "PharmaCare",
    category: "Antibiotics",
    batchNumber: "BT7890",
    threshold: 15,
    status: "low", // normal, low, expired
  },
  {
    id: "3",
    name: "Ibuprofen 200mg",
    quantity: 0,
    expiryDate: "2023-11-05",
    supplier: "MediPharm",
    category: "Pain Relief",
    batchNumber: "BT4567",
    threshold: 15,
    status: "out", // normal, low, expired, out
  },
  {
    id: "4",
    name: "Loratadine 10mg",
    quantity: 25,
    expiryDate: "2023-09-01",
    supplier: "AllCure",
    category: "Allergy",
    batchNumber: "BT9876",
    threshold: 10,
    status: "expired", // normal, low, expired
  },
  {
    id: "5",
    name: "Vitamin C 500mg",
    quantity: 120,
    expiryDate: "2024-06-30",
    supplier: "VitaLife",
    category: "Supplements",
    batchNumber: "BT5432",
    threshold: 50,
    status: "normal", // normal, low, expired
  },
  {
    id: "6",
    name: "Omeprazole 20mg",
    quantity: 35,
    expiryDate: "2023-12-28",
    supplier: "PharmaCare",
    category: "Digestive",
    batchNumber: "BT1357",
    threshold: 20,
    status: "normal", // normal, low, expired
  },
  {
    id: "7",
    name: "Cetirizine 10mg",
    quantity: 12,
    expiryDate: "2023-11-15",
    supplier: "AllCure",
    category: "Allergy",
    batchNumber: "BT2468",
    threshold: 15,
    status: "low", // normal, low, expired
  },
  {
    id: "8",
    name: "Aspirin 100mg",
    quantity: 50,
    expiryDate: "2024-03-20",
    supplier: "MediPharm",
    category: "Pain Relief",
    batchNumber: "BT3690",
    threshold: 25,
    status: "normal", // normal, low, expired
  },
];

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterSupplier, setFilterSupplier] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Extract unique categories and suppliers for filters
  const categories = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)));
  const suppliers = Array.from(new Set(MOCK_PRODUCTS.map(p => p.supplier)));
  
  // Filter products based on search and filters
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    const matchesSupplier = !filterSupplier || product.supplier === filterSupplier;
    const matchesStatus = !filterStatus || product.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesSupplier && matchesStatus;
  });

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      // In a real app, this would be an API call
      toast.success(`${selectedProduct.name} has been deleted`);
      setShowDeleteDialog(false);
      setSelectedProduct(null);
    }
  };

  // Function to get appropriate badge for product status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "low":
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Low Stock</Badge>;
      case "out":
        return <Badge variant="destructive">Out of Stock</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Expired</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button 
          onClick={() => navigate("/products/add")}
          className="flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products or batch number..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuLabel className="text-xs">Status</DropdownMenuLabel>
                  <DropdownMenuItem 
                    className={!filterStatus ? "bg-accent text-accent-foreground" : ""} 
                    onClick={() => setFilterStatus(null)}
                  >
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className={filterStatus === "low" ? "bg-accent text-accent-foreground" : ""} 
                    onClick={() => setFilterStatus("low")}
                  >
                    Low Stock
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className={filterStatus === "out" ? "bg-accent text-accent-foreground" : ""} 
                    onClick={() => setFilterStatus("out")}
                  >
                    Out of Stock
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className={filterStatus === "expired" ? "bg-accent text-accent-foreground" : ""} 
                    onClick={() => setFilterStatus("expired")}
                  >
                    Expired
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs">Category</DropdownMenuLabel>
                  <DropdownMenuItem 
                    className={!filterCategory ? "bg-accent text-accent-foreground" : ""} 
                    onClick={() => setFilterCategory(null)}
                  >
                    All Categories
                  </DropdownMenuItem>
                  {categories.map(category => (
                    <DropdownMenuItem 
                      key={category} 
                      className={filterCategory === category ? "bg-accent text-accent-foreground" : ""} 
                      onClick={() => setFilterCategory(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs">Supplier</DropdownMenuLabel>
                  <DropdownMenuItem 
                    className={!filterSupplier ? "bg-accent text-accent-foreground" : ""} 
                    onClick={() => setFilterSupplier(null)}
                  >
                    All Suppliers
                  </DropdownMenuItem>
                  {suppliers.map(supplier => (
                    <DropdownMenuItem 
                      key={supplier} 
                      className={filterSupplier === supplier ? "bg-accent text-accent-foreground" : ""} 
                      onClick={() => setFilterSupplier(supplier)}
                    >
                      {supplier}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead className="w-[100px]">Quantity</TableHead>
                      <TableHead className="w-[120px]">Expiry Date</TableHead>
                      <TableHead className="hidden md:table-cell">Batch</TableHead>
                      <TableHead className="hidden md:table-cell">Supplier</TableHead>
                      <TableHead className="hidden lg:table-cell">Category</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          <Package className="mx-auto h-8 w-8 mb-2 text-muted-foreground/60" />
                          <p>No products found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              {getStatusBadge(product.status)}
                            </div>
                          </TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{new Date(product.expiryDate).toLocaleDateString()}</TableCell>
                          <TableCell className="hidden md:table-cell">{product.batchNumber}</TableCell>
                          <TableCell className="hidden md:table-cell">{product.supplier}</TableCell>
                          <TableCell className="hidden lg:table-cell">{product.category}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`/products/edit/${product.id}`)}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setShowDeleteDialog(true);
                                }}
                              >
                                <Trash2 size={16} className="text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredProducts.length}</span> products
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-primary text-white hover:bg-primary/90">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium">{selectedProduct?.name}</span>? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
