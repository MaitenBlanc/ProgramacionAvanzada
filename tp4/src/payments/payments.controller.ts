import { BadRequestException, Body, Controller, Get, Headers, Post, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDTO } from './dto/payment-session.dto';
import Stripe from 'stripe';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    // Exponer POST para crear la Checkout Session en Stripe
    @Post('create-payment-session')
    createPaymentSession(@Body() paymentSessionDTO: PaymentSessionDTO) {
        return this.paymentsService.createPaymentSession(paymentSessionDTO);
    }

    // Rutas de apoyo (redirects de Checkout)
    @Get('success')
    success() {
        return { ok: true, message: 'Payment successful' };
    }

    @Get('cancel')
    cancel() {
        return { ok: false, message: 'Payment cancelled' };
    }

    // Exponer POST de webhook que verifique la firma
    @Post('webhook')
    stripeWebhook(@Req() req: any, @Headers('stripe-signature') signature: string) {
        const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
        let event: Stripe.Event;

        try {
            // Verificar con stripe.webhooks.constructEvent
            event = Stripe.webhooks.constructEvent(req['rawBody'], signature, endpointSecret);
        } catch (err) {
            throw new BadRequestException(`Webhook Error: ${(err as Error).message}`);
        }

        switch (event.type) {
            case 'charge.succeeded':
                const charge = event.data.object as Stripe.Charge;

                // Extraer metadata.orderId y registrarlo
                console.log(`Pago exitoso registrado. Order ID: ${charge.metadata.orderId}`);
                break;
            default:
                // Otros event.type: Log de "no manejado"
                console.log(`Evento no manejado: ${event.type}`);

        }

        // 200 para que Stripe no reintente eternamente
        return { received: true };
    }
}
