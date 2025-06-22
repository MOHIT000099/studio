'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Star } from 'lucide-react';

import type { Priest } from '@/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from './ui/star-rating';

interface PriestCardProps {
  priest: Priest;
}

export default function PriestCard({ priest }: PriestCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          <Image
            src={priest.photo}
            alt={priest.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={priest.photoHint}
          />
           {priest.verified && (
             <Badge className="absolute top-2 right-2" variant="default">
                <Star className="h-3 w-3 mr-1" /> Rated {priest.rating}
              </Badge>
            )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-2xl mb-2">{priest.name}</CardTitle>
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{priest.location}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {priest.services.slice(0, 3).map((service) => (
            <Badge key={service} variant="secondary">
              {service}
            </Badge>
          ))}
          {priest.services.length > 3 && (
            <Badge variant="outline">+{priest.services.length - 3} more</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button asChild className="w-full">
          <Link href={`/priests/${priest.id}`}>
            View Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
