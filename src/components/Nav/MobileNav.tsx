"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import Logo from "../Logo";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DialogDescription, DialogTitle } from "../ui/dialog";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/Icons/menu-line.svg"
            alt="Menu Icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="right" className="border-none">
          {/* =========== PREVENT ERRORS & WARNING =========== */}
          <div className="hidden">
            <DialogDescription></DialogDescription>
            <DialogTitle></DialogTitle>
          </div>
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1 px-4"
          >
            <Image src="/Icons/logo.svg" alt="Logo" width={30} height={30} />
            <h1 className="text-26 font-semibold">Taskbahr</h1>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-background">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          "flex gap-3 items-center p-4 rounded-lg w-full max-w-60",
                          {
                            "bg-primary": isActive,
                          }
                        )}
                      >
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert": isActive,
                          })}
                        />
                        <p
                          className={cn(
                            "text-16 font-semibold text-foreground",
                            {
                              "text-white": isActive,
                            }
                          )}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
            FOOTER
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  );
}
