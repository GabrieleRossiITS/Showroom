export interface Quote {
    id: number;
    text: string;
}

export interface Artwork {
    id: number;
    title: string;
    year: number;
    image: string;
    support: string;
    description: string;
}

export interface Exhibition {
    id: number;
    title: string;
    location: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    maps_url: string;
    status: "ongoing" | "past" | "upcoming";
    start_date: string;
    end_date: string;
    description: string;
    image: string;
    artworks_included: number[];
    ticket_info: {
        tiers: TicketTier[];
        slots: TimeSlot[];
    };
}

export interface TicketTier {
    id: string;
    name: string;
    price: number;
    description: string;
}

export interface TimeSlot {
    time: string;
    ticketsLeft: number;
}

export interface ShopItem {
    id: number;
    title: string;
    price: number;
    category: "print" | "book" | "postcard" | "accessory";
    image: string;
    description: string;
}
