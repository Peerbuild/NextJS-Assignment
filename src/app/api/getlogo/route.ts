import { NextResponse } from 'next/server';
import db from '@/lib/dbConnect'; 
export async function GET() {
    try {
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
