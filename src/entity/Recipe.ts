import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Material } from '../entity/Material';
import { MainImage } from '../entity/MainImage';
import { Flow } from '../entity/Flow';

// export interface RecipeType {
//   name: string;
//   image: string;
//   materials: Material[];
//   flow: string;
// }

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name!: string;

  @OneToMany((type) => Material, (material) => material.recipe) // これはフォールドでなく、relationを表現しているだけ
  materials!: Material[];

  @OneToMany((type) => Flow, (flow) => flow.recipe) // これはフォールドでなく、relationを表現しているだけ
  flows!: Flow[];

  @OneToMany((type) => MainImage, (mainImage) => mainImage.recipe) // これはフォールドでなく、relationを表現しているだけ
  mainImages!: MainImage[];
}
