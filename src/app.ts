import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import cors from 'cors';
import { Routes } from './routes/RecipeRoutes';

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    // リクエストボディをJson型で受け取れるようにする。
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
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
                ? res.status(200).json(result)
                : res.status(204).send('Contain null value')
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // options for cors midddleware
    const options: cors.CorsOptions = {
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
      ],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: 'http://localhost:3000',
      preflightContinue: false,
    };
    //use cors middleware
    app.use(cors(options));

    // start express server
    app.listen(3000);

    console.log(
      'Express server has started on port 3000. Open http://localhost:3000/recipes to see results'
    );
  })
  .catch((error) => console.log(error));
