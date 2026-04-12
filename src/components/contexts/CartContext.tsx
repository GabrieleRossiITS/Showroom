import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { getUserCart, addItemToCart, removeItemFromCart, checkoutCart } from "#/api/fetchers";
import type { Cart, CartItem, AddCartItemRequest } from "#/types";
import { useTranslation } from "react-i18next";

interface CartContextType {
    cart: Cart | null;
    isLoading: boolean;
    addToCart: (item: AddCartItemRequest) => Promise<void>;
    removeFromCart: (souvenirId: number) => Promise<void>;
    checkout: (paymentSuccess: boolean) => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const { i18n } = useTranslation();
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const lang = i18n.language.split("-")[0];

    const refreshCart = useCallback(async () => {
        if (!isAuthenticated || !user) {
            setCart(null);
            return;
        }
        setIsLoading(true);
        try {
            const currentCart = await getUserCart(user.id, lang);
            setCart(currentCart);
        } catch (error) {
            console.error("Failed to fetch cart:", error);
        } finally {
            setIsLoading(false);
        }
    }, [user, isAuthenticated, lang]);

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const addToCart = async (item: AddCartItemRequest) => {
        if (!isAuthenticated || !user) return;
        try {
            await addItemToCart(user.id, item, lang);
            await refreshCart();
        } catch (error) {
            console.error("Failed to add to cart:", error);
            throw error;
        }
    };

    const removeFromCart = async (souvenirId: number) => {
        if (!isAuthenticated || !user) return;
        try {
            await removeItemFromCart(user.id, souvenirId);
            await refreshCart();
        } catch (error) {
            console.error("Failed to remove from cart:", error);
            throw error;
        }
    };

    const checkout = async (paymentSuccess: boolean) => {
        if (!isAuthenticated || !user) return;
        try {
            await checkoutCart(user.id, paymentSuccess);
            setCart(null); // Clear local cart after successful checkout
        } catch (error) {
            console.error("Checkout failed:", error);
            throw error;
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                isLoading,
                addToCart,
                removeFromCart,
                checkout,
                refreshCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
