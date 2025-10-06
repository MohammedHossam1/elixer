import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: {
    id: number;
    name: string;
  };
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  totalItems: number;
}

const WISHLIST_STORAGE_KEY = "wishlist_items";

function getInitialWishlistItems(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // ignore
  }
  return [];
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(getInitialWishlistItems);

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // ignore
    }
  }, [items]);

  const addItem = (item: WishlistItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  const totalItems = items.length;

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, totalItems }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
