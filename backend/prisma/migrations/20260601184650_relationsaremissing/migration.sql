-- CreateEnum
CREATE TYPE "Sector" AS ENUM ('Pintureria', 'Ferreteria');

-- CreateTable
CREATE TABLE "Products" (
    "fischer_code" SERIAL NOT NULL,
    "easy_sap" INTEGER NOT NULL,
    "stockout" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "sector" "Sector" NOT NULL,
    "actual_stock" INTEGER NOT NULL,
    "minimun_stock" INTEGER NOT NULL,
    "product_picture" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("fischer_code")
);

-- CreateTable
CREATE TABLE "CheckIn" (
    "id" SERIAL NOT NULL,
    "frachise" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "sector" "Sector" NOT NULL,
    "checkin_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckIn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Franchise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "branches_amount" INTEGER NOT NULL,

    CONSTRAINT "Franchise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branches" (
    "id" SERIAL NOT NULL,
    "direction" TEXT NOT NULL,
    "franchise_id" INTEGER NOT NULL,

    CONSTRAINT "Branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sectors" (
    "id" SERIAL NOT NULL,
    "sector_boss_email" TEXT NOT NULL,
    "sector" "Sector" NOT NULL,
    "branches_id" INTEGER NOT NULL,

    CONSTRAINT "Sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Updates" (
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "stockout" BOOLEAN NOT NULL,
    "actual_stock" INTEGER NOT NULL,

    CONSTRAINT "Updates_pkey" PRIMARY KEY ("user_id","product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_easy_sap_key" ON "Products"("easy_sap");

-- AddForeignKey
ALTER TABLE "Branches" ADD CONSTRAINT "Branches_franchise_id_fkey" FOREIGN KEY ("franchise_id") REFERENCES "Franchise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sectors" ADD CONSTRAINT "Sectors_branches_id_fkey" FOREIGN KEY ("branches_id") REFERENCES "Branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Updates" ADD CONSTRAINT "Updates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Updates" ADD CONSTRAINT "Updates_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("fischer_code") ON DELETE RESTRICT ON UPDATE CASCADE;
