-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "accountStatus" "public"."Status" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "resetOtp" TEXT,
ADD COLUMN     "resetOtpExpiredAt" TIMESTAMP(3),
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER';
