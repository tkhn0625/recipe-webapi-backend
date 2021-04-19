import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinColumn, BaseEntity } from 'typeorm';
import {Recipe } from './Recipe'

// export interface Material{
//   name: string;
//   amount: string;
//   calorie: string;
//   recipeId: number;
// }

@Entity()
export class MaterialImp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: string;

  @Column()
  calorie: string;

  @Column()
  recipeId: number;

  @ManyToOne((type) => Recipe, (recipe) => recipe.materials) // relationを表現しているだけで、fieldとはならない
  @JoinColumn({ name: 'recipeId' }) // recipeIdがforeignキーとなることを表す。
  recipe: Recipe;
}