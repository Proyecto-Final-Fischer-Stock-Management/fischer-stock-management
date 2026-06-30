/*
  Warnings:

  - You are about to drop the `_sellsin` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `product_picture` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_sellsin" DROP CONSTRAINT "_sellsin_A_fkey";

-- DropForeignKey
ALTER TABLE "_sellsin" DROP CONSTRAINT "_sellsin_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "product_picture",
ADD COLUMN     "product_picture" BYTEA NOT NULL;

-- DropTable
DROP TABLE "_sellsin";

-- CreateTable
CREATE TABLE "_soldin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_soldin_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_soldto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_soldto_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_storedin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_storedin_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_soldin_B_index" ON "_soldin"("B");

-- CreateIndex
CREATE INDEX "_soldto_B_index" ON "_soldto"("B");

-- CreateIndex
CREATE INDEX "_storedin_B_index" ON "_storedin"("B");

-- AddForeignKey
ALTER TABLE "_soldin" ADD CONSTRAINT "_soldin_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("fischer_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_soldin" ADD CONSTRAINT "_soldin_B_fkey" FOREIGN KEY ("B") REFERENCES "Sectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_soldto" ADD CONSTRAINT "_soldto_A_fkey" FOREIGN KEY ("A") REFERENCES "Franchise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_soldto" ADD CONSTRAINT "_soldto_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("fischer_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_storedin" ADD CONSTRAINT "_storedin_A_fkey" FOREIGN KEY ("A") REFERENCES "Branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_storedin" ADD CONSTRAINT "_storedin_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("fischer_code") ON DELETE CASCADE ON UPDATE CASCADE;
