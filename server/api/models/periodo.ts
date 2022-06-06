import { Sequelize, DataTypes, Model, Optional } from '@sequelize/core';
import { v4 as uuid } from 'uuid';

interface periodoAttributes {
  id: string;
  nome: string;
  dal: string;
  al: string;
  anticipo: number;
  descrizione: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
class Periodo extends Model<periodoAttributes> {
  public id: string = uuid()
  public nome!: string
  public dal!: string
  public al!: string
  public anticipo: number
  public descrizione: string
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static associate(models: any) {
    Periodo.hasMany(models.Presenza);
  }
}

Periodo.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  al: {
    type: DataTypes.STRING,
  },
  anticipo: {
    type: DataTypes.INTEGER,
  },
  descrizione: {
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  sequelize: sequelize,
  paranoid: true,
  tableName: 'Periodi',
  modelName: 'Periodo'
})

return Periodo
}

