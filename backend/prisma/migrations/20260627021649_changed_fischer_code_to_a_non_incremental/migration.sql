/*
  Warnings:

  - A unique constraint covering the columns `[fischer_code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "fischer_code" DROP DEFAULT;
DROP SEQUENCE "Product_fischer_code_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Product_fischer_code_key" ON "Product"("fischer_code");
