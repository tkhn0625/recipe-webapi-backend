import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  Entity,
} from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class MainImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url!: string;

  @Column()
  recipeId!: number;

  @ManyToOne((type) => Recipe, (recipe) => recipe.mainImages) // relationを表現しているだけで、fieldとはならない
  @JoinColumn({ name: 'recipeId' }) // recipeIdがforeignキーとなることを表す。
  recipe!: Recipe;
}
