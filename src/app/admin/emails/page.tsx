"use client";
import { useState } from 'react'
import DashboardLayout from "@/components/layouts/DashBoardLayout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"

// Seeded random number generator
function seededRandom(seed: number) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// Generate mock data for the email list (100 emails)
const generateMockData = (count: number) => {
    return Array(count).fill(null).map((_, i) => {
        const seed = i + 1; // Use index as seed for consistency
        const randomDays = Math.floor(seededRandom(seed) * 365); // Random number of days up to a year
        const date = new Date();
        date.setDate(date.getDate() - randomDays);
        return {
            email: `testuser${i + 1}@gmail.com`,
            subscribedOn: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        }
    })
}

const allEmails = generateMockData(100)

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1)
    const emailsPerPage = 15
    const totalPages = Math.ceil(allEmails.length / emailsPerPage)

    const indexOfLastEmail = currentPage * emailsPerPage
    const indexOfFirstEmail = indexOfLastEmail - emailsPerPage
    const currentEmails = allEmails.slice(indexOfFirstEmail, indexOfLastEmail)

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    return (
        <DashboardLayout>
            <div className="px-6 space-y-4">
                <div className="flex justify-between mb-7">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold text-[#ecf3f3]">Emails</h1>
                        <p className="text-sm text-[#afbbbb]">Here&apos;s the list of emails of your subscribers.</p>
                    </div>
                    <Button variant="secondary" className="text-[#062826] text-base font-semibold">
                        <Download className="mr-2 h-4 w-4" /> Download CSV
                    </Button>
                </div>

                <div className="rounded-md border border-[#2e2e2e] overflow-hidden">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="bg-[#171717] border-b border-[#2e2e2e] hover:bg-[#171717]">
                                <TableHead className="text-[#ecf3f3]">Email Address</TableHead>
                                <TableHead className="text-[#ecf3f3]">Subscribed on</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {currentEmails.map((subscriber, index) => (
                                <TableRow key={index} className="hover:bg-transparent">
                                    <TableCell className="text-[#ecf3f3] text-base border-b border-[#2e2e2e]">{subscriber.email}</TableCell>
                                    <TableCell className="text-[#888888] text-base border-b border-[#2e2e2e]">{subscriber.subscribedOn}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

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
                    <span className="text-sm text-white font-semibold">Page {currentPage} of {totalPages}</span>
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
        </DashboardLayout>
    )
}