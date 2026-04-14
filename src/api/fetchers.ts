import type {
    Artwork,
    Cart,
    CartItem,
    AddCartItemRequest,
    Category,
    Exhibition,
    ExhibitionTimeSlot,
    Order,
    SouvenirsItem,
    Ticket,
    User,
    TicketTier,
} from "../types";

// ─── Config ───────────────────────────────────────────────────────────────────

// 1. Partiamo con l'URL di base per il Browser.
// In locale leggerà "https://localhost:7173/api" dal tuo .env
// In produzione (Docker) fallbacka a "/api" gestito da Nginx
let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// 2. Controllo per il Server-Side Rendering (SSR)
if (typeof window === "undefined") {
    // Se siamo nel server, cerchiamo la variabile speciale di Docker usando process.env
    // Se esiste (siamo in Docker), sovrascriviamo l'URL.
    // Se NON esiste (siamo su npm run dev locale), manteniamo https://localhost:7173/api
    if (process.env.VITE_SSR_API_URL) {
        API_BASE_URL = process.env.VITE_SSR_API_URL;
    }
}

/**
 * Disabilita i controlli SSL per il dev locale (Solo SSR)
 */
if (typeof window === "undefined" && API_BASE_URL.includes("localhost")) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Normalizes image URLs: relative /media/* paths are rewritten to point at
 * the backend host so they resolve correctly on the frontend.
 */
const normalizeUrl = (url: string): string => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("/media")) {
        return `${API_BASE_URL.replace(API_BASE_URL.includes("http://backend:8080") ? "http://backend:8080/api" : "/api", "")}${url}`;
    }
    return url;
};

/**
 * Builds common request headers.
 * Pass `lang` to set Accept-Language; pass `token` to include Authorization.
 */
const getHeaders = (lang?: string, token?: string): Record<string, string> => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (lang) headers["Accept-Language"] = lang;
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
};

/**
 * Retrieves the JWT from localStorage (set after login).
 */
const getToken = (): string | undefined =>
    localStorage.getItem("showroom_token") ?? undefined;

// ─── Auth (/api/auth) ────────────────────────────────────────────────────────

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ChangePasswordRequest {
    email: string;
    currentPassword: string;
    newPassword: string;
}

/** POST /api/auth/login  →  sets jwt_token cookie on the backend */
export const login = async (data: LoginRequest): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: getHeaders(),
        credentials: "include", // needed to receive the HttpOnly cookie
        body: JSON.stringify(data),
    });
    if (!res.ok)
        throw new Error(
            res.status === 400
                ? "Credenziali non valide"
                : "Errore durante il login",
        );
    return res.json();
};

/** POST /api/auth/register */
export const register = async (data: RegisterRequest): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok)
        throw new Error(
            "Registrazione fallita. L'email potrebbe essere già in uso.",
        );
    return res.json();
};

/** POST /api/auth/logout  →  clears jwt_token cookie */
export const logout = async (): Promise<void> => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: getHeaders(),
        credentials: "include",
    });
};

/** PATCH /api/auth/change-password */
export const changePassword = async (
    data: ChangePasswordRequest,
): Promise<string> => {
    const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "PATCH",
        headers: getHeaders(undefined, getToken()),
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (!res.ok)
        throw new Error(
            "Cambio password fallito: credenziali errate o utente non trovato.",
        );
    return res.text();
};

// ─── Artworks (/api/artworks) ────────────────────────────────────────────────

/** GET /api/artworks?culture={lang} */
export const getArtworks = async (lang?: string): Promise<Artwork[]> => {
    const url = lang
        ? `${API_BASE_URL}/artworks?culture=${lang}`
        : `${API_BASE_URL}/artworks`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Errore nel recupero delle opere");

    const data: Artwork[] = await res.json();
    return data.map((a) => ({ ...a, imageUrl: normalizeUrl(a.imageUrl) }));
};

/** GET /api/artworks/{id}?culture={lang} */
export const getArtworkById = async (
    id: number,
    lang?: string,
): Promise<Artwork> => {
    const url = lang
        ? `${API_BASE_URL}/artworks/${id}?culture=${lang}`
        : `${API_BASE_URL}/artworks/${id}`;
    const res = await fetch(url, { headers: getHeaders(lang) });
    if (!res.ok)
        throw new Error(
            res.status === 404
                ? "Opera non trovata"
                : "Errore nel recupero dell'opera",
        );

    const data: Artwork = await res.json();
    return { ...data, imageUrl: normalizeUrl(data.imageUrl) };
};

// ─── Exhibitions (/api/exhibitions) ──────────────────────────────────────────

/** GET /api/exhibitions?culture={lang} */
export const getExhibitions = async (lang?: string): Promise<Exhibition[]> => {
    const url = lang
        ? `${API_BASE_URL}/exhibitions?culture=${lang}`
        : `${API_BASE_URL}/exhibitions`;
    const res = await fetch(url, { headers: getHeaders(lang) });
    if (!res.ok) throw new Error("Errore nel recupero delle mostre");

    const data: Exhibition[] = await res.json();
    return data.map((e) => ({ ...e, imageUrl: normalizeUrl(e.imageUrl) }));
};

/** GET /api/exhibitions/{id}?culture={lang} */
export const getExhibitionById = async (
    id: number,
    lang?: string,
): Promise<Exhibition> => {
    const url = lang
        ? `${API_BASE_URL}/exhibitions/${id}?culture=${lang}`
        : `${API_BASE_URL}/exhibitions/${id}`;
    const res = await fetch(url, { headers: getHeaders(lang) });
    if (!res.ok)
        throw new Error(
            res.status === 404
                ? "Mostra non trovata"
                : "Errore nel recupero della mostra",
        );

    const data: Exhibition = await res.json();
    return { ...data, imageUrl: normalizeUrl(data.imageUrl) };
};

/** GET /api/exhibitions/{id}/timeslots */
export const getExhibitionTimeSlots = async (id: number): Promise<ExhibitionTimeSlot[]> => {
    const url = `${API_BASE_URL}/exhibitions/${id}/timeslots`;
    const res = await fetch(url);
    if (!res.ok)
        throw new Error(
            "Errore nel recupero degli slot temporali della mostra",
        );

    return res.json();
};

/** GET /api/exhibitions/{id}/artworks?culture={lang} */
export const getExhibitionArtworks = async (
    id: number,
    lang?: string,
): Promise<Artwork[]> => {
    const url = lang
        ? `${API_BASE_URL}/exhibitions/${id}/artworks?culture=${lang}`
        : `${API_BASE_URL}/exhibitions/${id}/artworks`;
    const res = await fetch(url, { headers: getHeaders(lang) });
    if (!res.ok)
        throw new Error("Errore nel recupero delle opere della mostra");

    const data: Artwork[] = await res.json();
    return data.map((a) => ({ ...a, imageUrl: normalizeUrl(a.imageUrl) }));
};

/** GET /api/exhibitions/{id}/tiers?culture={lang} */
export const getExhibitionTiers = async (
    lang?: string,
): Promise<TicketTier[]> => {
    const url = lang
        ? `${API_BASE_URL}/exhibitions/tiers?culture=${lang}`
        : `${API_BASE_URL}/exhibitions/tiers`;
    const res = await fetch(url, {
        headers: getHeaders(lang),
    });
    if (!res.ok) throw new Error("Errore nel recupero dei prezzi");
    return res.json();
};

// ─── Categories (/api/categories) ────────────────────────────────────────────

/** GET /api/categories */
export const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${API_BASE_URL}/categories`, {
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Errore nel recupero delle categorie");
    return res.json();
};

/** GET /api/categories/{id} */
export const getCategoryById = async (id: number): Promise<Category> => {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
        headers: getHeaders(),
    });
    if (!res.ok)
        throw new Error(
            res.status === 404
                ? "Categoria non trovata"
                : "Errore nel recupero della categoria",
        );
    return res.json();
};

/** GET /api/categories/{id}/souvenirs?culture={lang} */
export const getCategorySouvenirs = async (
    id: number,
    lang?: string,
): Promise<SouvenirsItem[]> => {
    const url = lang
        ? `${API_BASE_URL}/categories/${id}/souvenirs?culture=${lang}`
        : `${API_BASE_URL}/categories/${id}/souvenirs`;
    const res = await fetch(url, { headers: getHeaders(lang) });
    if (!res.ok)
        throw new Error("Errore nel recupero dei souvenir della categoria");

    const data: SouvenirsItem[] = await res.json();
    return data.map((s) => ({ ...s, imageUrl: normalizeUrl(s.imageUrl) }));
};

// ─── Souvenirs (/api/souvenirs) ───────────────────────────────────────────────

/** GET /api/souvenirs?culture={lang} */
export const getShopItems = async (lang?: string): Promise<SouvenirsItem[]> => {
    const url = lang
        ? `${API_BASE_URL}/souvenirs?culture=${lang}`
        : `${API_BASE_URL}/souvenirs`;
    const res = await fetch(url, { headers: getHeaders(lang) });
    if (!res.ok) throw new Error("Errore nel recupero dei souvenir");

    const data: SouvenirsItem[] = await res.json();
    return data.map((s) => ({ ...s, imageUrl: normalizeUrl(s.imageUrl) }));
};

/** GET /api/souvenirs/{id}?culture={lang} */
export const getSouvenirById = async (
    id: number,
    lang?: string,
): Promise<SouvenirsItem> => {
    const url = lang
        ? `${API_BASE_URL}/souvenirs/${id}?culture=${lang}`
        : `${API_BASE_URL}/souvenirs/${id}`;
    const res = await fetch(url, { headers: getHeaders(lang) });
    if (!res.ok)
        throw new Error(
            res.status === 404
                ? "Souvenir non trovato"
                : "Errore nel recupero del souvenir",
        );

    const data: SouvenirsItem = await res.json();
    return { ...data, imageUrl: normalizeUrl(data.imageUrl) };
};

// ─── Users (/api/users) ───────────────────────────────────────────────────────
// All user endpoints require authentication (JWT cookie / Bearer token)

/** GET /api/users/{id} */
export const getUserById = async (id: number): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        headers: getHeaders(undefined, getToken()),
        credentials: "include",
    });
    if (!res.ok)
        throw new Error(
            res.status === 403
                ? "Accesso negato"
                : res.status === 404
                    ? "Utente non trovato"
                    : "Errore nel recupero dell'utente",
        );
    return res.json();
};

// ─── Cart (/api/users/{userId}/cart) ─────────────────────────────────────────

/** GET /api/users/{userId}/cart?culture={lang} */
export const getUserCart = async (
    userId: number,
    lang?: string,
): Promise<Cart> => {
    const url = lang
        ? `${API_BASE_URL}/users/${userId}/cart?culture=${lang}`
        : `${API_BASE_URL}/users/${userId}/cart`;
    const res = await fetch(url, {
        headers: getHeaders(lang, getToken()),
        credentials: "include",
    });
    if (!res.ok)
        throw new Error(
            res.status === 403
                ? "Accesso negato"
                : "Errore nel recupero del carrello",
        );
    return res.json();
};

/** POST /api/users/{userId}/cart/items */
export const addItemToCart = async (
    userId: number,
    item: AddCartItemRequest,
    lang?: string,
): Promise<CartItem> => {
    const url = lang
        ? `${API_BASE_URL}/users/${userId}/cart/items?culture=${lang}`
        : `${API_BASE_URL}/users/${userId}/cart/items`;
    const res = await fetch(url, {
        method: "POST",
        headers: getHeaders(lang, getToken()),
        credentials: "include",
        body: JSON.stringify(item),
    });
    if (!res.ok)
        throw new Error(
            res.status === 403
                ? "Accesso negato"
                : "Errore nell'aggiunta dell'articolo al carrello",
        );
    return res.json();
};

/** DELETE /api/users/{userId}/cart/items/{souvenirId} */
export const removeItemFromCart = async (
    userId: number,
    souvenirId: number,
): Promise<boolean> => {
    const res = await fetch(
        `${API_BASE_URL}/users/${userId}/cart/items/${souvenirId}`,
        {
            method: "DELETE",
            headers: getHeaders(undefined, getToken()),
            credentials: "include",
        },
    );
    if (!res.ok)
        throw new Error(
            res.status === 403
                ? "Accesso negato"
                : res.status === 404
                    ? "Articolo non trovato nel carrello"
                    : "Errore nella rimozione dell'articolo",
        );
    return res.json();
};

/** POST /api/users/{userId}/cart/checkout?paymentSuccess={bool} */
export const checkoutCart = async (
    userId: number,
    paymentSuccess: boolean,
): Promise<void> => {
    const res = await fetch(
        `${API_BASE_URL}/users/${userId}/cart/checkout?paymentSuccess=${paymentSuccess}`,
        {
            method: "POST",
            headers: getHeaders(undefined, getToken()),
            credentials: "include",
        },
    );
    if (!res.ok)
        throw new Error(
            res.status === 403
                ? "Accesso negato"
                : res.status === 400
                    ? "Carrello vuoto o checkout non riuscito"
                    : "Errore durante il checkout",
        );
};

// ─── Orders (/api/users/{userId}/orders) ─────────────────────────────────────

/** GET /api/users/{userId}/orders?culture={lang} */
export const getUserOrders = async (
    userId: number,
    lang?: string,
): Promise<Order[]> => {
    const url = lang
        ? `${API_BASE_URL}/users/${userId}/orders?culture=${lang}`
        : `${API_BASE_URL}/users/${userId}/orders`;
    const res = await fetch(url, {
        headers: getHeaders(lang, getToken()),
        credentials: "include",
    });
    if (!res.ok)
        throw new Error(
            res.status === 403
                ? "Accesso negato"
                : "Errore nel recupero degli ordini",
        );
    return res.json();
};

/** GET /api/users/{userId}/orders/{orderId}?culture={lang} */
export const getUserOrderById = async (
    userId: number,
    orderId: number,
    lang?: string,
): Promise<Order> => {
    const url = lang
        ? `${API_BASE_URL}/users/${userId}/orders/${orderId}?culture=${lang}`
        : `${API_BASE_URL}/users/${userId}/orders/${orderId}`;
    const res = await fetch(url, {
        headers: getHeaders(lang, getToken()),
        credentials: "include",
    });
    if (!res.ok)
        throw new Error(
            res.status === 403
                ? "Accesso negato"
                : res.status === 404
                    ? "Ordine non trovato"
                    : "Errore nel recupero dell'ordine",
        );
    return res.json();
};

// ─── Tickets (/api/users/{userId}/tickets) ───────────────────────────────────

/** GET /api/users/{userId}/tickets?culture={lang} */
export const getUserTickets = async (
    userId: number,
    lang?: string,
): Promise<Ticket[]> => {
    const url = lang
        ? `${API_BASE_URL}/users/${userId}/tickets?culture=${lang}`
        : `${API_BASE_URL}/users/${userId}/tickets`;
    const res = await fetch(url, {
        headers: getHeaders(lang, getToken()),
        credentials: "include",
    });
    if (!res.ok)
        throw new Error(
            res.status === 403
                ? "Accesso negato"
                : "Errore nel recupero dei biglietti",
        );
    return res.json();
};
