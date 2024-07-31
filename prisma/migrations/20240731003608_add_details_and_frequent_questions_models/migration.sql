/*
  Warnings:

  - You are about to drop the column `details` on the `Object` table. All the data in the column will be lost.
  - You are about to drop the column `frequentQuestions` on the `Object` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Object" DROP COLUMN "details",
DROP COLUMN "frequentQuestions",
ADD COLUMN     "frequentQuestionsId" INTEGER;

-- CreateTable
CREATE TABLE "FrequentQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "objectId" INTEGER NOT NULL,

    CONSTRAINT "FrequentQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detail" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "objectId" INTEGER NOT NULL,

    CONSTRAINT "Detail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FrequentQuestion_objectId_key" ON "FrequentQuestion"("objectId");

-- AddForeignKey
ALTER TABLE "FrequentQuestion" ADD CONSTRAINT "FrequentQuestion_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "Object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "Object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
