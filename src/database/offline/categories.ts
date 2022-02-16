import { categories as CategoryData } from "../../data";
import { Category } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";

export const Categories = {
  getAllCategories: () => {
    return Promise.resolve(CategoryData);
  },
  getCategoryById: (id: string) => {
    return Promise.resolve(CategoryData.find((category) => category.key === id));
  },
  updateCategory: (id: string, updatedCategory: Omit<Category, "key">) => {
    const idx = CategoryData.findIndex((category) => category.key === id);
    CategoryData[idx] = {
      ...CategoryData[idx],
      ...updatedCategory,
    };
    return Promise.resolve(CategoryData);
  },
  createCategory: (category: Omit<Category, "key">) => {
    if (!category.displayName) {
      throw new Error("Categories must have a valid name");
    }

    if (CategoryData.findIndex((_category) => _category.displayName === category.displayName) !== -1) {
      throw new Error(`Categories must have a unique name. ${category.displayName} already exists.`);
    }

    const newCategory = { ...category, key: uuidv4() };

    CategoryData.push(newCategory);
    return Promise.resolve(newCategory);
  },
  deleteCategory: (id: string) => {
    const categoryIdx = CategoryData.findIndex((category) => category.key === id);
    if (categoryIdx === -1) {
      throw new Error(`No category found with id ${id}`);
    }
    CategoryData.splice(categoryIdx, 1);

    return Promise.resolve(CategoryData);
  },
};
