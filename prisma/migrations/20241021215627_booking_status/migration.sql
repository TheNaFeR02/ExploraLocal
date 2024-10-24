/*
  Warnings:

  - Made the column `department` on table `Rent` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Rent" ALTER COLUMN "city" SET DEFAULT 'Mompox',
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "department" SET DEFAULT 'Bolívar';

-- AlterTable
ALTER TABLE "RentBooking" ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'PENDING';
