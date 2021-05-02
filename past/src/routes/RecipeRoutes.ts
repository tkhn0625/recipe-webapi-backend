import { RecipeController } from '../controllers/RecipeController';

export const Routes = [
  {
    method: 'get',
    route: '/recipes',
    controller: RecipeController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/recipes/:id',
    controller: RecipeController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/recipes',
    controller: RecipeController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/recipes/:id',
    controller: RecipeController,
    action: 'remove',
  },
];
