import { redirect } from 'next/navigation';

export default function DeprecatedLoginPage() {
  redirect('/login');
}
