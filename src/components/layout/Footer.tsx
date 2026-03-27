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
                py-4 px-10 md:px-14
                bg-black/40 border-t border-white/10 
                backdrop-blur-md shadow-lg
                flex flex-col md:flex-row justify-between items-center gap-4
                text-(--vintage-sepia)
            "
        >
            <p className="text-sm tracking-wide text-center md:text-left">
                &copy; {year}{" "}
                <span className="font-medium text-white/90">
                    Gabriele Rossi, Navpreet Singh, Lorenzo Veneruzzo, Ruben
                    Ranghiuc.
                </span>{" "}
                <span className="opacity-70">{t("footer.rights")}</span>
            </p>

            <a
                href="https://github.com/GabrieleRossiITS/Showroom"
                target="_blank"
                rel="noreferrer"
                className="text-(--vintage-sepia) transition-colors duration-300 hover:text-(--burnished-copper)"
                aria-label={t("footer.githubLabel")}
                title="GitHub"
            >
                <FaGithub className="w-6 h-6" />
            </a>
        </footer>
    );
}
