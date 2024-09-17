// app/email/page.tsx
import EmailsTable from "@/components/Emails/EmailTableWrapper";
import db from "@/lib/dbConnect";
import DashboardLayout from "@/components/layouts/DashBoardLayout";
import { format } from "date-fns";

async function fetchEmails() {
  const emails = await db.subscription.findMany({
    select: {
      email: true,
      subscribedAt: true,
    },
    orderBy: {
      subscribedAt: "desc",
    },
  });

  const formattedEmails = emails.map((email) => ({
    email: email.email,
    subscribedOn: format(new Date(email.subscribedAt), "d MMM, yyyy"),
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
