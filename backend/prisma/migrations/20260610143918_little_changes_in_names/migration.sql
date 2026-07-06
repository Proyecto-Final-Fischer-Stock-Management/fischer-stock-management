/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Updates" DROP CONSTRAINT "Updates_product_id_fkey";

-- DropForeignKey
ALTER TABLE "_manages" DROP CONSTRAINT "_manages_A_fkey";

-- DropForeignKey
ALTER TABLE "_sellsin" DROP CONSTRAINT "_sellsin_A_fkey";

-- DropTable
DROP TABLE "Products";

-- CreateTable
CREATE TABLE "Product" (
    "fischer_code" SERIAL NOT NULL,
    "easy_sap" INTEGER NOT NULL,
    "stockout" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "sector" "Sector" NOT NULL,
    "actual_stock" INTEGER NOT NULL,
    "minimun_stock" INTEGER NOT NULL,
    "product_picture" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("fischer_code")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_easy_sap_key" ON "Product"("easy_sap");

-- AddForeignKey
ALTER TABLE "Updates" ADD CONSTRAINT "Updates_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("fischer_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_manages" ADD CONSTRAINT "_manages_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("fischer_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sellsin" ADD CONSTRAINT "_sellsin_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("fischer_code") ON DELETE CASCADE ON UPDATE CASCADE;
