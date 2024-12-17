"use client";

import { useState } from "react";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import Link from "next/link";
import Logo from "../../Logo";

// =========== FORM LOGIC IMPORTS =========== //
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addFormSchema } from "@schemas/index";

// =========== SHADCN FORM IMPORTS =========== //
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormInput from "../FormInput";
import { Textarea } from "../../ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { postData } from "@/actions/appwrite/taskActions";

export default function AddForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof addFormSchema>>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      status: "",
      priority: "",
      title: "",
      desc: "",
      location: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addFormSchema>) => {
    setIsLoading(true);

    try {
      await postData({
        title: values.title,
        desc: values.desc,
        status: values.status,
        priority: values.priority,
      });

      setIsLoading(false);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className="flex items-center gap-5 md:gap-8">
        <Logo />

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-foreground">
            Add Task
            <p className="text-16 font-normal text-muted-foreground">
              Please enter the details
            </p>
          </h1>
        </div>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormInput
            control={form.control}
            name="title"
            label="Title"
            type="text"
            placeholder="Enter Title"
          />

          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Enter Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="w-[50%]">
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="flex">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full text-16 rounded-lg border border-primary bg-primary font-semibold text-background shadow-form"
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
