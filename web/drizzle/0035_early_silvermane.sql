ALTER TABLE "comfyui_deploy"."api_keys" DROP CONSTRAINT "api_keys_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "comfyui_deploy"."deployments" DROP CONSTRAINT "deployments_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "comfyui_deploy"."machines" DROP CONSTRAINT "machines_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "comfyui_deploy"."workflow_run_outputs" DROP CONSTRAINT "workflow_run_outputs_run_id_workflow_runs_id_fk";
--> statement-breakpoint
ALTER TABLE "comfyui_deploy"."workflow_runs" DROP CONSTRAINT "workflow_runs_workflow_version_id_workflow_versions_id_fk";
--> statement-breakpoint
ALTER TABLE "comfyui_deploy"."workflows" DROP CONSTRAINT "workflows_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "comfyui_deploy"."workflow_versions" DROP CONSTRAINT "workflow_versions_workflow_id_workflows_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comfyui_deploy"."api_keys" ADD CONSTRAINT "api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "comfyui_deploy"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comfyui_deploy"."deployments" ADD CONSTRAINT "deployments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "comfyui_deploy"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comfyui_deploy"."machines" ADD CONSTRAINT "machines_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "comfyui_deploy"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comfyui_deploy"."workflow_run_outputs" ADD CONSTRAINT "workflow_run_outputs_run_id_workflow_runs_id_fk" FOREIGN KEY ("run_id") REFERENCES "comfyui_deploy"."workflow_runs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comfyui_deploy"."workflow_runs" ADD CONSTRAINT "workflow_runs_workflow_version_id_workflow_versions_id_fk" FOREIGN KEY ("workflow_version_id") REFERENCES "comfyui_deploy"."workflow_versions"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comfyui_deploy"."workflows" ADD CONSTRAINT "workflows_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "comfyui_deploy"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comfyui_deploy"."workflow_versions" ADD CONSTRAINT "workflow_versions_workflow_id_workflows_id_fk" FOREIGN KEY ("workflow_id") REFERENCES "comfyui_deploy"."workflows"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
