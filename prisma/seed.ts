import { Prisma } from '@prisma/client';
import prisma from '../src/client';


async function seedServices() {
  await prisma.service.createMany({
    data: [
      { id: 1, icon: 'bath', name: 'Bañera' },
      { id: 2, icon: 'wifi', name: 'Wifi' },
      { id: 3, icon: 'waves', name: 'Piscina' },
      { id: 4, icon: 'air-vent', name: 'Aire Acondicionado' },
      { id: 5, icon: 'tv-minimal', name: 'Televisión' },
      { id: 6, icon: 'utensils', name: 'Cocina' },
      { id: 7, icon: 'washing-machine', name: 'Lavadora' },
      { id: 8, icon: 'dumbbell', name: 'Gimnasio' },
      { id: 9, icon: 'car-front', name: 'Parqueadero' },
      { id: 10, icon: 'paw-print', name: 'Mascotas' },
      { id: 11, icon: 'fence', name: 'Jardín' },
      { id: 12, icon: 'beef', name: 'Barbacoa' },
      { id: 13, icon: 'flame-kindling', name: 'Chimenea' },
      { id: 14, icon: 'waves', name: 'Jacuzzi' },
      { id: 15, icon: 'rocking-chair', name: 'Balcón' },
      { id: 16, icon: 'arrow-down-up', name: 'Elevador' },
      { id: 17, icon: 'bed-single', name: 'Cama Personal' },
      { id: 18, icon: 'bed-double', name: 'Cama Doble' },
      { id: 19, icon: 'martini', name: 'Mini-bar' },
      { id: 20, icon: 'coffee', name: 'Cafetera' }
    ]
  })
    .then((_) => console.log(_.count, 'x services created successfully'))
    .catch(e => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
        }
      }
      throw e
    })
}

async function createHotel() {
  await prisma.rent.create({
    data: {
      id: 1,
      name: 'Hostal Doña Manuela',
      price: 0,
      profile_photo: 'https://utfs.io/f/x3mEn3zVgBMSOMHXsvj4qS8AgilRsXtaLcPQTkmWCBHMKwGV',
      slug: 'hostal-dona-manuela',
      department: 'Bolívar',
      city: 'Mompox',
      hostId: 1,
      description: 'La búsqueda del hostal romántico ideal en Mompos no tiene por qué ser difícil. Bienvenido a Hostal Doña Manuela, una fantástica opción para viajeros como tú.   \\n Las habitaciones de Hostal Dona Manuela incluyen aire acondicionado y mesa de escritorio para una comodidad mucho mayor, y los huéspedes pueden permanecer conectados con wifi gratuito.    Servicio de habitaciones, conserje y terraza-solario son algunos de los servicios que ofrece el hostal. Su piscina y desayuno incluido también contribuirán a que tu estancia sea incluso más especial. Si vas en coche a Hostal Dona Manuela, hay parking gratis disponible.    Los puntos de referencia que hay por los alrededores, como Escuela Taller Santa Cruz de Mompox (1,1 km) y La Piedra de Bolivar (4,6 km) hacen de Hostal Dona Manuela un magnífico sitio donde alojarse en Mompos.    Los viajeros que quieran comer cerca de Hostal Dona Manuela pueden ir a Ambrosía Restaurante-Bar (0,2 km), Caiman Parao (0,4 km) o Los Cobos Disko Bar (0,5 km), que se encuentran cerca andando.    Durante tu visita, no te pierdas atracciones populares como Centro Historico de Santa Cruz de Mompox (1,1 km), Plaza de Mercado (0,1 km) y Iglesia de la Inmaculada Concepcion (0,2 km), a las que puedes llegar andando desde el hostal.    Hostal Doña Manuela te acerca lo mejor de Mompos, haciendo que tu estancia sea agradable y relajante.',
      collection: [
        'https://utfs.io/f/x3mEn3zVgBMSOMHXsvj4qS8AgilRsXtaLcPQTkmWCBHMKwGV',
        'https://utfs.io/f/x3mEn3zVgBMS6jFJ970OFNKkHXby5G32ETR1aP7Wz4AqBJcw',
        'https://utfs.io/f/x3mEn3zVgBMSrQUmMgP9mHkXKVajG2ELyNATQtF1bnzhcsB7'
      ],
      rules: [
        'El check-in es a partir de las 3:00 PM y el check-out debe realizarse antes de las 11:00 AM, a menos que se acuerde lo contrario con el arrendador.',
        'Los vehículos deben ser estacionados en las áreas designadas. No se permite estacionar en áreas no autorizadas."',
        'Los visitantes están permitidos, pero no pueden quedarse a dormir sin el consentimiento previo del arrendador.',
        'Mantenga la propiedad limpia y ordenada. La basura debe ser sacada regularmente y los platos deben ser lavados después de su uso.'
      ],
      type: 'HOTEL',
      capacity: null,
    }
  })
    .then((_) => console.log('Hotel ', _.name, 'created successfully'))
    .catch(e => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
        }
      }
      throw e
    })
}

async function createUser() {
  await prisma.user.create({
    data: {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@doe.com',
    }
  })
    .then((_) => console.log('User ', _.name, 'created successfully'))
    .catch(e => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
        }
      }
      throw e
    })
}

async function createRoom() {
  await prisma.room.create({
    data: {
      id: 1,
      rentId: 1,
      name: 'Suite Privada',
      single_bed: 0,
      queen_bed: 0,
      king_bed: 1,
      capacity: 2,
      price: 200,
      description: null,
      photos: [
        'https://utfs.io/f/x3mEn3zVgBMSy4qiByJvW0QmeIkCHAp5VGBTZofs28ix4Lwj'
      ],
      rules: [],
    }
  })
    .then((_) => console.log('Room ', _.name, 'created successfully'))
    .catch(e => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
        }
      }
      throw e
    })
}

async function main() {
  try {
    
    // services/amenities
    const services = await prisma.service.findMany()
    if (services.length === 0)
      await seedServices()

    // user: jhondoe 
    const jhon = await prisma.user.findUnique({
      where: {
        email: 'johndoe@doe.com'
      }
    })
    if (!jhon)
      await createUser()

    // hotel: hostal-dona-manuela 
    const hostal = await prisma.rent.findMany({
      where: {
        slug: 'hostal-dona-manuela'
      }
    })

    if (hostal.length === 0)
      await createHotel()

    // Room: Suite privada para el hostal.
    const suite_privada = await prisma.room.findMany({
      where: {
        name: 'Suite Privada',
        rent: {
          slug: 'hostal-dona-manuela'
        }
      }
    })

    if (suite_privada.length === 0)
      await createRoom()


  } catch (e) {
    console.error(e);
  }
}

// Execute the main function and handle disconnection and errors
main()
  .then(() => prisma.$disconnect()) // Disconnect from the database on successful completion
  .catch(async (e) => {
    console.error(e); // Log any errors
    await prisma.$disconnect(); // Ensure disconnection even if an error occurs
    process.exit(1); // Exit the process with an error code
  });