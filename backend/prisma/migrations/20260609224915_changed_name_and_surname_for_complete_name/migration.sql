/*
  Warnings:

  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Users` table. All the data in the column will be lost.
  - Added the required column `complete_name` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "name",
DROP COLUMN "surname",
ADD COLUMN     "complete_name" TEXT NOT NULL;
