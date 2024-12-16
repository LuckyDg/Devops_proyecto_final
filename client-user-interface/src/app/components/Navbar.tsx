'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/pages/users', label: 'Usuarios' }
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden text-lg font-bold md:inline-block">
              Inscripción Devops
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex md:hidden">
          <Button asChild variant="ghost" size="sm">
            <Link href="/#registro">Registrarse</Link>
          </Button>
        </div>

        <div className="flex flex-1 justify-end items-center space-x-2">
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>

      <div className="block md:hidden border-t bg-background">
        <nav className="flex items-center justify-around py-2 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
