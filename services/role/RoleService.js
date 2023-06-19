import mongoose from 'mongoose';
import ServiceUnavailableException from '../../Exceptions/ServiceUnvailableException.js'
import Role, { ROLES } from "../../Models/Role.js";

const ObjectId = mongoose.Types.ObjectId;

export class RoleService {
  async findAll() {
    return Role.find().exec();
  }
  async findById(id, ...args) {
    if (!ObjectId.isValid(id))
      throw new ServiceUnavailableException('Role id invalide');
    return Role.findById(id, ...args).exec();
  }
  async findOne(...args) {
    return Role.findOne(...args).exec();
  }
  isValidRoles(roles) {
    for (const role of roles) {
      if (!ROLES.includes(role)) {
        return false;
      }
    }
    return true;
  }
  async isValidRolesById(roles) {
    for (const idRole of roles) {
      if ((await this.findById(idRole)) === null) {
        return false;
      }
    }
    return true;
  }
}
