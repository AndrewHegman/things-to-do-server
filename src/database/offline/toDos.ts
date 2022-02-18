import { toDos as ToDoData } from "../../data";
import { ToDoItem } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";

export const ToDos = {
  getAllToDos: () => {
    return Promise.resolve(ToDoData);
  },
  getToDosByCategory: (category: string) => {
    return Promise.resolve(ToDoData.filter((todo) => todo.category === category));
  },
  getToDoById: (id: string) => {
    return Promise.resolve(ToDoData.find((toDo) => toDo._id === id));
  },
  updateToDo: (id: string, updatedToDo: Omit<ToDoItem, "id">) => {
    const idx = ToDoData.findIndex((toDo) => toDo._id === id);
    ToDoData[idx] = {
      ...ToDoData[idx],
      ...updatedToDo,
    };
    return Promise.resolve(ToDoData);
  },
  createToDo: (toDo: Omit<ToDoItem, "id">) => {
    if (!toDo.name) {
      throw new Error("Things must have a valid name");
    }

    if (!toDo.category) {
      throw new Error("Things must be associated with a valid category");
    }

    if (ToDoData.findIndex((_toDo) => _toDo.name === toDo.name && _toDo.category === toDo.category) !== -1) {
      throw new Error("Things must have a unique name in the same category");
    }

    const newToDo = { ...toDo, id: uuidv4() };

    ToDoData.push(newToDo);
    return Promise.resolve(newToDo);
  },
  deleteToDo: (id: string) => {
    const toDoIdx = ToDoData.findIndex((toDo) => toDo._id === id);
    if (toDoIdx === -1) {
      throw new Error(`No thing found with id ${id}`);
    }
    ToDoData.splice(toDoIdx, 1);

    return Promise.resolve(ToDoData);
  },
};
