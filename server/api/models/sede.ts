import { Sequelize, DataTypes, Model, Optional } from '@sequelize/core';
import { v4 as uuid } from 'uuid';

interface sedeAttributes {
  id: string;
  nome: string;
  indirizzo: string;
  numero_civico: number;
  CAP: number;
  paese: string;
  provincia: string;
  descrizione: string;
  latitudine: number;
  longitudine: number;
  raggio: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
class Sede extends Model<sedeAttributes> {
  public id: string = uuid()
  public nome!: string
  public indirizzo: string
  public numero_civico: number
  public CAP: number
  public paese: string
  public provincia: string
  public descrizione: string
  public latitudine: number
  public longitudine: number
  public raggio: number
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static associate(models: any) {
    Sede.hasMany(models.Presenza);
    Sede.hasMany(models.FornitoreSede);
  }
}

Sede.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  indirizzo: {
    type: DataTypes.STRING,
  },
  numero_civico: {
    type: DataTypes.INTEGER,
  },
  CAP: {
    type: DataTypes.INTEGER,
  },
  paese: {
    type: DataTypes.STRING,
  },
  provincia: {
    type: DataTypes.STRING,
  },
  descrizione: {
    type: DataTypes.STRING
  },
  latitudine: {
    type: DataTypes.FLOAT,
  },
  longitudine: {
    type: DataTypes.FLOAT,
  },
  raggio: {
    type: DataTypes.INTEGER,
  }
}, {
  timestamps: true,
  sequelize: sequelize,
  paranoid: true,
  tableName: 'Sedi',
  modelName: 'Sede'
})

return Sede
}

