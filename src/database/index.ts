import * as offlineToDos from "./offline/toDos";
import * as offlineCategories from "./offline/categories";
import * as offlineTags from "./offline/tags";

export const offline = {
  ...offlineToDos,
  ...offlineCategories,
  ...offlineTags,
};
