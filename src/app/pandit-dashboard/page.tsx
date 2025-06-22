'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import type { Priest } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';

export default function PanditDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [panditData, setPanditData] = useState<Priest | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchPanditData = async () => {
        const docRef = doc(db, 'pandits', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPanditData(docSnap.data() as Priest);
        } else {
          // This could happen if signup was interrupted.
          // You might want to redirect them back to the signup form.
          console.error('No profile data found for this user.');
        }
        setDataLoading(false);
      };

      fetchPanditData();
    }
  }, [user]);

  if (authLoading || dataLoading) {
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
  
  const getVerificationStatus = () => {
    if (panditData?.verified) {
        return <Badge variant="default" className="bg-green-600">Verified</Badge>;
    }
    if (panditData?.pendingApproval) {
        return <Badge variant="secondary">Pending Approval</Badge>;
    }
    return <Badge variant="destructive">Profile Incomplete</Badge>;
  }


  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Welcome, {panditData?.name || 'Pandit'}!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Manage your profile, availability, and bookings here.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>
                    This is your main control center.
                </CardDescription>
            </div>
            {getVerificationStatus()}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            {panditData ? (
                <div className="space-y-3">
                    <p><strong>Name:</strong> {panditData.name}</p>
                    <p><strong>Email:</strong> {panditData.email}</p>
                    <p><strong>Phone:</strong> {panditData.phone}</p>
                    <p><strong>Location:</strong> {panditData.location}</p>
                    <p><strong>Services:</strong> {panditData.services.join(', ')}</p>
                </div>
            ) : (
                <p>Could not load your profile data.</p>
            )}
          <Button onClick={handleLogout} className="w-full" variant="destructive">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
