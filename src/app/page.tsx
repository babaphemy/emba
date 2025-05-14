"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDot } from "lucide-react";

export default function CourseCatalogPage() {
  const navigationItems = [
    "ARTS & SCIENCE",
    "MARKETING",
    "BUSINESS",
    "PEOPLE & HR",
    "SALES & TRAINING",
    "OPERATION",
    "PRODUCT",
    "LEADERSHIP",
    "RISK & COMPLIANCE",
    "STUDIO",
  ];

  const financialServicesSubItems = [
    {
      title: "Logistics & Transport",
      details: ["DEMO & SALES", "POST-SALES"],
      boxes: [
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
      ],
    },
    {
      title: "Supply Chain",
      details: ["Lorem ipsum", "Lorem ipsum"],
      boxes: [],
    },
    { title: "Procurement", details: ["Lorem ipsum"], boxes: [] },
    { title: "Shipping", details: [], boxes: [] },
    { title: "Dry Docking", details: [], boxes: [] },
    { title: "Consulting", details: [], boxes: [] },
  ];

  const courseCategories = [
    "Financial Services",
    "Retail",
    "Manufacturing",
    "Food & Beverage",
    "Healthcare",
    "Automotive",
    "Real Estate",
    "Technology",
    "Energy",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <span className="text-2xl font-bold text-pink-500">
                upper courses
              </span>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Course Library
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  About Us
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </a>
              </div>
            </div>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              Request Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              TRANSFORM YOUR
              <br />
              <span className="text-pink-500">WORKFORCE</span>
              <br />
              <span className="text-pink-500">CLASSROOM</span>
              <br />
              <span className="text-pink-500">CAREER</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Power your innovation, transform with confidence,
              <br />
              boost your expertise, and advance your career.
            </p>
          </div>
          <img
            src="/api/placeholder/400/300"
            alt="Classroom"
            className="mt-8 rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Navigation Bar */}
      <nav className="bg-gray-900 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 overflow-x-auto">
            {navigationItems.map((item) => (
              <button
                key={item}
                className="text-white text-sm font-medium whitespace-nowrap hover:text-pink-400 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Course Catalog Section */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">COURSE CATALOG</h2>
          <h3 className="text-4xl font-bold text-pink-500 mb-4">
            OUR COURSE CATALOG WILL
            <br />
            LOVE YOU LONG TIME
          </h3>
          <p className="text-gray-600 mb-12 max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
            veniam.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Financial Services */}
            <div>
              <h4 className="text-xl font-semibold mb-6">
                Financial Services <CircleDot className="inline w-4 h-4 ml-2" />
              </h4>
              <Accordion type="single" collapsible className="w-full">
                {financialServicesSubItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-pink-500">
                      <span className="text-lg">{item.title}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {item.details.map((detail, i) => (
                          <div
                            key={i}
                            className="pl-4 py-2 border-l-2 border-pink-200"
                          >
                            <span className="text-sm font-medium">
                              {detail}
                            </span>
                          </div>
                        ))}
                        {item.boxes.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                            {item.boxes.map((box, i) => (
                              <div
                                key={i}
                                className="bg-gray-200 p-4 rounded text-sm text-center"
                              >
                                {box}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Right Column - Other Categories */}
            <div>
              <Accordion type="single" collapsible className="w-full">
                {courseCategories.slice(1).map((category, index) => (
                  <AccordionItem key={index} value={`category-${index}`}>
                    <AccordionTrigger className="text-left hover:text-pink-500">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-lg">{category}</span>
                        <CircleDot className="w-4 h-4" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-4">
                        <p className="text-sm text-gray-600">
                          Course details coming soon...
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 italic">...More Coming Soon...</p>
          </div>
        </div>
      </section>

      {/* Course Cards Section */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <img
                  src="/api/placeholder/300/200"
                  alt="Workforce"
                  className="w-full rounded mb-4"
                />
                <h3 className="text-white text-2xl font-bold mb-2">
                  IT'S TIME TO EVOLVE YOUR
                  <br />
                  <span className="text-pink-500">WORKFORCE</span>
                </h3>
                <p className="text-gray-400 mb-6">REAL WORLD, REAL RESULTS</p>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>
                    Expand beyond conventional approaches. Award-winning
                    industry experience blended to engage and unlock peak
                    performance with cutting-edge content that addresses every
                    team need.
                  </p>
                  <p>
                    Elevate potential and performance with real world skills
                    taught by industry experts.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <img
                  src="/api/placeholder/300/200"
                  alt="Classroom"
                  className="w-full rounded mb-4"
                />
                <h3 className="text-white text-2xl font-bold mb-2">
                  A REAL WORLD CURRICULUM FOR YOUR
                  <br />
                  <span className="text-pink-500">CLASSROOM</span>
                </h3>
                <p className="text-gray-400 mb-6">
                  ELITE-LEVEL INSTRUCTION
                  <br />
                  GAME BEYOND THEORY
                </p>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>
                    We enable education providers from leading universities
                    through vocational training schools to transform their
                    classrooms with engaging content.
                  </p>
                  <p>
                    All knowledge and stories from leading professionals in
                    modern careers and emerging new fields.
                  </p>
                  <p>
                    Our training content boosts learning outcomes and places
                    students job ready.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <img
                  src="/api/placeholder/300/200"
                  alt="Career"
                  className="w-full rounded mb-4"
                />
                <h3 className="text-white text-2xl font-bold mb-2">
                  THE KEY TO LEVELING UP YOUR
                  <br />
                  <span className="text-pink-500">CAREER</span>
                </h3>
                <p className="text-gray-400 mb-6">
                  AN AFFORDABLE MPA
                  <br />
                  JOB MARKET ADVANTAGE
                </p>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>
                    Gain the power advantage over competitors and stay ahead in
                    the marketplace through bespoke courses designed to
                    streamline and accelerate your career objectives.
                  </p>
                  <p>
                    Gain impactful coaching and mentoring with our courses
                    designed and delivered by industry, real world experts. We
                    developed world-class content to help students advance their
                    professional goals and enhance their resumes for a
                    competitive advantage.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Let's Talk Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-pink-500 mb-4">LET'S TALK</h2>
          <p className="text-gray-600 mb-8">
            The best learning platform is built but none is perfect for your
            needs.
            <br />
            Do not take anyone for it. We would love to get to know you and your
            <br />
            real-time needs. Catch up for free.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
              FIND OUT MORE
            </Button>
            <Button
              variant="outline"
              className="border-pink-500 text-pink-500 hover:bg-pink-50"
            >
              GET COURSES NOW
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
