import { Connection, getConnection, getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { RecipeType, Recipe } from '../entity/Recipe';
import { MaterialImp } from '../entity/Material';

export class RecipeController {
  private recipeRepository = getRepository(Recipe);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.recipeRepository.find({ relations: ['materials'] });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const recipeId = request.params.id;
    return this.recipeRepository.find({
      where: { id: recipeId },
      relations: ['materials'],
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { name, image, flow, materials } = request.body as RecipeType;
    const recipe = await this.recipeRepository.find({ where: { name } });
    if (recipe.length) {
      //すでにユーザーが登録済の場合
      console.log('レシピを登録済みです。');
    } else {
      //ユーザーが未登録の場合
      const newRecipe = await this.recipeRepository
        .create({ name: name, image: image, flow: flow })
        .save();
      console.log('新しいレシピを登録しました。');
      for (let material of materials) {
        await MaterialImp.create({
          name: material.name,
          amount: material.amount,
          calorie: material.calorie,
          recipeId: newRecipe.id,
        }).save();
        console.log('材料を登録しました。');
      }
    }

    return await this.recipeRepository.find({ relations: ['materials'] });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let recipeToRemove = await this.recipeRepository.findOne(request.params.id);
    await this.recipeRepository.remove(recipeToRemove!);
  }
}
