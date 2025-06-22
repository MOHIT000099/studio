'use client';

import Link from 'next/link';
import { BookOpenCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <BookOpenCheck className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">Pandit Connect</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Pandit Connect. All rights reserved.
        </p>
        <nav className="flex items-center space-x-4 text-sm">
          <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
            Admin
          </Link>
        </nav>
      </div>
    </footer>
  );
}
