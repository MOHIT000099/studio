import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { allPriests } from '@/data/priests';
import { contactInfo } from '@/data/contact';
import DashboardClient from '@/components/admin/dashboard-client';
import FeaturedPanditsClient from '@/components/admin/featured-pandits-client';
import ContactInfoClient from '@/components/admin/contact-info-client';
  
export default async function AdminDashboardPage() {
    // In a real app, this data would be fetched from a database.
    const pendingPandits = allPriests.filter(p => p.pendingApproval);
    const approvedPandits = allPriests.filter(p => p.verified && !p.pendingApproval);
  
    return (
      <div className="container py-12 md:py-16 space-y-12">
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
            Admin Dashboard
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage pandit approvals, featured pandits, and site contact information.
            </p>
        </div>

        <ContactInfoClient contactInfo={contactInfo} />
  
        <Card>
            <CardHeader>
                <CardTitle>Pending Registrations</CardTitle>
                <CardDescription>
                    The following pandits have submitted their profiles for verification.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DashboardClient pendingPandits={pendingPandits} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Manage Pandit Profiles</CardTitle>
                <CardDescription>
                    Use the toggle to feature or unfeature a pandit on the home page, and manually adjust their ratings.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FeaturedPanditsClient approvedPandits={approvedPandits} />
            </CardContent>
        </Card>
      </div>
    );
  }
  
