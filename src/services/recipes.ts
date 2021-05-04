import { Service } from "typedi";
import { FindOneOptions, Repository, getRepository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Recipe } from "../models/recipe/Recipe";
import { Flow } from "../models/recipe/Flow";
import { MainImage } from "../models/recipe/MainImage";
import { Material } from "../models/recipe/Material";

@Service()
export default class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private readonly recipeRepository: Repository<Recipe>
    ) {}

    public async findAll(): Promise<Recipe[]> {
        console.log("Get All Recipe Name");
        return await this.recipeRepository.find({
            relations: ["mainImages"],
        });
    }

    public async findOne(id: string): Promise<Recipe[]> {
        return await this.recipeRepository.find({
            where: { id },
            relations: ["materials", "flows", "mainImages"],
        });
    }

    // @TODO Implement softRemove() with deleteDate time stamp
    public async deleteOne(id: string) {
        const deleteEntity = await this.recipeRepository.findOne({
            where: { id },
        });
        if (typeof deleteEntity !== "undefined") {
            await this.recipeRepository.remove(deleteEntity);
            return "Delete Seccessed" + " Recipe Title: " + deleteEntity.name;
        } else {
            return "Recipe cannot be found";
        }
    }

    public async save(inputRecipe: Recipe): Promise<Recipe> {
        try {
            const name = inputRecipe.name;
            const recipe = await this.recipeRepository.find({
                where: { name },
            });
            if (recipe.length) {
                throw new Error("Recipe cannot be created");
            } else {
                const newRecipe = await this.recipeRepository
                    .create({ name: name })
                    .save();
                for (let material of inputRecipe.materials) {
                    await Material.create({
                        name: material.name,
                        amount: material.amount,
                        calorie: material.calorie,
                        recipeId: newRecipe.id,
                    }).save();
                    console.log("材料を登録しました。");
                }
                for (let flow of inputRecipe.flows) {
                    await Flow.create({
                        flowNum: flow.flowNum,
                        text: flow.text,
                        recipeId: newRecipe.id,
                        imageUrl: flow.imageUrl ? flow.imageUrl : null,
                    }).save();
                    console.log("フローを登録しました。");
                }
                for (let mainImage of inputRecipe.mainImages) {
                    await MainImage.create({
                        url: mainImage.url,
                        recipeId: newRecipe.id,
                    }).save();
                    console.log("メイン写真を登録しました。");
                }

                // @TODO modify to refer db repositry value
                return inputRecipe;
            }
        } catch (error) {
            if (error.name === "PostgresError" && error.code === 11000) {
                // Duplicate username
                throw new Error("Recipe already exist!");
            }
            console.log(error);
            throw error;
        }
    }

    public async update(id: string, inputRecipe: Recipe) {
        try {
            return "Cannot use this api";
        } catch (error) {
            if (error.name === "PostgresError" && error.code === 11000) {
                // Duplicate username
                throw new Error("Recipe already exist!");
            }
            console.log(error);
            throw error;
        }
    }
}
