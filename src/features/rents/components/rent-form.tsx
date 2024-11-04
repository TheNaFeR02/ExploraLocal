'use client'
import { useForm } from "react-hook-form";
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
  // .refine((file) => file.size < MAX_FILE_SIZE, "Tamaño máximo por imagen es 4MB.")
  // .refine((file) => checkFileType(file), "Only .jpg, .png and .jpeg formats are supported.")
});

const formSchema = RentSchema.pick({
  name: true,
  profile_photo: true,
  description: true,
  collection: true,
}).omit({
  profile_photo: true,
  collection: true,
}).extend({
  name: RentSchema.shape.name.refine((name) => name.length > 0, "Ingrese un nombre"),
  description: RentSchema.shape.description.refine((desc) => desc.length > 0, "Agregar una descripción"),
  profile_photo: fileSchema,
  // https://github.com/orgs/react-hook-form/discussions/11096#discussioncomment-9266218
  collection: (typeof window === "undefined" ? z.any() : z.instanceof(FileList))
    .refine((files) => {
      const fileExtension = files[0].name.split(".").pop()
      return fileExtension && ["png", "jpg", "jpeg"].includes(fileExtension)
    }, "png, jpg y jpeg son los formatos soportados.")
})


export function RentForm() {
  const [state, formAction] = useFormState(onSubmitAction, {
    message: "",
  })

  const form = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        // profile_photo: "",
        description: "",
        collection: [],
      }
    })

  

  const formRef = useRef<HTMLFormElement>(null);
  // const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [collectionPreview, setCollectionPreview] = useState<string[]>([])

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          action={formAction}
          onSubmit={(evt) => {
            evt.preventDefault();

            console.log("handle submit", formRef.current)
            form.handleSubmit(() => {
              console.log(formRef.current)
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