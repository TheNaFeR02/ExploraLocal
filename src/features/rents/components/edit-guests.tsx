"use client"
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Minus, Plus } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function EditGuests(
  { capacity }: { capacity: number }
) {
  const [adults, setAdults] = useState(0)
  const [kids, setKids] = useState(0)
  const [babies, setBabies] = useState(0)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const searchParams = new URLSearchParams(window.location.search)
      Object.keys(params).forEach(key => {
        searchParams.set(key, params[key])
      })
      return searchParams.toString()
    },
    []
  )

  useEffect(() => {
    const adults = searchParams.get('adults')
    const kids = searchParams.get('kids')
    const babies = searchParams.get('babies')
    if (adults && kids && babies) {
      const adults_ = Number(adults)
      if (!isNaN(adults_)) setAdults(adults_)
      const kids_ = Number(kids)
      if (!isNaN(kids_)) setKids(kids_)
      const babies_ = Number(babies)
      if (!isNaN(babies_)) setBabies(babies_)
    } else {
      router.push(pathname + '?' + createQueryString({ adults: '2', kids: '0', babies: '0' }))
      setAdults(2)
    }
  }, [])

  return (

    <div className='flex justify-between'>
      <div>
        <p className='font-medium'>Huéspedes</p>
        {capacity !== 0 && adults + kids > capacity && (<p className='text-red-500 text-sm italic'>Núm. personas recomendadas ({capacity})</p>)}
        {adults == 0 && kids == 0 && babies == 0 && <p>Elejir huéspedes</p>}

        {adults >= 1 && <p>{adults} Adultos</p>}
        {kids >= 1 && <p>{kids} Niños</p>}
        {babies >= 1 && <p>{babies} Bebés</p>}
      </div>
      <div className="self-center">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="link">
              <span className='underline'>Cambiar</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Huéspedes</DrawerTitle>
                <DrawerDescription>Selecciona el número de huéspedes {capacity !== 0 && adults + kids > capacity && (<><br /> <span className='text-red-500 '>Recordar que la capacidad máxima recomendada para la habitación es de {capacity} personas</span></>)}</DrawerDescription>
              </DrawerHeader>

              <div className="p-4 pb-0">
                <div>
                  <div className="flex items-center justify-center space-x-2">
                    {/* Adults */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => setAdults(adults - 1)}
                      disabled={adults <= 0}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-4xl font-bold tracking-tighter">
                        {adults}
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Adultos: Mayores a 13 años.
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => setAdults(adults + 1)}
                    // disabled={adults >= limit_} // TODO: adjust the limit depending on the requirement 
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>

                  <div>
                    {/* Kids */}
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => setKids(kids - 1)}
                        disabled={kids <= 0}
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Decrease</span>
                      </Button>
                      <div className="flex-1 text-center">
                        <div className="text-4xl font-bold tracking-tighter">
                          {kids}
                        </div>
                        <div className="text-[0.70rem] uppercase text-muted-foreground">
                          Niños: Entre 2 y 12 años.
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => setKids(kids + 1)}
                      // disabled={adults >= limit_} // TODO: adjust the limit depending on the requirement 
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    {/* Babies */}
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => setBabies(babies - 1)}
                        disabled={babies <= 0}
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Decrease</span>
                      </Button>
                      <div className="flex-1 text-center">
                        <div className="text-4xl font-bold tracking-tighter">
                          {babies}
                        </div>
                        <div className="text-[0.70rem] uppercase text-muted-foreground">
                          Bebés: Menores a 2 años.
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => setBabies(babies + 1)}
                      // disabled={adults >= limit_} // TODO: adjust the limit depending on the requirement 
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase</span>
                      </Button>
                    </div>
                  </div>


                </div>
              </div>

              <DrawerFooter>
                {/* <Button>Submit</Button> */}
                <DrawerClose asChild>
                  <Button className="my-6"
                    onClick={() => {
                      router.push(pathname + '?' + createQueryString({ adults: adults.toString(), kids: kids.toString(), babies: babies.toString() }))
                    }}
                  >Confirmar</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>

  )
}