'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
import { handlePriestRequest, type FormState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import PriestCard from './priest-card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';


function AdminSubmitButton() {
  const { pending, data } = useFormStatus();
  const isThisAction = data?.get('submit_action') === 'admin';

  return (
    <Button type="submit" name="submit_action" value="admin" className="w-full" disabled={pending} variant="secondary">
      {pending && isThisAction ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        'Submit Request'
      )}
    </Button>
  );
}

function AiSubmitButton() {
  const { pending, data } = useFormStatus();
  const isThisAction = data?.get('submit_action') === 'ai';
  return (
    <Button type="submit" name="submit_action" value="ai" className="w-full" disabled={pending}>
      {pending && isThisAction ? (
        <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Finding Pandits...
        </>
      ) : (
        <>
        <Sparkles className="mr-2 h-4 w-4" />
        Get AI Suggestions
        </>
      )}
    </Button>
  );
}

export default function RequestForm() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(handlePriestRequest, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.errors) {
        toast({
            variant: "destructive",
            title: 'Error',
            description: state.message,
        });
    }
  }, [state, toast]);


  return (
    <div>
      <Card className="max-w-2xl mx-auto">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Need a Pandit?</CardTitle>
            <CardDescription>
              Describe the ceremony you need a pandit for, and our AI will suggest the best matches for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service">Service or Puja</Label>
              <Input
                id="service"
                name="service"
                placeholder="e.g., Wedding Ceremony, Griha Pravesh"
                required
              />
               {state.errors?.service && <p className="text-sm font-medium text-destructive">{state.errors.service[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Kankarbagh, Patna"
                required
              />
              {state.errors?.location && <p className="text-sm font-medium text-destructive">{state.errors.location[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="e.g., 9876543210"
                required
              />
              {state.errors?.mobile && <p className="text-sm font-medium text-destructive">{state.errors.mobile[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <Textarea
                id="details"
                name="details"
                placeholder="Any specific requirements, languages, or dates."
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex flex-col gap-2">
                <AdminSubmitButton />
                <AiSubmitButton />
            </div>
          </CardFooter>
        </form>
      </Card>
      
      {state.priests && state.priests.length > 0 && (
        <div className="mt-12">
           <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-headline">Our AI Recommends</h2>
                <p className="mt-2 text-muted-foreground">Based on your request, we think these pandits would be a great fit.</p>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {state.priests.map((priest) => (
              <PriestCard key={priest.id} priest={priest} />
            ))}
          </div>
        </div>
      )}

      {state.message && (!state.priests || state.priests.length === 0) && !state.errors && (
         <div className="text-center py-16">
            <h2 className="text-2xl font-bold font-headline">Request Status</h2>
            <p className="mt-2 text-muted-foreground">{state.message}</p>
        </div>
      )}
    </div>
  );
}
