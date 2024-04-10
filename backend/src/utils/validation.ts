import { z } from "zod";

import { EMPTY_FIELD_MESSAGE } from "../constant";
export const userDetailSchema = z
  .object({
    firstname: z.string().min(1, EMPTY_FIELD_MESSAGE),
    lastname: z.string().min(1, EMPTY_FIELD_MESSAGE),
    email: z.string().min(1, EMPTY_FIELD_MESSAGE).email("Enter a valid email"),
    password: z.string().min(8, "Password should have atleast 8 charecters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export const userLoginSchema = z.object({
  email: z.string().min(1, EMPTY_FIELD_MESSAGE).email("Enter a valid email"),
  password: z.string().min(8, "Password should have atleast 8 charecters"),
});
