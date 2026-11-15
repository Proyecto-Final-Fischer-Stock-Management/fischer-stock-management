/*
  Warnings:

  - You are about to drop the `Updates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_sector_id_fkey";

-- DropForeignKey
ALTER TABLE "Updates" DROP CONSTRAINT "Updates_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Updates" DROP CONSTRAINT "Updates_user_id_fkey";

-- DropTable
DROP TABLE "Updates";

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("fischer_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
