import { Request, Response } from "express";
import { offline as Database } from "../database";

export const getAllTags = async (req: Request, res: Response) => {
  try {
    let tags;
    if (req.query.category) {
      if (typeof req.query.category !== "string") {
        return res
          .status(500)
          .send({ message: `Unable to fetch tags. Category must be a string, got ${typeof req.query.category}` });
      }
      tags = await Database.Tags.getTagsByCategory(req.query.category);
    } else {
      tags = await Database.Tags.getAllTags();
    }
    return res.status(200).send(tags);
  } catch (error) {
    return res.status(500).send({ message: "Unable to fetch tags" });
  }
};

export const getTagById = async (req: Request, res: Response) => {
  try {
    const toDo = await Database.Tags.getTagById(req.params.id);
    if (!toDo) {
      return res.status(404).send({ message: `Unable to find Tag with id ${req.params.id}` });
    }
    return res.status(200).send(toDo);
  } catch (error) {
    return res.status(500).send({ message: `Error when trying to find Tag with id ${req.params.id}` });
  }
};

export const updateTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    return res.status(201).send(await Database.Tags.updateTag(id, req.body));
  } catch (error) {
    return res.status(500).send({ message: "Unable to update Tag" });
  }
};

export const createTag = async (req: Request, res: Response) => {
  try {
    return res.status(201).send(await Database.Tags.createTag(req.body));
  } catch (error) {
    return res.status(500).send({ message: `Unable to create Tag. ${error}` });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    return res.status(201).send(await Database.Tags.deleteTag(req.params.id));
  } catch (error) {
    return res.status(500).send({ message: `Error when trying to delete Tag with id ${req.params.id}: ${error}` });
  }
};
