'use client'
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DrawerClose } from "@/components/ui/drawer";
import { RentBooking } from "@prisma/client";
import { useState } from "react";
import { DateRange } from "react-day-picker";



const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 2)

const initialDate: DateRange = {
  from: today,
  to: tomorrow
};

export default function CalendarRent({ bookings, sendDataToParent }: { bookings: RentBooking[], sendDataToParent: (date: DateRange | undefined) => void }) {
  const [date, setDate] = useState<DateRange | undefined>(initialDate)
  console.log('bookings ->', bookings)

  // Map bookings to disabled date ranges
  const disabledDates = bookings.map(booking => ({
    from: new Date(booking.from),
    to: new Date(booking.to)
  }));

  function handleClick() {
    sendDataToParent(date)
  }

  return (
    <>
      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        disabled={disabledDates}
      />
      <div className='py-4 flex flex-col w-3/4 mx-auto gap-3'>
        <Button onClick={handleClick}>Confirmar</Button>
        <DrawerClose asChild>
          <Button variant="secondary">Cancelar</Button>
        </DrawerClose>
      </div>
    </>
  )
}