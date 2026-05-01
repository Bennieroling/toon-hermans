import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSeparator = DropdownMenuPrimitive.Separator

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPortal>
        <DropdownMenuPrimitive.Content
        className={cn(
          "z-50 min-w-32 rounded-2xl border border-border bg-popover p-2 text-sm text-popover-foreground shadow-md outline-none",
          className,
        )}
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenuPortal>
  )
}

function DropdownMenuItem({
  className,
  inset,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "focus:bg-accent/60 focus:text-accent-foreground relative flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 outline-none transition hover:bg-white/6",
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 outline-none transition hover:bg-accent/70",
        inset && "pl-8",
        className,
      )}
      data-slot="dropdown-menu-item"
      {...props}
    />
  )
}

export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger }
