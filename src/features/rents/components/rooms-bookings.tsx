
// import { Prisma, RentBooking } from "@prisma/client"
// import prisma from '@/lib/prisma'

// export default async function RoomBookings() {

//   const rent = await prisma.rentBooking.findUnique({
//     where: { id: rentId },
//     select: {
//       name: true,
//       profile_photo: true,
//       price: true,
//       rooms: true,
//       type: true,
//     },
  
//     .catch(e => {
//       if (e instanceof Prisma.PrismaClientKnownRequestError) {
//         // TODO: Check the error that this try can return and handle it like the example below:
//         // For all of the error prisma codes: https://www.prisma.io/docs/orm/reference/error-reference#error-codes
//         // if (e.code === 'P2002') {
//         //   console.log(
//         //     'There is a unique constraint violation, a new user cannot be created with this email'
//         //   )
//         // }
//         console.log("There was an error trying to find the rent.", e.code, e.message);
//       } else console.log("unknown prisma error trying to find the rent:", e)
//       // return notFound();
//     });

//   return (

// )
// }