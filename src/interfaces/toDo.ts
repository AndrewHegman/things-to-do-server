import { Tag } from "./tag";

export type ToDoItem = {
  id: string;
  name: string;
  tags: Tag[];
  categoryKey: string;
};
