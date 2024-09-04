import prisma from '../src/client';
import { } from '../src/utils/exampleData/pasoGrande'

export async function seedRents() {
  // // Check if the user exists
  // let user = await prisma.user.findUnique({
  //   where: {
  //     email: 'hostal.dona.manuela@example.com', // Replace with the unique identifier for the user
  //   },
  // });

  // // If the user doesn't exist, create the user
  // if (!user) {
  //   user = await prisma.user.create({
  //     data: {
  //       email: 'hostal.dona.manuela@example.com', // Replace with the necessary fields for the User model
  //       name: 'Hostal Doña Manuela'
  //       // Add other necessary fields
  //     },
  //   });
  // }

  const rent = await prisma.rent.create({
    data: {
      slug: 'hostal-dona-manuela',
      host: {
        connectOrCreate: {
          where: {
            email: 'hostal.dona.manuela@example.com'
          },
          create: {
            email: 'hostal.dona.manuela@example.com',
            name: 'Hostal Doña Manuela'
          }
        }
      },
      description: 'A cozy and welcoming hostel located in the heart of the city.',
      collection: ['/images/hostal/hostal_1.jpg', '/images/hostal/hostal_2.jpg', '/images/hostal/hostal_3.jpg'],
      services: {
        create: [
          {
            name: 'Free WiFi',
            description: 'High-speed internet access available throughout the hostel.',
          },
          {
            name: 'Breakfast Included',
            description: 'Complimentary breakfast served every morning.',
          },
        ],
      }
    }
  })


  console.log('New entry created:', rent);

  
}