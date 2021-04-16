import express, { Request, Response, NextFunction } from 'express';
import recipeRoutes from './routes/recipes';
import { json } from 'body-parser';

const app = express();

// リクエストボディをJson型で受け取れるようにする。
app.use(json());

// /recipes へのリクエストは全てrecipeRoutesで処理を行う。
app.use('/recipes', recipeRoutes);

//　エラー時の処理
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
