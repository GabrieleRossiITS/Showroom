import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
    component: AdminPage,
    staticData: {
        title: "Good Boy",
    },
});

function AdminPage() {
    return (
        <div className="fixed inset-0 z-9999 bg-white flex flex-col items-center justify-center">
            <h1 className="text-black text-6xl md:text-9xl font-black mb-12">
                GOOD BOY
            </h1>
            <p className="text-gray">Bro... seriamente?</p>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-enOFrnMSm8Fq32InwElG7ii_5qDeGaTwFw&s"
                alt="Immagine Temporanea"
                className="rounded-lg shadow-2xl"
            />
        </div>
    );
}
