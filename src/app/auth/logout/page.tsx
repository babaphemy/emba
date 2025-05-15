"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Logout() {
  const { removeUser } = useUser();

  useEffect(() => {
    removeUser();
  }, [removeUser]);

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md mx-auto text-center bg-white dark:bg-gray-900">
        <CardContent className="p-8">
          <div className="mb-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={250}
                height={100}
                className="block dark:hidden"
                priority
              />
              <Image
                src="/images/logo-white.png"
                alt="Logo"
                width={250}
                height={100}
                className="hidden dark:block"
              />
            </Link>
          </div>

          <div className="mb-8">
            <Image
              width={100}
              height={100}
              src="/images/coffee.png"
              alt="Coffee"
              className="mx-auto"
            />
          </div>

          <h1 className="text-xl font-medium mb-2">You are Logged Out</h1>

          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Thank you for using Horace LMS
          </p>

          <Button asChild className="w-full py-3 px-4 rounded-lg text-base">
            <Link href="/login">Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
