-- CreateTable
CREATE TABLE "_manages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_manages_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_sellsin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_sellsin_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_does" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_does_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_monitors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_monitors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_tours" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_tours_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_manages_B_index" ON "_manages"("B");

-- CreateIndex
CREATE INDEX "_sellsin_B_index" ON "_sellsin"("B");

-- CreateIndex
CREATE INDEX "_does_B_index" ON "_does"("B");

-- CreateIndex
CREATE INDEX "_monitors_B_index" ON "_monitors"("B");

-- CreateIndex
CREATE INDEX "_tours_B_index" ON "_tours"("B");

-- AddForeignKey
ALTER TABLE "_manages" ADD CONSTRAINT "_manages_A_fkey" FOREIGN KEY ("A") REFERENCES "Products"("fischer_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_manages" ADD CONSTRAINT "_manages_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sellsin" ADD CONSTRAINT "_sellsin_A_fkey" FOREIGN KEY ("A") REFERENCES "Products"("fischer_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sellsin" ADD CONSTRAINT "_sellsin_B_fkey" FOREIGN KEY ("B") REFERENCES "Sectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_does" ADD CONSTRAINT "_does_A_fkey" FOREIGN KEY ("A") REFERENCES "CheckIn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_does" ADD CONSTRAINT "_does_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_monitors" ADD CONSTRAINT "_monitors_A_fkey" FOREIGN KEY ("A") REFERENCES "CheckIn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_monitors" ADD CONSTRAINT "_monitors_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tours" ADD CONSTRAINT "_tours_A_fkey" FOREIGN KEY ("A") REFERENCES "Sectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tours" ADD CONSTRAINT "_tours_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
