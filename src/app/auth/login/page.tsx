"use client";

import Image from "next/image";
import LoginComponent from "@/component/user/LoginComponent";

import Footer from "@/component/dashboard/Footer";

export default function Login() {
  return (
    <div id="login-component" className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="w-full md:w-1/2 p-4 md:p-6">
                <LoginComponent />
              </div>

              <div className="hidden md:block w-1/2 relative">
                <div className="absolute inset-0">
                  <Image
                    src="/images/right-un.svg"
                    alt="Decorative background"
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
                    alt="Man holding a laptop"
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
  );
}
