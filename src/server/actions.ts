"use server"

import { DateRange } from "react-day-picker";
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { revalidatePath } from "next/cache";

/*
Validates the booking dates selected are not occupied. 
*/
export async function areBookingDatesAvailable(rentId: number, from: string, to: string, rentType: string, pathname: string, roomId?: number) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  let overlappingBookings;

  if (roomId) {
    overlappingBookings = await prisma.rentBooking.findMany({
      where: {
        roomId: roomId,
        OR: [
          {
            from: { lte: toDate },
            to: { gte: fromDate }
          }
        ]
      }
    });
  } else {
    overlappingBookings = await prisma.rentBooking.findMany({
      where: {
        rentId: rentId,
        OR: [
          {
            from: { lte: toDate },
            to: { gte: fromDate }
          }
        ]
      }
    });
  }

  return overlappingBookings.length === 0;
}


/*
Creates a BookingRate for the room or rent id passed with the date range passed.
*/
export async function createBookingRent(rentId: number, from: string, to: string, rentType: string, pathname: string, roomId?: number) {


  const rentBookingData: Prisma.RentBookingCreateInput = {
    from: new Date(from),
    to: new Date(to),
    Rent: {
      connect: { id: rentId }
    },
    User: {
      create: {
        // TODO: The booking is being assigned to a fake user since there's no auth yet. It will change to the user is currently signed in.
        name: "Default Name",
        email: "default@example.com"
      }
    }
  };

  // Conditionally add Room connection if roomId is provided.
  if (roomId) {
    rentBookingData.Room = {
      connect: { id: roomId }
    };
  }

  const rentBooking = await prisma.rentBooking.create({
    data: rentBookingData,
  })
    .then(booking => {
      // Handle successful creation
      console.log(!roomId ? 'Apartment was booked successfully' : 'Hotel was booked successfully')
      // revalidatePath(pathname)
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
        console.log("There was an error trying to create the Booking for the room (hotel) or rent (apartment)", e.code, e.message);
      } else console.log("unknown prisma error trying to create the booking", e)
    });

}