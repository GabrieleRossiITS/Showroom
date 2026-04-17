import React, { createContext, useContext, useState, useEffect } from "react";

import type { User } from "#/types";
import { logout as apiLogout, getUserById } from "#/api/fetchers";

interface AuthContextType {
    user: User | null;
    setAuth: (user: User) => void;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("showroom_user");
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                getUserById(parsedUser.id).catch(() => {
                    setUser(null);
                    localStorage.removeItem("showroom_user");
                });
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
            }
        }

        const handleUnauthorized = () => {
            setUser(null);
            localStorage.removeItem("showroom_user");
        };
        window.addEventListener("auth_unauthorized", handleUnauthorized);
        return () => window.removeEventListener("auth_unauthorized", handleUnauthorized);
    }, []);

    const setAuth = (userData: User) => {
        setUser(userData);
        localStorage.setItem("showroom_user", JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error("Logout API failed", error);
        } finally {
            setUser(null);
            localStorage.removeItem("showroom_user");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setAuth,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
