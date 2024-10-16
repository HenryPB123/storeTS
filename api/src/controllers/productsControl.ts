import { Request, Response } from "express";
import Products from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  try {
    let products = await Products.findAll();
    if (products.length) res.status(200).json(products);
    else res.status(404).json("Products have not been found!!!!!");
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    let product = await Products.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (product === null) res.status(404).json("Product not found");
    else res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.body.name)
      res.status(400).json("No hay datos para agregar o actulizar");
    else {
      let products = await Products.findAll();

      let exist: boolean = false;
      let product;
      for (let i = 0; i < products.length; i++) {
        if (products[i].name === req.body.name) {
          exist = true;
          product = products[i].dataValues;
          product.stock += 1;

          break;
        }
      }
      if (exist) {
        let existingProduct = await Products.update(
          { stock: product.stock },
          {
            where: {
              name: product.name,
            },
          }
        );
        res
          .status(200)
          .json({ message: "Producto actualizado", existingProduct });
      } else if (!exist) {
        let newProduct = await Products.create({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          category: req.body.category,
          image: req.body.image,
          rating: req.body.rating,
          stock: req.body.stock,
        });
        res
          .status(200)
          .json({ message: "Producto creado Exitosamente", newProduct });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let productUpdated = await Products.update(
        {
          ...[],
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          category: req.body.category,
          image: req.body.image,
          rating: req.body.image,
          stock: req.body.stock,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.status(200).json({ message: "Producto actulizado", productUpdated });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Products.destroy({
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .json({ message: `Producto con id ${req.params.id}  ha sido eliminado` });
  } catch (error) {
    console.log(error);
  }
};
