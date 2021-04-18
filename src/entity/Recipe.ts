import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { MaterialImp } from '../entity/Material';

export interface RecipeType {
  name: string;
  image: string;
  materials: MaterialImp[];
  flow: string;
}

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany((type) => MaterialImp, (material) => material.recipe) // これはフォールドでなく、relationを表現しているだけ
  materials: MaterialImp[];

  @Column()
  flow: string;
}
