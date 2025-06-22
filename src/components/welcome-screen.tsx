import { BookOpenCheck } from 'lucide-react';

export default function WelcomeScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="flex items-center space-x-4 animate-pulse">
        <BookOpenCheck className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold font-headline">Pandit Connect</h1>
      </div>
      <p className="mt-4 text-lg text-muted-foreground">
        Connecting you with tradition
      </p>
    </div>
  );
}
