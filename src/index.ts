import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DataSource } from "typeorm";
import { Token } from "./models/token_model";
import { User } from "./models/user_model";
import { router } from "./router";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1", router);

const start = async () => {
   try {
      const dataSource = new DataSource({
         type: "postgres",
         host: process.env.POSTGRES_HOST,
         port: Number(process.env.POSTGRES_PORT),
         username: process.env.POSTGRES_USER,
         password: String(process.env.POSTGRES_PASSWORD),
         database: process.env.POSTGRES_DB,
         entities: [User, Token],
         synchronize: true,
         logging: true,
      });

      const connection = await dataSource.initialize();

      console.log(`connected to database ${process.env.POSTGRES_DB}`);
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
   } catch (e) {
      console.log(e);
   }
};

start();