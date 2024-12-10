import { Sequelize } from 'sequelize';
import { User } from './user';

export default function initModels(seq: Sequelize) {
  seq.models.User = User;
}
