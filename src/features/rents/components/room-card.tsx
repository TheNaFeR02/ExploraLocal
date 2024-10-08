
"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer"


import Icon from "@/utils/Icons"
import { Room, Service } from "@prisma/client"
import { useCallback, useEffect, useState, useContext } from "react"


import prisma from '@/lib/prisma'
import { roomSelected, ServicesIcons } from "../actions"
import dynamicIconImports from "lucide-react/dynamicIconImports"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { myRoomWithBookingsAndServices } from "@/types/types"
import { RoomContext } from "./booking-hotel-details"


export default function RoomCard({
  room,
  // amenities, 
  // callbackRoomName,
  roomSelectedIndex
}: {
  room: myRoomWithBookingsAndServices,
  // amenities: Service[], 
  // callbackRoomName: (roomName: string) => void,
  roomSelectedIndex: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { roomSelected, updateRoomSelected } = useContext(RoomContext)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()



  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const searchParams = new URLSearchParams(window.location.search)
      Object.keys(params).forEach(key => {
        searchParams.set(key, params[key])
      })
      return searchParams.toString()
    },
    []
  )



  // const createQueryString = useCallback(
  //   (name: string, value: string, paramsToDelete: string[]) => {
  //     const params = new URLSearchParams(searchParams.toString())
  //     params.set(name, value)

  //     paramsToDelete.forEach(key => {
  //       params.delete(key);
  //     });

  //     return params.toString()
  //   },
  //   [searchParams]
  // )


  // const createQueryString = useCallback(
  //   (paramsToSet: { [key: string]: string }, paramsToDelete: string[] = []) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     Object.keys(paramsToSet).forEach(key => {
  //       params.set(key, paramsToSet[key]);
  //     });
  //     paramsToDelete.forEach(key => {
  //       params.delete(key);
  //     });
  //     return params.toString();
  //   },
  //   [searchParams]
  // );


  // const [roomServices, setRoomServices] = useState<{ icon: string | null, name: string }[]>([])

  // Prepara los user icons que representan los número de personas.
  const numberOfPeople = room.capacity
  const icons = []
  for (let i = 0; i < room.capacity; i++) {
    icons.push(<Icon key={i} name="user" className="m-1" size={20} />);
  }

  useEffect(() => {

  }, [])


  return (
    <Card>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription className='text-lg'>${room.price.toLocaleString()} x Noche</CardDescription>
        </CardHeader>
        <CardContent className='pb-0 flex flex-col gap-2'>
          <div>
            <h2>Número de personas</h2>
            <div className='flex'>{icons}</div>
          </div>
          <div>
            <h2>Camas</h2>
            <div className='grid grid-cols-2 gap-y-2 '>
              {room.king_bed > 0 && <div className='flex'><Icon className='inline-block mr-2' name='bed-double'></Icon><p className='text-sm'>{room.king_bed} x Cama doble extragrande</p></div>}

              {room.queen_bed > 0 && <div className='flex'><Icon className='inline-block mr-2' name='bed-double'></Icon><p className='text-sm'>{room.queen_bed} x Cama doble</p></div>}

              {room.single_bed > 0 && <div className='flex'><Icon className='inline-block mr-2' name='bed-single'></Icon><p className='text-sm'>{room.single_bed} x Cama personal</p></div>}
            </div>
          </div>
          <div >

            <CollapsibleContent className='m-0 p-0'>
              <div className='w-full'>
                {room.amenities.length > 0 &&
                  <>
                    <h2>Servicios</h2>
                    <div className='flex flex-wrap gap-2 gap-x-3 overflow-x-auto' >
                      {room.amenities.map(({ icon, name }, index) => {
                        { console.log("name", icon) }
                        return (
                          <div key={index} className='flex'>
                            <p className='text-xs'><span className='mx-1'>

                              <Icon className='inline-block' size={12} name={icon as keyof typeof dynamicIconImports}></Icon>
                            </span>{name}</p>
                            {/* <Icon className='inline-block' size={12} name={icon as keyof typeof dynamicIconImports}></Icon> */}
                            {/* <p className='text-sm inline-block'>{name}</p> */}
                          </div>
                        )
                      })}

                    </div>
                  </>

                }

              </div>
            </CollapsibleContent>

          </div>
        </CardContent>
        <CardFooter className='block p-5'>
          <div className='flex justify-between'>
            <CollapsibleTrigger asChild>
              <Button
                variant={'ghost'}>ver más <Icon name="chevrons-up-down" className="ml-2" size={13}></Icon></Button>
            </CollapsibleTrigger>
            {/* <DrawerFooter > */}
            <DrawerClose asChild>
              <Button
                onClick={() => {

                  // const updatedQueryString = createQueryString(
                  //   { selectedRoomId: room.id.toString() },
                  //   ['from', 'to']
                  // );
                  // router.push(`${pathname}?${updatedQueryString}`);
                  // location.reload();

                  // this!!!
                  // callbackRoomName(room.name);
                  // router.refresh()
                  updateRoomSelected(room)
                  router.push(pathname + '?' + createQueryString({ selectedRoomId: room.id.toString(), roomSelectedIndex: roomSelectedIndex.toString() }),)

                }}
              >Seleccionar</Button>

            </DrawerClose>
            {/* </DrawerFooter> */}

          </div>
        </CardFooter>

      </Collapsible>


    </Card >


  )
}