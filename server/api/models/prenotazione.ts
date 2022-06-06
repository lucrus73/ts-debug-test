import { Sequelize, DataTypes, Model, Optional } from '@sequelize/core';
import { v4 as uuid } from 'uuid';

interface prenotazioneAttributes {
  id: string;
  oraAppuntamento: string;
  note: string;
  descrizione: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
class Prenotazione extends Model<prenotazioneAttributes> {
  public id: string = uuid()
  public oraAppuntamento!: string
  public note: string
  public descrizione: string
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

   static associate(models: any) {
    Prenotazione.belongsTo(models.Utente);
    Prenotazione.belongsTo(models.Orario);
  }
}

Prenotazione.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  oraAppuntamento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  note: {
    type: DataTypes.STRING
  },
  descrizione: {
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  sequelize: sequelize,
  paranoid: true,
  tableName: 'Prenotazioni',
  modelName: 'Prenotazione'
})

return Prenotazione
}

