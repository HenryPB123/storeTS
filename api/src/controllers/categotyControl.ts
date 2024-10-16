import { Request, Response } from "express";
import Categories from "../models/Category";

export const getCategories = async (req: Request, res: Response) => {
  try {
    let categories = await Categories.findAll();
    // let categories: [] = [];
    if (categories.length > 0) res.status(200).json(categories);
    else res.status(404).json("Categories not found!!!");
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async () => {
  try {
    let categories = await Categories.findAll();
  } catch (error) {
    console.log(error);
  }
};
