/*
  Warnings:

  - Changed the type of `parentrole` on the `StudentParent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."ParentRole" AS ENUM ('FATHER', 'MOTHER', 'GUARDIAN');

-- AlterTable
ALTER TABLE "public"."StudentParent" DROP COLUMN "parentrole",
ADD COLUMN     "parentrole" "public"."ParentRole" NOT NULL;
