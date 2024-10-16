import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Categories extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Categories.init(
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
  },
  {
    sequelize, // La instancia de conexión a la base de datos
    modelName: "Categories", // Nombre del modelo
    tableName: "categories", // Nombre de la tabla en la base de datos
    timestamps: true, // Añadir automáticamente los campos createdAt y updatedAt
  }
);

export default Categories;
