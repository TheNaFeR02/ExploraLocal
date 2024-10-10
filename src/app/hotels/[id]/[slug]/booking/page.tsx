import { notFound } from "next/navigation"
import prisma from '@/lib/prisma'
import BookReservation from "@/features/rents/components/book-reservation"
import { Prisma } from '@prisma/client'
import calculateNumberOfDays from "@/utils/calculateNumberOfDays"
import BookHotelReservation from "@/features/rents/components/book-hotel-reservation"
import { rentWithRoomsAndBookingsSelect } from "@/types/types"


export default async function HotelBookings(
  {
    params,
    searchParams
  }: {
    params: { id: string, slug: string },
    searchParams?: { from?: string, to?: string, selectedRoomId?: string }
  }) {
  const slug = params.slug
  const id = Number(params.id)

  if (isNaN(id)) return notFound()

  return prisma.rent.findUnique({
    where: { id: id, type: 'HOTEL' },
    select: rentWithRoomsAndBookingsSelect,
  })
    .then(rent => {
      // Calculate the number of days between 'from' and 'to'
      const numberOfDays = calculateNumberOfDays(searchParams?.from, searchParams?.to);
      // console.log("params url", searchParams)
      return rent ? <BookHotelReservation rentWithRoomAndBookings={rent} numberOfDays={numberOfDays} /> : <div>Reserva no encontrada</div>
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
      return notFound();
    });


}