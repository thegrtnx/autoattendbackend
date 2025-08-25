/*
  Warnings:

  - Changed the type of `gender` on the `Students` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "public"."Students" DROP COLUMN "gender",
ADD COLUMN     "gender" "public"."Gender" NOT NULL;
