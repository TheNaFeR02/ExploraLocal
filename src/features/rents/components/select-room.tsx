'use client'
import { Button } from "@/components/ui/button"
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
import { Room } from "@prisma/client"
import RoomList from "./room-list"
import RoomCard from "./room-card"
import { Prisma, RentBooking, Service } from "@prisma/client"
import prisma from '@/lib/prisma'
import { myRoomWithBookingsAndServices } from "@/types/types"




export default function SelectRoom(
  { rooms, 
    // nameOfRoomSelected
  }: {
    rooms: myRoomWithBookingsAndServices[], 
    // nameOfRoomSelected?: string
  }) {

  // const roomAmenities = await prisma.room.findMany({
  //   select: {
  //     id: true,
  //     amenities: true,
  //   }
  // })

  // // Create a hash map for room amenities
  // const amenitiesMap: { [key: number]: Service[] } = {};
  // rooms.forEach(room => {
  //   amenitiesMap[room.id] = room.amenities;
  // });



  return (
    <RoomList rooms={rooms} 
    // amenitiesMap={amenitiesMap} 
    />
  )
}