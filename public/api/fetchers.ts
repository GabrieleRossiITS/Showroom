import type { Artwork, Exhibition, SouvenirsItem } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:7036/api/v1";
const API_KEY = import.meta.env.VITE_API_KEY || "";

/**
 * Handle development SSL certificate issues in Node.js (SSR)
 */
if (typeof window === "undefined" && API_BASE_URL.includes("localhost")) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

/**
 * Normalizes URLs to ensure they point to the correct API host
 */
const normalizeUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    // If it's a relative path starting with /images, point it to the API
    if (url.startsWith("/images")) {
        return `${API_BASE_URL.replace("/v1", "")}${url}`;
    }
    return url;
};

/**
 * Helper to build consistent headers for API requests
 */
const getHeaders = (lang?: string) => {
    const headers: Record<string, string> = {
        "X-API-KEY": API_KEY,
    };
    if (lang) {
        headers["Accept-Language"] = lang;
    }
    return headers;
};

export const getExhibitions = async (lang?: string): Promise<Exhibition[]> => {
    const response = await fetch(`${API_BASE_URL}/exhibitions`, {
        method: "GET",
        headers: getHeaders(lang),
    });

    if (!response.ok) {
        throw new Error("Error while fetching exhibitions");
    }

    const data: Exhibition[] = await response.json();
    return data.map((exp) => ({
        ...exp,
        imageUrl: normalizeUrl(exp.imageUrl),
    }));
};

export const getArtworks = async (lang?: string): Promise<Artwork[]> => {
    const response = await fetch(`${API_BASE_URL}/artworks`, {
        method: "GET",
        headers: getHeaders(lang),
    });

    if (!response.ok) {
        throw new Error("Error while fetching artworks");
    }

    const data: Artwork[] = await response.json();
    return data.map((art) => ({
        ...art,
        imageUrl: normalizeUrl(art.imageUrl),
    }));
};

export const getArtworkById = async (id: number, lang?: string): Promise<Artwork> => {
    const response = await fetch(`${API_BASE_URL}/artworks/${id}`, {
        method: "GET",
        headers: getHeaders(lang),
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Artwork not found");
        }
        throw new Error("Error while fetching artwork detail");
    }

    const data: Artwork = await response.json();
    return {
        ...data,
        imageUrl: normalizeUrl(data.imageUrl),
    };
};

export const getExhibitionById = async (id: number, lang?: string): Promise<Exhibition> => {
    const response = await fetch(`${API_BASE_URL}/exhibitions/${id}`, {
        method: "GET",
        headers: getHeaders(lang),
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Exhibition not found");
        }
        throw new Error("Error while fetching exhibition detail");
    }

    const data: Exhibition = await response.json();
    return {
        ...data,
        imageUrl: normalizeUrl(data.imageUrl),
    };
};

export const getShopItems = async (lang?: string): Promise<SouvenirsItem[]> => {
    const response = await fetch(`${API_BASE_URL}/souvenirs`, {
        method: "GET",
        headers: getHeaders(lang),
    });

    if (!response.ok) throw new Error("Error while fetching souvenirs");
    const data: SouvenirsItem[] = await response.json();
    return data.map((item) => ({
        ...item,
        imageUrl: normalizeUrl(item.imageUrl),
    }));
};


