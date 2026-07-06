-- CreateTable
CREATE TABLE "Sends" (
    "stockman_id" INTEGER NOT NULL,
    "administrator_id" INTEGER NOT NULL,
    "email_actual_stock" INTEGER NOT NULL,
    "email_stockout" BOOLEAN NOT NULL,
    "email_sugerences" TEXT NOT NULL,

    CONSTRAINT "Sends_pkey" PRIMARY KEY ("stockman_id","administrator_id")
);

-- CreateTable
CREATE TABLE "_manager" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_manager_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_manager_B_index" ON "_manager"("B");

-- AddForeignKey
ALTER TABLE "Sends" ADD CONSTRAINT "Sends_stockman_id_fkey" FOREIGN KEY ("stockman_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sends" ADD CONSTRAINT "Sends_administrator_id_fkey" FOREIGN KEY ("administrator_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_manager" ADD CONSTRAINT "_manager_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_manager" ADD CONSTRAINT "_manager_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
