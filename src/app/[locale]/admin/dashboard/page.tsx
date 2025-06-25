import { redirect } from 'next/navigation';

export default function DeprecatedAdminDashboardPage() {
  redirect('/admin/dashboard');
}
