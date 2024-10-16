import { Request, Response } from "express";
import Category from "../models/Category";

export const getCategories = async (req: Request, res: Response) => {
  try {
    let categories = await Category.findAll();
    if (categories.length > 0) res.status(200).json(categories);
    else res.status(404).json("Categories not found!!!");
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    let category = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (category) res.status(200).json(category);
    else res.status(404).json("Category not found!!");
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    let categories = await Category.findAll();

    let categoryExist: boolean = false;

    for (let i = 0; i < categories.length; i++) {
      if (req.body.name === categories[i].name) {
        categoryExist = true;
        break;
      }
    }
    if (categoryExist) res.status(302).json("Category already exists");
    else {
      let newCategory = await Category.create({
        name: req.body.name,
        description: req.body.description,
      });
      res
        .status(201)
        .json({ message: "Category created successfully", newCategory });
    }
    // res.send("Creando categorias");
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    let categoryUpdated = await Category.update(
      {
        ...[],
        name: req.body.name,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Producto actualizado", categoryUpdated });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Category was deleted!!!");
  } catch (error) {
    console.log(error);
  }
};
