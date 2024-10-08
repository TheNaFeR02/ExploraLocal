'use client'

import { Room } from "@prisma/client"
import EditBookingDate from "./edit-booking-date"
import EditGuests from "./edit-guests"
import SelectRoom from "./select-room"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

// This is the section to select Date, guests and rooms.


export default function DateGuestsRoomsSection({ rooms, nameOfRoomSelected }: { rooms: Room[], nameOfRoomSelected?: string }) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const selectedRoomId = searchParams.get('selectedRoomId') || undefined
    if (selectedRoomId)
      setSelectedRoomId(selectedRoomId)
  }, [])


  return (
    <>
      <div className='pt-4'>
        <h2 className='font-semibold'>Fecha y huéspedes</h2>
      </div>
      <div className='py-3'>
        <EditBookingDate bookings={bookings} rentType={rent.type} />
        <EditGuests />
      </div>

      <div className='pt-4'>
        <h2 className='font-semibold pb-4'>Habitación</h2>
      </div>
      <div className='flex flex-col gap-[0.5px] pb-3'>
        <SelectRoom rooms={rooms} nameOfRoomSelected={nameOfRoomSelected} />
      </div>

      <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>
    </>
  )
}