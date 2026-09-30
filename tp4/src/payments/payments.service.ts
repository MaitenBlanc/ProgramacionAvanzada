import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentSessionDTO } from './dto/payment-session.dto';

@Injectable()
export class PaymentsService {
    private readonly stripe = new Stripe(process.env.STRIPE_SECRET);

    async createPaymentSession(paymentSessionDTO: PaymentSessionDTO) {
        const { orderId, currency, items } = paymentSessionDTO;

        const lineItems = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        // Checkout Session en Stripe
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
            payment_intent_data: {
                // Criterio de aceptación 1: `orderId` queda en `payment_intent_data.metadata`
                metadata: {
                    orderId: orderId,
                }
            }
        });

        // Devuelve lo que Stripe responde
        return { sessionId: session.id, url: session.url };
    }
}
