-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "public"."Students" ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE';
