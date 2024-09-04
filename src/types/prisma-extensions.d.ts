// // prisma-extensions.d.ts
import { Object as PrismaObject, Detail, FrequentQuestion, Rent as PrismaRent, User, Service, Review } from "@prisma/client";

declare module "@prisma/client" {
  interface CustomObject extends PrismaObject {
    details?: Detail[];
    frequentQuestions?: FrequentQuestion[];
  }

  interface CustomRent extends PrismaRent {
    host: User
    services: Service[]
    reviews: Review[]
  }

}