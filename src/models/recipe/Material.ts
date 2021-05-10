import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
export class Material extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column({ readonly: true })
    name!: string;

    @Column()
    amount!: string;

    @Column()
    calorie!: string;

    @Column({ readonly: true })
    recipeId!: number;

    @ManyToOne((type) => Recipe, (recipe) => recipe.materials, {
        onDelete: "CASCADE",
    }) // relationを表現しているだけで、fieldとはならない
    @JoinColumn({ name: "recipeId" }) // recipeIdがforeignキーとなることを表す。
    readonly recipe!: Recipe;

    constructor(properties: MaterialInitializationProperties) {
        super();
        Object.assign(this, properties);
    }
}

export type MaterialInitializationProperties = Omit<Material, "id">;
