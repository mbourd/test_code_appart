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
        return v !== null && v.length > 0;
      },
      message: props => "Il faut au moins 1 role"
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
