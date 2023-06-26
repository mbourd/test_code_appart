import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const modelName = "Role";

const RoleSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nom de role obligatoire']
  }
});

const Role = mongoose.model(modelName, RoleSchema);

export const ROLES = ["Guerrier", "Alchimiste", "Sorcier", "Espion", "Enchanteur"];

export default Role;
