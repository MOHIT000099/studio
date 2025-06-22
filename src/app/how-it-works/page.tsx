import { Search, BookOpenCheck, CalendarCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function HowItWorksPage() {
  return (
    <main>
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                    How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                    A Simple Path to Spiritual Guidance
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We've simplified the process of finding and booking a pandit. Follow these simple steps to arrange your next ceremony.
                </p>
                </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 lg:grid-cols-3">
                <Card className="grid gap-1 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="rounded-full bg-primary/20 p-4">
                    <Search className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold font-headline">1. Search & Discover</h3>
                    <p className="text-muted-foreground">
                    Browse our extensive list of verified pandits. Filter by service, location, or language to find the perfect match for your ceremony.
                    </p>
                </CardContent>
                </Card>
                <Card className="grid gap-1 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="rounded-full bg-primary/20 p-4">
                    <BookOpenCheck className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold font-headline">2. View Profiles</h3>
                    <p className="text-muted-foreground">
                    Review detailed profiles, including specializations, experience, and photos. Contact them directly to discuss your needs.
                    </p>
                </CardContent>
                </Card>
                <Card className="grid gap-1 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="rounded-full bg-primary/20 p-4">
                    <CalendarCheck className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold font-headline">3. Book & Perform Puja</h3>
                    <p className="text-muted-foreground">
                    Finalize details and book your pandit. Enjoy a spiritually fulfilling ceremony conducted by a trusted professional.
                    </p>
                </CardContent>
                </Card>
            </div>
            </div>
        </section>
    </main>
  );
}
