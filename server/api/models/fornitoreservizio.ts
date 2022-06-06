import { Sequelize, DataTypes, Model, Optional } from '@sequelize/core';
import { v4 as uuid } from 'uuid';

interface fornitoreservizioAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
class FornitoreServizio extends Model<fornitoreservizioAttributes> {
  public id: string = uuid()
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static associate(models: any) {
    FornitoreServizio.belongsTo(models.Fornitore);
    FornitoreServizio.belongsTo(models.Servizio);
  }
}

FornitoreServizio.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
}, {
  timestamps: true,
  sequelize: sequelize,
  paranoid: true,
  tableName: 'FornitoriServizi',
  modelName: 'FornitoreServizio'
})

return FornitoreServizio
}

