import { PanditSignupForm } from "@/components/auth/pandit-signup-form";
import { getTranslator } from "next-intl/server";

export default async function PanditSignupPage({params: {locale}}: {params: {locale: string}}) {
    const t = await getTranslator(locale, 'PanditSignupPage');
    return (
        <div className="w-full h-full flex items-center justify-center p-4 py-12 md:py-24">
            <PanditSignupForm />
        </div>
    )
}
