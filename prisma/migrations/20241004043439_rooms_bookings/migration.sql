-- DropForeignKey
ALTER TABLE "RentBooking" DROP CONSTRAINT "RentBooking_rentId_fkey";

-- AlterTable
ALTER TABLE "RentBooking" ADD COLUMN     "roomId" INTEGER,
ALTER COLUMN "rentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RentBooking" ADD CONSTRAINT "RentBooking_rentId_fkey" FOREIGN KEY ("rentId") REFERENCES "Rent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentBooking" ADD CONSTRAINT "RentBooking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
