import 'reflect-metadata';
import { Router, Request, Response } from 'express';
import { Container, Inject } from 'typedi';
import { BadRequestError } from '../../../../core/ApiError';
import { SuccessResponse } from '../../../../core/ApiResponse';
// import RecipeService from '../../../../services/RecipeService';

const route = Router();
// export default (app: Router) => {
// app.use('/recipes', route);
// Container.set({ id: RecipeService, type: RecipeService });
route.get('/recipes', async (req: Request, res: Response) => {
  // const recipeServiceInstance = Container.get(RecipeService);
  // const recipes = recipeServiceInstance.getRecipeList();
  // if (!recipes) throw new BadRequestError('Recipe not registered');
  // return new SuccessResponse('success', recipes).send(res);
});

// route.get('/:id',(req: Request, res: Response) => {
//   return res.json({ user: req.currentUser }).status(200);
// });

// route.post('',(req: Request, res: Response) => {
//   return res.json({ user: req.currentUser }).status(200);
// });

// route.delete('/:id',(req: Request, res: Response) => {
//   return res.json({ user: req.currentUser }).status(200);
// });
// };

export default route;
