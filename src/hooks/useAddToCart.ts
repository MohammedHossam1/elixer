import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export const useAddToCart = () => {
    const { addItem, items, updateQuantity } = useCart();
    const { toast } = useToast();
    const { t } = useTranslation();

    const addToCart = (
        id: string,
        name: string,
        price: number,
        image: string,
        quantity: number,
        quantityToAdd?: number
    ) => {
        if (quantity === 0) {
            toast({
                title: t("outOfStock"),
                description: t("unavailableDescription", { name }),
                className: "border border-yellow-500",
            });
            return false;
        }
        if (quantityToAdd && quantityToAdd <= quantity) {
            console.log("quantityToAdd", quantityToAdd);
            addItem({ id, name, price, image });
            updateQuantity(id, quantityToAdd);
            toast({
                title: t("addedToCart", { name }),
                description: t("addedToCartDescription", { name }),
                className: "border border-green-500",
            });
            return true;
        }

        const existingItem = items.find((item) => item.id === id);

        if (!existingItem || existingItem?.quantity < quantity) {
            addItem({ id, name, price, image });
            toast({
                title: t("addedToCart", { name }),
                description: t("addedToCartDescription", { name }),
                className: "border border-green-500",
            });
            return true;
        } else {
            toast({
                title: t("quantityReachedTitle"),
                description: t("quantityReachedDescription", { name }),
                className: "border border-yellow-500",
            });
            return false;
        }
    };

    return { addToCart };
};
