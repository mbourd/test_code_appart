import mongoose, { Schema, Types } from 'mongoose';
import Role from './Role.js';

const ObjectId = Types.ObjectId;

const PangolinSchema = new Schema({
  username: {
    type: String,
    required: [true, `Nom d'utilisateur obligatoire`],
    // validate: {
    //   // validator: (v) => {
    //   //   const pangolin = Pangolin.exists({ username: v }).exec();
    //   //   return !pangolin ? Promise.resolve(true) : Promise.resolve(false);
    //   // },
    //   validator: async (v) => {
    //     const pangolin = await Pangolin.exists({ username: v }).exec();
    //     return !pangolin ? true : false;
    //   },
    //   message: (props) => {
    //     return "Nom de Pangolin déjà utilisé";
    //   }
    // }
  },

  password: {
    type: String,
    required: [true, `Mot de passe obligatoire`]
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
        ref: "Role",
        // required: true,
      }
    ],
    validate: {
      validator: async function (v) {
        const test1 = /*v !== undefined && v !== null && */Array.isArray(v) && v.length === 1;
        if (!test1) return false;
        const test2 = await Role.exists({ _id: v[0] }).exec();
        if (test2 === null) return false;
        return true;
      },
      message: async props => {
        if (props.value === undefined
          || props.value === null
          || !Array.isArray(props.value)
          || props.value.length === 0
        ) return "Il faut au moins 1 role";
        if (props.value.length > 1) return "Il faut 1 role";
        if ((await Role.exists({ _id: props.value[0] }).exec()) === null) return `${Role.modelName} non reconnu`;
      }
    }
  },

  pangolinFriends: [{
    type: Schema.Types.ObjectId,
    ref: 'Pangolin',
  }]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

PangolinSchema.virtual('friends', {
  ref: 'Pangolin',
  localField: '_id',
  foreignField: 'pangolinFriends',
});

// PangolinSchema.pre('save', async function (next) {
//   let pangolin = await Pangolin.exists({ username: this.username }).exec();
//   return !pangolin ? next() : next(new Error("Nom de Pangolin déjà utilisé"));
// });

const Pangolin = mongoose.model("Pangolin", PangolinSchema);

export default Pangolin;
