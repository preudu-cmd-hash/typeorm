import "reflect-metadata";
import express, { type Application } from "express";
import { AppDataSource } from "./data-source";
import { userRouter } from "./routes/userRoutes";
import { postRouter } from "./routes/postRoutes";

const app: Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado");
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar ao banco", error));
