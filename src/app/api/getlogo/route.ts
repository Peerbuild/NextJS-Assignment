import { NextResponse } from 'next/server';
import db from '@/lib/dbConnect'; // Adjust path according to your project structure
import { unstable_noStore } from 'next/cache';

export async function GET() {
    try {
        unstable_noStore(); 
        const brand = await db.brand.findFirst(); 

        if (brand) {
            return NextResponse.json({ url: brand.brandLogoUrl }); 
        } else {
            return NextResponse.json({ url: '/Logo.svg' }); 
        }
    } catch (error) {
        console.error("Error fetching brand:", error);
        return NextResponse.json({ url: '/Logo.svg' }); 
    }
}
