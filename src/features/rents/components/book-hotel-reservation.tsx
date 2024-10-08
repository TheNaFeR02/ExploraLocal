import { Rent, RentBooking, Room, Service } from "@prisma/client";
import Image from 'next/image'
import BookingHotelDetails from "./booking-hotel-details";
import { MyRentWithRoomsAndBookingsPayload } from "@/types/types";


export default function BookHotelReservation({
  rentWithRoomAndBookings,
  numberOfDays
}: {
  //  Types is being assign manually, <refactor>
  rentWithRoomAndBookings: MyRentWithRoomsAndBookingsPayload,
  numberOfDays: number
}
) {

  return (
    <div className="p-5">
      <div>
        <h1 className="font-bold text-xl">Haz tu reserva</h1>
      </div>

      <div className='flex gap-2 py-2'>

        <div className=''>
          <Image className='rounded-sm w-full h-auto'
            src={rentWithRoomAndBookings!.profile_photo}
            alt={'foto'}
            width={120}
            height={120}
            priority
          />
        </div>
        <div className='self-center'>
          <h2 className='font-medium'>{rentWithRoomAndBookings?.name}</h2>
          <p className='text-sm'>Mompox-Bolívar</p>
        </div>
      </div>

      <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>

      {/* Fecha y huéspedes */}
      <BookingHotelDetails rentWithRoomAndBookings={rentWithRoomAndBookings} numberOfDays={numberOfDays}/>

    </div>
  )
}