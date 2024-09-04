import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CustomRent } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import RentReviews from "./components/rent-reviews"
import RentCollection from "./components/rent-collection"
import Icon, { isIconName } from "@/utils/Icons"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { buttonVariants } from "@/components/ui/button"
import BookReservation from "./components/book-reservation"
import { Prisma } from "@prisma/client"
import type { Rent, } from "@prisma/client"
import Link from "next/link"


export type RentWithRelations = Prisma.RentGetPayload<
  {
    include: {
      host: true;
      services: true;
      reviews: true;
      bookings: true;
    }
  }>


export default function RentPage({ rent }: { rent: RentWithRelations }) {


  return (
    <>
      <div className="w-screen ">
        <header className="flex items-center justify-between p-4 border-b w-full">
          <button className="p-2">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="px-5">
          <div className="flex justify-center items-center bg-gray-100">
            <div className="">
              <Carousel
                className="w-screen overflow-hidden"
              >
                <CarouselContent className="">
                  {rent.collection.map((url, index) => (
                    <CarouselItem key={index} className=""  >
                      <div className="p-1 h-96">
                        <Card className="">
                          <CardContent className="flex aspect-auto items-center justify-center p-6 relative h-96">
                            <Image
                              src={url}
                              fill={true}
                              // width={1920} height={1080}
                              alt={"image #" + index}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

          </div>
          <div className="p-4">
            <h1 className="text-xl font-bold">Hotel Casa Blanca</h1>
            <p className="text-sm text-muted-foreground">Mompox - Bolívar</p>
          </div>
          <Tabs defaultValue="acerca-de" className="mb-20">
            <TabsList className="border-b w-full flex justify-around">
              <TabsTrigger value="acerca-de">Acerca de</TabsTrigger>
              <TabsTrigger value="coleccion">
                Colección
              </TabsTrigger>
              <TabsTrigger value="opinions">
                Opiniones
              </TabsTrigger>
            </TabsList>
            <TabsContent value="acerca-de" className="p-4">

              <div className='relative max-h-52 overflow-y-auto scroll-auto'>

                <p className='pb-5  '>{rent.description}
                </p>
              </div>

              {/* <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>

              <h3 className="font-bold text-xl py-5">Reserva</h3>

              <div className='flex justify-center pb-5'>
                <BookReservation bookings={rent.bookings} />
              </div> */}

              <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>

              <h3 className="font-bold text-xl py-5">Servicios</h3>
              <div className='grid grid-cols-2 relative'>
                {rent.services.slice(0, 14).map((service, index) => (
                  <div key={index}>
                    <p className="inline-flex gap-2 font-normal">
                      <span>
                        {isIconName(service.icon) ?
                          <Icon name={service.icon} />
                          :
                          <Icon name="shield-question" />
                        }
                      </span>
                      {service.name}
                    </p>
                  </div>
                ))}
                <div className="absolute bottom-0 left-0 w-full h-52 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              </div>
              {rent.services.length > 14 && (
                <Dialog>
                  <div className="flex justify-center py-5">
                    <DialogTrigger className={`${buttonVariants({ variant: "secondary" })} z-10`}>Mostrar todos los servicios</DialogTrigger>
                  </div>
                  <DialogContent className="max-h-screen overflow-auto">
                    {rent.services.map((service, index) => (
                      <div key={index}>
                        <p className="inline-flex gap-2 font-normal"><span>{isIconName(service.icon) ? <Icon name={service.icon} /> : <Icon name="shield-question" />}</span>{service.name}</p>
                      </div>
                    ))}
                  </DialogContent>
                </Dialog>
              )}


              <hr className='mx-auto w-full bg-gray-200 h-0.5'></hr>


              <h3 className="font-bold text-xl py-5">Reglas de la casa</h3>


              <div className="relative max-h-52 overflow-hidden">
                <ol className="list-decimal list-inside">
                  {rent.rules && rent.rules.map((rule, index) => (
                    <li key={index} className="">
                      {rule}
                    </li>
                  ))}
                </ol>
                {rent.rules.length > 3 &&
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                }
              </div>
              {rent.rules.length > 3 && (
                <>
                  <Dialog>
                    <div className="flex justify-center py-5">
                      <DialogTrigger className={`${buttonVariants({ variant: "secondary" })} `}>Ver reglas</DialogTrigger>
                    </div>
                    <DialogContent className="max-h-screen overflow-auto">
                      <ol className="list-decimal list-inside">
                        {rent.rules && rent.rules.map((rule, index) => (
                          <li key={index} className="py-2">
                            {rule}
                          </li>
                        ))}
                      </ol>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </TabsContent>
            <TabsContent value="coleccion">
              <RentCollection collection={rent.collection} />
            </TabsContent>
            <TabsContent value="opinions" className="p-4">
              <RentReviews rentId={rent.id} />
            </TabsContent>
          </Tabs>
          <div className="flex items-center justify-between p-4 border-t fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
            <div>
              <p className="text-lg font-bold">$998,817.17 x Noche</p>
              <p className="text-sm text-muted-foreground">7-14 Jul</p>
            </div>
            {/* <Button className="ml-auto">Reservar</Button> */}
            <Button asChild className="ml-auto">
              <Link href={`/rents/${rent.id}/${rent.slug}/booking`}>Reservar</Link>
            </Button>

          </div>
        </div>

      </div >

    </>
  )
}

function ArrowLeftIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}


