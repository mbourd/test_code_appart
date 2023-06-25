import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PangolinSchema = new Schema({
  username: {
    type: String,
    required: [true, `Nom d'utilisateur obligatoire`]
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
        type: Schema.Types.ObjectId,
        ref: "Role",
        // required: true,
      }
    ],
    validate: {
      validator: function (v) {
        return /*v !== undefined && v !== null && */Array.isArray(v) && v.length === 1;
      },
      message: props => {
        if (props.value === undefined
          || props.value === null
          || !Array.isArray(props.value)
          || props.value.length === 0
        ) return "Il faut au moins 1 role";
        if (props.value.length > 1) return "Il faut 1 role";
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

const Pangolin = mongoose.model("Pangolin", PangolinSchema);

export default Pangolin;
