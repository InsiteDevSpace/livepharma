
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Barcode } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const MOCK_SUPPLIERS = ["MediPharm", "PharmaCare", "AllCure", "VitaLife"];
const MOCK_CATEGORIES = [
  "Pain Relief",
  "Antibiotics",
  "Allergy",
  "Supplements",
  "Digestive",
  "First Aid",
  "Skincare",
];

// Define a product with ID 2 for edit mode
const MOCK_PRODUCT = {
  id: "2",
  name: "Amoxicillin 250mg",
  quantity: 8,
  expiryDate: "2023-10-20",
  supplier: "PharmaCare",
  category: "Antibiotics",
  batchNumber: "BT7890",
  threshold: 15,
  barcode: "5901234123457",
};

const formSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  quantity: z.coerce.number().min(0, "Quantity cannot be negative"),
  batchNumber: z.string().min(1, "Batch number is required"),
  expiryDate: z.date({
    required_error: "Expiry date is required",
  }),
  supplier: z.string().min(1, "Supplier is required"),
  category: z.string().min(1, "Category is required"),
  threshold: z.coerce.number().min(1, "Threshold must be at least 1"),
  barcode: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!id;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      batchNumber: "",
      supplier: "",
      category: "",
      threshold: 10,
      barcode: "",
    },
  });

  useEffect(() => {
    // If in edit mode, fetch product data
    if (isEditMode && id === MOCK_PRODUCT.id) {
      // Simulate API call delay
      const timer = setTimeout(() => {
        form.reset({
          name: MOCK_PRODUCT.name,
          quantity: MOCK_PRODUCT.quantity,
          batchNumber: MOCK_PRODUCT.batchNumber,
          expiryDate: new Date(MOCK_PRODUCT.expiryDate),
          supplier: MOCK_PRODUCT.supplier,
          category: MOCK_PRODUCT.category,
          threshold: MOCK_PRODUCT.threshold,
          barcode: MOCK_PRODUCT.barcode,
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isEditMode, id, form]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success(
      isEditMode
        ? `${data.name} has been updated`
        : `${data.name} has been added to inventory`
    );
    
    setIsSubmitting(false);
    navigate("/products");
  };

  const handleScanBarcode = () => {
    // In a real app, this would trigger a barcode scanner
    toast.info("Barcode scanner activated");
    
    // Mock scanning a barcode after a delay
    setTimeout(() => {
      form.setValue("barcode", "590" + Math.floor(Math.random() * 10000000000));
      toast.success("Barcode scanned successfully");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-muted-foreground">
          {isEditMode
            ? "Update product information in your inventory"
            : "Add a new product to your inventory"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Enter the details of the product below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Paracetamol 500mg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="batchNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. BT12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expiry Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date()
                            }
                            initialFocus
                            className="rounded-md border pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a supplier" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MOCK_SUPPLIERS.map((supplier) => (
                            <SelectItem key={supplier} value={supplier}>
                              {supplier}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MOCK_CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="threshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reorder Threshold</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="barcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barcode</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="Scan or enter barcode" {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleScanBarcode}
                        >
                          <Barcode size={18} className="mr-2" />
                          Scan
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/products")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? isEditMode
                      ? "Updating..."
                      : "Adding..."
                    : isEditMode
                    ? "Update Product"
                    : "Add Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
