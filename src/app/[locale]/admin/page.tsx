import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
  } from '@/components/ui/card';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import { Button } from '@/components/ui/button';
  import { redirect } from 'next/navigation';
  import { KeyRound } from 'lucide-react';
  import {getTranslations} from 'next-intl/server';
  
  export default async function AdminLoginPage({params: {locale}}: {params: {locale: string}}) {
    const t = await getTranslations('AdminLoginPage');
    
    async function authenticate(formData: FormData) {
      'use server';
      // In a real app, this would be a secure check against a database.
      if (formData.get('password') === process.env.ADMIN_PASSWORD) {
        redirect(`/${locale}/admin/dashboard`);
      } else {
        redirect(`/${locale}/admin?error=Invalid%20password`);
      }
    }
  
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] p-4">
        <Card className="w-full max-w-sm">
          <form action={authenticate}>
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit">
                    <KeyRound className="w-8 h-8 text-primary" />
                </div>
              <CardTitle className="text-2xl font-headline mt-4">{t('title')}</CardTitle>
              <CardDescription>
                {t('subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">{t('passwordLabel')}</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                {t('unlockButton')}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }
  
