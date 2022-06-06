import { Sequelize, DataTypes, Model, Optional } from '@sequelize/core';
import { v4 as uuid } from 'uuid';

interface orarioAttributes {
  id: string;
  dalle: string;
  alle: string;
  descrizione: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
class Orario extends Model<orarioAttributes> {
  public id: string = uuid()
  public dalle!: string
  public alle!: string
  public descrizione: string
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

   static associate(models: any) {
    Orario.belongsTo(models.Presenza);
    Orario.belongsTo(models.Servizio);
    Orario.hasMany(models.Prenotazione);
  }
}

Orario.init({
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
  descrizione: {
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  sequelize: sequelize,
  paranoid: true,
  tableName: 'Orari',
  modelName: 'Orario'
})

return Orario
}

