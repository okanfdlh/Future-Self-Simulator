"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Laptop, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const THEMES = [
  { value: "light", icon: Sun, labelKey: "theme.light" },
  { value: "dark", icon: Moon, labelKey: "theme.dark" },
  { value: "system", icon: Laptop, labelKey: "theme.system" },
]

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()

  const activeTheme = THEMES.find((item) => item.value === theme) || THEMES[2]
  const ActiveIcon = activeTheme.icon

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-full px-3"
          aria-label={t("theme.label")}
        >
          <ActiveIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{t(activeTheme.labelKey)}</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-40 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg outline-none dark:border-neutral-800 dark:bg-neutral-950"
        >
          {THEMES.map((item) => {
            const Icon = item.icon
            const isActive = theme === item.value
            return (
              <DropdownMenu.Item
                key={item.value}
                onSelect={() => setTheme(item.value)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-700 outline-none transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-neutral-50",
                  isActive &&
                    "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{t(item.labelKey)}</span>
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
