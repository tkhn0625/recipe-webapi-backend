import { Connection, getConnection, getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Recipe } from '../entity/Recipe';
import { Material } from '../entity/Material';
import { Flow } from '../entity/Flow';
import { MainImage } from '../entity/MainImage';

export class RecipeController {
  private recipeRepository = getRepository(Recipe);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.recipeRepository.find({
      relations: ['materials', 'flows', 'mainImages'],
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const recipeId = request.params.id;
    return this.recipeRepository.find({
      where: { id: recipeId },
      relations: ['materials', 'flows', 'mainImages'],
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { name, materials, flows, mainImages } = request.body as Recipe;
    const recipe = await this.recipeRepository.find({ where: { name } });
    if (recipe.length) {
      //すでにユーザーが登録済の場合
      console.log('レシピを登録済みです。');
    } else {
      //ユーザーが未登録の場合
      const newRecipe = await this.recipeRepository
        .create({ name: name })
        .save();
      console.log('新しいレシピを登録しました。');
      for (let material of materials) {
        await Material.create({
          name: material.name,
          amount: material.amount,
          calorie: material.calorie,
          recipeId: newRecipe.id,
        }).save();
        console.log('材料を登録しました。');
      }
      for (let flow of flows) {
        await Flow.create({
          flowNum: flow.flowNum,
          text: flow.text,
          recipeId: newRecipe.id,
          imageUrl: flow.imageUrl ? flow.imageUrl : null,
        }).save();
        console.log('フローを登録しました。');
      }
      for (let mainImage of mainImages) {
        await MainImage.create({
          url: mainImage.url,
          recipeId: newRecipe.id,
        }).save();
        console.log('メイン写真を登録しました。');
      }
    }
    return await this.recipeRepository.find({
      relations: ['materials', 'flows', 'mainImages'],
    });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let recipeToRemove = await this.recipeRepository.findOne(request.params.id);
    await this.recipeRepository.remove(recipeToRemove!);
  }
}
