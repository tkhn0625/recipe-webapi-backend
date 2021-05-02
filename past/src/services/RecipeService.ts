import 'reflect-metadata';
import { Service, Inject } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Recipe } from '../entity/Recipe';
// import { OrmRepository } from 'typeorm-typedi-extensions';

// @Service()
// export default class RecipeService {
//   constructor(
//     private readonly recipeRepository: Repository<Recipe> //追加！
//   ) {}

//   public async getRecipeList() {
//     return this.recipeRepository.find({
//       relations: ['mainImages'],
//     });
//   }
// }
