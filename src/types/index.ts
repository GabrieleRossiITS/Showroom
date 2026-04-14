// ─── Artwork ─────────────────────────────────────────────────────────────────

export interface Artwork {
    id: number;
    archiveId: string;
    name: string;
    title: string;
    description: string;
    year: number;
    historicalPeriod: string;
    support: string;
    camera: string;
    dimensions: string;
    imageUrl: string;
}

// ─── Exhibition ───────────────────────────────────────────────────────────────

export interface ExhibitionTimeSlot {
    id: number;
    dateTime: string; // ISO date string
    price: number;
    remainingTickets: number;
    isAvailable: boolean;
}

export interface Exhibition {
    id: number;
    name: string;
    location: string;
    mapsUrl: string;
    status: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    imageUrl: string;
    title: string;
    description: string;
}

export interface ExhibitionOpeningHour {
    id: number;
    exhibitionId: number;
    daysOfWeek: number[]; // [1, 2, 3...] dove 1 è Lunedì
    startTime: string;
    endTime: string;
    maxCapacity: number;
}

// ─── Category ────────────────────────────────────────────────────────────────

export interface Category {
    id: number;
    name: string;
    description: string;
}

// ─── Souvenir / Shop ─────────────────────────────────────────────────────────

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

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
    id: number;
    cartId: number;
    souvenirId: number;
    souvenirName: string;
    souvenirPrice: number;
    quantity: number;
    souvenirImageUrl: string;
}

export interface Cart {
    id: number;
    items: CartItem[];
    createdAt: string;
}

export interface AddCartItemRequest {
    souvenirId: number;
    quantity: number;
}

// ─── Order ────────────────────────────────────────────────────────────────────

export interface OrderItem {
    id: number;
    orderId: number;
    souvenirId: number;
    souvenirName: string;
    quantity: number;
    unitPrice: number;
}

export interface Order {
    id: number;
    userId: number;
    createdAt: string; // ISO date string
    status: string;
    totalAmount: number;
    items: OrderItem[];
}

// ─── Ticket ───────────────────────────────────────────────────────────────────

export interface Ticket {
    id: number;
    exhibitionId: number;
    exhibitionTitle: string;
    tierId: number;
    tierName: string;
    tierPrice: number;
    userId: number;
    visitDate: string; // ISO date string
    timeSlotId: number;
    slotStartTime: string;
    slotEndTime: string;
    purchasedAt: string; // ISO date string
}

export interface TicketTier {
    id: number;
    name: string;
    price: number;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface Quote {
    id: number;
    text: string;
}
