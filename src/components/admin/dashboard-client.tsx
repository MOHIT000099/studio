'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Eye } from 'lucide-react';
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" /> View Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Pandit Profile: {pandit.name}</DialogTitle>
                    <DialogDescription>
                      Review the complete information submitted for verification.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={pandit.photo}
                        alt={pandit.name}
                        width={100}
                        height={100}
                        className="rounded-full border"
                        data-ai-hint={pandit.photoHint}
                      />
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold">{pandit.name}</h3>
                        <p className="text-sm text-muted-foreground">{pandit.location}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Bio</h4>
                      <p className="text-sm text-muted-foreground">{pandit.bio}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Services</h4>
                      <p className="text-sm text-muted-foreground">{pandit.services.join(', ')}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Contact</h4>
                      <p className="text-sm text-muted-foreground">Phone: {pandit.phone}</p>
                      <p className="text-sm text-muted-foreground">WhatsApp: {pandit.whatsapp}</p>
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-start gap-2">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleAction(pandit.name, 'approved')}
                        >
                            <Check className="mr-2 h-4 w-4" /> Approve
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => handleAction(pandit.name, 'rejected')}
                        >
                            <X className="mr-2 h-4 w-4" /> Reject
                        </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
