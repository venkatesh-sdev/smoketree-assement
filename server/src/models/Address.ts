// src/models/Address.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../database";
import { User } from "./User";

export class Address extends Model {
  public id!: number;
  public userId!: number;
  public street!: string;
  public city!: string;
  public state!: string;
  public zip!: string;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "addresses",
  }
);

User.hasMany(Address);
Address.belongsTo(User);
