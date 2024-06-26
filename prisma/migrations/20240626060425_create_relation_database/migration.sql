-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_id_user_fkey";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "id_user" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
