import { Model, ModelStatic } from 'sequelize';

export interface ClientCreationParams {
  document: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export type ClientAttributes = {
  id: string;
  document: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export interface ClientInstance
  extends Model<ClientAttributes, ClientCreationParams>,
    ClientAttributes {}

export type ClientModel = ModelStatic<ClientInstance>;