import express from 'express';

import NotFoundException from '../Exceptions/NotFoundException.js';
import { service } from '../server.js';
import BadRequestException from '../Exceptions/BadRequestException.js';
import AccessDeniedException from '../Exceptions/AccessDeniedException.js';
import { handleErrorRoute } from '../middlewares/errorHandler.js';
import { checkJWT } from '../middlewares/authJwt.js';

const router = express.Router();

router.get('/',
  handleErrorRoute(async (req, resp) => {
    const roles = await service.role.findAll();

    resp.status(200).send(roles);
  })
);

export { router };
