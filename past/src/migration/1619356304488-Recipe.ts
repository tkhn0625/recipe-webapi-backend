import {MigrationInterface, QueryRunner} from "typeorm";

export class Recipe1619356304488 implements MigrationInterface {
    name = 'Recipe1619356304488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "createdAt" TIMESTAMP(0) NOT NULL DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT NOW()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "createdAt"`);
    }

}
