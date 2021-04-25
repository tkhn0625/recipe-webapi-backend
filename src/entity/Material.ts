import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class Material extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name!: string;

  @Column()
  amount!: string;

  @Column()
  calorie!: string;

  @Column()
  recipeId!: number;

  @ManyToOne((type) => Recipe, (recipe) => recipe.materials) // relationを表現しているだけで、fieldとはならない
  @JoinColumn({ name: 'recipeId' }) // recipeIdがforeignキーとなることを表す。
  recipe!: Recipe;
}
