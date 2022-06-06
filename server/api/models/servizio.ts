import { Sequelize, DataTypes, Model, Optional } from '@sequelize/core';
import { v4 as uuid } from 'uuid';
interface servizioAttributes {
  id: string;
  nome: string;
  durata: number;
  descrizione: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
class Servizio extends Model<servizioAttributes> {
  public id: string = uuid()
  public nome!: string
  public durata!: number
  public descrizione: string
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static associate(models: any) {
    Servizio.hasMany(models.Orario);
  }
}

Servizio.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  durata: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descrizione: {
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  sequelize: sequelize,
  paranoid: true,
  tableName: 'Servizi'
})
return Servizio
}

