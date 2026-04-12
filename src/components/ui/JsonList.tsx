export function JsonList({ jsonString }: { jsonString: string }) {
    let parsedData: any = null;

    try {
        if (jsonString) {
            parsedData = JSON.parse(jsonString);
        }
    } catch (error) {
        console.error("Errore di parsing:", error);
    }

    if (!parsedData) return <p>Nessun dettaglio disponibile.</p>;

    const renderObject = (obj: Record<string, any>) => {
        return (
            <ul className="space-y-2 text-sm text-(--deep-charcoal)">
                {Object.entries(obj).map(([key, value]) => (
                    <li
                        key={key}
                        className="flex border-b border-white/10 pb-1"
                    >
                        <span className="font-bold w-1/3 capitalize text-(--burnished-copper)">
                            {key.replace(/_/g, " ")}:
                        </span>
                        <span className="w-2/3">
                            {typeof value === "object" && value !== null
                                ? renderObject(value)
                                : String(value)}
                        </span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            {Array.isArray(parsedData) ? (
                <div className="space-y-4">
                    {parsedData.map((item, index) => (
                        <div key={index} className="p-3 rounded-lg">
                            {renderObject(item)}
                        </div>
                    ))}
                </div>
            ) : (
                renderObject(parsedData)
            )}
        </>
    );
}
