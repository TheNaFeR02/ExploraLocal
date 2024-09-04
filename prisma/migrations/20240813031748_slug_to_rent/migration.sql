/*
  Warnings:

  - Added the required column `slug` to the `Rent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rent" ADD COLUMN     "slug" TEXT NOT NULL;
