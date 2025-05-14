"use client";

import Catalog from "@/component/home/Catalog";
import Coursecard from "@/component/home/CourseCard";
import Header from "@/component/home/Header";
import Hero from "@/component/home/Hero";
import Homecontact from "@/component/home/Homecontact";
import Nav from "@/component/home/Nav";

export default function CourseCatalogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <Hero />

      <Nav />

      <Catalog />

      <Coursecard />

      <Homecontact />
    </div>
  );
}
