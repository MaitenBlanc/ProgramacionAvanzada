# POC Activación de Servicios con Kafka

Esta Prueba de Concepto (POC) demuestra cómo coordinar la activación de un servicio usando una arquitectura dirigida por eventos con Apache Kafka, NestJS y React, aplicando patrones como Coreografía, Sagas, Compensación y Consumer Groups.

## 🚀 Requisitos y Levantamiento

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Desde la raíz del proyecto, limpia y levanta todos los contenedores (Microservicios + Infraestructura):

```bash
docker compose down -v
docker compose up -d --build
```

> **Nota:** Espera unos 30 a 40 segundos la primera vez para que MongoDB y Kafka se inicialicen correctamente y todos los servicios de NestJS logren conectarse.

## 🎛️ Tableros de Control

Una vez que los contenedores estén corriendo, abre las siguientes pestañas en tu navegador:

1. **Demo UI (Frontend React):** [http://localhost:5173](http://localhost:5173) *(Aquí ejecutas las contrataciones y ves la línea de tiempo en vivo)*
2. **Mailhog (Emails):** [http://localhost:8025](http://localhost:8025) *(Bandeja de entrada local para los correos enviados)*
3. **Kafka UI (Monitor):** [http://localhost:8080](http://localhost:8080) *(Para observar los topics, mensajes, particiones y lag)*

---

## 🧪 Guion de Pruebas (Escenarios por Fase)

A continuación, los escenarios paso a paso para comprobar los conceptos clave requeridos en el Trabajo Práctico (Fases 1, 2 y 3).

### Fase 1: Escenario 1 - El Camino Feliz
**Objetivo:** Verificar el flujo exitoso de activación (Fan-out).
1. **En la UI:** Deja el selector "Simular Fallo" en **Ninguno (Camino Feliz)** y haz clic en "Contratar Plan".
2. **Qué observar en la UI:** Verás en la Timeline cómo ocurren en tiempo real:
   * 🟡 `ActivationRequested`
   * 🔵 `BillingAccountCreated`
   * 🟣 `ProvisioningCompleted`
   * 🟢 `ActivationCompleted`
3. **Validación externa:** Entra a **Mailhog** (http://localhost:8025) y verifica que llegó el correo de bienvenida.

### Fase 2: Escenarios de Fallo y Compensación (SAGA)

#### Escenario 2: Fallo en Billing (Cuenta rechazada)
**Objetivo:** Ver cómo la saga aborta sin afectar otros sistemas de manera inconsistente.
1. En la UI, cambia el selector a **"Fallo en Billing"** y haz clic en "Contratar Plan".
2. **Qué observar en la UI:**
   * 🟡 `ActivationRequested`
   * 🔴 `BillingFailed` (Fallo inmediato)
   * 🔴 `ActivationFailed` (El orquestador marca la activación como fallida)
   * 🟠 `ProvisioningCompleted` y luego `ProvisioningCancelled` (Compensación de aprovisionamiento).

#### Escenario 3: Fallo en Provisioning y Compensación
**Objetivo:** Ver cómo el sistema deshace pasos previos (Compensación) para mantener la consistencia.
1. Cambia el selector a **"Fallo en Provisioning"** y contrata el plan.
2. **Qué observar en la UI:**
   * 🟡 `ActivationRequested`
   * 🔵 `BillingAccountCreated` (Se cobra exitosamente)
   * 🔴 `ProvisioningFailed` (Falla al dar de alta el servicio)
   * 🔴 `ActivationFailed` (El orquestador aborta)
   * 🟠 `BillingAccountCancelled` (**¡Compensación!** El sistema anula la cuenta de facturación para devolver el dinero).

#### Escenario 4: Tolerancia a Caídas (Resiliencia de Kafka)
**Objetivo:** Demostrar que si un servicio se cae, los mensajes no se pierden.
1. En tu terminal, apaga el servicio de aprovisionamiento: `docker compose stop provisioning-service`
2. Ve a la UI y lanza un "Camino Feliz".
3. **Validación intermedia:** La Timeline se pausará. Ve a **Kafka UI** (http://localhost:8080) -> *Consumers* -> `provisioning-svc`. Verás que tiene un **Lag** (mensajes pendientes).
4. En tu terminal, levántalo de nuevo: `docker compose start provisioning-service`
5. **Qué observar:** El servicio revive, lee el mensaje pendiente de Kafka, y la Timeline de la UI avanza mágicamente hasta completar la activación.

### Fase 3: Escenario 5 - Replay del Log Inmutable
**Objetivo:** Demostrar el Event Sourcing, donde un microservicio nuevo puede reconstruir toda la historia.
Para la Fase 3 introducimos el `loyalty-service`, configurado para leer los eventos desde el principio de los tiempos (`fromBeginning: true`). Su trabajo es dar 100 puntos por cada activación exitosa que haya ocurrido.
1. En la terminal, mira los logs de este servicio:
   ```bash
   docker compose logs loyalty-service
   ```
2. **Qué observar:** Verás en los logs que al iniciar el contenedor, procesó **todas las activaciones exitosas** que hiciste en las pruebas de la Fase 1, asignando 100 puntos retroactivamente, sin que los otros microservicios tuvieran que hacer absolutamente nada para avisarle.

### Fase 4: Escenario 6 - Outbox Transaccional con MongoDB Atlas
**Objetivo:** Demostrar la consistencia garantizada al 100% entre la base de datos (MongoDB Atlas) y el Message Broker (Kafka) ante posibles caídas del sistema utilizando el Patrón Outbox.
Para la Fase 4 implementamos este patrón en el `activation-api`, el cual ahora cuenta con una conexión nativa a la nube (MongoDB Atlas).
1. Realiza una activación normal (Camino Feliz) desde la interfaz.
2. Inicia sesión en tu cuenta de **MongoDB Atlas** y dirígete al panel de **Database**.
3. Selecciona tu cluster y haz clic en **Browse Collections**.
4. Busca la base de datos `activation_db`.
5. **Qué observar:**
   - Encontrarás la colección `activations` (donde se registró la intención inicial).
   - Encontrarás una nueva colección llamada `outboxevents`. 
   - Notarás que el evento de Kafka se guardó primero allí de forma segura en la misma **transacción atómica** que la activación, y que tiene el campo `processed: true`, indicando que el job asíncrono (Cron) de NestJS lo capturó exitosamente y lo publicó en Kafka sin riesgo de pérdida de datos.
