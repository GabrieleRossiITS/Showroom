import { useEffect, useState } from "react";
import { cn } from "#/lib/utils";

interface ProtectedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    fallback?: string;
}

export function ProtectedImage({ src, fallback, className, alt, ...props }: ProtectedImageProps) {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!src) {
            setError(true);
            setIsLoading(false);
            return;
        }

        const API_KEY = import.meta.env.VITE_API_KEY || "";
        let objectUrl: string | null = null;

        const fetchImage = async () => {
            setIsLoading(true);
            setError(false);
            try {
                const response = await fetch(src, {
                    headers: {
                        "X-API-KEY": API_KEY,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch image");

                const blob = await response.blob();
                objectUrl = URL.createObjectURL(blob);
                setImageUrl(objectUrl);
            } catch (err) {
                console.error("Error loading protected image:", err);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImage();

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [src]);

    if (error || !src) {
        return (
            <div className={cn("bg-black/10 flex items-center justify-center", className)}>
                {fallback || <span className="text-[10px] uppercase font-bold opacity-30 px-4 text-center">{alt}</span>}
            </div>
        );
    }

    return (
        <div className={cn("relative overflow-hidden", className)}>
            <img
                src={imageUrl}
                alt={alt}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-500",
                    isLoading ? "opacity-0" : "opacity-100",
                )}
                {...props}
            />
            {isLoading && (
                <div className="absolute inset-0 bg-black/5 animate-pulse" />
            )}
        </div>
    );
}
