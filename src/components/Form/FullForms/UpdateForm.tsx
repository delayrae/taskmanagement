"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// =========== FORM LOGIC IMPORTS =========== //
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateFormSchema } from "@schemas/index";

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
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { columns } from "@/components/Table/columns";
import { UpdateFormprops } from "@/types";
import { databases, ID } from "@/lib/appwrite";
import { patchData } from "@/actions/appwrite/taskActions";

export default function UpdateForm({ status, priority, $id }: UpdateFormprops) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      status: status || "",
      priority: priority || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateFormSchema>) => {
    setIsLoading(true);

    try {
      await patchData({
        $id: $id,
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-5 px-1">
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
            <Image
              src="/Icons/save-fill.svg"
              alt="Save Icon"
              width={18}
              height={18}
              className="brightness-[3] invert"
            />
            Save
          </Button>
        </form>
      </Form>
    </>
  );
}
