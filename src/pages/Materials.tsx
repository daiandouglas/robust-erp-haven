
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  Filter, 
  RefreshCw, 
  MoreVertical,
  Edit, 
  Trash2, 
  Copy, 
  Download,
  AlertCircle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

// Mock data for materials
const mockMaterials = [
  {
    id: "MAT-1001",
    name: "Industrial Motor X200",
    category: "Machinery",
    unit: "Piece",
    unitPrice: 1250.00,
    stockLevel: 24,
    reorderPoint: 10,
    lastUpdated: "2023-04-15",
    status: "active",
  },
  {
    id: "MAT-1002",
    name: "Hydraulic Fluid HF-2000",
    category: "Fluids",
    unit: "Liter",
    unitPrice: 45.50,
    stockLevel: 5,
    reorderPoint: 15,
    lastUpdated: "2023-04-12",
    status: "low_stock",
  },
  {
    id: "MAT-1003",
    name: "Circuit Board CB-500",
    category: "Electronics",
    unit: "Piece",
    unitPrice: 325.75,
    stockLevel: 42,
    reorderPoint: 20,
    lastUpdated: "2023-04-14",
    status: "active",
  },
  {
    id: "MAT-1004",
    name: "Steel Beam SB-100",
    category: "Construction",
    unit: "Meter",
    unitPrice: 89.99,
    stockLevel: 36,
    reorderPoint: 15,
    lastUpdated: "2023-04-10",
    status: "active",
  },
  {
    id: "MAT-1005",
    name: "Copper Wire CW-300",
    category: "Electrical",
    unit: "Roll",
    unitPrice: 156.25,
    stockLevel: 18,
    reorderPoint: 8,
    lastUpdated: "2023-04-13",
    status: "active",
  },
  {
    id: "MAT-1006",
    name: "Industrial Adhesive AD-500",
    category: "Chemicals",
    unit: "Bottle",
    unitPrice: 28.50,
    stockLevel: 12,
    reorderPoint: 10,
    lastUpdated: "2023-04-11",
    status: "active",
  },
  {
    id: "MAT-1007",
    name: "Thermal Sensor TS-200",
    category: "Electronics",
    unit: "Piece",
    unitPrice: 115.00,
    stockLevel: 7,
    reorderPoint: 10,
    lastUpdated: "2023-04-09",
    status: "low_stock",
  },
  {
    id: "MAT-1008",
    name: "Rubber Gasket RG-400",
    category: "Parts",
    unit: "Piece",
    unitPrice: 12.99,
    stockLevel: 85,
    reorderPoint: 25,
    lastUpdated: "2023-04-08",
    status: "active",
  },
];

const Materials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  const { toast } = useToast();

  // Filter materials based on search and tab
  const filteredMaterials = mockMaterials.filter(material => {
    // Search filter
    const matchesSearch = 
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Tab filter
    if (currentTab === 'all') return matchesSearch;
    if (currentTab === 'low_stock') return matchesSearch && material.status === 'low_stock';
    
    return matchesSearch;
  });

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Toast notifications for actions
  const showActionToast = (action: string, materialId: string) => {
    toast({
      title: `Material ${action}`,
      description: `Material ${materialId} has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
              Inventory Management
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Materials</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your materials and products inventory.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Material</span>
            </Button>
          </div>
        </div>
        
        {/* Filters and actions */}
        <div className="mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search materials..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        <span>Export</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                      <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                      <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Materials list */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={setCurrentTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Materials</TabsTrigger>
              <TabsTrigger value="low_stock">
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-erp-warning" />
                  <span>Low Stock</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredMaterials.length} of {mockMaterials.length} materials
            </div>
          </div>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-center">Stock Level</TableHead>
                      <TableHead className="text-right">Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.id}</TableCell>
                        <TableCell>{material.name}</TableCell>
                        <TableCell>{material.category}</TableCell>
                        <TableCell className="text-right">${material.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex justify-center items-center">
                            <div className={`px-2 py-1 rounded-full text-xs ${
                              material.stockLevel <= material.reorderPoint
                                ? 'bg-erp-error-light text-erp-error'
                                : 'bg-erp-success-light text-erp-success'
                            }`}>
                              {material.stockLevel} {material.unit}s
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{material.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => showActionToast('Viewed', material.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => showActionToast('Duplicated', material.id)}>
                                <Copy className="mr-2 h-4 w-4" />
                                <span>Duplicate</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => showActionToast('Deleted', material.id)}
                                className="text-erp-error focus:text-erp-error"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="low_stock" className="mt-4">
            <Card>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-center">Stock Level</TableHead>
                      <TableHead className="text-right">Reorder Point</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.id}</TableCell>
                        <TableCell>{material.name}</TableCell>
                        <TableCell>{material.category}</TableCell>
                        <TableCell className="text-right">${material.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex justify-center items-center">
                            <div className="px-2 py-1 rounded-full text-xs bg-erp-error-light text-erp-error">
                              {material.stockLevel} {material.unit}s
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{material.reorderPoint} {material.unit}s</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => showActionToast('Reordered', material.id)}
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            Reorder
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Materials;
