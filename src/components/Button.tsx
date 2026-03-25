type props = {
    children: React.ReactNode;
    outline?: boolean;
    background?: boolean;
    className?: string;
    rounded?: boolean;
    disabled?: boolean;
    onClick: () => void;
}

export default function Button({ children, outline, background, className, rounded, disabled, onClick }: props) {
    return (
        <button
            onClick={onClick}
            className={className}
            disabled={disabled}
            style={{
                outline: outline ? '1px solid #ccc' : 'none',
                background: background ? '#ccc' : 'none',
                borderRadius: rounded ? '50px' : '0',
            }}
        >
            {children}
        </button>
    )
}
