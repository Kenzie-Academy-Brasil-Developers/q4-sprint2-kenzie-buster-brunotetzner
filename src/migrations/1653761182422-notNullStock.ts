import { MigrationInterface, QueryRunner } from "typeorm";

export class notNullStock1653761182422 implements MigrationInterface {
    name = 'notNullStock1653761182422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_9ccb4c2c8ffde820b0b1de9ce59"`);
        await queryRunner.query(`ALTER TABLE "dvds" ALTER COLUMN "stockUuid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_9ccb4c2c8ffde820b0b1de9ce59" FOREIGN KEY ("stockUuid") REFERENCES "stock"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_9ccb4c2c8ffde820b0b1de9ce59"`);
        await queryRunner.query(`ALTER TABLE "dvds" ALTER COLUMN "stockUuid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_9ccb4c2c8ffde820b0b1de9ce59" FOREIGN KEY ("stockUuid") REFERENCES "stock"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
