import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DataSource } from "typeorm";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transaction } from "./entities/Transaction";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import { connectBankerToClient } from "./routes/connect_banker_to_client";
import { deleteClientRouter } from "./routes/delete_client";
import { getClientById } from "./routes/get_client_by_id";

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
         logging: false,
      });
      const connection = await dataSource.initialize();

      app.use(createClientRouter);
      app.use(createBankerRouter);
      app.use(createTransactionRouter);
      app.use(connectBankerToClient);
      app.use(deleteClientRouter);
      app.use(getClientById);

      console.log("connected to database");
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
   } catch (e) {
      console.log(e);
   }
};

start();
