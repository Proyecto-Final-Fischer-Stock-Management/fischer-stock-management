/*
  Warnings:

  - You are about to drop the column `branch` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the column `frachise` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the column `sector` on the `CheckIn` table. All the data in the column will be lost.
  - You are about to drop the `_soldin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_soldto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_storedin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sector_id` to the `CheckIn` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_soldin" DROP CONSTRAINT "_soldin_A_fkey";

-- DropForeignKey
ALTER TABLE "_soldin" DROP CONSTRAINT "_soldin_B_fkey";

-- DropForeignKey
ALTER TABLE "_soldto" DROP CONSTRAINT "_soldto_A_fkey";

-- DropForeignKey
ALTER TABLE "_soldto" DROP CONSTRAINT "_soldto_B_fkey";

-- DropForeignKey
ALTER TABLE "_storedin" DROP CONSTRAINT "_storedin_A_fkey";

-- DropForeignKey
ALTER TABLE "_storedin" DROP CONSTRAINT "_storedin_B_fkey";

-- AlterTable
ALTER TABLE "CheckIn" DROP COLUMN "branch",
DROP COLUMN "frachise",
DROP COLUMN "sector",
ADD COLUMN     "sector_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_soldin";

-- DropTable
DROP TABLE "_soldto";

-- DropTable
DROP TABLE "_storedin";

-- CreateTable
CREATE TABLE "_isin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_isin_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_isin_B_index" ON "_isin"("B");

-- AddForeignKey
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_isin" ADD CONSTRAINT "_isin_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("fischer_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_isin" ADD CONSTRAINT "_isin_B_fkey" FOREIGN KEY ("B") REFERENCES "Sectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
