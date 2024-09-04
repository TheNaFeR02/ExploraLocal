import { Prisma, RentBooking } from "@prisma/client"
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

import EditBookingDate from "./edit-booking-date"
import EditGuests from "./edit-guests"


export default async function BookReservation({ bookings, rentId }: { bookings: RentBooking[], rentId: number }) {
  // TODO: Show header "Haz tu reserva" h1
  // TODO: Show photo with information. Title. Place-> Mompox-Bolívar
  // TODO: Fecha -> editar(calendar) 
  // TODO: Huespedes
  // TODO: Precio por noche, ...gastos, total
  // TODO: Método de pago -> Editar
  // TODO: info -> información de cancelación gratuita/completa y parcial.

  const rent = await prisma.rent.findUnique({
    where: { id: rentId },
    select: {
      name: true,
      profile_photo: true,
      price: true,
    }
  })
    .catch(e => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // TODO: Check the error that this try can return and handle it like the example below:
        // For all of the error prisma codes: https://www.prisma.io/docs/orm/reference/error-reference#error-codes
        // if (e.code === 'P2002') {
        //   console.log(
        //     'There is a unique constraint violation, a new user cannot be created with this email'
        //   )
        // }
        console.log("There was an error trying to find the rent.", e.code, e.message);
      } else console.log("unknown prisma error trying to find the rent:", e)
      // return notFound();
    });

  if (!rent) return <p>Error uploading the rent.</p>

  return (
    <div className="p-5">
      <div>
        <h1 className="font-bold text-xl">Haz tu reserva</h1>
      </div>

      {/* <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr> */}
      <div className='flex gap-2 py-2'>

        <div className=''>
          <Image className='rounded-sm'
            src={rent.profile_photo}
            alt={'foto'}
            width={120}
            height={120}
          />
        </div>
        <div className='self-center'>
          <h2 className='font-medium'>{rent?.name}</h2>
          <p className='text-sm'>Mompox-Bolívar</p>
        </div>
      </div>
      <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>
      <div className='pt-4'>
        <h2 className='font-semibold'>Fecha y huéspedes</h2>
      </div>
      {/* <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr> */}
      <div>
        {/* <div className='flex justify-between'> */}
        <EditBookingDate bookings={bookings} />
        {/* <div>
            <p className='font-medium'>Fechas</p>
            <p>6-8ag</p>
          </div>
          <div className="self-center">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="link">
                  <span className='underline'>Cambiar</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto">
                <CalendarRent bookings={bookings}></CalendarRent>
                </div>
              </DrawerContent>
            </Drawer>
          </div> */}
        {/* </div> */}
        <div className='flex justify-between'>
          <EditGuests />
          {/* <div>
            <p className='font-medium'>Huéspedes</p>
            <p>2 Adultos</p>
          </div>
          <div className="self-center">
            <Button variant="link">
              <span className='underline'>Cambiar</span>
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  )
}
