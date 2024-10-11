'use client'
import { Room, Service } from "@prisma/client"

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
import RoomCard from "./room-card"
import { useContext, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { myRoomWithBookingsAndServices } from "@/types/types"
import { RoomContext } from "./booking-hotel-details"



export default function RoomList(
  {
    rooms,
    // amenitiesMap 
  }: {
    rooms: myRoomWithBookingsAndServices[],
    // amenitiesMap: { [key: number]: Service[] } 
  }) {
  //TODO: When mounting:
  // 1. If there is a date and a roomId, then show the ${name of the room} with cambiar button.
  // 2. If there is a date but no a roomId(room hasn't been selected), then show 'Seleccionar habitación' with cambiar button.
  // 3. If there is a roomId but not a date, then show 'Seleccione una fecha' 

  const searchParams = useSearchParams()
  // const [selectedRoom, setSelectedRoom] = useState('')
  const {roomSelected, updateRoomSelected} = useContext(RoomContext)
  
  
  // const [datesRoomFilter, setDatesRoomsFilter] = ...

  // const updateRoomSelectedFromChild = (roomName: string) => {
  //   setSelectedRoom(roomName)
  // }

  // useEffect(() => {
  //   const from = searchParams.get('from')
  //   const to = searchParams.get('to')
  //   if (from && to)
  //     setSelectedRoom('Seleccionar Habitación')
  // }, [])

  // When component mounts need to look if a rrom was selected already.
  useEffect(() => {
    const roomSelectedIndex = searchParams.get('roomSelectedIndex')
    const index = Number(roomSelectedIndex)
    
    if (roomSelectedIndex && !isNaN(index))
      updateRoomSelected(rooms[index])
      // setSelectedRoom(rooms[index].name)
  }, [searchParams, roomSelected, updateRoomSelected, rooms])


  return (<>

    <div className='flex justify-between'>
      <div className="">
        {roomSelected ? <p>{roomSelected.name}</p> : <p>Seleccionar Habitación</p>}
        <p></p>
      </div>
      <div className="">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="link">
              <span className='underline'>Cambiar</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Habitaciones</DrawerTitle>
              <DrawerDescription>Selecciona sobre las habitaciones disponibles</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>

              <div>
                {(rooms.map((room, index) => (
                  <RoomCard key={index} room={room} roomSelectedIndex={index}
                    // amenities={amenitiesMap[room.id] || []} 
                    // callbackRoomName={updateRoomSelectedFromChild}
                  />
                )))}
              </div>

              {/* Room */}
              {/* <RoomList rooms={rooms} /> */}

              {/* <DrawerClose asChild>
                <Button className="my-6">Cerrar</Button>
              </DrawerClose> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  </>)
}