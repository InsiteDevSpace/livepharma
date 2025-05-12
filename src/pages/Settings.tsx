
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  pharmacyName: z.string().min(2, "Pharmacy name must be at least 2 characters."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  address: z.string().min(5, "Address must be at least 5 characters."),
});

const notificationFormSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  whatsappNotifications: z.boolean(),
  lowStockAlerts: z.boolean(),
  expiryAlerts: z.boolean(),
  dailyDigest: z.boolean(),
});

const securityFormSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .optional(),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .optional(),
  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .optional(),
}).refine((data) => {
  // If we have a current password, then new password and confirm password are required
  if (data.currentPassword && data.currentPassword.length > 0) {
    return data.newPassword && data.newPassword.length > 0;
  }
  return true;
}, {
  message: "New password is required when changing password.",
  path: ["newPassword"],
}).refine((data) => {
  // If we have a new password, confirm password must match
  if (data.newPassword && data.newPassword.length > 0) {
    return data.newPassword === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationFormValues = z.infer<typeof notificationFormSchema>;
type SecurityFormValues = z.infer<typeof securityFormSchema>;

const Settings = () => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      pharmacyName: user?.pharmacyName || "",
      phone: "1234567890", // Demo value
      address: "123 Main Street, City, Country", // Demo value
    },
  });

  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      whatsappNotifications: true,
      lowStockAlerts: true,
      expiryAlerts: true,
      dailyDigest: false,
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    // This would be an API call in a real app
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Profile updated successfully");
    setIsSaving(false);
  };

  const onNotificationSubmit = async (data: NotificationFormValues) => {
    setIsSaving(true);
    // This would be an API call in a real app
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Notification preferences updated");
    setIsSaving(false);
  };

  const onSecuritySubmit = async (data: SecurityFormValues) => {
    setIsSaving(true);
    // This would be an API call in a real app
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Password updated successfully");
    securityForm.reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="profile">Pharmacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pharmacy Profile</CardTitle>
              <CardDescription>
                Update your pharmacy's information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={profileForm.control}
                      name="pharmacyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pharmacy Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Owner/Manager Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="md:col-span-2">
                      <FormItem>
                        <FormLabel>Pharmacy Type</FormLabel>
                        <Select defaultValue="retail">
                          <SelectTrigger>
                            <SelectValue placeholder="Select pharmacy type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="retail">Retail Pharmacy</SelectItem>
                            <SelectItem value="hospital">Hospital Pharmacy</SelectItem>
                            <SelectItem value="clinic">Clinic Pharmacy</SelectItem>
                            <SelectItem value="online">Online Pharmacy</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Branches</CardTitle>
              <CardDescription>
                Manage multiple branches for your pharmacy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-8">
                  <p className="text-muted-foreground">
                    No branches added yet. Add your first branch to enable multi-branch
                    functionality.
                  </p>
                  <Button variant="outline" className="mt-4">
                    Add Branch
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Customize how you want to receive alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form
                  onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Notification Channels</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select where you want to receive notifications
                      </p>
                      <div className="space-y-4">
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                <FormLabel className="text-base">Email Notifications</FormLabel>
                                <FormDescription>
                                  Receive alerts via email
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationForm.control}
                          name="smsNotifications"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                <FormLabel className="text-base">SMS Notifications</FormLabel>
                                <FormDescription>
                                  Receive alerts via SMS
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationForm.control}
                          name="whatsappNotifications"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                <FormLabel className="text-base">WhatsApp Notifications</FormLabel>
                                <FormDescription>
                                  Receive alerts via WhatsApp
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-lg font-medium">Alert Types</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Choose which alerts you want to receive
                      </p>
                      <div className="space-y-4">
                        <FormField
                          control={notificationForm.control}
                          name="lowStockAlerts"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                <FormLabel className="text-base">Low Stock Alerts</FormLabel>
                                <FormDescription>
                                  Notified when products are below threshold
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationForm.control}
                          name="expiryAlerts"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                <FormLabel className="text-base">Expiry Alerts</FormLabel>
                                <FormDescription>
                                  Notified when products are expiring soon
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationForm.control}
                          name="dailyDigest"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                <FormLabel className="text-base">Daily Digest</FormLabel>
                                <FormDescription>
                                  Receive a daily summary of alerts
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Preferences"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Update your account password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form
                  onSubmit={securityForm.handleSubmit(onSecuritySubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <FormField
                      control={securityForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={securityForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={securityForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Roles</CardTitle>
              <CardDescription>
                Manage user permissions for your pharmacy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium px-3 py-1 rounded-full bg-primary-50 text-primary-700">
                        Admin
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">
                        jane.smith@example.com
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                        Assistant
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Add User
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
