"use client"
import { Button } from "@/components/ui/button";
import { StatusScreen } from "@mercadopago/sdk-react";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation'

// server?
export default function PaymentStatusPage() {
  const params = useParams<{ payment_id: string }>()
  const router = useRouter()

  console.log(params)
  return (
    <>
      <div>

        <StatusScreen
          initialization={{ paymentId: params.payment_id }}
        // onReady={() => { }}
        // onError={() => { }}
        />
        <div className="flex justify-center" >
          {/* TODO: REGRESAR A LA LISTA DE ARRIENDOS HECHOS POR EL USUARIO, ORGANIZADOS POR MÁS RECIENTES. 
          TODO: La card del booking ha de hacer un get a la reserva hecha por el usuario con su información.
          */}
          {/*  */}
          <Button onClick={() => router.push("/")}>Regresar a la página</Button>

        </div>
      </div>
    </>
  )
}