'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next-intl/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const onSelectChange = (value: string) => {
    router.replace(pathname, { locale: value });
  };

  return (
    <div className="flex items-center">
        <Select onValueChange={onSelectChange} defaultValue={locale}>
        <SelectTrigger className="w-auto bg-transparent border-0 shadow-none focus:ring-0 focus:ring-offset-0 gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">हिन्दी</SelectItem>
        </SelectContent>
        </Select>
    </div>
  );
}
