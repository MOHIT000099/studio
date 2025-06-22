'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import type { Priest } from '@/types';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function DashboardClient({
  pendingPandits,
}: {
  pendingPandits: Priest[];
}) {
  const { toast } = useToast();
  const [pandits, setPandits] = useState(pendingPandits);

  const handleAction = (panditName: string, action: 'approved' | 'rejected') => {
    toast({
      title: `Pandit ${action}`,
      description: `${panditName} has been ${action}.`,
    });
    setPandits(pandits.filter(p => p.name !== panditName));
  };
  
  if (pandits.length === 0) {
    return (
        <div className="text-center py-16 bg-card rounded-lg">
            <h2 className="text-2xl font-bold font-headline">All Clear!</h2>
            <p className="mt-2 text-muted-foreground">
                There are no pending pandit registrations to review.
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
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
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
            <TableCell>
              <Badge variant="secondary">Pending Approval</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                className="text-green-600 hover:text-green-700 hover:bg-green-100"
                onClick={() => handleAction(pandit.name, 'approved')}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-600 hover:text-red-700 hover:bg-red-100"
                onClick={() => handleAction(pandit.name, 'rejected')}
              >
                <X className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
