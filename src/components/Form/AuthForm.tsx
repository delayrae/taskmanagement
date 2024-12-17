"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../Logo";

// =========== FORM LOGIC IMPORTS =========== //
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authFormSchema } from "@schemas/index";

// =========== SHADCN FORM IMPORTS =========== //
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "./FormInput";
import Link from "next/link";
import { Account } from "appwrite";
import { account, client } from "@/lib/appwrite";

// =========== FORM SCHEMA =========== //
export default function Login({ type }: { type: string }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // =========== FOR MDEFINITION =========== //
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // =========== SUBMIT HANDLER =========== //
  const onSubmit = async (values: z.infer<typeof authFormSchema>) => {
    setIsLoading(true);
    console.log(values);

    const promise = account.createEmailPasswordSession(
      values.username,
      values.password
    );

    promise.then(
      function (response) {
        console.log(response);
        router.push("/");
      },
      function (error) {
        console.log(error);
        setIsLoading(false);
      }
    );
  };

  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className="flex items-center gap-5 md:gap-8">
        <Logo />

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-foreground">
            Login
            <p className="text-16 font-normal text-muted-foreground">
              Please enter your details
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <></>
      ) : (
        // =========== RENDERING FORM =========== //
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormInput
                control={form.control}
                name="username"
                label="Username"
                type="text"
                placeholder="Enter Username"
              />

              <FormInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter Password"
              />

              <Button
                type="submit"
                className="w-full text-16 rounded-lg border border-primary bg-primary font-semibold text-background shadow-form"
              >
                Submit
              </Button>
            </form>
          </Form>

          <footer className="flex justify-center gap-1 max-sm:flex-col max-sm:items-center">
            <p className="text-14 font-normal text-muted-foreground">
              Don't know your credentials?
            </p>
            <Link
              href={"/"}
              className="text-14 cursor-pointer font-medium text-primary"
            >
              Contact your admin
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}
