import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import ObjectPage from '@/features/object/object'
import { notFound } from 'next/navigation';

// Path example for images for development tests.
// const pasorobao = '/images/paso_robao.jpg'

export const dynamicParams = true;

// generateStaticParams: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {

  const objects = await prisma.object.findMany({
    select: {
      id: true,
      slug: true
    }
  })
  return objects.map((object) => ({
    id: object.id.toString(),
    slug: object.slug
  }))
}

export default async function Object({ params }: { params: { id: string, slug: string } }) {

  const slug = params.slug
  const id = Number(params.id)

  if (isNaN(id)) return notFound()

  return prisma.object.findUnique({
    where: { id: id },
    include: {
      details: true,
      frequentQuestions: true,
    },
  })
    .then(object => {
      if (!object) return notFound()
      if (object.slug !== slug) return notFound()
      return <ObjectPage object={object} />
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
        console.log("There was an error trying to find the object.");
      }
      return notFound();
    });
}