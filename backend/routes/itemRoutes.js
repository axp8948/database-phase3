import express from "express";
import db from "../db/connection.js";

const router = express.Router();

//Q1: Get item by ID or Name
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

//Q2: Insert new item (Dynamic)
router.post("/item", (req, res) => {
  const { iId, Iname, Sprice, Idescription } = req.body;

  if (!iId || !Iname || !Sprice || !Idescription) {
    return res.status(400).json({ message: "Please provide all item details." });
  }

  const query = "INSERT INTO ITEM (iId, Iname, Sprice, Idescription) VALUES (?, ?, ?, ?)";
  db.query(query, [iId, Iname, Sprice, Idescription], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Item inserted successfully." });
  });
});

//Q3: Update any item dynamically (name + description)
router.put("/item/update", (req, res) => {
  const { oldName, newName, newDesc } = req.body;

  if (!oldName) {
    return res.status(400).json({ message: "Please provide the current item name." });
  }

  if (!newName && !newDesc) {
    return res.status(400).json({ message: "Please provide at least one field to update." });
  }

  let query = "UPDATE ITEM SET ";
  const values = [];

  if (newName) {
    query += "Iname = ?";
    values.push(newName);
  }

  if (newDesc) {
    if (newName) query += ", "; // add comma if both are updated
    query += "Idescription = ?";
    values.push(newDesc);
  }

  query += " WHERE Iname = ?";
  values.push(oldName);

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found." });
    }
    res.json({ message: "Item updated successfully." });
  });
});


//Q4: Delete any item dynamically
router.delete("/item/delete", (req, res) => {
  const { Iname } = req.body;

  if (!Iname) {
    return res.status(400).json({ message: "Please provide the item name to delete." });
  }

  const query = "DELETE FROM ITEM WHERE Iname = ?";
  db.query(query, [Iname], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found." });
    }
    res.json({ message: "Item deleted successfully." });
  });
});

export default router;
