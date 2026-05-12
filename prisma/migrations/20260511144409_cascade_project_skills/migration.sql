-- DropForeignKey
ALTER TABLE "project_skills" DROP CONSTRAINT "project_skills_project_id_fkey";

-- DropForeignKey
ALTER TABLE "project_skills" DROP CONSTRAINT "project_skills_skill_id_fkey";

-- AddForeignKey
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
