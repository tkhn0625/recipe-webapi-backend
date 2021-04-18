import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationNameHere1618721792099 implements MigrationInterface {
    name = 'migrationNameHere1618721792099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "flow" character varying NOT NULL, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recipe"`);
    }

}
