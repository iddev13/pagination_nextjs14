-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(225) NOT NULL,
    "text" VARCHAR(225) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
