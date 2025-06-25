import { PanditSignupForm } from "@/components/auth/pandit-signup-form";

export default async function PanditSignupPage({params: {locale}}: {params: {locale: string}}) {
    return (
        <div className="w-full h-full flex items-center justify-center p-4 py-12 md:py-24">
            <PanditSignupForm />
        </div>
    )
}
