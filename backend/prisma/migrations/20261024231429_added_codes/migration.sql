/*
  Warnings:

  - A unique constraint covering the columns `[sodimac_sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[carrfour_ean]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[anonima_codint]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hipertehuelche_code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `anonima_codint` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carrfour_ean` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hipertehuelche_code` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sodimac_sku` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "anonima_codint" INTEGER NOT NULL,
ADD COLUMN     "carrfour_ean" INTEGER NOT NULL,
ADD COLUMN     "hipertehuelche_code" TEXT NOT NULL,
ADD COLUMN     "sodimac_sku" TEXT NOT NULL,
ALTER COLUMN "easy_sap" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_sodimac_sku_key" ON "Product"("sodimac_sku");

-- CreateIndex
CREATE UNIQUE INDEX "Product_carrfour_ean_key" ON "Product"("carrfour_ean");

-- CreateIndex
CREATE UNIQUE INDEX "Product_anonima_codint_key" ON "Product"("anonima_codint");

-- CreateIndex
CREATE UNIQUE INDEX "Product_hipertehuelche_code_key" ON "Product"("hipertehuelche_code");
