"use server"

import { utapi } from '@/server/uploadthing';
import { UTFile } from 'uploadthing/server'
import { FileEsque } from "uploadthing/types";
import { RentSchema } from '../../../../prisma/generated/zod';
import slug from 'slug'
import { z } from 'zod';


const ServerRentSchema = RentSchema.pick({
  name: true,
  slug: true,
  description: true,
  price: true,
  department: true,
  city: true,
  hostId: true,
  rules: true,
  capacity: true,
  profile_photo: true,
  collection: true,
})

type ServerRent = z.infer<typeof ServerRentSchema>

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function onSubmitAction(prevState: FormState, data: FormData): Promise<FormState>{

  // We convert the FormData object to a regular object to be able to check the schema against the server before creating the Rent.
  const formData: ServerRent = {
    name: data.get('name') as string,
    slug: slug(data.get('name') as string) ?? '',
    description: data.get('description') as string,
    price: isNaN(Number(data.get('price'))) ? 0 : Number(data.get('price')),
    department: data.get('department') as string,
    city: data.get('city') as string,
    hostId: 1, // TODO: Change to the current user.
    rules: [],
    collection: [],
    capacity: isNaN(Number(data.get('capacity'))) ? 0 : Number(data.get('capacity')),
    profile_photo: '',
  } 


  // Extract rules from formData since they came in as 'rules.0.value', 'rules.1.value', etc. Because of the useArrayField of react-hook-form.
  let i = 0;
  while (data.get(`rules.${i}.value`) !== null) {
    formData.rules.push(data.get(`rules.${i}.value`) as string);
    i++;
  }

  
  // We use the uploadthing API to upload the files to the server and get the URLs to store in the Rent object.
  const profile_photo =  data.get('profile_photo.file') as FileEsque
  const collection =  data.getAll('collection') as FileEsque[]
  const files = [profile_photo, ...collection]


  // https://docs.uploadthing.com/api-reference/ut-api#upload-files 
  const response = await utapi.uploadFiles(files)

  if (response){
    formData.profile_photo = response[0].data?.url ?? ''

    for(let i=1; i<response.length; i++) {
     formData.collection.push(response[i].data?.url ?? '') 
    }
  }
 
  // Now that we have the data in the correct format, we can check it against the schema.
  const parsed = ServerRentSchema.safeParse(formData)
  

  if (parsed.error) {
    for (const issue of parsed.error.issues) {
      console.log(JSON.stringify(issue.path))
    }
  }

  

return { message: "Rent registered",};
}


// export async function onSubmitAction(prevState: FormState, data: FormData) {
//   console.log(data)
//   const formData = Object.fromEntries(data);
//   const formData_: ServerRent = {
     
//   }


//   // Extract rules from formData
//   const rules: string[] = [];
//   let i = 0;
//   while (formData[`rules.${i}.value`] !== undefined) {
//     rules.push(formData[`rules.${i}.value`] as string);
//     delete formData[`rules.${i}.value`]; // Remove the key-value pair from formData
//     i++;
//   }

//   // Add the rules array to formData
//   (formData.rules as any) = rules;

//   (formData.price as any) = Number(formData["price"]);

//   (formData.capacity as any) = Number(formData["capacity"]);

//   (formData.hostId as any) = 1 // !! TODO: This should be the id of the user creating the rent.  

//   formData["slug"] = slug(formData["name"] as string)

//   console.log("here!", formData)

//   const parsed = ServerRentSchema.safeParse(formData)

//   // console.log(parsed)
//   // if (parsed.error) {
//   //   for (const issue of parsed.error.issues) {
//   //     // console.log(issue)
//   //     console.log(JSON.stringify(issue.path))
//   //   }
//   // }





//   // const file = await data.get('profile_photo.file') as FileEsque
//   // const response = await utapi.uploadFiles(file)


//   // if (formData['profile_photo.file'] !== undefined) {
//   //   formData['profile_photo'] = response.data?.url ?? ''
//   //   delete formData['profile_photo.file']
//   // }
//   // console.log(files)
//   // const files = await data.getAll('collection') as FileEsque[]

//   // console.log(response_)


//   const file = await data.get('profile_photo.file') as FileEsque
//   const files = await data.getAll('collection') as FileEsque[]
//   const files_ = [file, ...files]

//   const response = await utapi.uploadFiles(files_)

//   console.log(response)
//   if (formData['profile_photo.file'] !== undefined) {
//     formData['profile_photo'] = response[0].data?.url ?? ''
//     delete formData['profile_photo.file']
//   }

//   if (formData['collection'] !== undefined) {
//     delete formData['collection']
//     for (let i = 1; i < response.length; i++) {
//       console.log(response[i].data?.url)
//       // (formData['collection'] as any) = [];
//       // (formData['collection'] as any).push(response[i].data?.url)
//     }
//   }

//   console.log("formData: ", formData)


//   return { message: "Rent registered" };
// }