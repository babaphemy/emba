"use client";
import React from "react";
import QuickStats from "@/component/dashboard/QuickStats";
import { Home, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSession } from "next-auth/react";
import Link from "next/link";

const CoursesPage = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="mb-2 text-3xl font-bold">
            Welcome, {session?.user?.firstname || "Student"}
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  Home
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <Button asChild>
            <Link href="/student/lms">My Courses</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-1 md:col-span-8 lg:col-span-5">
          <QuickStats />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
