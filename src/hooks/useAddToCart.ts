import { useCart } from "@/contexts/CartContext";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
interface IProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    slug: string;
    price_after_discount: string;
    quantity: number;
    quantityToAdd?: number;
}
export const useAddToCart = () => {
    const { addItem, items, updateQuantity } = useCart();
    const { t } = useTranslation();

    const addToCart = (
        {
            id,
            name,
            price,
            image,
            slug,
            price_after_discount,
            quantity,
            quantityToAdd,
        }: IProduct
    ) => {
    
        if (quantity === 0) {
            toast.error(t("unavailableDescription"),);
            return false;
        }
        if (quantityToAdd && quantityToAdd <= quantity) {
            console.log("quantityToAdd", quantityToAdd);
            addItem({ id, name, price, image, slug ,price_after_discount});
            updateQuantity(id, quantityToAdd);
            toast.success(t("addedToCartDescription"));
            return true;
        }

        const existingItem = items.find((item) => item.id === id);

        if (!existingItem || existingItem?.quantity < quantity) {
            addItem({ id, name, price, image, slug,price_after_discount });
            toast.success(t("addedToCartDescription"));
            return true;
        } else {
            console.log("existingItem", existingItem);
            console.log("quantity", quantity);
            console.log("existingItem?.quantity", existingItem?.quantity);
            toast.error(t("quantityReachedDescription"));
            return false;
        }
    };

    return { addToCart };
};
