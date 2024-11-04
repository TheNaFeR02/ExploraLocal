"use server"

import { utapi } from '@/server/uploadthing';
import { UTFile } from 'uploadthing/server'
import { FileEsque } from "uploadthing/types";


export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};


export async function onSubmitAction(prevState: FormState, data: FormData){
  console.log(data) 
  
  // const file = await data.get('profile_photo') as FileEsque
  // const response = await utapi.uploadFiles(file)


  return { message: "Rent registered" };
}