import { notFound } from "next/navigation"
import prisma from '@/lib/prisma'
import BookReservation from "@/features/rents/components/book-reservation"
import { Prisma } from '@prisma/client'

// Function to calculate the number of days between two dates
function calculateNumberOfDays(from: string | undefined, to: string | undefined): number {
  if (!from || !to) return 0;

  const fromDate = new Date(from);
  const toDate = new Date(to);

  const timeDifference = toDate.getTime() - fromDate.getTime();
  return timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
}

export default function BookingRent({ params, searchParams }: { params: { id: string, slug: string }, searchParams?: { from?: string, to?: string } }) {
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
      // Calculate the number of days between 'from' and 'to'
      const numberOfDays = calculateNumberOfDays(searchParams?.from, searchParams?.to);

      // console.log("params url", searchParams)
      return <BookReservation bookings={bookings} rentId={id} numberOfDays={numberOfDays} />
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