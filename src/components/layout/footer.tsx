import Link from 'next/link';
import { BookOpenCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className="w-full bg-card border-t">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <BookOpenCheck className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">{t('title')}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {t('copyright', {year: new Date().getFullYear()})}
        </p>
        <nav className="flex items-center space-x-4 text-sm">
          <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
            {t('admin')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
