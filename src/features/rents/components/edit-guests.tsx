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
import { useState } from "react";

export default function EditGuests() {
  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(0)
  const [babies, setBabies] = useState(0)

  return (

    <div className='flex justify-between'>
      <div>
        <p className='font-medium'>Huéspedes</p>
        <p>{adults} Adultos</p>
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
                <DrawerDescription>Selecciona el número de huéspedes</DrawerDescription>
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
                  <Button className="my-6">Cerrar</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>

  )
}