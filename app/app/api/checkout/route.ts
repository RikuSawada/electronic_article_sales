import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not defined in environment variables.");
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-11-20.acacia", // 適切なAPIバージョンを指定
});

export async function POST(request: Request) {
    try {
        const { title, price, bookId, userId } = await request.json();

        if (!title || !price || !bookId || !userId) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            metadata: {
                bookId: bookId,
            },
            client_reference_id: userId,
            line_items: [
                {
                    price_data: {
                        currency: "jpy",
                        product_data: {
                            name: title,
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        });

        return NextResponse.json({ checkout_url: session.url });
    } catch (err: any) {
        console.error("Stripe checkout error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
