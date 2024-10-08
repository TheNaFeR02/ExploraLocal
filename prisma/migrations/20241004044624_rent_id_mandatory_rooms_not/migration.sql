/*
  Warnings:

  - Made the column `rentId` on table `RentBooking` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RentBooking" DROP CONSTRAINT "RentBooking_rentId_fkey";

-- AlterTable
ALTER TABLE "RentBooking" ALTER COLUMN "rentId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "RentBooking" ADD CONSTRAINT "RentBooking_rentId_fkey" FOREIGN KEY ("rentId") REFERENCES "Rent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
