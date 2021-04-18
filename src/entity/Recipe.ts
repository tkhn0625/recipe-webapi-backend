import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  flow: string;

  // @Columns
  // process: string[];

  constructor(name: string, image: string, flow: string) {
    this.name = name;
    this.image = image;
    this.flow = flow;
  }
}
