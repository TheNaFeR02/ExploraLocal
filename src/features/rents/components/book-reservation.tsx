import { Prisma, RentBooking } from "@prisma/client"
import prisma from '@/lib/prisma'
import Image from 'next/image'
import EditBookingDate from "./edit-booking-date"
import EditGuests from "./edit-guests"
import MercadoPagoBricks from "./mercadopago-brick"
import SelectRoom from "./select-room"
import { useSearchParams } from "next/navigation"



export default async function BookReservation({ bookings, rentId, numberOfDays, selectedRoomId }: { bookings: RentBooking[], rentId: number, numberOfDays: number, selectedRoomId?: string }) {
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
      rooms: true,
      type: true,
    },
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

  // name of the room selected
  const roomSelected = rent.rooms.find((room) => room.id.toString() === selectedRoomId)
  const nameOfRoomSelected = roomSelected?.name
  const priceOfRoomSelected = roomSelected?.price || 0


  // In case the rent is an apartment, the direct price is what should be charged. 
  // In case the rent is a hotel, the room price is the one that should be charged.
  let total = 0
  if (rent.type == 'APARTMENT') {
    const costPerNight = rent.price
    const subtotal = rent.price * numberOfDays
    const serviceTax = subtotal * 0.15
    total = subtotal + serviceTax
  } else {
    // total = room.....  

    // Selecting the price of the room selected    
    const costPerNight = priceOfRoomSelected
    const subtotal = priceOfRoomSelected * numberOfDays
    const serviceTax = subtotal * 0.15
    total = subtotal + serviceTax
  }

  return (
    <div className="p-5">
      <div>
        <h1 className="font-bold text-xl">Haz tu reserva</h1>
      </div>

      <div className='flex gap-2 py-2'>

        <div className=''>
          <Image className='rounded-sm w-full h-auto'
            src={rent.profile_photo}
            alt={'foto'}
            width={120}
            height={120}
            priority
          />
        </div>
        <div className='self-center'>
          <h2 className='font-medium'>{rent?.name}</h2>
          <p className='text-sm'>Mompox-Bolívar</p>
        </div>
      </div>

      <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>

      {rent.type === 'APARTMENT' && (
        <>
          <div className='pt-4'>
            <h2 className='font-semibold'>Fecha y huéspedes</h2>
          </div>
          <div className='py-3'>
            <EditBookingDate bookings={bookings} rentType={rent.type} />
            <EditGuests />
          </div>
        </>
      )}

      <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>

      {/* {rent.type === 'HOTEL' && (
        <>
        <DateGuestsRoomsSection />
        </>
      )} */}

      {/* PRICE SECTION */}
      {rent.type === 'APARTMENT' && (
        <>
          <div className='pt-4'>
            <h2 className='font-semibold pb-4'>Precio</h2>
          </div>
          <div className='flex flex-col gap-[0.5px] pb-3'>
            <div className='flex justify-between'>
              <p>{rent.price.toLocaleString()} x noche</p>
              <p>${(rent.price * numberOfDays).toLocaleString()}</p>
            </div>
            <div className='flex justify-between'>
              <p>Tarifa de servicio</p>
              <p>${(rent.price * numberOfDays * 0.15).toLocaleString()}</p>
            </div>
            <div className='flex justify-between font-medium'>
              <p>Total</p>
              <p>${total.toLocaleString()}</p>
            </div>
          </div>

          <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>
        </>
      )}

      {rent.type === 'HOTEL' && (
        <>
          <div className='pt-4'>
            <h2 className='font-semibold pb-4'>Precio</h2>
          </div>
          <div className='flex flex-col gap-[0.5px] pb-3'>
            <div className='flex justify-between'>
              <p>{priceOfRoomSelected.toLocaleString()} x noche</p>

              <p>${(priceOfRoomSelected * numberOfDays).toLocaleString()}</p>

            </div>
            <div className='flex justify-between'>
              <p>Tarifa de servicio</p>
              <p>${(priceOfRoomSelected * numberOfDays * 0.15).toLocaleString()}</p>
            </div>
            <div className='flex justify-between font-medium'>
              <p>Total</p>
              <p>${total.toLocaleString()}</p>
            </div>
          </div>

          <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>
        </>
      )}

      {total ? (
        <MercadoPagoBricks total={total} />
      ) : (
        <>
          <div className='pt-4'>
            <h2 className='font-semibold pb-4'>Método de pago</h2>
          </div>
          <p>Seleccione los días de estadía</p>
        </>
      )}

    </div>
  )
}
