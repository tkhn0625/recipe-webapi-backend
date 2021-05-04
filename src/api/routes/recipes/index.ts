import { celebrate, Joi } from "celebrate";
import { NextFunction, Request, Response, Router } from "express";
import { Container } from "typedi";
import { Recipe } from "../../../models/recipe/Recipe";
import RecipeService from "../../../services/recipes";

const route = Router();

// @TODO Make Routes like this
// export class AuthRoutes {
//   constructor(@Inject(AuthService) private authService: AuthService) {}
// }

export default (app) => {
    app.use("/recipes", route);

    route.get(
        "/list",
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const recipeServiceInstance = Container.get(RecipeService);
                const result = await recipeServiceInstance.findAll();
                return res.json(result).status(202);
            } catch (e) {
                console.log(" error ", e);
                return next(e);
            }
        }
    );

    route.get(
        "/:id",
        celebrate({
            params: Joi.object({
                id: Joi.number().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const recipeId = req.params.id;
                const recipeServiceInstance = Container.get(RecipeService);
                const result = await recipeServiceInstance.findOne(recipeId);
                return res.json(result).status(202);
            } catch (e) {
                console.log(" error ", e);
                return next(e);
            }
        }
    );

    route.post(
        "/register",
        celebrate({
            body: Joi.object({
                name: Joi.string().min(2).max(50).required(),
                materials: Joi.array().items(
                    Joi.object().keys({
                        name: Joi.string().required(),
                        amount: Joi.string().required(),
                        calorie: Joi.string(),
                    })
                ),
                flows: Joi.array().items(
                    Joi.object().keys({
                        flowNum: Joi.number().required(),
                        text: Joi.string().min(2).max(200).required(),
                        imageUrl: Joi.string(),
                    })
                ),
                mainImages: Joi.array().items(
                    Joi.object().keys({
                        url: Joi.string().required(),
                    })
                ),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const recipeServiceInstance = Container.get(RecipeService);
                const registredRecipe = await recipeServiceInstance.save(
                    req.body as Recipe
                );
                return res.json(registredRecipe).status(201);
            } catch (e) {
                console.log(" error ", e);
                return next(e);
            }
        }
    );

    route.patch(
        "/update/:id",
        celebrate({
            params: Joi.object({
                id: Joi.number().required(),
            }),
            body: Joi.object({
                name: Joi.string().min(2).max(50).required(),
                materials: Joi.array().items(
                    Joi.object().keys({
                        name: Joi.string().required(),
                        amount: Joi.string().required(),
                        calorie: Joi.string(),
                    })
                ),
                flows: Joi.array().items(
                    Joi.object().keys({
                        flowNum: Joi.number().required(),
                        text: Joi.string().min(2).max(200).required(),
                        imageUrl: Joi.string(),
                    })
                ),
                mainImages: Joi.array().items(
                    Joi.object().keys({
                        url: Joi.string().required(),
                    })
                ),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const recipeServiceInstance = Container.get(RecipeService);
                const registredRecipe = await recipeServiceInstance.update(
                    req.params.id,
                    req.body as Recipe
                );
                return res.json(registredRecipe).status(201);
            } catch (e) {
                console.log(" error ", e);
                return next(e);
            }
        }
    );

    route.delete(
        "/:id",
        celebrate({
            params: Joi.object({
                id: Joi.number().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const recipeId = req.params.id;
                const recipeServiceInstance = Container.get(RecipeService);
                const result = await recipeServiceInstance.deleteOne(recipeId);
                return res.json(result).status(202);
            } catch (e) {
                console.log(" error ", e);
                return next(e);
            }
        }
    );
};
