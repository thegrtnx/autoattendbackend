-- DropForeignKey
ALTER TABLE "public"."StudentAddress" DROP CONSTRAINT "StudentAddress_studentid_fkey";

-- DropForeignKey
ALTER TABLE "public"."StudentParent" DROP CONSTRAINT "StudentParent_studentid_fkey";

-- AddForeignKey
ALTER TABLE "public"."StudentAddress" ADD CONSTRAINT "StudentAddress_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "public"."Students"("studentid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentParent" ADD CONSTRAINT "StudentParent_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "public"."Students"("studentid") ON DELETE CASCADE ON UPDATE CASCADE;
