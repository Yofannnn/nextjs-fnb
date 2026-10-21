import { apiRequest } from "@/lib/api-request";
import { GetPaymentDetailApiResponse, InitiatePaymentApiResponse, PaymentApiResponse } from "@/features/payment/types/payment.dto";

const JSON_HEADERS = { "Content-Type": "application/json" } as const;

export async function getPaymentById({ orderId, paymentId, guestToken }: { orderId: string; paymentId: string; guestToken?: string }) {
  const response = await apiRequest<GetPaymentDetailApiResponse>(`/payments/${orderId}/${paymentId}`, { params: { guestToken } });
  return response.data;
}

export function initiatePayment(values: { orderId: string; guestToken?: string }) {
  return apiRequest<InitiatePaymentApiResponse>("/payments", {
    params: { guestToken: values.guestToken },
    method: "POST",
    credentials: "include",
    headers: JSON_HEADERS,
    body: JSON.stringify(values),
  });
}

export function payPayment(values: { paymentId: string }) {
  return apiRequest<PaymentApiResponse>("/payments/pay", {
    method: "POST",
    credentials: "include",
    headers: JSON_HEADERS,
    body: JSON.stringify(values),
  });
}
