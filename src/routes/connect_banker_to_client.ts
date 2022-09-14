import express from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionTypes } from "../entities/Transaction";
import { Banker } from "../entities/Banker";

const router = express.Router();

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
   const { bankerId, clientId } = req.params

   const client = await Client.findOne({ where: { id: parseInt(clientId, 10) } });
   const banker = await Banker.findOne({ where: { id: parseInt(bankerId, 10) } });

   if (!banker || !client) {
      return res.json({
         message: "banker or client not found"
      })
   }

   // Can do with client as well, but Banker already has @JoinTable
   banker.clients = [
      client
   ]

   await banker.save()

   return res.json({
      message: "banker connected to client"
   })

});

export { router as connectBankerToClient };