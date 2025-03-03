import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostTable1741037693940 implements MigrationInterface {
	name = "CreatePostTable1741037693940";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "slug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_cd1bddce36edc3e766798eab37" ON "post" ("slug") `,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`DROP INDEX "public"."IDX_cd1bddce36edc3e766798eab37"`,
		);
		await queryRunner.query(`DROP TABLE "post"`);
	}
}
