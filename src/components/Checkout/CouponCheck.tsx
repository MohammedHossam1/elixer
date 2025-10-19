"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePostCoupon } from "@/hooks/fetch-hooks";
import { couponSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";





const CouponCheck = ({ setCoupon }: { setCoupon: ({ code, discount }: { code: string, discount: number }) => void }) => {
    const { t } = useTranslation();
    const { mutate, isPending, isSuccess, isError, error } = usePostCoupon();
    const schema = couponSchema(t);
    type CouponFormValues = z.infer<typeof schema>;

    const form = useForm<CouponFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            coupon_code: "",
        },
    });

    const onSubmit = (values: CouponFormValues) => {
        mutate(values, {
            onSuccess: (data) => {
                setCoupon({ code: data.code, discount: Number(data.discount) });
            },
        });
    };

    return (
        <Card className="card-elegant mb-4">
            <CardHeader>
                <CardTitle>{t("haveCoupon")}</CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex gap-2 items-start"
                    >
                        <FormField
                            control={form.control}
                            name="coupon_code"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input
                                            placeholder={t("enterCoupon")}
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isPending}>
                            {isPending ? <LoaderCircle className="animate-spin" /> : t("apply")}
                        </Button>
                    </form>
                </Form>

                {/* 💬 رسائل الحالة */}
                {isSuccess && (
                    <p className="text-green-600 mt-2">{t("couponApplied")}</p>
                )}
                {isError && (
                    <p className="text-red-500 mt-2">{error?.message || t("invalidCoupon")}</p>
                )}
            </CardContent>
        </Card>
    );
};

export default CouponCheck;
