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
        .optional(),
      phone: z
        .string()
        .trim()
        .min(10, { message: t("validation.enterPhone") }),
      address: z.string().optional(),
      region_id: z.string().optional(),
      deliveryType: z.enum(["delivery", "pickup"]),
      read_conditions: z.literal(true, {
        errorMap: () => ({ message: t("pleaseAcceptConditions") }),
      }),
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
export const couponSchema = (t: any) =>
  z
    .object({

      coupon_code: z
        .string()
        .min(3, t("validation.couponMin"))
        .max(20, t("validation.couponMax")),
    })
export const contactSchema = (t: any) =>
  z.object({
    name: z.string()
      .trim()
      .min(2, { message: t("validation.contactMin") })
      .max(100, { message: t("validation.contactMax") }),
    email: z.string()
      .trim()
      .email({ message: t("validation.emailInvalid") })
      .max(255, { message: t("validation.emailMax") }),
    phone: z.string()
      .trim()
      .min(10, { message: t("validation.phoneMin") })
      .max(20, { message: t("validation.phoneMax") })
      .optional()
      .or(z.literal("")),
    subject: z.string()
      .trim()
      .min(1, { message: t("validation.required") })
      .max(200, { message: t("validation.subjectMax") }),
    message: z.string()
      .trim()
      .min(10, { message: t("validation.messageMin") })
      .max(1000, { message: t("validation.messageMax") })
  
      
  })
