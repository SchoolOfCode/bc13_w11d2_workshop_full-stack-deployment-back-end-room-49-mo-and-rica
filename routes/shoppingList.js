import express from "express";
import { getShoppingList, postListItem, updateListItem, deleteItem } from "../models/shoppingList.js";

const router = express.Router();

/* GET shopping list. */
router.get("/", async (req, res) => {
  console.log("Jordan is amazing")
  const data = await getShoppingList();
  res.json({ success: true, payload: data });
});

router.post("/", async (req, res) => {
  const item = req.body.item;
  const completed = req.body.completed;
  const result = await postListItem(item, completed);
  res.status(201).json({ success: true, payload: result });
});

router.patch("/:id", async(req, res)=> {
  const updated = req.body
  const id = req.params.id
const result = await updateListItem(id, updated);
res.status(200).json({success: true, payload: result})
})

router.delete("/:id", async (req, res)=>{
  const id = req.params.id
  const result = await deleteItem(id);
  res.status(200).json({success: true, payload: result})
})

export default router;
