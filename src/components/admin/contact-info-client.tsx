'use client';

import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { handleContactUpdate } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        'Save Changes'
      )}
    </Button>
  );
}

export default function ContactInfoClient({ contactInfo }: { contactInfo: { phone: string; email: string } }) {
  const { toast } = useToast();

  async function clientAction(formData: FormData) {
    const result = await handleContactUpdate(formData);
    if (result.success) {
      toast({
        title: 'Contact Info Updated',
        description: 'The new contact information has been saved.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: result.message || 'An unknown error occurred.',
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Update the phone number and email address displayed on the "Contact Us" page.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={clientAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" defaultValue={contactInfo.phone} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" defaultValue={contactInfo.email} required />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
