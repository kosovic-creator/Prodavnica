-- CreateTable
CREATE TABLE "Artikal" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,
    "cijena" INTEGER NOT NULL,

    CONSTRAINT "Artikal_pkey" PRIMARY KEY ("id")
);
