"use client";

import { user } from "@/constants";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true); // For tracking loading state
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await account.get();
        router.push("/");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }

      /*try {
        if (user) {
          router.push("/");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }*/
    };

    checkUser();
  }, [router]);

  // If loading, we return nothing or a loading state, otherwise render the children
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
    </main>
  );
}
