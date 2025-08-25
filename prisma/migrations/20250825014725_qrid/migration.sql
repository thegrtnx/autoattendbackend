/*
  Warnings:

  - A unique constraint covering the columns `[qrId]` on the table `Students` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Students" ADD COLUMN     "qrId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Students_qrId_key" ON "public"."Students"("qrId");
