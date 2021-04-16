import Router from 'express';
import { createRecipe, getRecipes, updateRecipe, deleteRecipe } from '../controllers/recipes';

const router = Router();

router.get('/', getRecipes);

router.post('/', createRecipe);

router.patch('/:id', updateRecipe);

router.delete('/:id',deleteRecipe);

export default router;
