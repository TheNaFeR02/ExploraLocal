

'use server'
import prisma from '@/lib/prisma'

import Icon from "@/utils/Icons"
import dynamicIconImports from 'lucide-react/dynamicIconImports'

import { Prisma } from "@prisma/client"

export async function roomSelected() {  

}


export async function ServicesIcons(roomId: number): Promise<{ icon: string | null, name: string }[] | null> {
  console.log("Corrió en el server")
  return await prisma.room.findUnique({
    where: { id: roomId },
    select: {
      amenities: true,
    }
  })
    .then((room) => {
      console.log("server action room", room)
      // const roomServicesIcons: JSX.Element[] = []
      // servicesIcons.map(({ name, icon }, index) => {
      //   roomServicesIcons.push(<Icon key={index} name={name as keyof typeof dynamicIconImports} />)
      // })

      // return roomServicesIcons

      const roomServicesIcons: { icon: string | null, name: string }[] = []
      if (!room) {
        return null
      }
      room.amenities.map(({ name, icon }, index) => {
        roomServicesIcons.push({ icon, name })
      })
      return roomServicesIcons



    })
    .catch((e) => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // TODO: Check the error that this try can return and handle it like the example below:
        // For all of the error prisma codes: https://www.prisma.io/docs/orm/reference/error-reference#error-codes
        // if (e.code === 'P2002') {
        //   console.log(
        //     'There is a unique constraint violation, a new user cannot be created with this email'
        //   )
        // }
        console.log("There was an error trying to find the services of this room.", e.code, e.message);
      }
      return null
      // return notFound();
    })

}

