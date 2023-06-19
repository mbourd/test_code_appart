/**
 * for mongodb connection
 */
import mongoose from 'mongoose';
import * as e from 'dotenv';
import Role, { ROLES } from './Models/Role.js';

e.config();
const conString = process.env.DB_CONNECTION;
// const conString = 'mongodb://mongoUser:ChangeMe@localhost:27017/test_appartoo';
// const conString = 'mongodb://mongoUser:ChangeMe@mongo-db:27017/test_appartoo';
mongoose.connect(
  conString,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(async (v) => {
    console.log('Connected to MongoDB:', conString);
    await initRoles();
  })
  .catch((e) => console.error('Impossible to connect to MongoDB:', e));

async function initRoles() {
  for (const role of ROLES) {
    if ((await Role.findOne({ name: role }).exec()) === null) {
      await new Role({ name: role }).save()
        .then(() => console.log('Role ' + role + ' ajouté'))
        .catch(e => console.error(e));
    }
  }
}

export default mongoose;
