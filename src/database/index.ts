import * as offlineToDos from "./offline/toDos";
import * as offlineCategories from "./offline/categories";
import * as offlineTags from "./offline/tags";

import * as onlineCategories from "./online/categories";
import * as onlineThings from "./online/things";

export const offline = {
  ...offlineToDos,
  ...offlineCategories,
  ...offlineTags,
};

export const online = {
  // ...onlineCategories,
  Categories: onlineCategories.Categories.getInstance(),
  Things: onlineThings.Things.getInstance(),
};
