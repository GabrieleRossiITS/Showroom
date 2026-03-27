import { Link } from "@tanstack/react-router";

function redirectHome() {
    window.location.href = "/";
}

export default function Header() {
    const navLinks = [
        { to: "/artworks", label: "Opere" },
        { to: "/artist", label: "Artista" },
        { to: "/exhibitions", label: "Mostre" },
        { to: "/about", label: "Contatti" },
    ];

    return (
        <header
            className="
                fixed top-0 left-0 right-0 
                mt-4 mx-4
                py-5 px-10 md:px-14
                z-50 
                rounded-4xl 
                bg-black/40 border border-white/10 
                backdrop-blur-md shadow-lg
                flex justify-between items-center 
                text-(--vintage-sepia)
            "
        >
            <h1
                className="text-md font-bold tracking-widest uppercase cursor-pointer hover:text-(--burnished-copper) transition-colors duration-300"
                onClick={redirectHome}
            >
                Robert Doisneau
            </h1>
            <nav>
                <ul className="flex gap-8 lg:gap-12 text-md">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className="
                                    text-(--vintage-sepia) font-semibold tracking-wide drop-shadow-sm
                                    hover:text-(--burnished-copper) transition-colors duration-300 
                                    relative py-1
                                    
                                    after:content-[''] after:block after:absolute after:w-full 
                                    after:h-[2px] after:-bottom-1.5 after:bg-(--burnished-copper) 
                                    after:rounded-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300
                                    hover:after:scale-x-100
                                    
                                    /* Questa riga magica mantiene lo stile attivo quando sei sulla pagina! */
                                    [&.active]:text-(--burnished-copper) [&.active]:after:scale-x-100
                                "
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
