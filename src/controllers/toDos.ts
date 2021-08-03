import { Request, Response } from "express";
import { offline as Database } from "../database";
import { v4 as uuidv4 } from "uuid";

export const getAllToDos = async (req: Request, res: Response) => {
  try {
    const todos = await Database.ToDos.getAllToDos();
    return res.status(200).send(todos);
  } catch (error) {
    return res.status(500).send({ message: "Unable to fetch records" });
  }
};

export const getToDoById = async (req: Request, res: Response) => {
  try {
    const toDo = await Database.ToDos.getToDoById(req.params.id);
    if (!toDo) {
      return res.status(404).send({ message: `Unable to find ToDo with id ${req.params.id}` });
    }
    return res.status(200).send(toDo);
  } catch (error) {
    return res.status(500).send({ message: `Error when trying to find ToDo with id ${req.params.id}` });
  }
};

export const updateToDo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    return res.status(201).send(await Database.ToDos.updateToDo(id, req.body));
  } catch (error) {
    return res.status(500).send({ message: "Unable to update ToDo" });
  }
};

export const createToDo = async (req: Request, res: Response) => {
  try {
    return res.status(201).send(await Database.ToDos.createToDo({ ...req.body, id: uuidv4() }));
  } catch (error) {
    return res.status(500).send({ message: "Unable to create ToDo" });
  }
};

export const deleteToDo = async (req: Request, res: Response) => {
  try {
    return res.status(201).send(await Database.ToDos.deleteToDo(req.body.id));
  } catch (error) {
    return res.status(500).send({ message: `Error when trying to delete ToDo with id ${req.params.id}` });
  }
};
