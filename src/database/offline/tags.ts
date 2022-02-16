import { Tag } from "../../interfaces/tag";
import { Tags as TagsData } from "../../data";
import { v4 as uuidv4 } from "uuid";

export const Tags = {
  getAllTags: () => {
    return Promise.resolve(TagsData);
  },
  getTagsByCategory: (category: string) => {
    return Promise.resolve(TagsData.filter((tag) => tag.category === category));
  },
  getTagById: (id: string) => {
    return Promise.resolve(TagsData.find((tag) => tag.id === id));
  },
  updateTag: (id: string, updatedTag: Omit<Tag, "id">) => {
    const idx = TagsData.findIndex((tag) => tag.id === id);
    TagsData[idx] = {
      ...TagsData[idx],
      ...updatedTag,
    };
    return TagsData;
  },
  createTag: (tag: Omit<Tag, "id">) => {
    if (!tag.category) {
      // TODO: Make sure this is an _existing_ category
      throw new Error("Tags must have a valid category");
    }

    if (!tag.name) {
      // TODO: Better sanitization?
      throw new Error("Tags must have a valid name");
    }

    if (TagsData.findIndex((_tag) => _tag.name === tag.name && _tag.category === tag.category) !== -1) {
      throw new Error("All tags must have a unique name in the same category");
    }

    const newTag = { ...tag, id: uuidv4() };

    TagsData.push(newTag);
    return Promise.resolve(newTag);
  },
  deleteTag: (id: string) => {
    const tagIdx = TagsData.findIndex((tag) => tag.id === id);
    if (tagIdx === -1) {
      throw new Error(`No tag found with id ${id}`);
    }
    TagsData.splice(tagIdx, 1);

    return Promise.resolve(TagsData);
  },
};
