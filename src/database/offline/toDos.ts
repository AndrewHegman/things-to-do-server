import { toDos as ToDoData } from "../../data";
import { ToDoItem } from "../../interfaces";

export const ToDos = {
  getAllToDos: () => {
    return Promise.resolve(ToDoData);
  },
  getToDoById: (id: string) => {
    return Promise.resolve(ToDoData.find((toDo) => toDo.id === id));
  },
  updateToDo: (id: string, updateToDo: Omit<ToDoItem, "id">) => {
    return Promise.resolve(
      ToDoData.map((toDo) => {
        if (toDo.id === id) {
          return {
            ...toDo,
            ...updateToDo,
          };
        }
        return toDo;
      })
    );
  },
  createToDo: (toDo: ToDoItem) => {
    ToDoData.push(toDo);
    return Promise.resolve(ToDoData);
  },
  deleteToDo: (id: string) => {
    const toDoIdx = ToDoData.findIndex((toDo) => toDo.id === id);
    if (toDoIdx === -1) {
      throw new Error(`No category found with id ${id}`);
    }
    ToDoData.splice(toDoIdx, 1);

    return Promise.resolve(ToDoData);
  },
};
