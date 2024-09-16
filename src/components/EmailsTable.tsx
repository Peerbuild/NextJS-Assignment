// components/EmailTable.tsx (Server Component)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Email {
  email: string;
  subscribedOn: string;
}

interface Props {
  emails: Email[];
}

export default function EmailTable({ emails }: Props) {
  return (
    <div className="rounded-md border border-[#2e2e2e] overflow-hidden">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-[#171717] border-b border-[#2e2e2e] hover:bg-[#171717]">
            <TableHead className="text-[#ecf3f3]">Email Address</TableHead>
            <TableHead className="text-[#ecf3f3]">Subscribed on</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.map((subscriber, index) => (
            <TableRow key={index} className="hover:bg-transparent">
              <TableCell className="text-[#ecf3f3] text-base border-b border-[#2e2e2e]">
                {subscriber.email}
              </TableCell>
              <TableCell className="text-[#888888] text-base border-b border-[#2e2e2e]">
                {subscriber.subscribedOn}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
