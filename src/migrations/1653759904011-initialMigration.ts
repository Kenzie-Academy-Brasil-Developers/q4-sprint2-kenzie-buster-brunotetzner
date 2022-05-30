import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1653759904011 implements MigrationInterface {
    name = 'initialMigration1653759904011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "stock" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_4dec617cf1a3212b972a0ea0a7a" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "dvds" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "cartUuid" uuid, "stockUuid" uuid, CONSTRAINT "REL_9ccb4c2c8ffde820b0b1de9ce5" UNIQUE ("stockUuid"), CONSTRAINT "PK_efe60a2cea0e03809c699ed9bf1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" integer NOT NULL, "paid" boolean NOT NULL DEFAULT false, "userUuid" uuid, CONSTRAINT "REL_a2dfa5131b9131ceb883a03820" UNIQUE ("userUuid"), CONSTRAINT "PK_f866679bf24f872d7976c3bd833" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_ab0c8a4c376ae650b1f9adfcdd8" FOREIGN KEY ("cartUuid") REFERENCES "carts"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_9ccb4c2c8ffde820b0b1de9ce59" FOREIGN KEY ("stockUuid") REFERENCES "stock"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_a2dfa5131b9131ceb883a03820a" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_a2dfa5131b9131ceb883a03820a"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_9ccb4c2c8ffde820b0b1de9ce59"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_ab0c8a4c376ae650b1f9adfcdd8"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "dvds"`);
        await queryRunner.query(`DROP TABLE "stock"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
