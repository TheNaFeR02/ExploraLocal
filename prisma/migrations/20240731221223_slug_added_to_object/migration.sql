/*
  Warnings:

  - You are about to drop the column `frequentQuestionsId` on the `Object` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Object` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Object" DROP COLUMN "frequentQuestionsId",
ADD COLUMN     "slug" TEXT NOT NULL;
