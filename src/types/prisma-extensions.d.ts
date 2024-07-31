// // prisma-extensions.d.ts
import { Object as PrismaObject, Detail, FrequentQuestion } from "@prisma/client";

declare module "@prisma/client" {
  interface CustomObject extends PrismaObject {
    details: Detail[];
    frequentQuestions: FrequentQuestion[];
  } 
}