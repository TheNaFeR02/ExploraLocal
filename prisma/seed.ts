import prisma from '../src/client';
import { elPasoRobao } from '../src/utils/exampleData/elPasoRobao';
import { elPasoGrande } from '../src/utils/exampleData/pasoGrande'
import { seedRents } from './seedRents';
import { seedReviews } from './seedReviews';
import { seedServices } from './seedServices';

async function main() {
  seedServices()
  // seedReviews()
  // seedRents()
  // const newEntry = await prisma.object.create({
  //   // data: {
  //   //   slug: elPasoRobao.slug,
  //   //   image: elPasoRobao.image,
  //   //   title: elPasoRobao.title,
  //   //   subtitle: elPasoRobao.subtitle,
  //   //   description: elPasoRobao.description,
  //   //   details: {
  //   //     create: elPasoRobao.details,
  //   //   },
  //   //   frequentQuestions: {
  //   //     create: elPasoRobao.frequentQuestions,
  //   //   },
  //   // },
  //   data: {
  //     slug: elPasoGrande.slug,
  //     image: elPasoGrande.image,
  //     title: elPasoGrande.title,
  //     subtitle: elPasoGrande.subtitle,
  //     description: elPasoGrande.description,
  //     details:{
  //       create: elPasoGrande.details,
  //     },
  //     frequentQuestions:{
  //       create: elPasoGrande.frequentQuestions,
  //     }
  //   }
  // })

  // console.log('New entry created:', newEntry);
}

// Execute the main function and handle disconnection and errors
main()
  .then(() => prisma.$disconnect()) // Disconnect from the database on successful completion
  .catch(async (e) => {
    console.error(e); // Log any errors
    await prisma.$disconnect(); // Ensure disconnection even if an error occurs
    process.exit(1); // Exit the process with an error code
  });