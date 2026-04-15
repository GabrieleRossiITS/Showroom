import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { getUserTickets, postUserTicket } from "#/api/fetchers";
import type { Ticket, CreateTicketRequest } from "#/types";
import { useTranslation } from "react-i18next";

interface TicketContextType {
    tickets: Ticket[] | null;
    isLoading: boolean;
    addTicket: (item: CreateTicketRequest) => Promise<void>;
    refreshTickets: () => Promise<void>;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const { i18n } = useTranslation();
    const [tickets, setTickets] = useState<Ticket[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const lang = i18n.language.split("-")[0];

    const refreshTickets = useCallback(async () => {
        if (!isAuthenticated || !user) {
            setTickets(null);
            return;
        }
        setIsLoading(true);
        try {
            const currentTickets = await getUserTickets(user.id, lang);
            setTickets(currentTickets);
        } catch (error) {
            console.error("Failed to fetch tickets:", error);
        } finally {
            setIsLoading(false);
        }
    }, [user, isAuthenticated, lang]);

    useEffect(() => {
        refreshTickets();
    }, [refreshTickets]);

    const addTicket = async (item: CreateTicketRequest) => {
        if (!isAuthenticated || !user) return;
        try {
            // Automatically inject the authenticated user's ID
            const requestWithUserId = {
                ...item,
                userId: user.id,
            };
            await postUserTicket(user.id, requestWithUserId, lang);
            await refreshTickets();
        } catch (error) {
            console.error("Failed to add ticket:", error);
            throw error;
        }
    };

    return (
        <TicketContext.Provider
            value={{
                tickets,
                isLoading,
                addTicket,
                refreshTickets,
            }}
        >
            {children}
        </TicketContext.Provider>
    );
};

export const useTicket = () => {
    const context = useContext(TicketContext);
    if (context === undefined) {
        throw new Error("useTicket must be used within a TicketProvider");
    }
    return context;
};
