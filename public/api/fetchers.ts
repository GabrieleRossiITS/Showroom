import type { Artwork, Exhibition } from "../types";

export const getExhibitions = async (): Promise<Exhibition[]> => {
    const response = await fetch("http://localhost:3000/api/exhibitions.json");

    if (!response.ok) {
        throw new Error("Error while fetching exhibitions");
    }

    const data: Exhibition[] = await response.json();
    return data;
};

export const getArtworks = async (): Promise<Artwork[]> => {
    const response = await fetch("http://localhost:3000/api/artworks.json");

    if (!response.ok) {
        throw new Error("Error while fetching artworks");
    }

    const data: Artwork[] = await response.json();
    return data;
};

export const getArtworkById = async (id: number): Promise<Artwork> => {
    const response = await fetch("http://localhost:3000/api/artworks.json");

    if (!response.ok) {
        throw new Error("Error while fetching artworks");
    }

    const data: Artwork[] = await response.json();
    const artworkData = data.find((artwork) => artwork.id === id);

    if (!artworkData) {
        throw new Error("Artwork not found");
    }

    return artworkData;
};

export const getExhibitionById = async (id: number): Promise<Exhibition> => {
    const response = await fetch("http://localhost:3000/api/exhibitions.json");

    if (!response.ok) {
        throw new Error("Error while fetching exhibitions");
    }

    const data: Exhibition[] = await response.json();
    const exhibitionData = data.find((exhibition) => exhibition.id === id);

    if (!exhibitionData) {
        throw new Error("Exhibition not found");
    }

    return exhibitionData;
};
