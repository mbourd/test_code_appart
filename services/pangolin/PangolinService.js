import mongoose from 'mongoose';
import ServiceUnavailableException from '../../Exceptions/ServiceUnvailableException.js'
import Pangolin from "../../Models/Pangolin.js";

const ObjectId = mongoose.Types.ObjectId;

export class PangolinService {
  async findAll() {
    return Pangolin.find().exec();
  }
  async findAllPopulate(fields = []) {
    if (!Array.isArray(fields))
      throw new ServiceUnavailableException(`fields n'est pas un Array`);
    return Pangolin.find().populate(fields).exec();
  }
  async findBy(...args) {
    return Pangolin.find(...args).exec();
  }
  async findOne(...args) {
    return Pangolin.findOne(...args).exec();
  }
  async findOnePopulate(fields = [], ...args) {
    if (!Array.isArray(fields))
      throw new ServiceUnavailableException(`fields n'est pas un Array`);
    return Pangolin.findOne(...args).populate(fields).exec();
  }
  async findById(id, ...args) {
    if (!ObjectId.isValid(id))
      throw new ServiceUnavailableException('Pangolin id invalide');
    return Pangolin.findById(id, ...args).exec();
  }
  async findByIdPopulate(id, fields = [], ...args) {
    if (!ObjectId.isValid(id))
      throw new ServiceUnavailableException('Pangolin id invalide');
    if (!Array.isArray(fields))
      throw new ServiceUnavailableException(`fields n'est pas un Array`);
    return Pangolin.findById(id, ...args).populate(fields).exec();
  }
  async create(data, ...args) {
    if (!(data instanceof Object)) {
      throw new ServiceUnavailableException(`data n'est pas un Object`);
    }

    const pangolin = new Pangolin(data);
    const error = this.getErrorsMessagesSync(pangolin);

    if (error.length) {
      throw new ServiceUnavailableException(error.join('<br>'));
    }
    return pangolin.save(...args);
  }
  async update(model, data, ...args) {
    if (!(model instanceof Pangolin)) {
      throw new ServiceUnavailableException(`model n'est pas une instance de Pangolin`);
    }
    if (!(data instanceof Object)) {
      throw new ServiceUnavailableException(`data n'est pas un Object`);
    }

    for (const k in data) {
      if (k === "roles") {
        model[k].pop();
        model[k].push(...data[k]);
      } else {
        model[k] = data[k];
      }
    }

    const error = this.getErrorsMessagesSync(model);

    if (error.length) {
      throw new ServiceUnavailableException(error.join('<br>'));
    }

    return model.save(...args);
  }
  async delete(model, ...args) {
    if (!(model instanceof Pangolin)) {
      throw new ServiceUnavailableException(`model n'est pas une instance de Pangolin`);
    }
    return Pangolin.findByIdAndRemove(model._id, ...args).exec();
  }
  getErrorsMessagesSync(model) {
    if (!(model instanceof Pangolin)) {
      throw new ServiceUnavailableException(`model n'est pas une instance de Pangolin`);
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
  async findThenNormalized(method, methodParam) {
    if (method === undefined) {
      throw new ServiceUnavailableException(`La méthode ne peut pas être undefined`);
    }
    if (typeof method !== "string") {
      throw new ServiceUnavailableException(`La méthode doit être de type string`);
    }
    if (!['find', 'findOne', 'findById'].includes(method)) {
      throw new ServiceUnavailableException(`La méthode peut seulement être findById | findOne | find`);
    }
    if (method === "findById" && !ObjectId.isValid(methodParam)) {
      throw new ServiceUnavailableException('Pangolin id invalide');
    }

    return this.custom(
      { method: method, param: methodParam },
      { method: 'populate', param: ['roles'] },
      {
        method: 'populate', param: {
          path: 'pangolinFriends',
          populate: [{ path: 'roles', model: 'Role' }],
          select: '-password'
        }
      },
      // { method: 'populate', param: ['pangolinFriends', '-password'], isSpread: true },
      { method: 'select', param: ['-password'] },
      { method: 'exec' }
    );
  }
  async custom(...args) {
    let result = Pangolin;

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
}
