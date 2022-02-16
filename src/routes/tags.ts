import express from "express";
import { getAllTags, getTagById, updateTag, createTag, deleteTag } from "../controllers/tags";
const router = express.Router();

/* GET users listing. */
router.get("/", getAllTags);
router.get("/:id", getTagById);
router.put("/:id", updateTag);
router.post("/", createTag);
router.delete("/:id", deleteTag);
export { router };
