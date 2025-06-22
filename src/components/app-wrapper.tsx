'use client';

import { useState, useEffect } from 'react';
import WelcomeScreen from './welcome-screen';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Show for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <WelcomeScreen />;
  }

  return <>{children}</>;
}
