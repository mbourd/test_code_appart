import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import NotFoundException from '../Exceptions/NotFoundException.js';
import { service } from '../server.js';
import BadRequestException from '../Exceptions/BadRequestException.js';
import { handleErrorRoute } from '../middlewares/errorHandler.js';
import { checkJWT } from '../middlewares/authJwt.js';
import Pangolin from '../Models/Pangolin.js';
import ForbiddenException from '../Exceptions/ForbiddenException.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

//GET http://localhost:3000/pangolins
router.get("/",
  [handleErrorRoute(checkJWT)],
  handleErrorRoute(async (req, resp, next) => {
    // const pangolins = await service.pangolin.findAllPopulate(['roles', 'pangolinFriends']);
    // const result = pangolins.map(p => {
    //   return { username: p.username, roles: p.roles, pangolinFriends: p.pangolinFriends, _id: p._id };
    // });
    // const result = await Pangolin.find().populate(['roles']).populate('pangolinFriends', '-password').select(['-password']).exec();
    const result = await service.pangolin.findThenNormalized('find');

    resp.status(200).send(result);
  })
);

//GET http://localhost:3000/pangolins/:id
router.get("/:id",
  [handleErrorRoute(checkJWT)],
  handleErrorRoute(async (req, resp, next) => {
    const { id } = req.params;
    // const pangolin = await service.pangolin.findById(id);
    const pangolin = await service.pangolin.findThenNormalized('findById', id);

    if (pangolin === null) {
      throw new NotFoundException('Pangolin id ' + id + ' non trouvé');
    }

    resp.status(200).send(pangolin);
  })
);

router.post("/create",
  [handleErrorRoute(checkJWT)],
  handleErrorRoute(async (req, resp, next) => {
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

    await service.pangolin.create(data);

    resp.status(200).send('"Pangolin créé"');
  })
);

//PUT http://localhost:3000/pangolins/update/:id
router.put("/update/:id",
  [handleErrorRoute(checkJWT)],
  handleErrorRoute(async (req, resp, next) => {
    const { id } = req.params;
    const pangolin = await service.pangolin.findById(id);
    const data = {};

    if (pangolin === null) {
      throw new NotFoundException('Pangolin id ' + id + ' non trouvé');
    }
    if (id !== req.userId) {
      throw new ForbiddenException('Action non autorisé');
    }

    for (const k in req.body) {
      if (k === "role") {
        data['roles'] = [req.body[k]];
      } else {
        data[k] = req.body[k];
      }
    }

    await service.pangolin.update(pangolin, data);

    // const _pangolin = await service.pangolin.findByIdPopulate(id, ['roles', 'pangolinFriends']);

    // const result = {
    //   _id: _pangolin._id,
    //   username: _pangolin.username,
    //   roles: _pangolin.roles,
    //   pangolinFriends: await Promise.all(_pangolin.pangolinFriends.map(async (p) => await Pangolin.findById(p._id).select(['-password']).populate(['roles']).exec())),
    // }

    // resp.status(200).send(result);

    const _pangolin = await service.pangolin.findThenNormalized('findById', id);
    resp.status(200).send(_pangolin);
  })
);

//PUT http://localhost:3000/pangolins/add-friend/:id
router.put("/add-friend/:id",
  [handleErrorRoute(checkJWT)],
  handleErrorRoute(async (req, resp, next) => {
    const { id } = req.params;
    const { friendPangolinId, createNew } = req.body;
    const pangolin = await service.pangolin.findById(id);
    let friendPangolin = !createNew
      ? await service.pangolin.findById(friendPangolinId)
      : null;

    if (createNew) {
      const { username, roles, password } = createNew;

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
        ...createNew,
        roles: await Promise.all(roles.map(async (r) => await service.role.findById(r))),
        password: bcrypt.hashSync(password, 8),
      }

      friendPangolin = await service.pangolin.create(data);
    }

    if (pangolin === null) {
      throw new NotFoundException('Pangolin id ' + id + ' non trouvé');
    }
    if (friendPangolin === null) {
      throw new NotFoundException(`L'ami Pangolin id ${friendPangolinId} non trouvé`);
    }
    if (id !== req.userId) {
      throw new ForbiddenException('Action non autorisé');
    }

    if (pangolin.pangolinFriends.includes(friendPangolinId)) {
      throw new BadRequestException(`L'ami Pangolin "${friendPangolin.username}" avec id ${friendPangolinId} existe déjà`);
    }
    if (friendPangolin.pangolinFriends.includes(id)) {
      throw new BadRequestException(`Le Pangolin id ${id} existe déjà dans la liste d'ami de l'autre Pangolin`);
    }

    pangolin.pangolinFriends.push(friendPangolin);
    friendPangolin.pangolinFriends.push(pangolin);

    await pangolin.save();
    await friendPangolin.save();

    // const _pangolin = await service.pangolin.findByIdPopulate(id, ['roles', 'pangolinFriends']);

    // const result = {
    //   _id: _pangolin._id,
    //   username: _pangolin.username,
    //   roles: _pangolin.roles,
    //   pangolinFriends: await Promise.all(
    //     _pangolin.pangolinFriends.map(async (p) =>
    //       await service.pangolin.custom(
    //         { method: 'findById', param: p._id },
    //         { method: 'select', param: ['-password'] },
    //         { method: 'populate', param: ['roles'] },
    //         { method: 'exec' },
    //       )
    //     )
    //   ),
    //   // pangolinFriends: await Promise.all(_pangolin.pangolinFriends.map(async (p) => await Pangolin.findById(p._id).select(['-password']).populate(['roles']).exec())),
    // }

    // resp.status(200).send(result);

    const _pangolin = await service.pangolin.findThenNormalized('findById', id);
    resp.status(200).send(_pangolin);
  })
);

//PUT http://localhost:3000/pangolins/remove-friend/:id
router.put("/remove-friend/:id",
  [handleErrorRoute(checkJWT)],
  handleErrorRoute(async (req, resp, next) => {
    const { id } = req.params;
    const { friendPangolinId } = req.body;
    const pangolin = await service.pangolin.findById(id);
    const friendPangolin = await service.pangolin.findById(friendPangolinId);

    if (pangolin === null) {
      throw new NotFoundException('Pangolin id ' + id + ' non trouvé');
    }
    if (friendPangolin === null) {
      throw new NotFoundException(`L'ami Pangolin id ${friendPangolinId} non trouvé`);
    }
    if (id !== req.userId) {
      throw new ForbiddenException('Action non autorisé');
    }

    // if ((await service.pangolin.findByIdPopulate(id, ['roles', 'pangolinFriends'])).pangolinFriends.some(p => p.id === friendPangolinId)) {
    //   console.log('got', friendPangolinId);
    // }

    if (!pangolin.pangolinFriends.includes(friendPangolinId)) {
      throw new BadRequestException(`L'ami Pangolin "${friendPangolin.username}" avec l'id ${friendPangolinId} n'existe pas`);
    }
    if (!friendPangolin.pangolinFriends.includes(id)) {
      throw new BadRequestException(`Le Pangolin id ${id} n'existe pas dans la liste d'ami de l'autre Pangolin`);
    }

    const indexFriend = pangolin.pangolinFriends.indexOf(friendPangolinId);
    pangolin.pangolinFriends.splice(indexFriend, 1);

    const indexPangolin = friendPangolin.pangolinFriends.indexOf(id);
    friendPangolin.pangolinFriends.splice(indexPangolin, 1);

    await pangolin.save();
    await friendPangolin.save();

    // const _pangolin = await service.pangolin.findByIdPopulate(id, ['roles', 'pangolinFriends']);

    // const result = {
    //   _id: _pangolin._id,
    //   username: _pangolin.username,
    //   roles: _pangolin.roles,
    //   pangolinFriends: await Promise.all(_pangolin.pangolinFriends.map(async (p) => await Pangolin.findById(p._id).select(['-password']).populate(['roles']).exec())),
    // }

    // resp.status(200).send(result);

    const _pangolin = await service.pangolin.findThenNormalized('findById', id);
    resp.status(200).send(_pangolin);
  })
);

export { router };
