# TP4 - Sesiones de pago y webhook Stripe

Microservicio desarrollado en NestJS para la integración con Stripe, permitiendo la creación de sesiones de cobro y la recepción de notificaciones de pago exitoso a través de webhooks.

## Requisitos previos
- Node.js (v18 o superior recomendado)
- Stripe CLI instalado y configurado con tu cuenta de Stripe.

## Configuración y ejecución
1. Clonar el repositorio y ejecutar `npm install` para instalar las dependencias.
2. Copiar el archivo de plantilla `.env.template` y renombrarlo a `.env`.
3. Completar las variables de entorno en el archivo `.env` con las claves de prueba de Stripe.
4. Ejecutar el servidor en modo desarrollo:
   ```bash
   npm run start:dev