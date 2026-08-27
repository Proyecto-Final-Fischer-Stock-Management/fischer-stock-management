/*
  Warnings:

  - Made the column `product_picture` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "product_picture_type" TEXT,
ALTER COLUMN "product_picture" SET NOT NULL;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "units_per_cage" INTEGER;
