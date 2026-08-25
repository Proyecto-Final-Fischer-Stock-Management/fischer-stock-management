/*
  Warnings:

  - Made the column `product_picture_type` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `units_per_cage` on table `Stock` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "product_picture_type" SET NOT NULL;

-- AlterTable
ALTER TABLE "Stock" ALTER COLUMN "units_per_cage" SET NOT NULL;
