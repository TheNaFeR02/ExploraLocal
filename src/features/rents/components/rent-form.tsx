'use client'
import { useFieldArray, useForm } from "react-hook-form";
import { RentSchema } from "../../../../prisma/generated/zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { onSubmitAction } from "@/app/rents/create/formAction";
import { Button } from "@/components/ui/button";
import { InputFile } from "./input-file";
import { UploadButton } from "@/utils/uploadthings";
import { Label } from "@/components/ui/label";
import Image from 'next/image'

const MAX_FILE_SIZE = 4000000;

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === ".jpg" || fileType === ".png" || fileType === ".jpeg") return true;
  }
  return false;
}

export const fileSchema = z.object({
  file: z.instanceof(File)
  .refine((file) => file.size < MAX_FILE_SIZE, "Tamaño máximo por imagen es 4MB.")
  // .refine((file) => checkFileType(file), "Only .jpg, .png and .jpeg formats are supported.")
});

const formSchema = RentSchema.pick({
  name: true,
  description: true,
  profile_photo: true,
  collection: true,
  department: true,
  city: true,
  rules: true, // DIFF FOR HOTEL
  type: true,
  capacity: true, // DIFF FOR HOTEL 
  price: true, // DIFF FOR HOTEL

}).omit({
  profile_photo: true,
  collection: true,
}).extend({
  name: RentSchema.shape.name
    .refine((name) => name.length > 0, "Ingrese un nombre"),
  description: RentSchema.shape.description
    .refine((desc) => desc.length > 0, "Agregar una descripción"),
  rules: z.array(z.object({ value: z.string() })),
  profile_photo: fileSchema,
  // https://github.com/orgs/react-hook-form/discussions/11096#discussioncomment-9266218
  collection: (typeof window === "undefined" ? z.any() : z.instanceof(FileList))
    .refine((files) => {
      const fileExtension = files[0].name.split(".").pop()
      return fileExtension && ["png", "jpg", "jpeg"].includes(fileExtension)
    }, "png, jpg y jpeg son los formatos soportados."),

})


export function RentForm() {
  const [state, formAction] = useFormState(onSubmitAction, {
    message: "",
  })


  const form = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      // mode: "all",
      defaultValues: {
        name: "",
        description: "",
        // profile_photo: "",
        // collection: [],
        department: "Bolívar",
        city: "Mompox",
        rules: [{ value: "" }],
        type: "APARTMENT",
        capacity: null,
        price: 1500
      }
    })



  const { fields, append, remove } = useFieldArray({
    control: form.control, // Ensure control is passed here
    name: "rules"
  });



  const formRef = useRef<HTMLFormElement>(null);
  // const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [collectionPreview, setCollectionPreview] = useState<string[]>([])
  const [rentType, setRentType] = useState<string>("APARTMENT")

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          action={formAction}
          onSubmit={(evt) => {
            evt.preventDefault();
            form.handleSubmit(() => {
              formAction(new FormData(formRef.current!))
            })(evt);
          }}
          className='space-y-8'
        >

          <div className="w-full lg:w-1/2 mx-auto">
            <div className="rounded-2xl border shadow-default mt-4">
              <div className="flex justify-center p-5">


                <div className="flex flex-col justify-center pt-4">
                  <div className="text-2xl font-bold text-center mb-5">
                    {/* Title... */}
                    Crear establecimiento
                  </div>


                  <div className="grid sm:grid-cols-2 grid-cols-1 space-y-5">
                    {/* Form fields... */}
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input autoComplete="additional-name" placeholder="Nombre del establecimiento" {...field} />
                          </FormControl>
                          <FormDescription>
                            Este será el nombre del hotel o apartamento
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    >
                    </FormField>

                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Input autoComplete="additional-name" placeholder="Nombre del establecimiento" {...field} />
                          </FormControl>
                          <FormDescription>
                            Este será el nombre del hotel o apartamento
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    >
                    </FormField>

                    <Label htmlFor="profile_photo" >Foto de perfil</Label>
                    {previewUrl ?
                      <div className="mx-auto w-auto h-auto">
                        <Image
                          src={previewUrl}
                          alt="profile image"
                          width={80}
                          height={80}
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                      : null}



                    <FormField
                      control={form.control}
                      name="profile_photo.file"
                      render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...fieldProps}
                              id="profile_photo"
                              placeholder="Picture"
                              type="file"
                              accept="image/* , application/pdf"
                              onChange={(event) => {
                                const file = event.target.files && event.target.files[0];
                                if (file) {
                                  setPreviewUrl(URL.createObjectURL(file));
                                  onChange(file);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                    <Label htmlFor="collection" >Colección</Label>
                    <div className='flex overflow-scroll'>
                      {collectionPreview ? (
                        collectionPreview.map((image, index) => (
                          <div key={index} className="mx-auto">
                            <Image
                              src={image}
                              alt={"image" + index}
                              width={80}
                              height={80}
                              style={{ width: 'auto', height: 'auto' }}
                            />
                          </div>
                        ))
                      )
                        : null}
                    </div>


                    <FormField
                      control={form.control}
                      name="collection"
                      render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...fieldProps}
                              id="collection"
                              placeholder="Lista de Imágenes"
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(event) => {
                                // const file = event.target.files && event.target.files[0];
                                const files = event.target.files
                                if (files) {
                                  const fileArray = Array.from(files);
                                  const newPreviews = fileArray.map(file => URL.createObjectURL(file));
                                  setCollectionPreview(newPreviews);
                                  onChange(files);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem key={field.value}>
                          <FormLabel>Departamento</FormLabel>
                          <Select
                            onValueChange={field.onChange} defaultValue={field.value}
                            name={field.name}
                          // {...field}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona departamento" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Bolívar">Bolívar</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Departamento de Residencia
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem key={field.value}>
                          <FormLabel>Ciudad</FormLabel>
                          <Select
                            onValueChange={field.onChange} defaultValue={field.value}
                            name={field.name}
                          // {...field}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar ciudad" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Mompox">Mompox</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Ciudad de Residencia
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {fields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`rules.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Regla #{index + 1}</FormLabel>
                            <div className="flex gap-2">                            <FormControl>
                              <Input placeholder={`Ej: No fumar...`} {...field} />
                            </FormControl>
                              <Button type="button" size={"sm"} variant="destructive" onClick={() => remove(index)}>Eliminar</Button>
                            </div>
                            <FormDescription>
                              Estas son las reglas del sitio.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}

                    <Button
                      type="button"
                      className="mx-0 w-28"
                      onClick={() => append({ value: "" })}
                    >Añadir Regla</Button>


                    {/* {fields.map((field, index) => (
                      <div key={field.id}>
                        <Input
                          key={field.id} // important to include key with field's id
                          {...form.register(`rules.${index}.value`)}
                        />
                        <button type="button" onClick={() => remove(index)}>Delete</button>
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={() => append({ value: "" })}
                    >Append</Button> */}



                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem key={field.value}>
                          <FormLabel>Tipo de residencia</FormLabel>
                          <Select
                            onValueChange={
                              (value) => {
                                setRentType(value);
                                field.onChange(value)
                              }
                            }
                            value={rentType}
                            name={field.name}
                          // {...field}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar tipo de renta" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="APARTMENT">Apartamento</SelectItem>
                              <SelectItem value="HOTEL">Hotel</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Ej: "Apartmento", "Hotel"
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {rentType === 'APARTMENT' && (
                      <FormField
                        control={form.control}
                        name='capacity'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capacidad de personas</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Número de personas" {...field}
                                // onChange={event => field.onChange(+event.target.value)}
                                value={field.value ?? 2}

                              />
                            </FormControl>
                            <FormDescription>
                              Será la capacidad máxima recomendada para el alojamiento.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      >
                      </FormField>
                    )}

                    {rentType === 'APARTMENT' && (
                      <FormField
                        control={form.control}
                        name='price'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Precio por noche</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Precio en COP"
                                {...field}
                                value={field.value ?? 1500}
                              // onChange={event => field.onChange(+event.target.value)}
                              />
                            </FormControl>
                            <FormDescription>
                              Precio por noche del alojamiento.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      >
                      </FormField>
                    )}


                    {/* <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Departamento</FormLabel>
                          <Select onValueChange={field.onChange} >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un departamento" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="bolivar">Bolívar</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Departamento de residencia
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}


                    {/* <UploadButton
                      className="ut-button:bg-primary"
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        setUploadedFileUrl(res[0].url); // Store the uploaded file URL
                        form.setValue('profile_photo', res[0].url); // Update the form state
                        alert("Upload Completed");
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    /> */}





                  </div>


                  <Button className="my-2" type="submit">Submit</Button>

                </div>

              </div>
            </div>
          </div>

        </form>
      </Form>
    </>
  )
}