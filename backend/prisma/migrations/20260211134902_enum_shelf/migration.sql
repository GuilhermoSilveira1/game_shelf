/*
  Warnings:

  - Changed the type of `status` on the `Shelf` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ShelfStatus" AS ENUM ('WANT_TO_PLAY', 'PLAYING', 'COMPLETED', 'DROPPED');

-- AlterTable
ALTER TABLE "Shelf" DROP COLUMN "status",
ADD COLUMN     "status" "ShelfStatus" NOT NULL;
