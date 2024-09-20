
import { Room } from "@prisma/client"
import RoomCard from "./room-card"
import { Prisma, RentBooking, Service } from "@prisma/client"
import prisma from '@/lib/prisma'




export default async function RoomList({ rooms }: { rooms: Room[] }) {
  const roomAmenities = await prisma.room.findMany({
    select: {
      id: true,
      amenities: true,
    }
  })

  // Create a hash map for room amenities
  const amenitiesMap: { [key: number]: Service[] } = {};
  roomAmenities.forEach(room => {
    amenitiesMap[room.id] = room.amenities;
  });

  return (
    <div>
      {(rooms.map((room, index) => (
        <RoomCard key={index} room={room} amenities={amenitiesMap[room.id] || []} />
      )))}
    </div>
  )
}