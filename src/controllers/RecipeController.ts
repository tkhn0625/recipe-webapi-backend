import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Recipe } from '../entity/Recipe';

export class RecipeController {
  private recipeRepository = getRepository(Recipe);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.recipeRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.recipeRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.recipeRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let recipeToRemove = await this.recipeRepository.findOne(request.params.id);
    await this.recipeRepository.remove(recipeToRemove!);
  }
}
