CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"content" text NOT NULL,
	"emotion_level" integer NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_info" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"user_name" text NOT NULL,
	"avatar_url" text,
	"about_me" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_user_id_user_info_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_info"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;