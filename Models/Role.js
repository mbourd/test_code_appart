import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nom de role obligatoire']
  }
});

const Role = mongoose.model('Role', RoleSchema);

export const ROLES = ["Guerrier", "Alchimiste", "Sorcier", "Espion", "Enchanteur"];

export default Role;
