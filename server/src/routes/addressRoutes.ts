// src/routes/addressRoutes.ts
import { Router } from "express";
import { Address } from "../models/Address";
import { verifyToken } from "../middlewares/verify";

const router = Router();

// Create Address
router.post("/", verifyToken, async (req: any, res) => {
  const { street, city, state, zip } = req.body;
  try {
    const address = await Address.create({
      userId: req.userId,
      street,
      city,
      state,
      zip,
    });
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ error: "Error creating address." });
  }
});

// Get Addresses
router.get("/", verifyToken, async (req: any, res) => {
  const addresses = await Address.findAll({ where: { userId: req.userId } });
  res.json(addresses);
});

// Update Address
router.put("/:id", verifyToken, async (req: any, res) => {
  const { street, city, state, zip } = req.body;
  const { id } = req.params;

  try {
    const address = await Address.findOne({
      where: { id, userId: req.userId },
    });
    if (!address) return res.status(404).json({ error: "Address not found." });

    address.street = street;
    address.city = city;
    address.state = state;
    address.zip = zip;

    await address.save();
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: "Error updating address." });
  }
});

// Delete Address
router.delete("/:id", verifyToken, async (req: any, res) => {
  const { id } = req.params;
  const result = await Address.destroy({ where: { id, userId: req.userId } });

  if (result === 0)
    return res.status(404).json({ error: "Address not found." });
  res.sendStatus(204);
});

export default router;
