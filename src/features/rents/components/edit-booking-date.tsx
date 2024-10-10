"use client"
import { RentBooking, RentType } from "@prisma/client";
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
import { useCallback, useContext, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RoomContext } from "./booking-hotel-details";


export default function EditBookingDate({ bookings, rentType }: { bookings: RentBooking[], rentType: RentType }) {
  const [dateFromChild, setDateFromChild] = useState<DateRange | undefined>(undefined);
  const { roomSelected, updateRoomSelected } = useContext(RoomContext)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const searchParams = new URLSearchParams(window.location.search)
      Object.keys(params).forEach(key => {
        searchParams.set(key, params[key])
      })
      return searchParams.toString()
    },
    []
  )

  const handleUpdateQueryParams = () => {
    if (dateFromChild && dateFromChild.from && dateFromChild.to) {
      const fromDate = dateFromChild.from.toISOString().split('T')[0]
      const toDate = dateFromChild.to.toISOString().split('T')[0]
      console.log("fromdate and todate", fromDate, toDate)
      router.push(pathname + '?' + createQueryString({ from: fromDate, to: toDate }))
    }
  }

  function handleDataFromChild(data: DateRange | undefined) {
    setDateFromChild(data);
  }

  // If somebody else pass me a booking with dates already selected, then we shouldn't show Elegir días but the days already in the params.
  useEffect(() => {
    console.log('EditBookingDate mounted')

    // if rent type is a Hotel then we have to update the availability of the dates based on the rooms.
    if (rentType === 'HOTEL') {
      const selectedRoomId = searchParams.get('selectedRoomId')
      if (!selectedRoomId) {
        setDateFromChild(undefined)
        return
      }
    }

    const from = searchParams.get('from')
    const to = searchParams.get('to')
    if (from && to)
      setDateFromChild({ from: new Date(from), to: new Date(to) })
    else {
      setDateFromChild(undefined)
    }
  }, [])

  useEffect(() => {
    console.log("actualizó")
  })


  // Every time we change the date on the calendar we need to update the query params on the url.
  useEffect(() => {
    handleUpdateQueryParams()
  }, [dateFromChild])

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
        <p className='font-medium'>Fecha</p>
        {rentType === 'APARTMENT' && (
          dateFromChild ? <p>{formatDateRange(dateFromChild)}</p> : <p className='italic'>Elegir días</p>
        )
        }
        {rentType === 'HOTEL' && (!roomSelected ?
          (
            <p className='italic'>Seleccionar Habitación Primero</p>
          ) : (
            dateFromChild ? <p>{formatDateRange(dateFromChild)}</p> : <p className='italic'>Elegir días disponibles</p>
          )
        )}

        {/* {dateFromChild ? <p>{formatDateRange(dateFromChild)}</p> : <p>Elegir días</p>} */}

      </div>
      <div className="self-center">
        <Drawer>
          <DrawerTrigger asChild>

            {((rentType === 'HOTEL' && roomSelected !== undefined) || rentType === 'APARTMENT') && (
              <Button variant="link">
                <span className='underline'>Cambiar</span>
              </Button>)
            }

            {/* {rentType === 'APARTMENT' && 
              <Button variant="link">
                <span className='underline'>Cambiar</span>
              </Button>
            } */}
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