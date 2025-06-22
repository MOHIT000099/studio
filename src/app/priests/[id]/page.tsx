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
  Star,
} from 'lucide-react';
import { allPriests, allReviews } from '@/data/priests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { StarRating } from '@/components/ui/star-rating';
import ReviewForm from '@/components/review-form';

export function generateStaticParams() {
  return allPriests.map((priest) => ({
    id: priest.id,
  }));
}

export default async function PriestDetailPage({ params }: { params: { id: string } }) {
  const priest = allPriests.find((p) => p.id === params.id);
  const reviews = allReviews.filter((r) => r.panditId === params.id);

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
              <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
                <StarRating rating={priest.rating} />
                <span>({priest.reviews} reviews)</span>
              </div>
              <div className="flex items-center justify-center text-muted-foreground mt-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{priest.location}</span>
              </div>
              {priest.verified && (
                <div className="flex items-center justify-center text-green-600 mt-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="font-semibold">Verified</span>
                </div>
              )}
              <Separator className="my-6" />
              <div className="space-y-3">
                <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                  <Link href={`https://wa.me/${priest.whatsapp}`} target="_blank">
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full">
                  <Link href={`tel:${priest.phone}`}>
                    <Phone className="mr-2 h-5 w-5" /> Call Now
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">About {priest.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">{priest.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center">
                <Sparkles className="h-6 w-6 mr-3 text-primary" />
                Services Offered
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
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center">
                  <GraduationCap className="h-6 w-6 mr-3 text-primary" />
                  Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{priest.qualifications}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center">
                    <Star className="h-6 w-6 mr-3 text-primary" />
                    User Reviews
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{review.name}</h3>
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="text-muted-foreground text-sm italic mb-2">"{review.comment}"</p>
                            <p className="text-xs text-muted-foreground/80 text-right">{review.date}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground text-center py-4">Be the first to review {priest.name}!</p>
                )}
            </CardContent>
          </Card>
          
          <ReviewForm panditId={priest.id} />

        </div>
      </div>
    </div>
  );
}
