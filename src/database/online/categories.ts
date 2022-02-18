import { Category } from "../../interfaces";
import { connection } from "../online/conn";
import { Collection, Document, ObjectId } from "mongodb";

export class Categories {
  private static instance: Categories;
  private db: Collection<Document> | null;

  private constructor() {
    this.db = null;
  }

  static getInstance() {
    if (!Categories.instance) {
      Categories.instance = new Categories();
    }
    return Categories.instance;
  }

  getDb(): Collection<Document> {
    if (!this.db) {
      this.db = connection.getDb().collection("categories");
    }
    return this.db;
  }

  getAll() {
    try {
      return this.getDb().find({}).toArray();
    } catch (err) {
      throw new Error(`Error when fetching categories. ${err}`);
    }
  }

  getById(_id: ObjectId) {
    try {
      return this.getDb().findOne({ _id });
    } catch (err) {
      throw new Error(`Error when fetching category. ${err}`);
    }
  }

  async update(_id: ObjectId, updatedCategory: Omit<Category, "_id">) {
    try {
      await this.getDb().findOneAndUpdate({ _id }, { $set: updatedCategory }, { upsert: false });
      return this.getAll();
    } catch (err) {
      throw new Error(`Error when updating category. ${err}`);
    }
  }

  create(category: Omit<Category, "_id">) {
    try {
      return this.getDb().insertOne(category);
    } catch (err) {
      throw new Error(`Error when creating new category. ${err}`);
    }
  }

  async delete(_id: ObjectId) {
    try {
      await this.getDb().deleteOne({ _id });
      return this.getDb().find({}).toArray();
    } catch (err) {
      throw new Error(`Error when deleting category. ${err}`);
    }
  }
}
