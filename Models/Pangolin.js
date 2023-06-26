import mongoose, { Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import Role, { modelName as modelNameRole } from './Role.js';

const ObjectId = Types.ObjectId;
export const modelName = "Pangolin";

const PangolinSchema = new Schema({
  username: {
    type: String,
    required: [true, `Nom d'utilisateur obligatoire`],
    validate: {
      // validator: (v) => {
      //   const idExist = Pangolin.exists({ _id: this.id }).exec();
      //   const pangolin = Pangolin.exists({ username: v }).exec();
      //   if (idExist && pangolin) return Promise.resolve(true);
      //   if (!idExist && pangolin) return Promise.resolve(false);
      // },
      validator: async function (v) {
        // const idExist = await Pangolin.exists({ _id: this.id }).exec();
        const pangolin = await Pangolin.exists({ username: v }).exec();
        if (/*idExist*/!this.isNew && pangolin) return true; // when update the document
        if (/*!idExist*/this.isNew && pangolin) return false; // when create a new document
      },
      message: (props) => {
        return "Nom de Pangolin déjà utilisé";
      }
    }
  },

  password: {
    type: String,
    required: [true, `Mot de passe obligatoire`],
    validate: {
      validator: (v) => {
        return v.length >= 4;
      },
      message: (props) => {
        return "Le mot de passe doit faire au minimum 4 charactères";
      }
    }
  },

  // roles: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Role"
  //   }
  // ],
  // // role: {
  // //   type: String,
  // //   required: [true, 'Rôle est obligatoire'],
  // //   enum: {
  // //     values: ["Guerrier", "Alchimiste", "Sorcier", "Espion", "Enchanteur"],
  // //     message: `Le rôle {VALUE} n'est pas supporté`
  // //   }
  // // },
  roles: {
    type: [
      {
        type: ObjectId,
        ref: modelNameRole,
        // required: true,
      }
    ],
    validate: {
      validator: async function (v) {
        if (!(Array.isArray(v) && v.length === 1)) return false;
        if ((await Role.exists({ _id: v[0] }).exec()) === null) return false;
        return true;
      },
      message: async props => {
        if (!Array.isArray(props.value) || props.value.length === 0) return "Il faut au moins 1 role";
        if (props.value.length > 1) return "Il faut 1 role";
        if ((await Role.exists({ _id: props.value[0] }).exec()) === null) return `${Role.modelName} non reconnu`;
      }
    }
  },

  pangolinFriends: [{
    type: ObjectId,
    ref: modelName,
  }]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

PangolinSchema.virtual('friends', {
  ref: modelName,
  localField: '_id',
  foreignField: 'pangolinFriends',
});

PangolinSchema.pre('save', async function (next) {
  // let pangolin = await Pangolin.exists({ username: this.username }).exec();
  // return !pangolin ? next() : next(new Error("Nom de Pangolin déjà utilisé"));
  this.password = bcrypt.hashSync(this.password, 8);
});

const Pangolin = mongoose.model(modelName, PangolinSchema);

export default Pangolin;
