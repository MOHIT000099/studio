import Link from 'next/link';
import { BookOpenCheck, Menu } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
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
    { href: '/request', label: 'Submit Request' },
    { href: '/pandit-signup', label: 'Become a Pandit' },
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

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col p-4">
                 <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                    <BookOpenCheck className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">Pandit Connect</span>
                 </Link>
                <nav className="flex flex-col space-y-4">
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
