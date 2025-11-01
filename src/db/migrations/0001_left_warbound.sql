CREATE TYPE "public"."access_types" AS ENUM('public', 'private');--> statement-breakpoint
ALTER TABLE "articles" DROP CONSTRAINT "articles_user_id_user_info_id_fk";
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;