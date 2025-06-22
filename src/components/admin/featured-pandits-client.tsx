'use client';

import { useState } from 'react';
import type { Priest } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';

export default function FeaturedPanditsClient({
  approvedPandits,
}: {
  approvedPandits: Priest[];
}) {
  const { toast } = useToast();
  const [pandits, setPandits] = useState(approvedPandits);

  const handleFeaturedToggle = (panditId: string, isFeatured: boolean) => {
    // In a real app, this would be an API call.
    // Here, we just update local state.
    const updatedPandits = pandits.map(p =>
      p.id === panditId ? { ...p, featured: isFeatured } : p
    );
    setPandits(updatedPandits);

    const panditName = updatedPandits.find(p => p.id === panditId)?.name;

    toast({
      title: 'Pandit Updated',
      description: `${panditName} has been ${isFeatured ? 'featured' : 'unfeatured'}.`,
    });
  };
  
  if (pandits.length === 0) {
    return (
        <div className="text-center py-16 bg-card rounded-lg">
            <h2 className="text-2xl font-bold font-headline">No Approved Pandits</h2>
            <p className="mt-2 text-muted-foreground">
                There are no approved pandits to feature yet.
            </p>
        </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pandit</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Feature on Homepage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pandits.map((pandit) => (
          <TableRow key={pandit.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                        src={pandit.photo}
                        alt={pandit.name}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={pandit.photoHint}
                    />
                </div>
                {pandit.name}
              </div>
            </TableCell>
            <TableCell>{pandit.location}</TableCell>
            <TableCell className="text-right">
              <Switch
                checked={pandit.featured}
                onCheckedChange={(checked) => handleFeaturedToggle(pandit.id, checked)}
                aria-label={`Feature ${pandit.name}`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
