/*
  Warnings:

  - You are about to drop the column `actual_stock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `minimun_stock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_isin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_isin" DROP CONSTRAINT "_isin_A_fkey";

-- DropForeignKey
ALTER TABLE "_isin" DROP CONSTRAINT "_isin_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "actual_stock",
DROP COLUMN "minimun_stock";

-- DropTable
DROP TABLE "_isin";

-- CreateTable
CREATE TABLE "Stock" (
    "product_id" INTEGER NOT NULL,
    "sector_id" INTEGER NOT NULL,
    "actual_stock" INTEGER NOT NULL DEFAULT 0,
    "minimun_stock" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("product_id","sector_id")
);

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("fischer_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
