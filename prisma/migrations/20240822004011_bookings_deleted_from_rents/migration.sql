/*
  Warnings:

  - You are about to drop the column `rentId` on the `RentBooking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RentBooking" DROP CONSTRAINT "RentBooking_rentId_fkey";

-- AlterTable
ALTER TABLE "RentBooking" DROP COLUMN "rentId";
