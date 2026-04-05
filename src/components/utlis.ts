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

export const formatTime = (time: string) => {
    if (!time) return "";
    const s = time.split("T")[1];
    const [hours, minutes] = s.split(":");
    return `${hours}:${minutes}`;
};

export const formatDate = (date: string) => {
    if (!date) return "";
    const s = date.split("T")[0];
    const [year, month, day] = s.split("-");
    return `${day}/${month}/${year}`;
};
