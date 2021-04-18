import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { Routes } from './routes/RecipeRoutes';

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    // リクエストボディをJson型で受け取れるようにする。
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(
      (route: {
        method: string | number;
        route: any;
        controller: any;
        action: string | number;
      }) => {
        (app as any)[route.method](
          route.route,
          (req: Request, res: Response, next: Function) => {
            const result = new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            if (result instanceof Promise) {
              result.then((result) =>
                result !== null && result !== undefined
                  ? res.send(result)
                  : undefined
              );
            } else if (result !== null && result !== undefined) {
              res.json(result);
            }
          }
        );
      }
    );

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    //　エラー時の処理
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json({ message: err.message });
    });

    console.log(
      'Express server has started on port 3000. Open http://localhost:3000/recipes to see results'
    );
  })
  .catch((error) => console.log(error));

// // /recipes へのリクエストは全てrecipeRoutesで処理を行う。
// app.use('/recipes', recipeRoutes);
