
import { Prisma } from '@prisma/client'

// https://www.prisma.io/blog/satisfies-operator-ur8ys8ccq7zb#a-little-background
export const rentWithRoomsAndBookingsSelect = {
  id: true,
  name: true,
  profile_photo: true,
  rooms: {
    select: {
      id: true,
      price: true,
      name: true,
      capacity: true,
      amenities: true,
      single_bed: true,
      king_bed: true,
      queen_bed: true,
      bookings: {
        select: {
          id: true,
          from: true,
          to: true,
        },
        where: {
          from: {
            gte: new Date() // Fetching the occupied bookings from today, old ones should be dismissed.
          }
        }
      },
    }
  }
} satisfies Prisma.RentSelect;

export type MyRentWithRoomsAndBookingsPayload = Prisma.RentGetPayload<{ select: typeof rentWithRoomsAndBookingsSelect }>

// const roomBookingsSelect = {
//   id: true,
//   from: true,
//   to: true,
// } satisfies Prisma.RentBookingSelect;

// export type myRoomBookings = Prisma.RentBookingGetPayload<{ select: typeof roomBookingsSelect }>

export const roomWithBookingsAndServices = {
  id: true,
  price: true,
  name: true,
  capacity: true,
  amenities: true,
  single_bed: true,
  king_bed: true,
  queen_bed: true,
  bookings: {
    select: {
      id: true,
      from: true,
      to: true,
    },
    where: {
      from: {
        gte: new Date() // Fetching the occupied bookings from today, old ones should be dismissed.
      }
    }
  },
}

export type myRoomWithBookingsAndServices = Prisma.RoomGetPayload<{ select: typeof roomWithBookingsAndServices }>