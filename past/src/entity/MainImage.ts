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
  readonly id!: number;

  @Column({ readonly: true })
  url!: string;

  @Column({ readonly: true })
  recipeId!: number;

  @ManyToOne((type) => Recipe, (recipe) => recipe.mainImages) // relationを表現しているだけで、fieldとはならない
  @JoinColumn({ name: 'recipeId' }) // recipeIdがforeignキーとなることを表す。
  readonly recipe?: Recipe;

  constructor(properties: MainImageInitializationProperties) {
    super();
    Object.assign(this, properties);
  }
}

export type MainImageInitializationProperties = Omit<MainImage, 'id'>;
