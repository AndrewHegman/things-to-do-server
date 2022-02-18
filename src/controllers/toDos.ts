import { Request, Response } from "express";
import { offline as Database } from "../database";
import { online as oDatabase } from "../database";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";

export const getAllToDos = async (req: Request, res: Response) => {
  try {
    let todos;
    if (req.query.category) {
      if (typeof req.query.category !== "string") {
        return res
          .status(500)
          .send({ message: `Unable to fetch todos. Category must be a string, got ${typeof req.query.category}` });
      }
      todos = await oDatabase.Things.getAllByCategory(new ObjectId(req.query.category));
    } else {
      todos = await oDatabase.Things.getAll();
    }
    return res.status(200).send(todos);
  } catch (error) {
    return res.status(500).send({ message: `Unable to fetch things. ${error}` });
  }
};

export const getToDoById = async (req: Request, res: Response) => {
  try {
    const toDo = await oDatabase.Things.getById(new ObjectId(req.params.id));
    if (!toDo) {
      return res.status(404).send({ message: `Unable to find thing with id ${req.params.id}` });
    }
    return res.status(200).send(toDo);
  } catch (error) {
    return res.status(500).send({ message: `Error when trying to find thing with id ${req.params.id}` });
  }
};

export const updateToDo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    return res.status(201).send(await oDatabase.Things.update(new ObjectId(id), req.body));
  } catch (error) {
    return res.status(500).send({ message: `Unable to update thing. ${error}` });
  }
};

export const createToDo = async (req: Request, res: Response) => {
  try {
    return res.status(201).send(await oDatabase.Things.create(req.body));
  } catch (error) {
    return res.status(500).send({ message: `Unable to create ToDo: ${error}` });
  }
};

export const deleteToDo = async (req: Request, res: Response) => {
  try {
    return res.status(200).send(await oDatabase.Things.delete(new ObjectId(req.params.id)));
  } catch (error) {
    return res.status(500).send({ message: `Error when trying to delete ToDo with id ${req.params.id}` });
  }
};
