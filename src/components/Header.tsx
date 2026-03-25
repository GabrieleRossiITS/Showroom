import { Link } from "@tanstack/react-router";

type Props = {
    pageTitle: string
}

export default function Header({ pageTitle }: Props) {

    const navLinks = [
        { to: "/", label: "Opere" },
        { to: "/", label: "Artista" },
        { to: "/", label: "Mostre" },
        { to: "/", label: "Contatti" },
    ];

    return (
        <header className="
                            absolute top-0 left-0 right-0 
                            mt-4 mx-4
                            py-6 px-14
                            z-50 
                            rounded-4xl bg-white/20 border border-white/20 
                            flex justify-between items-center 
                            text-(--deep-charcoal)
                            ">
            <h1 className="text-md font-bold tracking-widest uppercase">
                {pageTitle}
            </h1>
            <nav>
                <ul className="flex gap-8 lg:gap-12 font-medium text-md">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <Link to={link.to} className="hover:text-(--burnished-copper) transition-colors">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
