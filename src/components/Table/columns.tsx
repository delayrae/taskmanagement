"use client";

import { TableData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";

import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Label } from "../ui/label";
import UpdateForm from "../Form/FullForms/UpdateForm";
import { databases } from "@/lib/appwrite";
import { deleteData } from "@/actions/appwrite/taskActions";

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(task.$id)}
              >
                Copy Task ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger>View Details</DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await deleteData({ $id: task.$id });
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="rounded min-sm:m-[10px] w-full max-w-[90vh]">
            <DialogHeader className="max-w-full overflow-x-hidden">
              <DialogTitle className="text-2xl">
                {task.title} | {task.$id}
              </DialogTitle>
              <div className="flex flex-col pt-2 ">
                <div className="flex flex-col pb-2">
                  <Label className="text-foreground text-lg font-semibold">
                    Description
                  </Label>
                  <Label className="text-md cursor-text text-justify">
                    {task.desc}
                  </Label>
                </div>

                <UpdateForm
                  status={task.status}
                  priority={task.priority}
                  $id={task.$id}
                />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
