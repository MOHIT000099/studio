import RequestForm from '@/components/request-form';
import { getTranslator } from 'next-intl/server';

export default async function RequestPage({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslator(locale, 'RequestPage');
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
      <RequestForm />
    </div>
  );
}
