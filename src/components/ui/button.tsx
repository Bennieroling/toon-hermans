import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import type { ButtonHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary px-6 py-3 text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:bg-primary/90",
        secondary:
          "bg-secondary px-6 py-3 text-secondary-foreground shadow-sm hover:-translate-y-0.5 hover:bg-secondary/80",
        outline:
          "border border-border bg-transparent px-6 py-3 text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/40",
        ghost:
          "px-3 py-2 text-muted-foreground hover:bg-accent/60 hover:text-foreground",
      },
      size: {
        default: "",
        lg: "px-8 py-4 text-base",
        icon: "size-10 rounded-full px-0 py-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({ asChild, className, size, variant, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} data-slot="button" {...props} />
}

export { Button }
