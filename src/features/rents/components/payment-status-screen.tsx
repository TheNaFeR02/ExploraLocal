import { StatusScreen } from "@mercadopago/sdk-react";


export default function PaymentStatusScreen({paymentId}:{paymentId: string}) {
  return (
    <StatusScreen
      initialization={{ paymentId: paymentId }}
      onReady={() => { }}
      onError={() => { }}
    />
  )
}