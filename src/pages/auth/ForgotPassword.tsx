
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      await forgotPassword(data.email);
      toast.success("Password reset instructions sent to your email");
      setSubmitted(true);
    } catch (error) {
      toast.error("Failed to process your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to your email address.
        </p>
        <Link
          to="/login"
          className="text-primary-600 font-medium hover:underline"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Forgot password?</h1>
        <p className="text-gray-600 mt-1">
          Enter your email address to reset your password
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your-email@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Reset Password"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          <Link to="/login" className="text-primary-600 font-medium hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </>
  );
};

export default ForgotPassword;
