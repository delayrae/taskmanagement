"use client";

import { useRouter } from "next/navigation";
import { user } from "@/constants";

import Sidebar from "@/components/Nav/Sidebar";
import Image from "next/image";
import MobileNav from "@/components/Nav/MobileNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  if (user) {
    return (
      <main className="flex h-screen w-full font-inter">
        <Sidebar />

        <div className="flex size-full flex-col">
          <div className="flex h-16 items-center justify-between p-5 shadow-md sm:p-8 md:hidden">
            <Image src="/Icons/logo.svg" alt="Logo" width={30} height={30} />
            <div>
              <MobileNav />
            </div>
          </div>
          {children}
        </div>
      </main>
    );
  } else {
    router.push("/login");
  }
}
