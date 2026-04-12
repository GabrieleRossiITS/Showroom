import { useTranslation } from "react-i18next";

export default function ProfileTab({
    profile,
    displayEmail,
    displayName,
}: {
    profile: any;
    displayEmail: string;
    displayName: string;
}) {
    const { t } = useTranslation();

    const fields = [
        { label: t("account.fullName"), value: displayName },
        { label: t("account.email"), value: displayEmail },
        ...(profile?.role
            ? [{ label: t("account.role"), value: profile.role }]
            : []),
    ];

    return (
        <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-sm p-8 md:p-12 space-y-6">
            <h2 className="text-2xl font-bold font-serif text-(--deep-charcoal)">
                {t("account.profileInfo")}
            </h2>
            <div className="divide-y divide-black/5">
                {fields.map((f) => (
                    <div
                        key={f.label}
                        className="py-5 flex justify-between items-center gap-4"
                    >
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-(--parisian-stone)">
                            {f.label}
                        </span>
                        <span className="font-serif text-(--deep-charcoal) text-lg font-medium">
                            {f.value || "—"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
