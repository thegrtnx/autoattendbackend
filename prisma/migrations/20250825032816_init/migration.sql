-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "public"."ParentRole" AS ENUM ('FATHER', 'MOTHER', 'GUARDIAN');

-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('DEBIT', 'CREDIT', 'REFUND', 'COUPON');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'RIDER', 'SUPER_ADMIN', 'ADMIN', 'FINANCE', 'DEVELOPER', 'SUPPORT');

-- CreateEnum
CREATE TYPE "public"."PaymentSource" AS ENUM ('PAYSTACK', 'WALLET');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ACTIVE', 'APPROVED', 'PENDING', 'SUSPENDED', 'ARCHIVED', 'FRAUD', 'REJECTED', 'FULFILLED', 'ACCEPTED', 'KYC_1', 'KYC_2', 'KYC_3');

-- CreateEnum
CREATE TYPE "public"."AccountType" AS ENUM ('INDIVIDUAL', 'BUSINESS');

-- CreateTable
CREATE TABLE "public"."User" (
    "userId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "zip" TEXT,
    "logo" TEXT,
    "website" TEXT,
    "description" TEXT,
    "referralCode" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "otp" TEXT,
    "otpExpiredAt" TIMESTAMP(3),
    "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."Referral" (
    "referralId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("referralId")
);

-- CreateTable
CREATE TABLE "public"."Wallet" (
    "wallet_id" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bankName" TEXT,
    "dva_id" INTEGER,
    "accountName" TEXT,
    "bankId" INTEGER,
    "currency" TEXT,
    "cust_code" TEXT,
    "cust_id" INTEGER,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("wallet_id")
);

-- CreateTable
CREATE TABLE "public"."WalletBalance" (
    "balanceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "lastBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WalletBalance_pkey" PRIMARY KEY ("balanceId")
);

-- CreateTable
CREATE TABLE "public"."TransactionHistory" (
    "transactionHistoryId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentType" "public"."PaymentType" NOT NULL,
    "prevBalance" DOUBLE PRECISION NOT NULL,
    "newBalance" DOUBLE PRECISION NOT NULL,
    "paymentReference" TEXT NOT NULL,
    "extRef" TEXT,
    "currency" TEXT,
    "channel" TEXT,
    "charge" DOUBLE PRECISION,
    "chargeNarration" TEXT,
    "senderBank" TEXT,
    "senderAccount" TEXT,
    "recieverBank" TEXT,
    "recieverAccount" TEXT,
    "paymentDescription" TEXT NOT NULL,
    "paid_at" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userUserId" TEXT,

    CONSTRAINT "TransactionHistory_pkey" PRIMARY KEY ("transactionHistoryId")
);

-- CreateTable
CREATE TABLE "public"."Students" (
    "studentid" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE',
    "gender" "public"."Gender" NOT NULL,
    "qrId" TEXT,
    "qrUrl" TEXT,
    "qrPublicId" TEXT,
    "picture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("studentid")
);

-- CreateTable
CREATE TABLE "public"."StudentAddress" (
    "addressid" TEXT NOT NULL,
    "studentid" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAddress_pkey" PRIMARY KEY ("addressid")
);

-- CreateTable
CREATE TABLE "public"."StudentParent" (
    "parentid" TEXT NOT NULL,
    "studentid" TEXT NOT NULL,
    "parentname" TEXT NOT NULL,
    "parentphoneSMS" TEXT NOT NULL,
    "parentphoneWA" TEXT NOT NULL,
    "parentemail" TEXT NOT NULL,
    "parentaddress" TEXT,
    "parentrole" "public"."ParentRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentParent_pkey" PRIMARY KEY ("parentid")
);

-- CreateTable
CREATE TABLE "public"."Preferences" (
    "preferenceid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "telegram" BOOLEAN NOT NULL DEFAULT true,
    "telegramChatId" TEXT,
    "whatsapp" BOOLEAN NOT NULL DEFAULT true,
    "email" BOOLEAN NOT NULL DEFAULT true,
    "sms" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("preferenceid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_referralCode_key" ON "public"."User"("referralCode");

-- CreateIndex
CREATE INDEX "User_userId_idx" ON "public"."User"("userId");

-- CreateIndex
CREATE INDEX "User_referralCode_idx" ON "public"."User"("referralCode");

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "public"."User"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_userId_key" ON "public"."Referral"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referralCode_key" ON "public"."Referral"("referralCode");

-- CreateIndex
CREATE INDEX "Referral_referralId_idx" ON "public"."Referral"("referralId");

-- CreateIndex
CREATE INDEX "Referral_referralCode_idx" ON "public"."Referral"("referralCode");

-- CreateIndex
CREATE INDEX "Referral_userId_idx" ON "public"."Referral"("userId");

-- CreateIndex
CREATE INDEX "Referral_createdAt_idx" ON "public"."Referral"("createdAt");

-- CreateIndex
CREATE INDEX "Referral_updatedAt_idx" ON "public"."Referral"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_accountNumber_key" ON "public"."Wallet"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_cust_code_key" ON "public"."Wallet"("cust_code");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "public"."Wallet"("userId");

-- CreateIndex
CREATE INDEX "Wallet_wallet_id_idx" ON "public"."Wallet"("wallet_id");

-- CreateIndex
CREATE INDEX "Wallet_userId_idx" ON "public"."Wallet"("userId");

-- CreateIndex
CREATE INDEX "Wallet_accountNumber_idx" ON "public"."Wallet"("accountNumber");

-- CreateIndex
CREATE INDEX "Wallet_bankName_idx" ON "public"."Wallet"("bankName");

-- CreateIndex
CREATE INDEX "Wallet_accountName_idx" ON "public"."Wallet"("accountName");

-- CreateIndex
CREATE INDEX "Wallet_created_at_idx" ON "public"."Wallet"("created_at");

-- CreateIndex
CREATE INDEX "Wallet_updated_at_idx" ON "public"."Wallet"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "WalletBalance_userId_key" ON "public"."WalletBalance"("userId");

-- CreateIndex
CREATE INDEX "WalletBalance_balanceId_idx" ON "public"."WalletBalance"("balanceId");

-- CreateIndex
CREATE INDEX "WalletBalance_userId_idx" ON "public"."WalletBalance"("userId");

-- CreateIndex
CREATE INDEX "WalletBalance_balance_idx" ON "public"."WalletBalance"("balance");

-- CreateIndex
CREATE INDEX "WalletBalance_created_at_idx" ON "public"."WalletBalance"("created_at");

-- CreateIndex
CREATE INDEX "WalletBalance_updated_at_idx" ON "public"."WalletBalance"("updated_at");

-- CreateIndex
CREATE INDEX "TransactionHistory_transactionHistoryId_idx" ON "public"."TransactionHistory"("transactionHistoryId");

-- CreateIndex
CREATE INDEX "TransactionHistory_amount_idx" ON "public"."TransactionHistory"("amount");

-- CreateIndex
CREATE INDEX "TransactionHistory_paymentType_idx" ON "public"."TransactionHistory"("paymentType");

-- CreateIndex
CREATE INDEX "TransactionHistory_paymentReference_idx" ON "public"."TransactionHistory"("paymentReference");

-- CreateIndex
CREATE INDEX "TransactionHistory_extRef_idx" ON "public"."TransactionHistory"("extRef");

-- CreateIndex
CREATE INDEX "TransactionHistory_currency_idx" ON "public"."TransactionHistory"("currency");

-- CreateIndex
CREATE INDEX "TransactionHistory_channel_idx" ON "public"."TransactionHistory"("channel");

-- CreateIndex
CREATE INDEX "TransactionHistory_charge_idx" ON "public"."TransactionHistory"("charge");

-- CreateIndex
CREATE INDEX "TransactionHistory_chargeNarration_idx" ON "public"."TransactionHistory"("chargeNarration");

-- CreateIndex
CREATE INDEX "TransactionHistory_senderBank_idx" ON "public"."TransactionHistory"("senderBank");

-- CreateIndex
CREATE INDEX "TransactionHistory_senderAccount_idx" ON "public"."TransactionHistory"("senderAccount");

-- CreateIndex
CREATE INDEX "TransactionHistory_recieverBank_idx" ON "public"."TransactionHistory"("recieverBank");

-- CreateIndex
CREATE INDEX "TransactionHistory_recieverAccount_idx" ON "public"."TransactionHistory"("recieverAccount");

-- CreateIndex
CREATE INDEX "TransactionHistory_paymentDescription_idx" ON "public"."TransactionHistory"("paymentDescription");

-- CreateIndex
CREATE INDEX "TransactionHistory_userUserId_idx" ON "public"."TransactionHistory"("userUserId");

-- CreateIndex
CREATE INDEX "TransactionHistory_createdAt_idx" ON "public"."TransactionHistory"("createdAt");

-- CreateIndex
CREATE INDEX "TransactionHistory_updatedAt_idx" ON "public"."TransactionHistory"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Students_qrId_key" ON "public"."Students"("qrId");

-- CreateIndex
CREATE INDEX "Students_studentid_idx" ON "public"."Students"("studentid");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAddress_studentid_key" ON "public"."StudentAddress"("studentid");

-- CreateIndex
CREATE INDEX "StudentAddress_addressid_idx" ON "public"."StudentAddress"("addressid");

-- CreateIndex
CREATE INDEX "StudentAddress_studentid_idx" ON "public"."StudentAddress"("studentid");

-- CreateIndex
CREATE INDEX "StudentAddress_longitude_latitude_idx" ON "public"."StudentAddress"("longitude", "latitude");

-- CreateIndex
CREATE INDEX "StudentParent_parentid_idx" ON "public"."StudentParent"("parentid");

-- CreateIndex
CREATE INDEX "StudentParent_studentid_idx" ON "public"."StudentParent"("studentid");

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_telegramChatId_key" ON "public"."Preferences"("telegramChatId");

-- CreateIndex
CREATE INDEX "Preferences_preferenceid_idx" ON "public"."Preferences"("preferenceid");

-- CreateIndex
CREATE INDEX "Preferences_userid_idx" ON "public"."Preferences"("userid");

-- AddForeignKey
ALTER TABLE "public"."Referral" ADD CONSTRAINT "Referral_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WalletBalance" ADD CONSTRAINT "WalletBalance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionHistory" ADD CONSTRAINT "TransactionHistory_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "public"."User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentAddress" ADD CONSTRAINT "StudentAddress_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "public"."Students"("studentid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentParent" ADD CONSTRAINT "StudentParent_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "public"."Students"("studentid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Preferences" ADD CONSTRAINT "Preferences_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
