
import prisma from '../src/client';

export async function seedTemp() {
  const updateDepartment = await prisma.rent.updateMany({
    data: {
      department: 'Bolívar'
    }
  })
}

// main()
//   .then(() => prisma.$disconnect()) // Disconnect from the database on successful completion
//   .catch(async (e) => {
//     console.error(e); // Log any errors
//     await prisma.$disconnect(); // Ensure disconnection even if an error occurs
//     process.exit(1); // Exit the process with an error code
//   });
