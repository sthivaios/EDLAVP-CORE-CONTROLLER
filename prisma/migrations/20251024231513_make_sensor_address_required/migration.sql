/*
  Warnings:

  - Made the column `address` on table `sensors` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."readings_time_idx";

-- AlterTable
ALTER TABLE "sensors" ALTER COLUMN "address" SET NOT NULL;
