'use client';

import Link from 'next/link';
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
import { FileUp, User, BookUser, ShieldCheck } from 'lucide-react';

export function PanditSignupForm() {
  return (
    <Card className="mx-auto max-w-xl w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Join as a Pandit</CardTitle>
        <CardDescription>
          Complete the steps below to create your profile and start connecting
          with users.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                <Input id="full-name" placeholder="Pandit Ramesh Sharma" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="pandit@example.com" required />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Create Password</Label>
                <Input id="password" type="password" required />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <div className="grid gap-4">
               <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Mumbai" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="location">Full Location</Label>
                        <Input id="location" placeholder="Chembur, Mumbai, Maharashtra" required />
                    </div>
                </div>
              <div className="grid gap-2">
                <Label htmlFor="services">Services Offered</Label>
                <Input id="services" placeholder="Wedding, Griha Pravesh, Vastu..." required />
                 <p className="text-xs text-muted-foreground">Separate services with a comma.</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">About You / Bio</Label>
                <Textarea id="bio" placeholder="Tell users about your experience and approach." required />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="verification" className="mt-6">
            <div className="grid gap-4">
                <div className="grid gap-2 text-center">
                    <p className="text-sm text-muted-foreground">To ensure trust and safety, we require verification documents. Your information will be kept confidential.</p>
                </div>
              <div className="grid gap-2">
                <Label htmlFor="aadhaar">Aadhaar Card</Label>
                <div className="flex items-center gap-2">
                    <Input id="aadhaar" type="file" required className="flex-1"/>
                    <Button variant="outline" size="icon" asChild><Label htmlFor="aadhaar" className="cursor-pointer"><FileUp className="h-4 w-4"/></Label></Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="selfie">Selfie Photo</Label>
                <div className="flex items-center gap-2">
                    <Input id="selfie" type="file" required className="flex-1"/>
                     <Button variant="outline" size="icon" asChild><Label htmlFor="selfie" className="cursor-pointer"><FileUp className="h-4 w-4"/></Label></Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
            <Button type="submit" className="w-full">
                Submit for Verification
            </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          Already have a pandit account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
