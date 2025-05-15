"use client";

import { Suspense } from "react";
import Image from "next/image";

import ForgotPasswordComponent from "@/component/user/ForgotPasswordComponent";
import Header from "@/component/home/Header";
import Footer from "@/component/dashboard/Footer";

const ForgotPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        id="forgot-password-component"
        className="min-h-screen flex flex-col"
      >
        <Header />

        <main className="flex-grow py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center">
              <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Form Section */}
                <div className="w-full md:w-1/2 p-6">
                  <ForgotPasswordComponent />
                </div>

                {/* Image Section */}
                <div className="hidden md:block w-1/2 relative">
                  <div className="absolute inset-0">
                    <Image
                      src={"/images/vect.svg"}
                      alt="background shape"
                      width={0}
                      height={0}
                      sizes="100%"
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-8">
                      Smart Learning. Limitless Growth.
                    </h2>

                    <Image
                      src={"/images/first.png"}
                      alt="man holding a laptop"
                      width={420}
                      height={400}
                      className="max-w-full"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </Suspense>
  );
};

export default ForgotPassword;
