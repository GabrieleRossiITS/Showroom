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

/*
useEffect(() => {
        let currentUrl: string | null = null;

        fetch("https://localhost:7036/api/images/1.jpeg", {
            method: "GET",
            headers: {
                "X-API-KEY": "ui4gPw6tyvohq8jc?w4uoyrbtGHhdjl!",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Errore HTTP: ${res.status}`);
                }
                return res.blob();
            })
            .then((blob) => {
                // Crea l'URL temporaneo
                currentUrl = URL.createObjectURL(blob);
                // Salvalo nello stato (questo farà aggiornare l'interfaccia)
                setImageUrl(currentUrl);
            })
            .catch((error) => {
                console.error("Impossibile caricare l'immagine:", error);
            });

        // Cleanup: distrugge l'URL temporaneo quando esci dalla pagina 
        // per liberare memoria (ottima pratica in React)
        return () => {
            if (currentUrl) {
                URL.revokeObjectURL(currentUrl);
            }
        };
    }, []);


*/

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
