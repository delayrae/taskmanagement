import { z } from "zod";

export const authFormSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const addFormSchema = z.object({
  status: z.string(),
  priority: z.string(),
  title: z.string(),
  desc: z.string(),
  location: z.string(),
});

export const updateFormSchema = z.object({
  status: z.string(),
  priority: z.string(),
});
