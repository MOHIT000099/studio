import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { allPriests } from '@/data/priests';
import DashboardClient from '@/components/admin/dashboard-client';
import {getTranslations} from 'next-intl/server';
  
export default async function AdminDashboardPage({params: {locale}}: {params: {locale: string}}) {
    const t = await getTranslations('AdminDashboardPage');
    // In a real app, this data would be fetched from a database.
    const pendingPandits = allPriests.filter(p => p.pendingApproval);
  
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
  
        <Card>
            <CardHeader>
                <CardTitle>{t('pendingRegistrationsTitle')}</CardTitle>
                <CardDescription>
                    {t('pendingRegistrationsSubtitle')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DashboardClient pendingPandits={pendingPandits} />
            </CardContent>
        </Card>
      </div>
    );
  }
  