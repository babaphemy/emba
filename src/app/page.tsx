"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { link } from "fs";
import {
  BadgeCheck,
  BookOpen,
  Clock,
  GraduationCap,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const courses = [
  {
    title: "Retail Logistics",
    description:
      "Master data analysis techniques using modern tools and methodologies",
    duration: "10 weeks",
    level: "Advanced",
    image: "/images/logistics.png",
    category: "Logistics",
    link: "/content/index.html",
  },
  {
    title: "Leadership & Management",
    description: "Develop essential leadership skills for the modern workplace",
    duration: "8 weeks",
    level: "Intermediate",
    image: "/api/placeholder/800/400",
    category: "Business",
    link: "/content/index.html",
  },
  {
    title: "Project Management Professional",
    description: "Comprehensive preparation for PMP certification",
    duration: "12 weeks",
    level: "Advanced",
    image: "/api/placeholder/800/400",
    category: "Project Management",
    link: "/content/index.html",
  },
  {
    title: "Digital Marketing Strategy",
    description:
      "Learn to create and execute effective digital marketing campaigns",
    duration: "6 weeks",
    level: "Intermediate",
    image: "/api/placeholder/800/400",
    category: "Marketing",
    link: "/content/index.html",
  },
  {
    title: "Business Intelligence",
    description: "Transform data into actionable business insights",
    duration: "8 weeks",
    level: "Advanced",
    image: "/api/placeholder/800/400",
    category: "Data Science",
    link: "/content/index.html",
  },
  {
    title: "Change Management",
    description: "Lead organizational change effectively",
    duration: "6 weeks",
    level: "Intermediate",
    image: "/api/placeholder/800/400",
    category: "Business",
    link: "/content/index.html",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col antialiased">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col space-y-8">
                <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
                  Elevate Your <span className="text-primary">Workforce</span>{" "}
                  Through Expert Learning
                </h1>
                <p className="text-xl text-muted-foreground md:text-2xl">
                  Enterprise-grade learning platform delivering high-impact
                  courses for professional development and team upskilling.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="gap-2">
                    Browse Courses
                    <BookOpen className="h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <Image
                  src="/images/squid.jpg"
                  alt="Learning Platform"
                  width={600}
                  height={500}
                  className="rounded-lg object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-20 bg-slate-50/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold md:text-4xl">
                Why Choose Polyvoyant
              </h2>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                Our platform combines expert-led courses with advanced learning
                technology to deliver measurable results.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-primary/5 border-none">
                <CardContent className="pt-6">
                  <GraduationCap className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">
                    Expert-Led Training
                  </h3>
                  <p className="text-muted-foreground">
                    Learn from industry leaders and subject matter experts with
                    proven track records.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-none">
                <CardContent className="pt-6">
                  <BadgeCheck className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">
                    Verified Content
                  </h3>
                  <p className="text-muted-foreground">
                    All courses are rigorously reviewed and updated to ensure
                    quality and relevance.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-none">
                <CardContent className="pt-6">
                  <Clock className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">
                    Flexible Learning
                  </h3>
                  <p className="text-muted-foreground">
                    Learn at your own pace with on-demand access to course
                    materials.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Course Grid */}
        <section className="bg-slate-50 py-20">
          <div className="container">
            <div className="mb-12">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Featured Courses</h2>
                  <p className="mt-2 text-muted-foreground">
                    Explore our most popular professional development courses
                  </p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search courses..."
                    className="rounded-full border bg-white pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <Card
                  key={index}
                  className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">
                        {course.category}
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">
                      <Link
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {course.title}
                      </Link>
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 px-6 py-4">
                    <Button variant="secondary" className="w-full">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" variant="outline">
                View All Courses
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
