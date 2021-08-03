import * as offlineToDos from "./offline/toDos";
import * as offlineCategories from "./offline/categories";

export const offline = {
  ...offlineToDos,
  ...offlineCategories,
};
