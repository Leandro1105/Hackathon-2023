import {MigrationInterface, QueryRunner} from "typeorm";

export class init1626737786922 implements MigrationInterface {
    name = 'init1626737786922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "active_session" ("id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(), "token" text NOT NULL, "userId" text NOT NULL, "date" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(), "username" text NOT NULL, "email" text, "password" text, "user_role" varchar, "date" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(), "name" text NOT NULL, "date" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP))`)
        await queryRunner.query(`INSERT INTO role ("id", "name") VALUES(1, 'admin')`)
        await queryRunner.query(`INSERT INTO role ("id", "name") VALUES(2, 'user')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "active_session"`);
    }

}
