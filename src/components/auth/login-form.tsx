'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { firebaseEnabled } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseEnabled) return;
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      router.push('/pandit-dashboard');
    } catch (error: any) {
      let errorMessage = 'An unknown error occurred.';
      if (error.code === 'auth/invalid-credential') {
          errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Invalid email or password. Please try again.';
      }
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={handleLogin}>
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline mt-4">Pandit Login</CardTitle>
          <CardDescription>
            Access your dashboard to manage your profile and requests.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!firebaseEnabled && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Configuration Error</AlertTitle>
              <AlertDescription>
                Firebase is not configured. Please add your credentials to the .env file to enable authentication.
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={!firebaseEnabled || loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={!firebaseEnabled || loading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading || !firebaseEnabled}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Not a pandit yet?{' '}
            <Link href="/pandit-signup" className="underline hover:text-primary">
              Sign up here
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
