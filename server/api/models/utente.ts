import { Sequelize, DataTypes, Model, Optional } from '@sequelize/core';
import { v4 as uuid } from 'uuid';

interface utenteAttributes {
  id: string;
  idsso: string;
  nome: string;
  cognome: string;
  cf: string;
  data_nascita: string;
  telefono: string;
  cellulare: string;
  indirizzo: string
  numero_civico: number
  CAP: number
  paese: string
  provincia: string
  note: string;
  descrizione: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
class Utente extends Model<utenteAttributes> {
  public id: string = uuid()
  public idsso!: string
  public nome!: string
  public cognome!: string
  public cf!: string
  public data_nascita: string
  public telefono: string
  public cellulare: string
  public indirizzo: string
  public numero_civico: number
  public CAP: number
  public paese: string
  public provincia: string
  public note: string
  public descrizione: string
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

   static associate(models: any) {
    Utente.hasMany(models.Prenotazione);
  }
}

Utente.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  idsso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cognome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cf: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_nascita: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  cellulare: {
    type: DataTypes.STRING
  },
  indirizzo: {
    type: DataTypes.STRING
  },
  numero_civico: {
    type: DataTypes.STRING
  },
  CAP: {
    type: DataTypes.STRING
  },
  paese: {
    type: DataTypes.STRING
  },
  provincia: {
    type: DataTypes.STRING
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
  tableName: 'Utenti',
  modelName: 'Utente'
})

return Utente
}

