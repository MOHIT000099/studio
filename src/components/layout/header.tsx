'use client';

import Link from 'next/link';
import { BookOpenCheck, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle
} from '@/components/ui/sheet';

export default function Header() {
  const navLinks = [
    { href: '/priests', label: 'Browse Pandits' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/request', label: 'Submit Request' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookOpenCheck className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Pandit Connect</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button asChild size="sm">
                <Link href="/pandit-signup">Become a Pandit</Link>
            </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col p-4 h-full">
                 <Link href="/" className="mr-6 flex items-center space-x-2 mb-8">
                    <BookOpenCheck className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">Pandit Connect</span>
                 </Link>
                <nav className="flex flex-col space-y-4 flex-grow">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      Home
                    </Link>
                  </SheetClose>
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto">
                    <SheetClose asChild>
                        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                            <Link href="/pandit-signup">
                                Become a Pandit
                            </Link>
                        </Button>
                    </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
