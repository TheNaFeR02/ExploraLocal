/*
  Warnings:

  - You are about to drop the column `amenities` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_serviceId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "amenities",
DROP COLUMN "serviceId";

-- CreateTable
CREATE TABLE "_RoomToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToService_AB_unique" ON "_RoomToService"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToService_B_index" ON "_RoomToService"("B");

-- AddForeignKey
ALTER TABLE "_RoomToService" ADD CONSTRAINT "_RoomToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToService" ADD CONSTRAINT "_RoomToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
