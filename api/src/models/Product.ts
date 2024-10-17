import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Category from "./Category";

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
  public category!: string;
  public image!: string;
  public rating!: number;
  public stock!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize, // La instancia de conexión a la base de datos
    modelName: "Product", // Nombre del modelo
    tableName: "products", // Nombre de la tabla en la base de datos
    timestamps: true, // Añadir automáticamente los campos createdAt y updatedAt
  }
);
// Relación muchos a muchos entre productos y categorías
Product.belongsToMany(Category, { through: "ProductCategory" });
Category.belongsToMany(Product, { through: "ProductCategory" });
export default Product;
