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
    artworks_included: number[];
}
