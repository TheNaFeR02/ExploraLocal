/*
  Warnings:

  - Made the column `name` on table `Rent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Rent" ALTER COLUMN "name" SET NOT NULL;
