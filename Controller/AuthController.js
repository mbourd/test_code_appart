import express from 'express';
import mongoose from 'mongoose';

import NotFoundException from '../Exceptions/NotFoundException.js';
import { service } from '../server.js';
import BadRequestException from '../Exceptions/BadRequestException.js';
import AccessDeniedException from '../Exceptions/AccessDeniedException.js';
import { handleErrorRoute } from '../middlewares/errorHandler.js';

import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authConfig from '../config/auth.config.js'
import Pangolin from '../Models/Pangolin.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

//POST
router.post('/signup', handleErrorRoute(async (req, resp) => {
  const { username, roles, password } = req.body;

  if ((await service.pangolin.findOne({ username })) !== null) {
    throw new BadRequestException('Nom de Pangolin déjà utilisé');
  }

  if (roles.length === 0) {
    throw new BadRequestException('Il faut au moins un role');
  }

  if (!(await service.role.isValidRolesById(roles))) {
    throw new BadRequestException('Role du Pangolin non valide');
  }

  if (password.length < 4) {
    throw new BadRequestException('Le mot de passe doit faire au minimum 4 charactères');
  }

  const data = {
    ...req.body,
    roles: await Promise.all(roles.map(async (r) => await service.role.findById(r))),
    password: bcrypt.hashSync(req.body.password, 8),
  }

  const newPangolin = await service.pangolin.create(data);

  resp.status(200).send('"Signed up"');
}));

router.post('/signin', [], handleErrorRoute(async (req, resp) => {
  const { username, password } = req.body;
  const pangolin = await service.pangolin.findOnePopulate(['pangolinFriends', 'roles'], { username });

  if (pangolin === null) {
    throw new AccessDeniedException('Authentification échoué : Pangolin inconnu', 'Accès refusé');
  }

  const validPassword = bcrypt.compareSync(password, pangolin.password);

  if (!validPassword) {
    throw new AccessDeniedException('Authentification échoué : Mot de passe invalide', 'Accès refusé');
  }

  const token = Jwt.sign({ id: pangolin.id }, authConfig.secret, {
    expiresIn: 86400, // 24 hours
  });

  req.session.token = token; // not necessary if transfer token to the client, check middlewares/authJwt.js:7 (retrieve token)

  resp.status(200).send({
    _id: pangolin._id,
    username: pangolin.username,
    roles: pangolin.roles,
    pangolinFriends: await Promise.all(pangolin.pangolinFriends.map(async (p) => await service.pangolin.findThenNormalized('findById', p._id))),
    // pangolinFriends: await Promise.all(pangolin.pangolinFriends.map(async (p) => await Pangolin.findById(p._id).select(['-password']).populate(['roles']).exec())),
    accessToken: token,
  });
}));

router.post('/signout', handleErrorRoute(async (req, resp) => {
  req.session = null;
  resp.status(200).send('"Signed out"');
}));

export { router };
