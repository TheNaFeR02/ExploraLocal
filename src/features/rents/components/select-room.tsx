// 'use client'
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


export default function SelectRoom({ rooms }: { rooms: Room[] }) {
  
  
  return (
    <div className='flex justify-between'>
      <div className="">
        <p>Suite Deluxe - Principal</p>
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

              {/* Room */}
              <RoomList rooms={rooms}/>

              {/* <DrawerClose asChild>
                <Button className="my-6">Cerrar</Button>
              </DrawerClose> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}