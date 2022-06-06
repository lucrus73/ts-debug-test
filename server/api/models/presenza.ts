import { Sequelize, DataTypes, Model, Optional } from '@sequelize/core';
import { v4 as uuid } from 'uuid';

interface presenzaAttributes {
  id: string;
  dalle: string;
  alle: string;
  giorno: string;
  descrizione: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
class Presenza extends Model<presenzaAttributes> {
  public id: string = uuid()
  public dalle!: string
  public alle!: string
  public giorno!: string
  public descrizione: string
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

   static associate(models: any) {
    Presenza.belongsTo(models.Periodo);
    Presenza.belongsTo(models.Fornitore);
    Presenza.belongsTo(models.Sede);
    Presenza.hasMany(models.Orario);
  }
}

Presenza.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  dalle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  giorno: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descrizione: {
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  sequelize: sequelize,
  paranoid: true,
  tableName: 'Presenze',
  modelName: 'Presenza'
})

return Presenza
}

