'use client'

// Configurar el brick from the documentation. They have react-jsx therefore we had to use any. It seems they don't support ts yet without third party libraries.
// https://www.mercadopago.com.co/developers/es/docs/checkout-bricks/payment-brick/default-rendering#editor_2
import { initMercadoPago } from '@mercadopago/sdk-react';

// Initialize MercadoPago
try {
  // initMercadoPago(process.env.PUBLIC_KEY_MERCADOPAGO ?? '');
  if (process.env.NEXT_PUBLIC_KEY_MERCADOPAGO) initMercadoPago(process.env.NEXT_PUBLIC_KEY_MERCADOPAGO, { locale: 'es-CO' })
  console.log("MercadoPago initialized successfully");
} catch (error) {
  console.error("Error initializing MercadoPago:", error);
}


import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/bricks/payment/type"
import { Payment } from '@mercadopago/sdk-react';
import { useState } from 'react';
import PaymentStatusScreen from './payment-status-screen';

import { useRouter } from 'next/navigation'
import { Items } from 'mercadopago/dist/clients/commonTypes';



export default function MercadoPagoBricks({ total, description }: { total: number, description: string }) {
  const [psePaymentStatusId, setPsePaymentStatusId] = useState<undefined | string>(undefined)
  const router = useRouter()


  const initialization = {
    amount: total,
    preferenceId: "<PREFERENCE_ID>",
  };

  const customization: IPaymentBrickCustomization = {
    paymentMethods: {
      // ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
      // mercadoPago: "all",
      // atm: "all"
    },
  };
  const onSubmit = async (
    { selectedPaymentMethod, formData }: { selectedPaymentMethod: any, formData: any }
  ) => {
    // Add items to formData
    formData.description = description;


    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve: any, reject) => {
      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(async (response) => response.json())
        .then(({ response }) => {
          // recibir el resultado del pago
          router.push(`/status_payment/${response.id}/`) // page that paints the statusbrick with the id of the payment
          resolve();
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          reject();
        });
    });
  };
  const onError = async (error: any) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback llamado cuando el Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
  };



  return (
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  )
}