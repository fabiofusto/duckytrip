"use client";

import styles from "../../styles/button.module.css";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, FC } from "react";
import { IconType } from "react-icons";

export const buttonVariants = cva(styles.standard, {
  variants: {
    variant: {
      default: styles.variantdefault,
      outline: styles.variantoutline,
    },
    size: {
      default: styles.sizedefault,
      small: styles.sizesmall,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label: string;
  disabled?: boolean;
  icon?: IconType;
}

const Button: FC<ButtonProps> = ({
  label,
  disabled,
  icon: Icon,
  variant,
  size,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size }))}
      disabled={disabled}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
