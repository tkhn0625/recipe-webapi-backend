import { RequestHandler } from 'express';
import { Recipe } from '../models/recipe';

const RECIPES: Recipe[] = [];
var count = 0;

export const createRecipe: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const id = ++count;
  const newRecipe = new Recipe(id.toString(), text);
  RECIPES.push(newRecipe);

  res.status(201).json({
    message: '新しいレシピを作成しました。',
    createdRecipe: newRecipe,
  });
};

export const getRecipes: RequestHandler = (req, res, next) => {
  res.status(210).json({
    recipes: RECIPES,
  });
};

// ジェネリクスにidの型を指定することで、paramsの自動補間ができる。
export const updateRecipe: RequestHandler<{ id: string }> = (
  req,
  res,
  next
) => {
  const recipeId = req.params.id;
  const updateText = (req.body as { text: string }).text;

  // 更新対象のidのインデックス番号の取得
  const recipeIndex = RECIPES.findIndex((recipe) => recipe.id === recipeId);
  if (recipeIndex < 0) {
    throw new Error('対象のレシピが見つかりませんでした。');
  }
  RECIPES[recipeIndex] = new Recipe(recipeId, updateText);

  res.status(201).json({
    message: '既存レシピを更新しました。',
    updatedRecipe: RECIPES[recipeIndex],
  });
};

// ジェネリクスにidの型を指定することで、paramsの自動補間ができる。
export const deleteRecipe: RequestHandler<{ id: string }> = (
  req,
  res,
  next
) => {
  const recipeId = req.params.id;

  // 更新対象のidのインデックス番号の取得
  const recipeIndex = RECIPES.findIndex((recipe) => recipe.id === recipeId);
  if (recipeIndex < 0) {
    throw new Error('対象のレシピが見つかりませんでした。');
  }

  RECIPES.splice(recipeIndex, 1);

  res.status(201).json({
    message: '既存レシピを削除しました。',
  });
};
