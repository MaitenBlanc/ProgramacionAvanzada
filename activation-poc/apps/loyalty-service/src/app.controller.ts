import { Controller, Inject, UseInterceptors } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { NotificationLog, NotificationDocument } from './notification.schema';
import { IdempotencyInterceptor } from 'kafka-toolkit';

@Controller()
export class AppController {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(NotificationLog.name) private notificationModel: Model<NotificationDocument>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'mailhog', // Cambiar esto en local si se corre sin docker: localhost
      port: 1025,
      secure: false,
    });
  }

  @UseInterceptors(IdempotencyInterceptor)
  @EventPattern('activation.events')
  async handleActivationEvents(@Payload() message: any) {
    if (message.eventType === 'ActivationCompleted') {
      console.log(`[Mailhog] Enviando Email de BIENVENIDA a ${message.customerId}`);
      await this.sendEmail(message.customerId, 'Bienvenido!', 'Tu servicio ha sido activado correctamente.');
      await this.recordNotification(message.correlationId, message.eventType);
    } else if (message.eventType === 'ActivationFailed') {
      console.log(`[Mailhog] Enviando Email de DISCULPAS (Error) a ${message.customerId}`);
      await this.sendEmail(message.customerId, 'Error de activación', 'Lo sentimos, hubo un problema al activar tu servicio.');
      await this.recordNotification(message.correlationId, message.eventType);
    }
  }

  private async sendEmail(to: string, subject: string, text: string) {
    try {
      // Intenta enviar con mailhog; si no, fallback a localhost
      await this.transporter.sendMail({
        from: '"Activaciones" <no-reply@empresa.com>',
        to: `${to}@example.com`,
        subject,
        text,
      });
    } catch (err) {
      console.error('Error enviando email con mailhog, intentando localhost', err);
      const localTransporter = nodemailer.createTransport({ host: 'localhost', port: 1025, secure: false });
      await localTransporter.sendMail({
        from: '"Activaciones" <no-reply@empresa.com>',
        to: `${to}@example.com`,
        subject,
        text,
      }).catch(e => console.error('Fallo definitivo el envio', e));
    }
  }

  private async recordNotification(activationId: string, eventType: string) {
    try {
      await this.notificationModel.create({
        _id: `${activationId}-${eventType}` as any,
        activationId,
        eventType
      });
    } catch (e: any) {
      if (e.code !== 11000) throw e;
    }
  }
}
