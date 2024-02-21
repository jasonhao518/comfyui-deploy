CREATE TABLE IF NOT EXISTS "comfyui_deploy"."quota" (
	"id" text PRIMARY KEY NOT NULL,
	"credit" integer DEFAULT 0 NOT NULL,
	"rate" integer DEFAULT 0 NOT NULL,
	"plan" text DEFAULT 'free' NOT NULL,
	"gemini" boolean DEFAULT false NOT NULL,
	"dalle" boolean DEFAULT false NOT NULL,
	"beta" boolean DEFAULT false NOT NULL,
	"gpt4" boolean DEFAULT false NOT NULL,
	"stripe_current_period_end" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "comfyui_deploy"."checkpoints";--> statement-breakpoint
DROP TABLE "comfyui_deploy"."checkpoint_volume";