import {
  Entity,
  BaseEntity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from '../entity/Recipe';

@Entity()
export class Flow extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  flowNum!: number;

  @Column()
  text!: string;

  @Column({ nullable: true, type: 'varchar', width: 64 })
  imageUrl!: string | null;

  @Column({ readonly: true })
  recipeId!: number;

  @ManyToOne((type) => Recipe, (recipe) => recipe.flows) // relationを表現しているだけで、fieldとはならない
  @JoinColumn({ name: 'recipeId' }) // recipeIdがforeignキーとなることを表す。
  readonly recipe!: Recipe;

  constructor(properties: FlowInitializationProperties) {
    super();
    Object.assign(this, properties);
  }
}

export type FlowInitializationProperties = Omit<Flow, 'id'>;
