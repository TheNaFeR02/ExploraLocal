"use client"
import { MyRentWithRoomsAndBookingsPayload, myRoomWithBookingsAndServices } from "@/types/types";
import EditBookingDate from "./edit-booking-date";
import EditGuests from "./edit-guests";
import SelectRoom from "./select-room";
import { useEffect, useState } from "react";
import RoomList from "./room-list";
import { createContext } from "react"
import { RentBooking } from "@prisma/client";
import MercadoPagoBricks from "./mercadopago-brick";

interface RoomContextType {
  roomSelected?: myRoomWithBookingsAndServices;
  updateRoomSelected: (room: myRoomWithBookingsAndServices) => void;
}

export const RoomContext = createContext<RoomContextType>({
  roomSelected: undefined,
  updateRoomSelected: () => { }
});

export default function BookingHotelDetails({
  rentWithRoomAndBookings,
  numberOfDays
}: {
  //  Types is being assign manually, <refactor>
  rentWithRoomAndBookings: MyRentWithRoomsAndBookingsPayload,
  numberOfDays: number
}
) {
  const [roomSelected, setRoomSelected] = useState<myRoomWithBookingsAndServices>()

  const updateRoomSelected = (room: myRoomWithBookingsAndServices) => {
    setRoomSelected(room)
  }

  const costPerNight = roomSelected?.price || 0;
  const subtotal = costPerNight * numberOfDays;
  const serviceTax = subtotal * 0.15;
  const total = subtotal + serviceTax;

  return (
    <>
      <RoomContext.Provider value={{ roomSelected, updateRoomSelected }}>
        <div className='pt-4'>
          <h2 className='font-semibold pb-4'>Habitación</h2>
        </div>
        <div className='flex flex-col gap-[0.5px] pb-3'>
          <RoomList rooms={rentWithRoomAndBookings?.rooms} />
          {/* <SelectRoom rooms={rentWithRoomAndBookings?.rooms}
        // nameOfRoomSelected={nameOfRoomSelected} 
        /> */}
        </div>

        <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>

        <div className='pt-4'>
          <h2 className='font-semibold'>Fecha y huéspedes</h2>
        </div>
        <div className='py-3'>
          <EditBookingDate bookings={roomSelected?.bookings as RentBooking[]} rentType={"HOTEL"} />
          <EditGuests capacity={roomSelected?.capacity || 0} />
        </div>

        <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>

        <div className='pt-4'>
          <h2 className='font-semibold pb-4'>Precio</h2>
        </div>
        <div className='flex flex-col gap-[0.5px] pb-3'>
          <div className='flex justify-between'>
            <p>{roomSelected?.price.toLocaleString()} x noche</p>

            <p>${roomSelected ? (roomSelected.price * numberOfDays).toLocaleString() : ''}</p>

          </div>
          <div className='flex justify-between'>
            <p>Tarifa de servicio</p>
            <p>${roomSelected ? (roomSelected.price * numberOfDays * 0.15).toLocaleString() : ''}</p>
          </div>
          <div className='flex justify-between font-medium'>
            <p>Total</p>
            <p>${total.toLocaleString()}</p>
          </div>
        </div>

        <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>
        {total ? (
          <MercadoPagoBricks total={total}
            items={[{ id: roomSelected?.id.toString() || '', quantity: 1, unit_price: total, picture_url: rentWithRoomAndBookings.profile_photo, title: roomSelected?.name || '' }]}
          />
        ) : (
          <>
            <div className='pt-4'>
              <h2 className='font-semibold pb-4'>Método de pago</h2>
            </div>
            <p>Seleccione los días de estadía</p>
          </>
        )}
      </RoomContext.Provider>
    </>
  )
}