import Link from 'next/link';
import { ArrowRight, BookOpenCheck, CalendarCheck, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PriestCard from '@/components/priest-card';
import { allPriests } from '@/data/priests';

export default function Home() {
  const featuredPriests = allPriests.filter((priest) => priest.featured);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Find Your Trusted Pandit, Anywhere
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Connect with verified and experienced pandits for all your spiritual needs. Seamless booking for pujas, ceremonies, and more.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/priests">
                      Browse Pandits
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/request">
                      Submit a Puja Request
                    </Link>
                  </Button>
                </div>
              </div>
              <img
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                data-ai-hint="priest performing ritual"
                src="https://placehold.co/600x600.png"
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
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

        <section id="featured-pandits" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Our Featured Pandits
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Meet some of our highly-rated and experienced pandits, ready to assist you with your spiritual journey.
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {featuredPriests.map((priest) => (
                <PriestCard key={priest.id} priest={priest} />
              ))}
            </div>
             <div className="flex justify-center">
                <Button asChild>
                  <Link href="/priests">
                    View All Pandits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
          </div>
        </section>
      </main>
    </div>
  );
}
