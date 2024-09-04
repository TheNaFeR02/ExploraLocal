"use client"
import { RentBooking } from "@prisma/client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import CalendarRent from "./rent-calendar"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function EditBookingDate({ bookings }: { bookings: RentBooking[] }) {
  const [dateFromChild, setDateFromChild] = useState<DateRange | undefined>();

  function handleDataFromChild(data: DateRange | undefined) {
    console.log("padre recibió", data)
    setDateFromChild(data);
  }

  function formatDateRange(dateRange: DateRange | undefined): string {
    if (!dateRange || !dateRange.from || !dateRange.to) return "Elegir días";

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const fromDate = new Intl.DateTimeFormat('es-ES', options).format(dateRange.from);
    const toDate = new Intl.DateTimeFormat('es-ES', options).format(dateRange.to);

    return `${fromDate} - ${toDate}`;
  }

  return (
    <div className='flex justify-between'>
      <div>
        <p className='font-medium'>Fechas</p>
        {dateFromChild ? <p>{formatDateRange(dateFromChild)}</p> : <p>Elegir días</p>}
      </div>
      <div className="self-center">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="link">
              <span className='underline'>Cambiar</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Elije tus días</DrawerTitle>
                <DrawerDescription>Presiona dos veces el día de inicio y luego el día de salida.</DrawerDescription>
              </DrawerHeader>
            </div>
            <div className="mx-auto">
              <CalendarRent bookings={bookings} sendDataToParent={handleDataFromChild}></CalendarRent>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}