/*
  Warnings:

  - You are about to drop the column `carrfour_ean` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[carrefour_ean]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `carrefour_ean` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_carrfour_ean_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "carrfour_ean",
ADD COLUMN     "carrefour_ean" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_carrefour_ean_key" ON "Product"("carrefour_ean");
