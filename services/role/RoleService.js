import mongoose from 'mongoose';
import ServiceUnavailableException from '../../Exceptions/ServiceUnvailableException.js'
import Role, { ROLES } from "../../Models/Role.js";

const ObjectId = mongoose.Types.ObjectId;
const Model = Role;

export class RoleService {
  async findAll() {
    return Model.find().exec();
  }
  async findAllPopulate(...populateArgs) {
    return Model.find().populate(...populateArgs).exec();
  }
  async findBy(...args) {
    return Model.find(...args).exec();
  }
  async findByPopulate(filter = {}, findArgs = [], populateArgs = []) {
    if (!Array.isArray(findArgs))
      throw new ServiceUnavailableException(`findArgs n'est pas un Array`);
    if (!Array.isArray(populateArgs))
      throw new ServiceUnavailableException(`populateArgs n'est pas un Array`);
    return Model.find(filter, ...findArgs).populate(...populateArgs).exec();
  }
  async findOne(filter = {}, ...args) {
    return Model.findOne(filter, ...args).exec();
  }
  async findOnePopulate(filter = {}, findArgs = [], populateArgs = []) {
    if (!Array.isArray(findArgs))
      throw new ServiceUnavailableException(`findArgs n'est pas un Array`);
    if (!Array.isArray(populateArgs))
      throw new ServiceUnavailableException(`populateArgs n'est pas un Array`);
    return Model.findOne(filter, ...findArgs).populate(...populateArgs).exec();
  }
  async findById(id, ...args) {
    if (!ObjectId.isValid(id))
      throw new ServiceUnavailableException(Model.modelName + ' id invalide');
    return Model.findById(id, ...args).exec();
  }
  async findByIdPopulate(id, findArgs = [], populateArgs = []) {
    if (!ObjectId.isValid(id))
      throw new ServiceUnavailableException(Model.modelName + ' id invalide');
    if (!Array.isArray(findArgs))
      throw new ServiceUnavailableException(`findArgs n'est pas un Array`);
    if (!Array.isArray(populateArgs))
      throw new ServiceUnavailableException(`populateArgs n'est pas un Array`);
    return Model.findById(id, ...findArgs).populate(...populateArgs).exec();
  }
  async create(data, ...args) {
    if (!(data instanceof Object)) {
      throw new ServiceUnavailableException(`data n'est pas un Object`);
    }

    const model = new Model(data);
    const error = this.getErrorsMessagesSync(model);
    const asyncError = await this.getErrorMessages(model);
    error.push(...asyncError);

    if (error.length) {
      throw new ServiceUnavailableException(error.join('<br>'));
    }
    return model.save(...args);
  }
  async update(model, data, ...args) {
    if (!(model instanceof Model)) {
      throw new ServiceUnavailableException(`model n'est pas une instance de ` + Model.modelName);
    }
    if (!(data instanceof Object)) {
      throw new ServiceUnavailableException(`data n'est pas un Object`);
    }

    for (const k in data) {
      model[k] = data[k];
    }

    const error = this.getErrorsMessagesSync(model);
    const asyncError = await this.getErrorMessages(model);
    error.push(...asyncError);

    if (error.length) {
      throw new ServiceUnavailableException(error.join('<br>'));
    }

    return model.save(...args);
  }
  async delete(model, ...args) {
    if (!(model instanceof Model)) {
      throw new ServiceUnavailableException(`model n'est pas une instance de ` + Model.modelName);
    }
    return Model.findByIdAndRemove(model._id, ...args).exec();
  }
  getErrorsMessagesSync(model) {
    if (!(model instanceof Model)) {
      throw new ServiceUnavailableException(`model n'est pas une instance de ` + Model.modelName);
    }

    const error = model.validateSync();
    const messages = [];

    if (error) {
      for (const field in error.errors) {
        messages.push(error.errors[field].message);
      }
      // for (const field of Object.keys(error.errors)) {
      //   messages.push(error.errors[field].message);
      // }
    }

    return messages;
  }
  async getErrorMessages(model) {
    if (!(model instanceof Model)) {
      throw new ServiceUnavailableException(`model n'est pas une instance de ` + Model.modelName);
    }

    let error;
    try {
      await model.validate();
    } catch (err) { error = err; }
    const messages = [];

    if (error) {
      for (const field in error.errors) {
        messages.push(await error.errors[field].properties.message);
      }
    }

    return messages;
  }
  async findThenNormalized(method, ...methodParam) {
    if (method === undefined) {
      throw new ServiceUnavailableException(`La méthode ne peut pas être undefined`);
    }
    if (typeof method !== "string") {
      throw new ServiceUnavailableException(`La méthode doit être de type string`);
    }
    if (!['find', 'findOne', 'findById'].includes(method)) {
      throw new ServiceUnavailableException(`La méthode peut seulement être findById | findOne | find`);
    }
    if (method === "findById" && !ObjectId.isValid(methodParam[0])) {
      throw new ServiceUnavailableException(Model.modelName + ' id invalide');
    } else {
      if (methodParam[0] && Object.hasOwn(methodParam[0], '_id')) {
        if (!ObjectId.isValid(methodParam[0]._id)) {
          throw new ServiceUnavailableException(Model.modelName + ' id invalide');
        }
      }
      if (methodParam[0] && Object.hasOwn(methodParam[0], 'id')) {
        if (!ObjectId.isValid(methodParam[0].id)) {
          throw new ServiceUnavailableException(Model.modelName + ' id invalide');
        }
      }
    }

    return Model[method](...methodParam)
      .select(['-__v'])
      .exec();
  }
  async custom(...args) {
    let result = Model;

    for (const arg of args) {
      const { method, isSpread, param } = arg;

      if (method === undefined) {
        throw new ServiceUnavailableException(`La méthode ne peut pas être undefined`);
      }
      if (typeof method !== "string") {
        throw new ServiceUnavailableException(`La méthode doit être de type string`);
      }

      if (isSpread !== undefined) {
        if (typeof isSpread !== "boolean") {
          throw new ServiceUnavailableException(`isSpread doit être de type boolean`);
        }
      }

      try {
        if (method === "exec" || param === null || param === undefined) {
          result = result[method]();
        } else {
          result = isSpread
            ? result[method](...param)
            : result[method](param);
        }
      } catch (e) {
        throw new ServiceUnavailableException(e.message);
      }
    }

    return result;
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
