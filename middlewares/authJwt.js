import Jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';
import AccessDeniedException from '../Exceptions/AccessDeniedException.js';
import ForbiddenException from '../Exceptions/ForbiddenException.js';

export async function checkJWT(req, resp, next) {
  // const token = req.session.token;
  const token = req.headers["x-access-token"];
  // const token = req.headers["Authorization"];

  if (!token) {
    throw new ForbiddenException('No session token provided');
  }

  Jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        throw new AccessDeniedException('Session expiré');
      } else throw new AccessDeniedException('Non autorisé');
    }

    req.userId = decoded.id;

    next();
  });
}
