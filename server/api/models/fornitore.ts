import { Sequelize, DataTypes, Model, Optional } from '@sequelize/core';
import { v4 as uuid } from 'uuid';
interface fornitoreAttributes {
  id: string;
  nome: string;
  cognome: string;
  titolo: string;
  descrizione: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
class Fornitore extends Model<fornitoreAttributes> {
  public id: string = uuid()
  public nome!: string
  public cognome!: string
  public titolo: string
  public descrizione: string
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static associate(models: any) {
    Fornitore.hasMany(models.Presenza);
    Fornitore.hasMany(models.FornitoreSede);
  }
}

Fornitore.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cognome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  titolo: {
    type: DataTypes.STRING,
  },
  descrizione: {
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  sequelize: sequelize,
  paranoid: true,
  tableName: 'Fornitori',
  modelName: 'Fornitore'
})


return Fornitore
}

