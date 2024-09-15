import db from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json(); 


        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        
        const existingSubscription = await db.subscription.findUnique({
            where: { email },
        });

        if (existingSubscription) {
            return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
        }

        
        await db.subscription.create({
            data: {
                email,
                subscribedAt: new Date(),
            },
        });

        return NextResponse.json({ message: 'Subscription successful' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
