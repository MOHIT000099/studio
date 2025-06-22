
import { redirect } from 'next/navigation';

export default function PriestDetailRedirectPage({ params }: { params: { id: string } }) {
    redirect(`/en/priests/${params.id}`);
}
