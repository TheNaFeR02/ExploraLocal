import prisma from '@/lib/prisma'
import { notFound } from "next/navigation"
import RentPage from "@/features/rents/rent"
import { CustomRent, Prisma } from '@prisma/client'

export async function generateStaticParams() {
  const rents = await prisma.rent.findMany({
    select: {
      id: true,
      slug: true
    }
  })
  return rents.map((rent) => ({
    id: rent.id.toString(),
    slug: rent.slug
  }))
}

export default function Rent({ params }: { params: { id: string, slug: string } }) {
  const slug = params.slug
  const id = Number(params.id)

  if (isNaN(id)) return notFound()

  return prisma.rent.findUnique({
    where: { id: id },
    include: {
      host: true,
      reviews: true,
      services: true,
      bookings: true,
    }
  })
    .then(rent => {
      if (!rent) return notFound()
      if (rent.slug !== slug) return notFound()
      return <RentPage rent={rent} />
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
        console.log("There was an error trying to find the rent.",e.code, e.message);
      } else console.log("unknown prisma error trying to find the rent:", e)
      return notFound();
    });
}

