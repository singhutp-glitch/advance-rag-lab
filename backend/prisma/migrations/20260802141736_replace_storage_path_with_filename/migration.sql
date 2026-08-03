/*
  Warnings:

  - You are about to drop the column `storagePath` on the `Document` table. All the data in the column will be lost.
  - Added the required column `storedFileName` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "storagePath",
ADD COLUMN     "storedFileName" TEXT NOT NULL;
