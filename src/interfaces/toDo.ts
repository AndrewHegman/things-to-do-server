import { Tag } from "./tag";

export type ToDoItem = {
  _id: string;
  name: string;
  tags: Tag[];
  category: string;
};
