/*
  Warnings:

  - Added the required column `rentId` to the `RentBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RentBooking" ADD COLUMN     "rentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "RentBooking" ADD CONSTRAINT "RentBooking_rentId_fkey" FOREIGN KEY ("rentId") REFERENCES "Rent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
