import { Class } from "./models";

export const populateClass = (cls: any): Class => {
  return new Class(cls.id, cls.name, cls.time, cls.created_at);
};
