import { categories as CategoryData } from "../../data";
import { Category } from "../../interfaces";

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
  createCategory: (category: Category) => {
    CategoryData.push(category);
    return Promise.resolve(CategoryData);
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
