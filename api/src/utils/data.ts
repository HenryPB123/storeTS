import axios from "axios";
import Products from "../models/Product";
import Categories from "../models/Category";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

const getProductsFromApi = async () => {
  try {
    const products = (await axios("https://fakestoreapi.com/products")).data;
    products
      ? products.forEach((p: Product) => {
          Products.findOrCreate({
            where: {
              id: p.id,
              name: p.title,
              price: p.price,
              description: p.description,
              category: p.category,
              image: p.image,
              rating: p.rating.rate,
              stock: p.rating.count,
            },
          });
        })
      : "Dowload data failed";

    let categories: string[] = [];

    await products.map((p: any) => {
      categories.push(p.category);
    });
    categories = [...new Set(categories)];

    categories
      ? categories.forEach((c: string) => {
          Categories.findOrCreate({
            where: {
              name: c,
            },
          });
        })
      : "There in no categories";
  } catch (error) {
    console.log(error);
  }
};

export default getProductsFromApi;
