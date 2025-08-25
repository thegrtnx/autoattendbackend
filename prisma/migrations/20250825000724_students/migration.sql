-- CreateTable
CREATE TABLE "public"."Students" (
    "studentid" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
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
    "parentrole" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentParent_pkey" PRIMARY KEY ("parentid")
);

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

-- AddForeignKey
ALTER TABLE "public"."StudentAddress" ADD CONSTRAINT "StudentAddress_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "public"."Students"("studentid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentParent" ADD CONSTRAINT "StudentParent_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "public"."Students"("studentid") ON DELETE RESTRICT ON UPDATE CASCADE;
