import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// Q1: Get item by ID or Name
router.get("/item", (req, res) => {
  const { id, name } = req.query;

  let query = "SELECT * FROM ITEM WHERE ";
  let value;

  if (id) {
    query += "iId = ?";
    value = [id];
  } else if (name) {
    query += "Iname = ?";
    value = [name];
  } else {
    return res.status(400).json({ message: "Please provide id or name" });
  }

  db.query(query, value, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Q2: Insert new item
router.post("/item", (req, res) => {
  const { iId, Iname, Sprice, Idescription } = req.body;
  const query = "INSERT INTO ITEM (iId, Iname, Sprice, Idescription) VALUES (?, ?, ?, ?)";
  db.query(query, [iId, Iname, Sprice, Idescription], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Item inserted successfully" });
  });
});

// Q3: Update "Frozen Broccoli" → "Organic Fresh Broccoli"
router.put("/item/update", (req, res) => {
  const query = "UPDATE ITEM SET Iname = 'Organic Fresh Broccoli' WHERE Iname = 'Frozen Broccoli'";
  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Item updated successfully" });
  });
});

// Q4: Delete "Organic Fresh Broccoli"
router.delete("/item/delete", (req, res) => {
  const query = "DELETE FROM ITEM WHERE Iname = 'Organic Fresh Broccoli'";
  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Item deleted successfully" });
  });
});

export default router;
