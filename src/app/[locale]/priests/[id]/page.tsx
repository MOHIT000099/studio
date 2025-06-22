import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { allPriests } from '@/data/priests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getTranslator } from 'next-intl/server';

export function generateStaticParams() {
    return allPriests.map((priest) => ({
      id: priest.id,
    }));
  }

export default async function PriestDetailPage({ params }: { params: { id: string, locale: string } }) {
  const t = await getTranslator(params.locale, 'PriestDetailPage');
  const priest = allPriests.find((p) => p.id === params.id);

  if (!priest) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="relative aspect-square w-full mx-auto mb-4 overflow-hidden rounded-full border-4 border-primary">
                <Image
                  src={priest.photo}
                  alt={priest.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={priest.photoHint}
                />
              </div>
              <h1 className="text-3xl font-bold font-headline text-center">{priest.name}</h1>
              <div className="flex items-center justify-center text-muted-foreground mt-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{priest.location}</span>
              </div>
              {priest.verified && (
                <div className="flex items-center justify-center text-green-600 mt-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="font-semibold">{t('verified')}</span>
                </div>
              )}
              <Separator className="my-6" />
              <div className="space-y-3">
                <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                  <Link href={`https://wa.me/${priest.whatsapp}`} target="_blank">
                    <MessageCircle className="mr-2 h-5 w-5" /> {t('whatsappButton')}
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full">
                  <Link href={`tel:${priest.phone}`}>
                    <Phone className="mr-2 h-5 w-5" /> {t('callButton')}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{t('aboutTitle', {name: priest.name})}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">{priest.bio}</p>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center">
                <Sparkles className="h-6 w-6 mr-3 text-primary" />
                {t('servicesTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {priest.services.map((service) => (
                  <Badge key={service} variant="default" className="text-base px-4 py-2">
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {priest.showQualifications && priest.qualifications && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center">
                  <GraduationCap className="h-6 w-6 mr-3 text-primary" />
                  {t('qualificationsTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{priest.qualifications}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
