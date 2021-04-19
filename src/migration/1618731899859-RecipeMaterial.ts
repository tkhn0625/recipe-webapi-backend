import {MigrationInterface, QueryRunner} from "typeorm";

export class RecipeMaterial1618731899859 implements MigrationInterface {
    name = 'RecipeMaterial1618731899859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "material_imp" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "amount" character varying NOT NULL, "calorie" character varying NOT NULL, "recipeId" integer NOT NULL, CONSTRAINT "PK_2f4228970063edb4094a9746a4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "material_imp" ADD CONSTRAINT "FK_de55193655691757e6048d93720" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "material_imp" DROP CONSTRAINT "FK_de55193655691757e6048d93720"`);
        await queryRunner.query(`DROP TABLE "material_imp"`);
    }

}
