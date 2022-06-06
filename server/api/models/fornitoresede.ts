import { Sequelize, DataTypes, Model, Optional } from '@sequelize/core';
import { v4 as uuid } from 'uuid';

interface fornitoresedeAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
class FornitoreSede extends Model<fornitoresedeAttributes> {
  public id: string = uuid()
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static associate(models: any) {
    FornitoreSede.belongsTo(models.Fornitore);
    FornitoreSede.belongsTo(models.Sede);
  }
}

FornitoreSede.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
}, {
  timestamps: true,
  sequelize: sequelize,
  paranoid: true,
  tableName: 'FornitoriSedi',
  modelName: 'FornitoreSede'
})

return FornitoreSede
}

