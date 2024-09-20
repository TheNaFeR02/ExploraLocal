/*
  Warnings:

  - You are about to drop the column `beds` on the `Room` table. All the data in the column will be lost.
  - Added the required column `king_bed` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `queen_bed` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `single_bed` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "beds",
ADD COLUMN     "king_bed" INTEGER NOT NULL,
ADD COLUMN     "queen_bed" INTEGER NOT NULL,
ADD COLUMN     "single_bed" INTEGER NOT NULL;
