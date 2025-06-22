import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
  starClassName?: string;
}

export function StarRating({ rating, totalStars = 5, className, starClassName }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = totalStars - Math.ceil(rating);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className={cn('h-5 w-5 text-yellow-400 fill-yellow-400', starClassName)} />
      ))}
      {partialStar > 0 && (
        <div className="relative">
            <Star key="partial" className={cn('h-5 w-5 text-yellow-400', starClassName)} />
            <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${partialStar * 100}%`}}>
                 <Star className={cn('h-5 w-5 text-yellow-400 fill-yellow-400', starClassName)} />
            </div>
        </div>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className={cn('h-5 w-5 text-muted-foreground', starClassName)} />
      ))}
    </div>
  );
}
