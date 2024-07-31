import prisma from '../src/lib/prisma';
import { elPasoRobao } from '../src/utils/exampleData/elPasoRobao';
// import { elPasoGrande } from '../src/utils/exampleData/pasoGrande'

async function main() {
  const newEntry = await prisma.object.create({
    data: {
      image: elPasoRobao.image,
      title: elPasoRobao.title,
      subtitle: elPasoRobao.subtitle,
      description: elPasoRobao.description,
      details: {
        create: elPasoRobao.details,
      },
      frequentQuestions: {
        create: elPasoRobao.frequentQuestions,
      },
    },
  })

  console.log('New entry created:', newEntry);
}

// Execute the main function and handle disconnection and errors
main()
  .then(() => prisma.$disconnect()) // Disconnect from the database on successful completion
  .catch(async (e) => {
    console.error(e); // Log any errors
    await prisma.$disconnect(); // Ensure disconnection even if an error occurs
    process.exit(1); // Exit the process with an error code
  });