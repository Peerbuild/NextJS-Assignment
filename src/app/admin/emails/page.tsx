// app/email/page.tsx
import EmailsTable from "@/components/EmailTableWrapper";
import db from "@/lib/dbConnect";
import DashboardLayout from '@/components/layouts/DashBoardLayout';

async function fetchEmails() {
    const emails = await db.subscription.findMany({
        select: {
            email: true,
            subscribedAt: true,
        },
        orderBy: {
            subscribedAt: 'desc',
        },
    });

    const formattedEmails = emails.map((email) => ({
        email: email.email,
        subscribedOn: email.subscribedAt.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }),
    }));

    const totalEmails = emails.length;

    return { formattedEmails, totalEmails };
}

export default async function EmailPage() {
    const { formattedEmails, totalEmails } = await fetchEmails();

    return (
        <DashboardLayout>
            <EmailsTable initialEmails={formattedEmails} totalEmails={totalEmails} />
        </DashboardLayout>
    );
}

// export const revalidate = 60; 
