-- CreateEnum
CREATE TYPE "RentType" AS ENUM ('HOTEL', 'APARTMENT', 'PENSION');

-- AlterTable
ALTER TABLE "Rent" ADD COLUMN     "type" "RentType" DEFAULT 'HOTEL';
