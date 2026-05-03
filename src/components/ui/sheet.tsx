/* eslint-disable react-refresh/only-export-components */

import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import type { ComponentPropsWithoutRef, HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export const Sheet = Dialog.Root
export const SheetPortal = Dialog.Portal
export const SheetTrigger = Dialog.Trigger
export const SheetClose = Dialog.Close
export const SheetOverlay = Dialog.Overlay

export function SheetHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} data-slot="sheet-header" {...props} />
}

export function SheetTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      className={cn("text-base font-semibold text-foreground", className)}
      data-slot="sheet-title"
      {...props}
    />
  )
}

export function SheetDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      className={cn("text-sm text-muted-foreground", className)}
      data-slot="sheet-description"
      {...props}
    />
  )
}

export function SheetContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Dialog.Content>) {
  return (
    <SheetPortal>
      <SheetOverlay className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" data-slot="sheet-overlay" />
      <Dialog.Content
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border bg-background p-6 text-foreground shadow-2xl shadow-black/40 outline-none",
          className,
        )}
        data-slot="sheet-content"
        {...props}
      >
        {children}
        <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-white/5 hover:text-foreground">
          <X className="size-5" />
          <span className="sr-only">Close menu</span>
        </Dialog.Close>
      </Dialog.Content>
    </SheetPortal>
  )
}
