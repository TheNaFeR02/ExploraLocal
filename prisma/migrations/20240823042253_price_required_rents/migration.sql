/*
  Warnings:

  - Made the column `price` on table `Rent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Rent" ALTER COLUMN "price" SET NOT NULL;
