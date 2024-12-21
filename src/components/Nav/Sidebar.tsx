"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../Logo";
import { appName, sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-border bg-background text-background pt-8 max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-5">
          <Logo />
          <h1 className="2xl:text-26 text-[26px] font-bold text-foreground max-xl:hidden">
            {appName}
          </h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start",
                {
                  "bg-primary": isActive,
                }
              )}
            >
              <div className="relative size-6">
                <Image
                  priority
                  src={item.icon}
                  alt={item.label}
                  fill
                  className={cn({
                    "brightness-[3] invert": isActive,
                  })}
                />
              </div>
              <p
                className={cn(
                  "text-16 font-semibold text-foreground max-xl:hidden",
                  {
                    "text-white": isActive,
                  }
                )}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
