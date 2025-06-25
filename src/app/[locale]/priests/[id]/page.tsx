import { redirect } from 'next/navigation';

export default function DeprecatedPriestDetailPage({ params }: { params: { id: string } }) {
  redirect(`/priests/${params.id}`);
}
