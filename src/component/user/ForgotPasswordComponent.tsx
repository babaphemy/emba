"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "react-query";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Mail, Key, Lock } from "lucide-react";

import { MODAL_SET } from "@/context/Action";
import { AppDpx } from "@/context/AppContext";

import { useContext } from "react";
import { doToken, resetPass } from "@/rest/api";
import { notifyError, notifySuccess } from "@/lib/notification";

const formSchema = z
  .object({
    email: z
      .string()
      .email("You must enter a valid email")
      .min(1, "You must enter an email"),
    token: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // Only validate these fields if token is present
      if (data.token) {
        if (!data.password) return false;
        if (!data.confirmPassword) return false;
        if (data.password !== data.confirmPassword) return false;
      }
      return true;
    },
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }
  );

type ForgotPassFormValues = z.infer<typeof formSchema>;

type Props = {
  modal?: boolean;
};

export default function ForgotPasswordComponent({ modal = false }: Props) {
  const searchParams = useSearchParams();
  const dispatch = useContext(AppDpx);
  const router = useRouter();
  const userEmail = searchParams?.get("userEmail");

  const defaultValues: ForgotPassFormValues = {
    email: userEmail || "",
    token: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<ForgotPassFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const tokenMutation = useMutation(doToken, {
    onSuccess: () => {
      router.push(`?userEmail=${form.getValues("email")}`);
      notifySuccess("Token sent to your email");
    },
    onError: () => {
      notifyError("Token sending failed, please try again");
    },
  });

  const resetMutation = useMutation(resetPass, {
    onSuccess: () => {
      notifySuccess("Password reset successfully");

      if (modal) {
        dispatch({
          type: MODAL_SET,
          data: { open: true, type: "login" },
        });
      } else {
        router.push("/login");
      }

      form.reset(defaultValues);
    },
    onError: () => {
      notifyError("Password reset failed, please try again");
    },
  });

  function onSubmit(data: ForgotPassFormValues) {
    if (userEmail) {
      resetMutation.mutate({
        email: data.email,
        token: data?.token || "",
        password: data?.password || "",
        type: "USER",
      });
    } else {
      if (!data.email) {
        notifyError("Please enter your email");
        return;
      }

      tokenMutation.mutate({
        email: data.email,
        type: "USER",
      });
    }
  }

  const handleChangeTab = () => {
    if (modal) {
      dispatch({ type: MODAL_SET, data: { open: true, type: "signup" } });
      return;
    }
    router.push("/sign-up");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center text-2xl font-bold">
          Forgot Password
          <Image
            src="/icons/facebook.png"
            alt="yeah"
            width={30}
            height={30}
            className="ml-2"
          />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Email"
                        {...field}
                        className="pl-3 pr-10"
                      />
                      <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {userEmail && (
              <>
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Token"
                            {...field}
                            className="pl-3 pr-10"
                          />
                          <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
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
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="password"
                            placeholder="New Password"
                            {...field}
                            className="pl-3 pr-10"
                          />
                          <Key className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            {...field}
                            className="pl-3 pr-10"
                          />
                          <Key className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="text-right">
              <Link
                href="/login"
                className="text-sm text-primary hover:underline"
              >
                Remember Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={tokenMutation.isLoading || resetMutation.isLoading}
            >
              {userEmail
                ? resetMutation.isLoading
                  ? "Submitting..."
                  : "Submit"
                : tokenMutation.isLoading
                ? "Sending..."
                : "Send Reset Token"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center">
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
