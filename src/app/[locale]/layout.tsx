import { redirect } from 'next/navigation';

// This layout is no longer needed after removing i18n.
// It redirects to the root to avoid 404s if old URLs are accessed.
export default function LocaleLayout() {
  redirect('/');
}
