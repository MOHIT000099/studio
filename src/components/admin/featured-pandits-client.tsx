'use client';

import { useState, useMemo } from 'react';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Save } from 'lucide-react';
import Image from 'next/image';

export default function FeaturedPanditsClient({
  approvedPandits,
}: {
  approvedPandits: Priest[];
}) {
  const { toast } = useToast();
  const [pandits, setPandits] = useState(approvedPandits);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFeaturedToggle = (panditId: string, isFeatured: boolean) => {
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
  
  const handleRatingChange = (panditId: string, value: string) => {
    const newRating = parseFloat(value);
    setPandits(pandits.map(p =>
      p.id === panditId ? { ...p, rating: isNaN(newRating) ? p.rating : Math.max(0, Math.min(5, newRating)) } : p
    ));
  };

  const handleReviewsChange = (panditId: string, value: string) => {
    const newReviews = parseInt(value, 10);
    setPandits(pandits.map(p =>
      p.id === panditId ? { ...p, reviews: isNaN(newReviews) ? p.reviews : Math.max(0, newReviews) } : p
    ));
  };
  
  const handleSave = (panditId: string) => {
    const pandit = pandits.find(p => p.id === panditId);
    // In a real app, this would be an API call to save the data.
    toast({
      title: 'Ratings Saved',
      description: `Ratings for ${pandit?.name} have been updated.`,
    });
  };

  const filteredPandits = useMemo(() => {
    if (!searchQuery) return pandits;
    return pandits.filter(pandit =>
      pandit.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pandits, searchQuery]);

  if (pandits.length === 0) {
    return (
        <div className="text-center py-16 bg-card rounded-lg">
            <h2 className="text-2xl font-bold font-headline">No Approved Pandits</h2>
            <p className="mt-2 text-muted-foreground">
                There are no approved pandits to feature or manage yet.
            </p>
        </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search pandits by name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10 max-w-sm"
        />
      </div>

      {filteredPandits.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pandit</TableHead>
              <TableHead>Rating (0-5)</TableHead>
              <TableHead>Reviews</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPandits.map(pandit => (
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
                    <div>
                        <div>{pandit.name}</div>
                        <div className="text-xs text-muted-foreground">{pandit.location}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={pandit.rating}
                    onChange={(e) => handleRatingChange(pandit.id, e.target.value)}
                    className="w-20"
                  />
                </TableCell>
                 <TableCell>
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    value={pandit.reviews}
                    onChange={(e) => handleReviewsChange(pandit.id, e.target.value)}
                    className="w-24"
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={pandit.featured}
                    onCheckedChange={checked =>
                      handleFeaturedToggle(pandit.id, checked)
                    }
                    aria-label={`Feature ${pandit.name}`}
                  />
                </TableCell>
                <TableCell className="text-right">
                    <Button size="sm" onClick={() => handleSave(pandit.id)}>
                        <Save className="mr-2 h-4 w-4" /> Save
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold font-headline">No Pandits Found</h2>
          <p className="mt-2 text-muted-foreground">
            Your search for "{searchQuery}" did not match any pandits.
          </p>
        </div>
      )}
    </div>
  );
}
