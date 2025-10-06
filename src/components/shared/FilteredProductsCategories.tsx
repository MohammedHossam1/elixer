import ProductCard from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { products } from "@/data/Index";
import { useGetCategories } from "@/hooks/fetch-hooks";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const FilteredProductsCategories = ({ params }: { params: string | null }) => {
    const { t, i18n } = useTranslation();
    const { data } = useGetCategories(i18n.language);

    const [activeTab, setActiveTab] = useState(params || "0");

    useEffect(() => {
        if (params) setActiveTab(params);
    }, [params]);

    const getFilteredProducts = (categoryId: string) => {
        if (categoryId === "0") return products;
        return products.filter((product) => String(product.category_id) === categoryId);
    };

    const finalCategories = [
        { id: 0, name: t("productShowcase.tabs.all") },
        ...(Array.isArray(data?.data) ? data.data : []),
    ];

    return (
        <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val)}
            dir={i18n.language === "en" ? "ltr" : "rtl"}
            className="w-full"
        >
            <TabsList className="bg-muted/50 h-auto block max-w-4xl sm:w-fit mb-5">
                <Carousel opts={{ align: "start" }}>
                    <CarouselContent className="pl-3">
                        {finalCategories.map((category) => (
                            <CarouselItem key={category.id} className="basis-auto pl-1">
                                <TabsTrigger
                                    value={String(category.id)}
                                    className="text-xs sm:text-sm border font-medium data-[state=active]:bg-primary data-[state=active]:text-white px-2 py-3 sm:px-4"
                                >
                                    {category.name}
                                </TabsTrigger>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </TabsList>

            {finalCategories.map((category) => (
                <TabsContent key={category.id} value={String(category.id)} className="mt-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-4">
                        {getFilteredProducts(String(category.id)).map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default FilteredProductsCategories;
