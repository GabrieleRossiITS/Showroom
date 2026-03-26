import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "#/lib/utils";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import React from "react";

const buttonVariants = cva(
    `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 
    focus-visible:ring-(--ring) disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer hover:translate-y-[-2px] duration-200`,
    {
        variants: {
            variant: {
                primary:
                    "bg-(--deep-charcoal) text-(--vintage-sepia) hover:bg-(--burnished-copper) shadow-lg hover:shadow-xl",
                secondary:
                    "bg-(--parisian-stone) text-(--vintage-sepia) hover:bg-(--parisian-stone-dark)",
                outline:
                    "border-2 border-(--deep-charcoal) text-(--deep-charcoal) hover:bg-(--deep-charcoal)/5",
                ghost: "text-(--deep-charcoal) hover:bg-(--deep-charcoal)/5",
                copper: "bg-(--burnished-copper) text-(--vintage-sepia) hover:bg-(--burnished-copper-deep) shadow-md hover:shadow-lg",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-4 text-xs",
                lg: "h-14 px-10 text-lg",
                xl: "h-16 px-12 text-xl font-bold",
                icon: "h-10 w-10",
            },
            rounded: {
                default: "rounded-(--radius)",
                full: "rounded-full",
                none: "rounded-none",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
            rounded: "default",
        },
    },
);

export interface ButtonProps
    extends
        Omit<HTMLMotionProps<"button">, "variant">,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, rounded, ...props }, ref) => {
        return (
            <motion.button
                whileTap={{ scale: 0.97 }}
                className={cn(
                    buttonVariants({ variant, size, rounded, className }),
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export default Button;
export { buttonVariants };
