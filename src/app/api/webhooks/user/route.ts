import prisma from "@/lib/prisma";
// import { EmailAddress } from "@clerk/nextjs/server";
// import { timestamp } from "console";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {Webhook, WebhookRequiredHeaders } from "svix";
import Stripe from 'stripe';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';;

type EventType = 'user.created' | 'user-updated' | '*';

type Event = {
    data: EventDataType;
    object: 'event';
    type: EventType;
};

type EventDataType = {
    id: string;
    first_name: string;
    last_name: string;
    email_addresses: EmailAddressType [];
    primary_email_address_id: string;
    attributes: Record<string, string | number>;
};

type EmailAddressType = {
    id: string;
    email_address: string;
};


async function handler(request: Request) {
    const payload = await request.json();
    const headersList = await headers();
    const heads = {
        'svix-id': headersList.get('svix-id'),
        'svix-timestamp': headersList.get('svix-timestamp'),
        'svix-signature': headersList.get('svix-signature'),
    };
    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;

    try {
        evt = wh.verify(
            JSON.stringify(payload),
            heads as IncomingHttpHeaders & WebhookRequiredHeaders
        ) as Event;
    } catch (err) {
        console.error((err as Error).message);
        return NextResponse.json({}, { status: 400 });
    }

    const eventType: EventType = evt.type;
    if (eventType === 'user.created' || eventType === 'user-updated') {
        const {
            id,
            first_name,
            last_name,
            email_addresses,
            primary_email_address_id,
            ...attributes
        } = evt.data;

        // Log das informações do usuário antes de atualizar no banco
        console.log(`Usuário ${eventType}: ${first_name} ${last_name}, Email: ${email_addresses.map(e => e.email_address).join(", ")}, Email principal: ${primary_email_address_id}`);

        // inserir usuario no Stripe
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-05-28.basil',
        });

        const customer = await stripe.customers.create({
            name: `${first_name} ${last_name}`,
            email: email_addresses ? email_addresses[0].email_address : '',
        })

        await prisma.user.upsert({
            where: { externalID: id as string },
            create: {
                externalID: id as string,
                stripeCustomerID: customer.id,
                attributes,
            },
            update: {
                attributes,
            }
        });
    }

    return NextResponse.json({}, { status: 200 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;