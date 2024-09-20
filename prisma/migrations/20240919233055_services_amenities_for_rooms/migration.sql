-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "serviceId" INTEGER;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
