import prisma from '../src/client';

export async function seedServices() {
  // const services = await prisma.service.create({
  //   data:
  //   {
  //     name: 'Bañera',
  //     icon: 'bath',
  //     rents: {
  //       connect: {
  //         id: 1
  //       }
  //     },
  //   },
  // })

  const servicesData = [
    { name: 'Bañera', icon: 'bath' },
    { name: 'WiFi', icon: 'wifi' },
    { name: 'Piscina', icon: 'pool' },
    { name: 'Aire Acondicionado', icon: 'air-conditioner' },
    { name: 'Televisión', icon: 'tv' },
    { name: 'Cocina', icon: 'kitchen' },
    { name: 'Lavadora', icon: 'washing-machine' },
    { name: 'Secadora', icon: 'dryer' },
    { name: 'Gimnasio', icon: 'gym' },
    { name: 'Estacionamiento', icon: 'parking' },
    { name: 'Mascotas Permitidas', icon: 'pets' },
{ name: 'Calefacción', icon: 'heater' },
    { name: 'Jardín', icon: 'garden' },
    { name: 'Barbacoa', icon: 'bbq' },
    { name: 'Chimenea', icon: 'fireplace' },
    { name: 'Sauna', icon: 'sauna' },
    { name: 'Jacuzzi', icon: 'jacuzzi' },
    { name: 'Balcón', icon: 'balcony' },
    { name: 'Ascensor', icon: 'elevator' },
    { name: 'Seguridad 24h', icon: 'security' },
  ];

  for (const service of servicesData) {
    await prisma.service.create({
      data: {
        name: service.name,
        icon: service.icon,
        rents: {
          connect: {
            id: 1
          }
        },
      },
    });
  }

  console.log('Services seeded successfully');


}