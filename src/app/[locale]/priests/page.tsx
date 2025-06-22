'use client';

import React, { useState, useMemo } from 'react';
import PriestCard from '@/components/priest-card';
import { allPriests, allServices, allCities } from '@/data/priests';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function PriestsPage() {
  const t = useTranslations('PriestsPage');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');

  const filteredPriests = useMemo(() => {
    return allPriests.filter((priest) => {
      const matchesSearch = priest.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesService =
        selectedService === 'all' || priest.services.includes(selectedService);
      const matchesCity =
        selectedCity === 'all' || priest.city === selectedCity;
      return matchesSearch && matchesService && matchesCity && priest.verified;
    });
  }, [searchQuery, selectedService, selectedCity]);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>
          <Select
            value={selectedService}
            onValueChange={setSelectedService}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('serviceFilterPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allServices')}</SelectItem>
              {allServices.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger>
              <SelectValue placeholder={t('cityFilterPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allCities')}</SelectItem>
              {allCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredPriests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPriests.map((priest) => (
            <PriestCard key={priest.id} priest={priest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold font-headline">{t('noPanditsTitle')}</h2>
          <p className="mt-2 text-muted-foreground">
            {t('noPanditsSubtitle')}
          </p>
        </div>
      )}
    </div>
  );
}
