import { query } from "express";
import { pool } from "../db/index.js";

export async function getShoppingList() {
  const data = await pool.query("SELECT * FROM shopping;");
  console.log("The shopping list is", data.rows);
  return data.rows;
}

export async function postListItem(item, completed) {
  // const { item, completed } = listItem;
  const data = await pool.query(
    `INSERT INTO shopping (
      item,
      completed
    ) VALUES ($1,$2) RETURNING *;`,
    [item, completed]
  );
  const postedItem = data.rows[0];
  return postedItem;
}

export async function updateListItem(id, updated) {
  const result = await pool.query(
    `UPDATE shopping SET item = $1 WHERE id=$2 RETURNING *`,
    [updated.item, id]
  );
  const updatedItem = result.rows;
  return updatedItem;
}

export async function deleteItem(id) {
  const result = await pool.query(`DELETE FROM shopping WHERE id=$1`, [id]);
  const deletedItem = result.rows[0];
  return deletedItem;
}
