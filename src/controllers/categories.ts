import { Request, Response } from "express";
import { online as Database } from "../database";
import { ObjectId } from "mongodb";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Database.Categories.getAll();
    return res.status(200).send(categories);
  } catch (error) {
    return res.status(500).send({ message: `Unable to fetch records. ${error}` });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const toDo = await Database.Categories.getById(new ObjectId(req.params.id));
    if (!toDo) {
      return res.status(404).send({ message: `Unable to find Category with id ${req.params.id}` });
    }
    return res.status(200).send(toDo);
  } catch (error) {
    return res.status(500).send({ message: `Error when trying to find Category with id ${req.params.id}` });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    return res.status(201).send(await Database.Categories.update(new ObjectId(id), req.body));
  } catch (error) {
    return res.status(500).send({ message: `Unable to update Category. ${error}` });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    return res.status(201).send(await Database.Categories.create(req.body));
  } catch (error) {
    return res.status(500).send({ message: `Unable to create Category. ${error}` });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    return res.status(201).send(await Database.Categories.delete(new ObjectId(req.params.id)));
  } catch (error) {
    return res.status(500).send({ message: `Error when trying to delete Category with id ${req.params.id}: ${error}` });
  }
};
