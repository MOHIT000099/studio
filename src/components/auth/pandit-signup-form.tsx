'use client';

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
import { handleSimpleAuth } from '@/lib/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export function PanditSignupForm() {
  const t = useTranslations('PanditSignupPage');
  const locale = useLocale();

  return (
    <Card className="mx-auto max-w-xl w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">{t('title')}</CardTitle>
        <CardDescription>
          {t('subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSimpleAuth}>
          <input type="hidden" name="locale" value={locale} />
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">
                <User className="w-4 h-4 mr-2" />
                {t('personalTab')}
              </TabsTrigger>
              <TabsTrigger value="profile">
                <BookUser className="w-4 h-4 mr-2" />
                {t('profileTab')}
              </TabsTrigger>
              <TabsTrigger value="verification">
                <ShieldCheck className="w-4 h-4 mr-2" />
                {t('verificationTab')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="mt-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="full-name">{t('fullNameLabel')}</Label>
                  <Input id="full-name" name="full-name" placeholder={t('fullNamePlaceholder')} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                      <Label htmlFor="email">{t('emailLabel')}</Label>
                      <Input id="email" name="email" type="email" placeholder={t('emailPlaceholder')} required />
                  </div>
                  <div className="grid gap-2">
                      <Label htmlFor="phone">{t('phoneLabel')}</Label>
                      <Input id="phone" name="phone" type="tel" placeholder={t('phonePlaceholder')} required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">{t('passwordLabel')}</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                          <Label htmlFor="city">{t('cityLabel')}</Label>
                          <Select name="city" defaultValue="Patna" required>
                            <SelectTrigger id="city">
                              <SelectValue placeholder={t('selectCityPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Patna">{t('patna')}</SelectItem>
                            </SelectContent>
                          </Select>
                      </div>
                      <div className="grid gap-2">
                          <Label htmlFor="location">{t('fullLocationLabel')}</Label>
                          <Input id="location" name="location" placeholder={t('fullLocationPlaceholder')} required />
                      </div>
                  </div>
                <div className="grid gap-2">
                  <Label htmlFor="services">{t('servicesLabel')}</Label>
                  <Input id="services" name="services" placeholder={t('servicesPlaceholder')} required />
                  <p className="text-xs text-muted-foreground">{t('servicesHint')}</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="qualifications">{t('qualificationsLabel')}</Label>
                  <Textarea id="qualifications" name="qualifications" placeholder={t('qualificationsPlaceholder')} required />
                  <p className="text-xs text-muted-foreground">{t('qualificationsHint')}</p>
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="bio">{t('bioLabel')}</Label>
                  <Textarea id="bio" name="bio" placeholder={t('bioPlaceholder')} required />
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                    <Switch id="show-qualifications" name="show-qualifications" defaultChecked />
                    <Label htmlFor="show-qualifications" className="flex-1">{t('showQualificationsLabel')}</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="verification" className="mt-6">
              <div className="grid gap-4">
                  <div className="grid gap-2 text-center">
                      <p className="text-sm text-muted-foreground">{t('verificationSubtitle')}</p>
                  </div>
                <div className="grid gap-2">
                  <Label htmlFor="aadhaar">{t('aadhaarLabel')}</Label>
                  <div className="flex items-center gap-2">
                      <Input id="aadhaar" name="aadhaar" type="file" required className="flex-1"/>
                      <Button variant="outline" size="icon" asChild><Label htmlFor="aadhaar" className="cursor-pointer"><FileUp className="h-4 w-4"/></Label></Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="selfie">{t('selfieLabel')}</Label>
                  <div className="flex items-center gap-2">
                      <Input id="selfie" name="selfie" type="file" required className="flex-1"/>
                      <Button variant="outline" size="icon" asChild><Label htmlFor="selfie" className="cursor-pointer"><FileUp className="h-4 w-4"/></Label></Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
              <Button type="submit" className="w-full">
                  {t('submitButton')}
              </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
