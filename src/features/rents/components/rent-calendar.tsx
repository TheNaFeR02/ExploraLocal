'use client'
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import { DrawerClose } from "@/components/ui/drawer";
import { RentBooking } from "@prisma/client";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/custom-calendar"; // custom calendar.


// https://github.com/shadcn-ui/ui/issues/4366#issuecomment-2421608492
export default function CalendarRent({ bookings, sendDataToParent }: { bookings: RentBooking[], sendDataToParent: (date: DateRange | undefined) => void }) {
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  // console.log('bookings ->', bookings)

  // Map bookings to disabled date ranges
  const disabledDates = bookings.map(booking => ({
    // from: getDateWithoutTime(booking.from),
    // to: getDateWithoutTime(booking.to)
    from: booking.from,
    to: booking.to
  }));

  function handleClick() {
    console.log(date)
    sendDataToParent(date)
  }

  return (
    <>
      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        disabled={[
          { from: new Date(0), to: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }, // disables the past days.
          ...disabledDates // disable the already booked rooms.
        ]}
        timeZone="UTC"
      />
      
      <div className='py-4 flex flex-col w-3/4 mx-auto gap-3'>
        {/* <Button onClick={handleClick}>Confirmar</Button>
        <DrawerClose asChild>
          <Button variant="secondary">Cancelar</Button>
        </DrawerClose> */}

        <DrawerClose asChild>
          <Button onClick={handleClick}>Confirmar</Button>
        </DrawerClose>
      </div>
    </>
  )
}