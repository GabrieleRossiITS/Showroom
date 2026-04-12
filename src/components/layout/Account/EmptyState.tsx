import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export default function EmptyState({
    icon,
    message,
    linkTo,
    linkLabel,
}: {
    icon: React.ReactNode;
    message: string;
    linkTo: string;
    linkLabel: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-center bg-white/30 backdrop-blur-sm rounded-[2.5rem] border border-white/40">
            {icon}
            <p className="text-(--parisian-stone-dark) font-serif text-lg opacity-70 max-w-xs">
                {message}
            </p>
            <Link
                to={linkTo}
                className="flex items-center gap-2 text-(--burnished-copper) font-bold text-sm hover:underline"
            >
                {linkLabel}
                <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
    );
}
