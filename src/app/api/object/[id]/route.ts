// import prisma from "@/lib/prisma"
import prisma from '@/client'
import { Prisma } from '@prisma/client'
import { NextRequest } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

  const id = Number(params.id)

  if (isNaN(id)) return Response.json({ error: 'Invalid format id. Page not found.' }, { status: 400 })

  const object = await prisma.object.findUnique({
    where: {
      id: id,
    }
  })?.catch(e => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(`There was an error on trying to find the object:\n CODE:${e.code} \n MESSAGE: ${e.message}`)
    } else {
      console.log('Unknown prisma error:', e)
    }
  })

  if (!object) return Response.json({ error: 'Id not found. Object may not exist in the database. Page not found' }, { status: 400 })

  return Response.json(object, { status: 200 })

}