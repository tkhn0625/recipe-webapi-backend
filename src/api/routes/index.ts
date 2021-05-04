import { Router } from "express";
import auth from "./auth";
import users from "./users";
import recipes from "./recipes";

const router = Router();
auth(router);
users(router);
recipes(router);

export default router;
