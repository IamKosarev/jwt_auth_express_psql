import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DataSource } from "typeorm";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transaction } from "./entities/Transaction";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const start = async () => {
   try {
      const dataSource = new DataSource({
         type: "postgres",
         host: process.env.POSTGRES_HOST,
         port: Number(process.env.POSTGRES_PORT),
         username: process.env.POSTGRES_USER,
         password: String(process.env.POSTGRES_PASSWORD),
         database: process.env.POSTGRES_DB,
         entities: [Client, Banker, Transaction],
         synchronize: true,
         logging: true,
      });

      const connection = await dataSource.initialize();


      console.log("connected to database");
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
   } catch (e) {
      console.log(e);
   }
};

start();