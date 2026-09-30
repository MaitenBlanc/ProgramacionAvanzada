export interface EventEnvelope<T> {
  eventId: string;
  eventType: string;
  version: number;
  occurredAt: string;
  correlationId: string;
  customerId: string;
  source: string;
  payload: T;
}

export interface ActivationRequestedPayload {
  planId: string;
  channel: string;
  simulateFailure: 'none' | 'billing' | 'provisioning';
}

export interface BillingResultPayload {
  status: 'OK' | 'ERROR';
  reason?: string;
}

export interface ProvisioningResultPayload {
  status: 'OK' | 'ERROR';
  reason?: string;
}