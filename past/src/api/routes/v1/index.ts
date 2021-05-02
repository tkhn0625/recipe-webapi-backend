import { Router } from 'express';
import recipe from './recipe/Recipe';

// guaranteed to get dependencies
// export default () => {
//   const app = Router();
//   recipe(app);

//   return app;
// };

const router = Router();
router.use('/recipes', recipe);

export default router;
