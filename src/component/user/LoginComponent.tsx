"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

import { Mail, Eye, EyeOff } from "lucide-react";

import useUser from "@/hooks/useUser";
import { MODAL_SET } from "@/context/Action";
import { AppDpx } from "@/context/AppContext";
import { notifyError, notifySuccess } from "@/lib/notification";

const formSchema = z.object({
  email: z
    .string()
    .email("A valid email is required")
    .min(1, "You must enter an email"),
  password: z
    .string()
    .min(4, "Password is too short - should be 4 chars minimum.")
    .min(1, "Password is required!"),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  modal?: boolean;
};

export default function LoginComponent({ modal = false }: Props) {
  const { setUser } = useUser();
  const dispatch = useContext(AppDpx);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setFormError(null);

    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.status === 200) {
        setUser();
        notifySuccess("Login successful");
      } else {
        setFormError("Invalid email or password");
        notifyError("Invalid email or password");
      }
    } catch {
      setFormError("An error occurred. Please try again.");
      notifyError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  const handleChangeTab = () => {
    if (modal) {
      dispatch({ type: MODAL_SET, data: { open: true, type: "signup" } });
      return;
    }
    router.push("/sign-up");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        {form.formState.errors &&
          Object.keys(form.formState.errors).length > 0 && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                Please correct the errors in the form
              </AlertDescription>
            </Alert>
          )}

        {formError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-center mb-6">
          <h2 className="text-2xl font-semibold">
            Login
            <Image
              src="/icons/instagram.png"
              alt="yeah"
              width={30}
              height={30}
              className="inline ml-2"
            />
          </h2>
        </div>

        <div className="space-y-3 mb-6 w-full">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <Image
              src="/icons/instagram.png"
              alt="google"
              width={20}
              height={20}
            />
            <span>Login with Google</span>
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <Image src="/icons/fb.png" alt="fb" width={25} height={25} />
            <span>Login with Facebook</span>
          </Button>
        </div>

        <div className="flex items-center my-6">
          <Separator className="flex-grow" />
          <span className="mx-2 text-gray-500">or</span>
          <Separator className="flex-grow" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={handleChangeTab}
            className="text-primary"
          >
            Don&apos;t have an account? Sign Up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
