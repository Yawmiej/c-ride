/*
  Warnings:

  - The values [PENDING_VERIFICATION] on the enum `DriverStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isAvailable` on the `DriverProfile` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `UserDevice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fid]` on the table `UserDevice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fid` to the `UserDevice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DriverStatus_new" AS ENUM ('PENDING_ONBOARDING', 'ACTIVE', 'SUSPENDED');
ALTER TABLE "public"."DriverProfile" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "DriverProfile" ALTER COLUMN "status" TYPE "DriverStatus_new" USING ("status"::text::"DriverStatus_new");
ALTER TYPE "DriverStatus" RENAME TO "DriverStatus_old";
ALTER TYPE "DriverStatus_new" RENAME TO "DriverStatus";
DROP TYPE "public"."DriverStatus_old";
ALTER TABLE "DriverProfile" ALTER COLUMN "status" SET DEFAULT 'PENDING_ONBOARDING';
COMMIT;

-- DropIndex
DROP INDEX "DriverProfile_isAvailable_idx";

-- DropIndex
DROP INDEX "UserDevice_token_key";

-- AlterTable
ALTER TABLE "DriverProfile" DROP COLUMN "isAvailable";

-- AlterTable
ALTER TABLE "UserDevice" DROP COLUMN "token",
ADD COLUMN     "fid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserDevice_fid_key" ON "UserDevice"("fid");
