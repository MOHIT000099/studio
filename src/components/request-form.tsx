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
import { useLocale, useTranslations } from 'next-intl';


function AdminSubmitButton() {
  const t = useTranslations('RequestPage');
  const { pending, data } = useFormStatus();
  const isThisAction = data?.get('submit_action') === 'admin';

  return (
    <Button type="submit" name="submit_action" value="admin" className="w-full" disabled={pending} variant="secondary">
      {pending && isThisAction ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('submitting')}
        </>
      ) : (
        t('submitAdminButton')
      )}
    </Button>
  );
}

function AiSubmitButton() {
  const t = useTranslations('RequestPage');
  const { pending, data } = useFormStatus();
  const isThisAction = data?.get('submit_action') === 'ai';
  return (
    <Button type="submit" name="submit_action" value="ai" className="w-full" disabled={pending}>
      {pending && isThisAction ? (
        <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('finding')}
        </>
      ) : (
        <>
        <Sparkles className="mr-2 h-4 w-4" />
        {t('submitAiButton')}
        </>
      )}
    </Button>
  );
}

export default function RequestForm() {
  const t = useTranslations('RequestPage');
  const tToast = useTranslations('Toasts');
  const locale = useLocale();
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(handlePriestRequest, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.errors) {
        toast({
            variant: "destructive",
            title: tToast('errorTitle'),
            description: state.message,
        });
    }
  }, [state, toast, tToast]);


  return (
    <div>
      <Card className="max-w-2xl mx-auto">
        <form action={formAction}>
          <input type="hidden" name="locale" value={locale} />
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{t('formTitle')}</CardTitle>
            <CardDescription>
              {t('formDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service">{t('serviceLabel')}</Label>
              <Input
                id="service"
                name="service"
                placeholder={t('servicePlaceholder')}
                required
              />
               {state.errors?.service && <p className="text-sm font-medium text-destructive">{state.errors.service[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{t('locationLabel')}</Label>
              <Input
                id="location"
                name="location"
                placeholder={t('locationPlaceholder')}
                required
              />
              {state.errors?.location && <p className="text-sm font-medium text-destructive">{state.errors.location[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">{t('mobileLabel')}</Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder={t('mobilePlaceholder')}
                required
              />
              {state.errors?.mobile && <p className="text-sm font-medium text-destructive">{state.errors.mobile[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">{t('detailsLabel')}</Label>
              <Textarea
                id="details"
                name="details"
                placeholder={t('detailsPlaceholder')}
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
                <h2 className="text-3xl font-bold font-headline">{t('aiRecommendTitle')}</h2>
                <p className="mt-2 text-muted-foreground">{t('aiRecommendSubtitle')}</p>
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
            <h2 className="text-2xl font-bold font-headline">{t('requestStatusTitle')}</h2>
            <p className="mt-2 text-muted-foreground">{state.message}</p>
        </div>
      )}
    </div>
  );
}
