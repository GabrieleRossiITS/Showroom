export interface Quote {
    id: number;
    text: string;
}

export interface Artwork {
    id: number;
    archiveId: string;
    title: string;
    description: string;
    year: number;
    historicalPeriod: string;
    support: string;
    camera: string;
    dimensions: string;
    imageUrl: string;
}

export interface Ticket {
    id: string;
    price: number;
    remainingTickets: number;
    isAvailable: boolean;
    dateTime: string;
    tier: TicketTier;
}

export interface TicketTier {
    id: string;
    name: string;
    description: string;
}

export interface Exhibition {
    id: number;
    location: string;
    mapsUrl: string;
    status: "ongoing" | "past" | "upcoming";
    startDate: string;
    endDate: string;
    title: string;
    description: string;
    imageUrl: string;
    tickets: Ticket[];
}

export interface SouvenirsItem {
    id: number;
    name: string;
    shortDescription: string;
    fullDescription: string;
    specifications: string;
    category: string;
    price: number;
    inStock: boolean;
    quantityAvailable: number;
    imageUrl: string;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
}
