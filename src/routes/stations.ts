import express from "express";
import { PrismaClient } from "../generated/prisma/client";
const router = express.Router();

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const stations = await prisma.station.findMany({
    include: {
      sensors: true,
    },
  });
  res.json(stations);
});

export default router;
