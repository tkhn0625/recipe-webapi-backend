import {MigrationInterface, QueryRunner} from "typeorm";

export class Recipe1619346703945 implements MigrationInterface {
    name = 'Recipe1619346703945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "flow" ("id" SERIAL NOT NULL, "flowNum" integer NOT NULL, "text" character varying NOT NULL, "imageUrl" character varying, "recipeId" integer NOT NULL, CONSTRAINT "PK_6c2ad4a3e86394cd9bb7a80a228" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "flow" ADD CONSTRAINT "FK_fdfd4009f7ddc7172a66ffdb570" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flow" DROP CONSTRAINT "FK_fdfd4009f7ddc7172a66ffdb570"`);
        await queryRunner.query(`DROP TABLE "flow"`);
    }

}
