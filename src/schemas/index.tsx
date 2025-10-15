/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const checkoutSchema = (t: any) =>
  z
    .object({
      firstName: z
        .string()
        .trim()
        .min(2, { message: t("validation.firstNameMin") }),
      lastName: z
        .string()
        .trim()
        .min(2, { message: t("validation.lastNameMin") }),
      email: z
        .string()
        .trim()
        .email({ message: t("validation.emailInvalid") }),
      phone: z
        .string()
        .trim()
        .min(10, { message: t("validation.enterPhone") }),
      address: z.string().optional(),
      region_id: z.string().optional(),
      deliveryType: z.enum(["delivery", "pickup"]),
    })
    .superRefine((data, ctx) => {
      if (data.deliveryType === "delivery") {
        if (!data.address || data.address.trim() === "") {
          ctx.addIssue({
            path: ["address"],
            message: t("validation.enterAddress"),
            code: z.ZodIssueCode.custom,
          });
        }
        if (!data.region_id || data.region_id.trim() === "") {
          ctx.addIssue({
            path: ["region_id"],
            message: t("validation.regionRequired"),
            code: z.ZodIssueCode.custom,
          });
        }
      }
    });
