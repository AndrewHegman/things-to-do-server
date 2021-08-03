import express from "express";
import { getAllToDos, getToDoById, updateToDo, createToDo, deleteToDo } from "../controllers/toDos";
const router = express.Router();

/* GET users listing. */
router.get("/", getAllToDos);
router.get("/:id", getToDoById);
router.put("/:id", updateToDo);
router.post("/", createToDo);
router.delete("/:id", deleteToDo);
export { router };
