'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PanditDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-14rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Welcome to Your Dashboard
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Manage your profile, availability, and bookings here.
        </p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
          <CardDescription>
            This is your main control center. More features coming soon!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <span className="font-semibold">Logged in as:</span> {user.email}
          </p>
          <Button onClick={handleLogout} className="w-full" variant="destructive">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
