import { ToDoItem } from "../../interfaces";
import { connection } from "./conn";
import { Collection, Document, ObjectId } from "mongodb";

export class Things {
  private static instance: Things;
  private db: Collection<Document> | null;

  private constructor() {
    this.db = null;
  }

  static getInstance() {
    if (!Things.instance) {
      Things.instance = new Things();
    }
    return Things.instance;
  }

  getDb(): Collection<Document> {
    if (!this.db) {
      this.db = connection.getDb().collection("things");
    }
    return this.db;
  }

  getAll() {
    try {
      return this.getDb().find({}).toArray();
    } catch (err) {
      throw new Error(`Error when fetching things. ${err}`);
    }
  }

  getAllByCategory(category: ObjectId) {
    try {
      return this.getDb().find({ category }).toArray();
    } catch (err) {
      throw new Error(`Error when fetching things. ${err}`);
    }
  }

  getById(_id: ObjectId) {
    try {
      return this.getDb().findOne({ _id });
    } catch (err) {
      throw new Error(`Error when fetching thing. ${err}`);
    }
  }

  async update(_id: ObjectId, updatedThing: Omit<ToDoItem, "_id">) {
    try {
      return this.getDb().findOneAndUpdate({ _id }, { $set: updatedThing }, { upsert: false });
    } catch (err) {
      throw new Error(`Error when updating thing. ${err}`);
    }
  }

  create(thing: Omit<ToDoItem, "_id">) {
    try {
      const category = typeof thing.category === "string" ? new ObjectId(thing.category) : thing.category;
      return this.getDb().insertOne({ ...thing, category });
    } catch (err) {
      throw new Error(`Error when creating new thing. ${err}`);
    }
  }

  async delete(_id: ObjectId) {
    try {
      console.log(_id);

      await this.getDb().deleteOne({ _id });
      return this.getDb().find({}).toArray();
    } catch (err) {
      throw new Error(`Error when deleting thing. ${err}`);
    }
  }
}
