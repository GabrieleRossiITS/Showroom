export const createArtworkSlug = (id: number, title: string) => {
    const cleanTitle = title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/'/g, "-")
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    return `${id}-${cleanTitle}`;
};
