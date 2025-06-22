import { Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { contactInfo } from '@/data/contact';

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions or need direct assistance in finding the right pandit? We're here to help.
        </p>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>
            Reach out to us through any of the channels below. We typically respond within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/20 p-3 flex-shrink-0">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Phone Support</h3>
              <p className="text-muted-foreground">For direct assistance with booking or finding a pandit, give us a call.</p>
              <a href={`tel:${contactInfo.phone}`} className="text-primary font-medium mt-1 inline-block hover:underline">
                {contactInfo.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/20 p-3 flex-shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email Support</h3>
              <p className="text-muted-foreground">For general inquiries, partnership opportunities, or feedback, send us an email.</p>
              <a href={`mailto:${contactInfo.email}`} className="text-primary font-medium mt-1 inline-block hover:underline">
                {contactInfo.email}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
