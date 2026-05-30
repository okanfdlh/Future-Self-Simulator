import { cn } from "@/lib/utils"

const VARIANT_CLASSES = {
  default:
    "bg-neutral-900 text-neutral-50 hover:bg-neutral-800 active:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-100/80 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800",
  outline:
    "border border-neutral-200 bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-100/70 dark:border-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-900",
  ghost:
    "bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-100/70 dark:text-neutral-50 dark:hover:bg-neutral-900",
}

const SIZE_CLASSES = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-base",
}

export function Button({
  as: Comp = "button",
  className,
  variant = "default",
  size = "md",
  type = "button",
  ...props
}) {
  const isButton = Comp === "button"

  return (
    <Comp
      {...(isButton ? { type } : {})}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-600",
        VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.default,
        SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
        className
      )}
      {...props}
    />
  )
}
