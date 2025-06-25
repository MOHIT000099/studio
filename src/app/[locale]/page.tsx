import { redirect } from 'next/navigation';

export default function DeprecatedHomePage({ params }: { params: { locale: string } }) {
  redirect('/');
}
