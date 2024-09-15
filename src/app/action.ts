'use server'
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import db from '@/lib/dbConnect';
import {z} from 'zod';

const prisma = new PrismaClient();


export async function updateBrandInfo(formData: FormData) {

    const brandLogoUrl = formData.get('brandLogoUrl') as string;
    const buttonText = formData.get('email') as string; 
    const buttonLink = formData.get('buttonLink') as string;
    
    if (!brandLogoUrl || !buttonText || !buttonLink) {
        throw new Error('Missing required fields');
    }

    try {
        // Check if a brand record already exists
        const existingBrand = await prisma.brand.findFirst();

        if (existingBrand) {
            // Update existing record
            await prisma.brand.update({
                where: { id: existingBrand.id },
                data: {
                    brandLogoUrl,
                    buttonText,
                    buttonLink,
                },
            });
        } else {
            // Create new record
            await prisma.brand.create({
                data: {
                    brandLogoUrl,
                    buttonText,
                    buttonLink,
                },
            });
        }

        // Revalidate the path to update the UI
        revalidatePath('/admin/header');

        return { success: true };
    } catch (error) {
        console.error('Failed to update brand info:', error);
        return { success: false, error: 'Failed to update brand info' };
    }
}

const FormSchema = z.object({
    email: z.string().trim().email({ message: "Please enter a valid email address." }),
});

export async function subscribeEmail(formData: FormData) {
    const email = formData.get('email') as string;

    const result = FormSchema.safeParse({ email });

    if (!result.success) {
        return { error: 'Invalid email address' };
    }

    try {
        const existingSubscription = await db.subscription.findUnique({
            where: { email },
        });

        if (existingSubscription) {
            return { error: 'Email already subscribed' };
        }

        await db.subscription.create({
            data: {
                email,
                subscribedAt: new Date(),
            },
        });

        revalidatePath('/admin/emails');
        return { message: 'Subscription successful' };
    } catch (error) {
        console.error(error);
        return { error: 'Internal server error' };
    }
}