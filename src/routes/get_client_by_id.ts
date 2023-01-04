import express from "express";
import { Client } from "../entities/Client";

const router = express.Router();

router.get("/api/client/:clientId", async (req, res) => {
    const {
        clientId
    } = req.params

    const client = await Client.findOne({ where:
            { id: Number(clientId) }
    })

    return res.json(client)
});

export {
    router as getClientById
};