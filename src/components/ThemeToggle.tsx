import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="apple-button w-10 h-10">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  const isDark = theme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="apple-button w-10 h-10 relative overflow-hidden group border-border hover:bg-muted transition-all duration-300"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
          isDark 
            ? 'rotate-90 scale-0 opacity-0' 
            : 'rotate-0 scale-100 opacity-100'
        }`} />
        <Moon className={`h-[1.2rem] w-[1.2rem] absolute transition-all duration-300 ${
          isDark 
            ? 'rotate-0 scale-100 opacity-100' 
            : '-rotate-90 scale-0 opacity-0'
        }`} />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}