import { notFound } from "next/navigation"
import prisma from '@/lib/prisma'
import BookReservation from "@/features/rents/components/book-reservation"
import { Prisma } from '@prisma/client'

export default function BookingRent({ params }: { params: { id: string, slug: string } }) {
  const slug = params.slug
  const id = Number(params.id)

  if (isNaN(id)) return notFound()

  return prisma.rentBooking.findMany({
    where: {
      AND: {
        rentId: id,
        from: {
          gte: new Date() // Fetching the occupied bookings from today, old ones should be dismissed.
        }
      }
    }
  })
    .then(bookings => {
      console.log("booking for this rent:",bookings)
      return <BookReservation bookings={bookings} rentId={id} />
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