import express from "express";
import { getAllCategories, getCategoryById, updateCategory, createCategory, deleteCategory } from "../controllers/categories";
const router = express.Router();

/* GET users listing. */
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);
export { router };
