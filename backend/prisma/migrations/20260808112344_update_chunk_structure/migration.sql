/*
  Warnings:

  - You are about to drop the column `endOffset` on the `Chunk` table. All the data in the column will be lost.
  - You are about to drop the column `endPage` on the `Chunk` table. All the data in the column will be lost.
  - You are about to drop the column `startOffset` on the `Chunk` table. All the data in the column will be lost.
  - You are about to drop the column `startPage` on the `Chunk` table. All the data in the column will be lost.
  - Added the required column `type` to the `Chunk` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Chunk_documentId_startPage_idx";

-- AlterTable
ALTER TABLE "Chunk" DROP COLUMN "endOffset",
DROP COLUMN "endPage",
DROP COLUMN "startOffset",
DROP COLUMN "startPage",
ADD COLUMN     "pages" INTEGER[],
ADD COLUMN     "sectionHeading" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;
