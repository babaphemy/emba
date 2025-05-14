"use client";

import LandingPageAccordions from "@/components/custom/LandingPageAccordions";
import { LearnMoreWidget } from "@/components/custom/LearnMoreWidget";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

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
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50  shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-pink-500">
              upper courses
            </span>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Course Catalog
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  About Us
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Services
                </a>
              </div>
              <Button className=" bg-blue-600 text-white">Contact Us</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r  from-pink-50 to-purple-50 py-16">
        <div className="container mx-auto flex items-center  flex-col sm:flex-row ">
          <Image
            src="/images/header-image.png"
            alt="Classroom"
            className="mt-8 h-[500px]"
            width={900}
            height={1000}
          />
          <div className="ml-0 sm:-ml-10 px-4">
            <div className="flex flex-col  items-center sm:items-start justify-center sm:justify-start">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                TRANSFORM YOUR
                <br />
                <span className="text-4xl md:text-8xl text-pink-500">
                  WORKFORCE
                </span>
                <br />
                <span className="text-4xl md:text-8xl text-pink-500">
                  CLASSROOM
                </span>
                <br />
                <span className="text-4xl md:text-8xl text-pink-500">
                  CAREER
                </span>
              </h1>
              <p className="text-black mb-8">
                Power your innovation, transform with confidence,
                <br />
                boost your expertise, and advance your career.
              </p>
            </div>
          </div>
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
      <section className="bg-gray-200 relative py-16">
      <Image className="absolute top-0 right-0" src="/images/right-un.svg" alt="" width={600} height={600}/>
      <Image className="absolute top-0 right-0" src="/images/vect.svg" alt="" width={600} height={600}/>
      <Image className="absolute bottom-0 left-0" src="/images/left-un.svg" alt="" width={600} height={600}/>
        <div className="container z-10 mx-auto px-4">
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


          <LandingPageAccordions/>

         

          <div className="text-center mt-12">
            <p className="text-gray-500  italic">...More Coming Soon...</p>
          </div>
        </div>
      </section>

      {/* Course Cards Section */}
      <section className="bg-gradient-to-tr from-[#1E2025] to-[#3C414B] py-16">
        <div className="container mx-auto px-4">
          <LearnMoreWidget
            subHeader="WORKFORCE"
            hasBorder
            header="IT'S TIME TO EVOLVE YOUR"
            image="/images/first.png"
            title2="courses Made for you"
            content2="For many businesses, out-of-the-box business training is not
              specific enough to how you operate. We have the solution. Along
              with full access to our catalog, we will partner with your team to
              build a library of private, custom-made courses accessible only to
              you. We do the heavy lifting to save you the 1000s of hours of
              internal effort to build and distribute your curriculum. These
              courses are yours forever, whether you choose to host with us or
              not."
            title1="real world, real results "
            content1="MBAs are long, exhaustive, and expensive, but there’s a better to
              educate your workforce. Upper Courses centralizes top academic and
              professional knowledge into an always-on virtual university,
              combining leading business theory with cutting edge strategies
              proven to work."
          />

          <LearnMoreWidget
            subHeader="CLASSROOM"
            hasBorder
            isReversed
            header="a real-world curriculum for your"
            image="/images/second.png"
            title2="going beyond theory"
            content2="Students in higher education want the confidence that their diploma will make desirable in the job market, and Institutions do their best to keep their curriculum in pace with professional world. But rewriting curriculum while trying to teach it is a difficult task. Let us help. Upper Courses will close the skill gap between graduation and lucrative employment opportunities, allowing your faculty and professorship to focus on students more and the courseware less. "
            title1="elite level instruction"
            content1="Our catalog leverages industry-leading knowledge, theory, and case studies from top academic and professional institutions around the world. We distill and combine these sources of knowledge into easy to follow lessons readily accessible to your classrooms."
          />

          <LearnMoreWidget
            subHeader="CAREER"
            header="The Key to leveling up your "
            image="/images/third.png"
            title2="job market advantage"
            content2="We all love a pay increase, and courses are designed to give you that competitive edge in the job market. Whether you’re hoping to land a higher paying role or be promoted up in your organization, Upper Courses will provide you with the knowledge and skill base to make an impact in your workplace."
            title1="an affordable mba"
            content1="Higher education can be cost prohibitive atop of the many hours of commitment it requires. But we believe that continuing your education shouldn’t put you in debt, and we empower you to chart your own course at your own speed. "
          />

        
        </div>
      </section>

      {/* Let's Talk Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-pink-500 mb-4">LET'S TALK</h2>
          <p className="text-black mb-8 max-w-md mx-auto">
            We look forward to getting to know you better, drop us a line so we
            can sic our sales people on you. Be prepared for us to hound you
            until you sign the contract. Have a great day!
          </p>
          <div className="flex max-w-[400px] mx-auto justify-center space-x-4">
            <Input
              className="w-[70%] h-11 bg-white"
              type="email"
              placeholder="Email"
            />
            <Button
              variant="outline"
              className="h-11 text-white bg-black hover:bg-gray-800 transition-colors hover:text-white"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
