'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { handlePanditSignup, type PanditSignupFormState } from '@/lib/actions';
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
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUp, User, BookUser, ShieldCheck, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        'Submit for Verification'
      )}
    </Button>
  );
}

export function PanditSignupForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState: PanditSignupFormState = { message: '', success: false };
  const [state, formAction] = useActionState(handlePanditSignup, initialState);

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: state.message,
      });
    }
  }, [state, toast]);
  
  if (state.success) {
    return (
        <Card className="mx-auto max-w-xl w-full">
            <CardHeader className="text-center">
                <div className="mx-auto bg-green-100 p-4 rounded-full w-fit">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-headline mt-4">Registration Successful!</CardTitle>
                <CardDescription>
                    {state.message}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Next Steps</AlertTitle>
                    <AlertDescription>
                        Our team will review your profile. You will receive an email once your profile is approved.
                        You can then log in to your dashboard.
                    </AlertDescription>
                </Alert>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href="/login">Go to Login Page</Link>
                </Button>
            </CardFooter>
        </Card>
    )
  }

  return (
    <Card className="mx-auto max-w-xl w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Join as a Pandit</CardTitle>
        <CardDescription>
          Complete the steps below to create your profile and start connecting with users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} ref={formRef} noValidate>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">
                <User className="w-4 h-4 mr-2" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="profile">
                <BookUser className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="verification">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Verification
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" name="name" placeholder="Pandit Ramesh Sharma" required />
                  {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="pandit@example.com" required />
                    {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
                    {state.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone[0]}</p>}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Create Password</Label>
                  <Input id="password" name="password" type="password" required />
                  {state.errors?.password && <p className="text-sm font-medium text-destructive">{state.errors.password[0]}</p>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Select name="city" required>
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Patna">Patna</SelectItem>
                        {/* Add other cities if needed */}
                      </SelectContent>
                    </Select>
                     {state.errors?.city && <p className="text-sm font-medium text-destructive">{state.errors.city[0]}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Full Location</Label>
                    <Input id="location" name="location" placeholder="Kankarbagh, Patna, Bihar" required />
                    {state.errors?.location && <p className="text-sm font-medium text-destructive">{state.errors.location[0]}</p>}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="services">Services Offered</Label>
                  <Input id="services" name="services" placeholder="Wedding, Griha Pravesh, Vastu..." required />
                  <p className="text-xs text-muted-foreground">Separate services with a comma.</p>
                  {state.errors?.services && <p className="text-sm font-medium text-destructive">{state.errors.services[0]}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="qualifications">Qualifications (Optional)</Label>
                  <Textarea id="qualifications" name="qualifications" placeholder="e.g., Jyotish Acharya, Vastu Shastra Certified" />
                  <p className="text-xs text-muted-foreground">List your degrees, certifications, or specializations.</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">About You / Bio</Label>
                  <Textarea id="bio" name="bio" placeholder="Tell users about your experience and approach." required />
                  {state.errors?.bio && <p className="text-sm font-medium text-destructive">{state.errors.bio[0]}</p>}
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <Switch id="show-qualifications" name="showQualifications" defaultChecked />
                  <Label htmlFor="show-qualifications" className="flex-1">Show my qualifications publicly on my profile</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="verification" className="mt-6">
                <div className="grid gap-4">
                    <div className="grid gap-2 text-center">
                        <p className="text-sm text-muted-foreground">To ensure trust and safety, we require verification documents. For this prototype, you can upload any image.</p>
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="aadhaar">Aadhaar Card (Image)</Label>
                    <div className="flex items-center gap-2">
                        <Input id="aadhaar" name="aadhaar" type="file" required className="flex-1" accept="image/*"/>
                        <Button variant="outline" size="icon" asChild><Label htmlFor="aadhaar" className="cursor-pointer"><FileUp className="h-4 w-4"/></Label></Button>
                    </div>
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="selfie">Selfie Photo (Image)</Label>
                    <div className="flex items-center gap-2">
                        <Input id="selfie" name="selfie" type="file" required className="flex-1" accept="image/*"/>
                        <Button variant="outline" size="icon" asChild><Label htmlFor="selfie" className="cursor-pointer"><FileUp className="h-4 w-4"/></Label></Button>
                    </div>
                    </div>
                </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
