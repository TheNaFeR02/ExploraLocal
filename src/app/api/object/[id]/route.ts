import prisma from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }) {

  const id = Number(params.id)
  const object = await prisma.object.findUnique({
    where: {
      id: id,
    }
  })

  return Response.json(object)
}