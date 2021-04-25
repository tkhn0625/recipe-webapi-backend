import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Material } from '../entity/Material';
import { MainImage } from '../entity/MainImage';
import { Flow } from '../entity/Flow';

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ readonly: true })
  name!: string;

  @CreateDateColumn({ readonly: true, precision: 0, default: () => 'NOW()' })
  createdAt?: Date;

  @UpdateDateColumn({ readonly: true, precision: 0, default: () => 'NOW()' })
  updatedAt?: Date;

  @OneToMany((type) => Material, (material) => material.recipe) // これはフォールドでなく、relationを表現しているだけ
  materials!: Material[];

  @OneToMany((type) => Flow, (flow) => flow.recipe) // これはフォールドでなく、relationを表現しているだけ
  flows!: Flow[];

  @OneToMany((type) => MainImage, (mainImage) => mainImage.recipe) // これはフォールドでなく、relationを表現しているだけ
  mainImages!: MainImage[];

  constructor(properties: RecipeInitializationProperties) {
    super();
    Object.assign(this, properties);
  }
}

export type RecipeInitializationProperties = Omit<Recipe, 'id'>;
