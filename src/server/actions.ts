"use server"

import { DateRange } from "react-day-picker";
import { Prisma, RentBooking } from '@prisma/client'
import prisma from '@/lib/prisma'
import { revalidatePath } from "next/cache";

/*
Validates the booking dates selected are not occupied. 
*/
export async function areBookingDatesAvailable(rentId: number, from: string, to: string, rentType: string, pathname: string, roomId?: number) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  let overlappingBookings;

  try {
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
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // TODO: Check the error that this try can return and handle it like the example below:
      // For all of the error prisma codes: https://www.prisma.io/docs/orm/reference/error-reference#error-codes
      // if (e.code === 'P2002') {
      //   console.log(
      //     'There is a unique constraint violation, a new user cannot be created with this email'
      //   )
      // }
      console.log("There was a known prisma error trying to query the overlapping bookings", e.code, e.message);
    }

    throw new Error('Error querying overlapping bookings with the date selected.')
  }

  return overlappingBookings.length === 0;
}



/*
Creates a RentBooking for the room or rent id passed with the date range passed.
*/
export async function createProvisionalBooking(rentId: number, from: string, to: string, rentType: string, pathname: string, roomId?: number) {
  const rentBookingData: Prisma.RentBookingCreateInput = {
    from: new Date(from),
    to: new Date(to),
    Rent: {
      connect: { id: rentId }
    },
    status: "PENDING"
  };

  // Conditionally add Room connection if roomId is provided. If not then it's an apartment not a room from a hotel.
  if (roomId) {
    rentBookingData.Room = {
      connect: { id: roomId }
    };
  }

  try {
    const rentBooking = await prisma.rentBooking.create({
      data: rentBookingData,
    })
    if (rentBooking) {
      console.log(!roomId ? 'APARTMENT was PROVISIONALLY booked successfully' : 'HOTEL was PROVISIONALLY booked successfully')
      // revalidatePath(pathname)
      return rentBooking
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // TODO: Check the error that this try can return and handle it like the example below:
      // For all of the error prisma codes: https://www.prisma.io/docs/orm/reference/error-reference#error-codes
      // if (e.code === 'P2002') {
      //   console.log(
      //     'There is a unique constraint violation, a new user cannot be created with this email'
      //   )
      // }
      console.log("There was a known prisma error trying to create the Booking for the room (hotel) or rent (apartment)", e.code, e.message);
      throw e
    } else {
      console.log("unknown prisma error trying to create the booking", e);
      throw new Error("unknown prisma error trying to create the booking");
    }
  }

}

export async function confirmBooking(id: number) {
  await prisma.rentBooking.update({
    where: {
      id: id
    },
    data: {
      status: 'CONFIRMED'
    }
  })
    .then(booking => {
      // Handle successful creation
      if (booking.roomId) {
        console.log(`
          BOOKING was successfully CONFIRMED from ${booking.from} to ${booking.to} for HOTEL ROOM with id ${booking.roomId} from Rent with id ${booking.rentId} 
            `)
        return
      }

      // revalidatePath(pathname)

      console.log(`APARTMENT with id ${booking.rentId}`)

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


export async function deleteProvisionalBooking(id: number) {
  await prisma.rentBooking.delete({
    where: {
      id: id
    },
  })
    .then(booking => {
      // Handle successful creation
      if (booking.roomId) {
        console.log(`
          BOOKING was successfully DELETED from ${booking.from} to ${booking.to} for HOTEL ROOM with id ${booking.roomId} from Rent with id ${booking.rentId} 
           `)
        return
      }

      // revalidatePath(pathname)

      console.log(`
         BOOKING was successfully DELETED from ${booking.from} to ${booking.to} for APARTMENT ${booking.rentId}
        `)

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
        throw e
      } else {
        throw new Error('unknown prisma error trying to create the booking')
      }
    });
}