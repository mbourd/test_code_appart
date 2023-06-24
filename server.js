import './db.js';

import express from "express";
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import cookieSession from "cookie-session";

import { Service } from './services/Service.js';
import { errorHandler } from './middlewares/errorHandler.js';

import { router as routeAuth } from './Controller/AuthController.js';
import { router as routePangolin } from './Controller/PangolinController.js';
import { router as routeRole } from './Controller/RoleController.js';

export const service = new Service();

const app = express();

//added middleware code
app.use(cors({
  // origin: "http://192.168.1.32:4200",
  origin: "http://localhost:4200",
  credentials: true,
}));
app.use(compression());
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "user-app-session",
    secret: "COOKIE_SECRET",
    httpOnly: true
  })
);
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept",
    // "Authorization, Origin, Content-Type, Accept",
    // "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use('/auth', routeAuth);
app.use('/pangolins', routePangolin);
app.use('/roles', routeRole);
app.use(errorHandler);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`server listening at port : ${port}`);
});
