import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class User extends Model {
  public id!: number;
  public name!: string;
  public lastname!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public isAdmin!: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);
