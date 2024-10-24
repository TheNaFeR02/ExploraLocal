'use client'

// Configurar el brick from the documentation. They have react-jsx therefore we had to use any. It seems they don't support ts yet without third party libraries.
// https://www.mercadopago.com.co/developers/es/docs/checkout-bricks/payment-brick/default-rendering#editor_2
import { initMercadoPago } from '@mercadopago/sdk-react';



import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/bricks/payment/type"
import { Payment } from '@mercadopago/sdk-react';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { areBookingDatesAvailable, deleteProvisionalBooking, createProvisionalBooking, confirmBooking } from '@/server/actions';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';



// Initialize MercadoPago
try {
  // initMercadoPago(process.env.PUBLIC_KEY_MERCADOPAGO ?? '');
  if (process.env.NEXT_PUBLIC_KEY_MERCADOPAGO) initMercadoPago(process.env.NEXT_PUBLIC_KEY_MERCADOPAGO, { locale: 'es-CO' })
  console.log("MercadoPago initialized successfully");
} catch (error) {
  console.error("Error initializing MercadoPago:", error);
}

export default function MercadoPagoBricks(
  { total,
    rent,
    room,
    // dateRange
  }: {
    total: number,
    rent: { id: number, name: string, rentType: string },
    room?: { id: number, name: string }
    // dateRange?: DateRange | undefined
  }) {
  const { toast } = useToast()
  const [psePaymentStatusId, setPsePaymentStatusId] = useState<undefined | string>(undefined)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const from = searchParams.get('from')
  const to = searchParams.get('to')

  if (!from || !to) return <div><p>No se encontraron fechas en la url, porfavor intente de nuevo.</p></div>

  // Convert from and to into Date objects
  // const fromDate = new Date(from);
  // const toDate = new Date(to);

  // // Create a DateRange object
  // const dateRange: DateRange = {
  //   from: fromDate,
  //   to: toDate,
  // };

  // const createQueryString = useCallback(
  //   (params: Record<string, string>) => {
  //     const searchParams = new URLSearchParams(window.location.search)
  //     Object.keys(params).forEach(key => {
  //       searchParams.set(key, params[key])
  //     })
  //     return searchParams.toString()
  //   },
  //   []
  // )


  const initialization = {
    amount: total,
    preferenceId: "<PREFERENCE_ID>", // If provided, you could choose preferences in the payment, for ex: limiting the number of installments, etc.
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
    // We passed the name of the rent as description so when they payment is completed, the name will appear on the status brick component.
    formData.description = rent.rentType === 'APARTMENT' ? rent.name : room?.name;

    // callback llamado al hacer clic en el botón enviar datos
    return new Promise(async (resolve: any, reject) => {

      try {
        const datesAvailable = await areBookingDatesAvailable(rent?.id, from, to, rent.rentType, pathname, room?.id)

        if (!datesAvailable) {
          toast({
            variant: "destructive",
            title: "Ocurrió un error al crear la reserva.",
            description: "Verifique si las fechas se encuentran disponibles y reintente de nuevo.",
            action: <ToastAction altText="Cerrar">Try again</ToastAction>,
          });
          console.log('booking dates are not available');
          throw new Error('Booking dates are not available')
        }

        const provisionalBooking = await createProvisionalBooking(rent?.id, from, to, rent.rentType, pathname, room?.id);

        if (!provisionalBooking)
          throw new Error('There was an error creating the provisional booking')

        fetch("/process_payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then(async (response) => response.json())
          .then(async ({ response }) => {
            // recibir el resultado del pago
            try {
              if (response.status === 'approved') {
                // Confirm the booking
                await confirmBooking(provisionalBooking.id);
                router.push(`/status_payment/${response.id}/`
                  // + '?' + createQueryString({ from: from, to: to } )
                );
              }

              // possible different status for pse...
              // if (response.status === 'pending'){
              //   ...
              // }



            } catch (e) {
              console.log(e)
              await deleteProvisionalBooking(provisionalBooking.id).catch((e) => console.log(e));
              toast({
                variant: "destructive",
                title: "Ocurrió un error al procesar el pago.",
                description: "El pago no fue aprobado. Por favor, intente de nuevo.",
                action: <ToastAction altText="Cerrar">Try again</ToastAction>,
              });
            }


            resolve();
          })
          .catch((error) => {
            // manejar la respuesta de error al intentar crear el pago
            reject();
          });


      } catch (e) {
        console.log("Payment was not proceeded. It could be given overlapped dates, check if a day within the range is occupied OR there was an error creating the provisional booking. : ", e)
      }


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