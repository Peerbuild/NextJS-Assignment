"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import EmailTable from "./EmailsTable";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Email {
  email: string;
  subscribedOn: string;
}

interface Props {
  initialEmails: Email[];
  totalEmails: number;
}

export default function EmailsTable({ initialEmails, totalEmails }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage, setEmailsPerPage] = useState(15);
  const totalPages = Math.ceil(totalEmails / emailsPerPage);

  useEffect(() => {
    const updateEmailsPerPage = () => {
      if (window.innerWidth <= 640) {
        setEmailsPerPage(11);
      } else {
        setEmailsPerPage(15);
      }
    };

    // Initial setup
    updateEmailsPerPage();

    // Add event listener to window resize
    window.addEventListener("resize", updateEmailsPerPage);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateEmailsPerPage);
  }, []);

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = initialEmails.slice(
    indexOfFirstEmail,
    indexOfLastEmail,
  );

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const downloadCSV = () => {
    const csv = convertToCSV(initialEmails);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "emails.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="md:px-4 px-0  space-y-4">
      <div className="flex flex-col md:flex-row justify-between mb-7">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-[#ecf3f3]">Emails</h1>
          <p className="text-sm text-[#afbbbb]">
            Here&apos;s the list of emails of your subscribers.
          </p>
        </div>
        <Button
          variant="secondary"
          className="text-[#062826] text-base w-fit h-10 font-semibold mt-4 md:mt-0"
          onClick={downloadCSV}
        >
          Download CSV
        </Button>
      </div>

      <EmailTable emails={currentEmails} />

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="text-[#ecf3f3] border-[#2e2e2e] bg-transparent font-semibold"
          size="sm"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Prev
        </Button>
        <span className="text-sm text-white font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          className="text-[#ecf3f3] border-[#2e2e2e] bg-transparent font-semibold"
          size="sm"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Helper function to convert emails data to CSV
const convertToCSV = (data: { email: string; subscribedOn: string }[]) => {
  const header = ["Email Address", "Subscribed on"];
  const rows = data.map((row) => [row.email, `"${row.subscribedOn}"`]);
  return [header, ...rows].map((e) => e.join(",")).join("\n");
};
