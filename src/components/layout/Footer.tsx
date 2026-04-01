import { FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const year = new Date().getFullYear();
    const { t } = useTranslation();

    return (
        <footer
            className="
                fixed bottom-0 left-0 right-0 
                z-50 
                py-4 px-6 md:px-14
                bg-black/60 border-t border-white/10 
                backdrop-blur-md shadow-lg
                flex flex-col md:flex-row justify-between items-center gap-4
                text-(--vintage-sepia)
            "
        >
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <p className="text-sm tracking-wide">
                    &copy; {year}{" "}
                    <span className="font-semibold text-white/90">
                        Pixel Voyage
                    </span>
                    . <span className="opacity-80">{t("footer.rights")}</span>
                </p>

                <p className="text-xs text-white mt-1 font-mono tracking-wider">
                    {t("footer.engineering")}: G. Rossi, N. Singh, L.
                    Veneruzzo, R. Ranghiuc
                </p>
            </div>

            <a
                href="https://github.com/GabrieleRossiITS/Showroom"
                target="_blank"
                rel="noreferrer"
                className="text-(--vintage-sepia) transition-colors duration-300 hover:text-(--burnished-copper) p-2"
                aria-label={t("footer.githubLabel")}
                title="GitHub Repository"
            >
                <FaGithub className="w-6 h-6" />
            </a>
        </footer>
    );
}
