'use client';

import Link from 'next/link';
import { BookOpenCheck, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle
} from '@/components/ui/sheet';
import { useAuth } from '@/context/auth-context';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const navLinks = [
    { href: '/priests', label: 'Browse Pandits' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/request', label: 'Submit Request' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const loggedInLinks = [
      { href: '/pandit-dashboard', label: 'Dashboard' },
      { href: '/contact', label: 'Contact Us' },
  ]

  const currentLinks = user ? loggedInLinks : navLinks;

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
          {currentLinks.map((link) => (
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
          {user ? (
            <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
          ) : (
            <>
                <Button asChild variant="ghost" size="sm">
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                    <Link href="/pandit-signup">Become a Pandit</Link>
                </Button>
            </>
          )}

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
                  {currentLinks.map((link) => (
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
                    {user ? (
                         <Button onClick={handleLogout} className="w-full" variant="destructive">
                            Logout
                        </Button>
                    ): (
                        <SheetClose asChild>
                            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                <Link href="/pandit-signup">
                                    Become a Pandit
                                </Link>
                            </Button>
                        </SheetClose>
                    )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
