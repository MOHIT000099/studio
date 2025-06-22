'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUp, User, BookUser, ShieldCheck, Loader2, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

function SubmitButton({ isLoading, disabled }: { isLoading: boolean, disabled: boolean }) {
    return (
        <Button type="submit" className="w-full" disabled={isLoading || disabled}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                </>
            ) : 'Submit for Verification' }
        </Button>
    )
}

export function PanditSignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { firebaseEnabled } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      email: '',
      password: '',
      // Add other form fields here if you plan to store them in a database like Firestore
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseEnabled) return;
    setLoading(true);

    if (!formData.email || !formData.password) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Email and password are required.",
        });
        setLoading(false);
        return;
    }

    try {
      // In a real app, you would also save the other form data (name, location, etc.) 
      // to Cloud Firestore after creating the user.
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('Pandit signed up:', userCredential.user);
      
      toast({
          title: 'Signup Successful',
          description: 'Your account has been created. Welcome!',
      });

      router.push('/pandit-dashboard');

    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: error.message || 'An unknown error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const formDisabled = !firebaseEnabled;

  return (
    <Card className="mx-auto max-w-xl w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Join as a Pandit</CardTitle>
        <CardDescription>
          Complete the steps below to create your profile and start connecting with users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!firebaseEnabled && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Configuration Error</AlertTitle>
              <AlertDescription>
                Firebase is not configured correctly. Authentication features are disabled. Please contact the site administrator.
              </AlertDescription>
            </Alert>
        )}
        <form onSubmit={handleSignup}>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal" disabled={formDisabled}>
                <User className="w-4 h-4 mr-2" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="profile" disabled={formDisabled}>
                <BookUser className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="verification" disabled={formDisabled}>
                <ShieldCheck className="w-4 h-4 mr-2" />
                Verification
              </TabsTrigger>
            </TabsList>
            
            <fieldset disabled={formDisabled}>
                <TabsContent value="personal" className="mt-6">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" name="full-name" placeholder="Pandit Ramesh Sharma" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="pandit@example.com" required onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
                    </div>
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="password">Create Password</Label>
                    <Input id="password" name="password" type="password" required onChange={handleChange} />
                    </div>
                </div>
                </TabsContent>

                <TabsContent value="profile" className="mt-6">
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="city">City</Label>
                            <Select name="city" defaultValue="Patna" required>
                                <SelectTrigger id="city">
                                <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="Patna">Patna</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="location">Full Location</Label>
                            <Input id="location" name="location" placeholder="Kankarbagh, Patna, Bihar" required />
                        </div>
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="services">Services Offered</Label>
                    <Input id="services" name="services" placeholder="Wedding, Griha Pravesh, Vastu..." required />
                    <p className="text-xs text-muted-foreground">Separate services with a comma.</p>
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="qualifications">Qualifications</Label>
                    <Textarea id="qualifications" name="qualifications" placeholder="e.g., Jyotish Acharya, Vastu Shastra Certified" required />
                    <p className="text-xs text-muted-foreground">List your degrees, certifications, or specializations.</p>
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="bio">About You / Bio</Label>
                    <Textarea id="bio" name="bio" placeholder="Tell users about your experience and approach." required />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Switch id="show-qualifications" name="show-qualifications" defaultChecked />
                        <Label htmlFor="show-qualifications" className="flex-1">Show my qualifications publicly on my profile</Label>
                    </div>
                </div>
                </TabsContent>

                <TabsContent value="verification" className="mt-6">
                <div className="grid gap-4">
                    <div className="grid gap-2 text-center">
                        <p className="text-sm text-muted-foreground">To ensure trust and safety, we require verification documents. Your information will be kept confidential.</p>
                        <p className="text-xs text-muted-foreground italic">Please note: The uploaded documents will be stored securely for our records and internal verification purposes.</p>
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="aadhaar">Aadhaar Card</Label>
                    <div className="flex items-center gap-2">
                        <Input id="aadhaar" name="aadhaar" type="file" required className="flex-1" accept="image/*"/>
                        <Button variant="outline" size="icon" asChild><Label htmlFor="aadhaar" className="cursor-pointer"><FileUp className="h-4 w-4"/></Label></Button>
                    </div>
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="selfie">Selfie Photo</Label>
                    <div className="flex items-center gap-2">
                        <Input id="selfie" name="selfie" type="file" required className="flex-1" accept="image/*"/>
      <Button variant="outline" size="icon" asChild><Label htmlFor="selfie" className="cursor-pointer"><FileUp className="h-4 w-4"/></Label></Button>
                    </div>
                    </div>
                </div>
                </TabsContent>
            </fieldset>
          </Tabs>
          
          <div className="mt-6">
              <SubmitButton isLoading={loading} disabled={formDisabled} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
