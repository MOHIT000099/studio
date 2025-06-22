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
import { useTranslations } from 'next-intl';

export default function DashboardClient({
  pendingPandits,
}: {
  pendingPandits: Priest[];
}) {
  const t = useTranslations('AdminDashboardPage');
  const tToast = useTranslations('Toasts');
  const { toast } = useToast();
  const [pandits, setPandits] = useState(pendingPandits);

  const handleAction = (panditName: string, action: 'approved' | 'rejected') => {
    toast({
      title: action === 'approved' ? tToast('panditApproved') : tToast('panditRejected'),
      description: tToast('panditActionDescription', { name: panditName, action }),
    });
    setPandits(pandits.filter(p => p.name !== panditName));
  };
  
  if (pandits.length === 0) {
    return (
        <div className="text-center py-16 bg-card rounded-lg">
            <h2 className="text-2xl font-bold font-headline">{t('allClearTitle')}</h2>
            <p className="mt-2 text-muted-foreground">
                {t('allClearSubtitle')}
            </p>
        </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('panditHeader')}</TableHead>
          <TableHead>{t('locationHeader')}</TableHead>
          <TableHead>{t('statusHeader')}</TableHead>
          <TableHead className="text-right">{t('actionsHeader')}</TableHead>
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
              <Badge variant="secondary">{t('pendingStatus')}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" /> {t('viewProfileButton')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{t('dialogTitle', {name: pandit.name})}</DialogTitle>
                    <DialogDescription>
                      {t('dialogDescription')}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
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
                      <h4 className="font-semibold mb-2">{t('bio')}</h4>
                      <p className="text-sm text-muted-foreground">{pandit.bio}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{t('services')}</h4>
                      <p className="text-sm text-muted-foreground">{pandit.services.join(', ')}</p>
                    </div>
                     <div>
                      <h4 className="font-semibold mb-2">{t('qualifications')}</h4>
                      <p className="text-sm text-muted-foreground">{pandit.qualifications || t('notProvided')}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t('publiclyVisible', { visible: pandit.showQualifications ? t('yes') : t('no') })}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{t('contact')}</h4>
                      <p className="text-sm text-muted-foreground">{t('phone')}: {pandit.phone}</p>
                      <p className="text-sm text-muted-foreground">{t('whatsapp')}: {pandit.whatsapp}</p>
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-start gap-2 mt-4">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleAction(pandit.name, 'approved')}
                        >
                            <Check className="mr-2 h-4 w-4" /> {t('approveButton')}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => handleAction(pandit.name, 'rejected')}
                        >
                            <X className="mr-2 h-4 w-4" /> {t('rejectButton')}
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
