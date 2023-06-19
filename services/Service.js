import { AuthService } from "./auth/AuthService.js";
import { PangolinService } from "./pangolin/PangolinService.js";
import { RoleService } from "./role/RoleService.js";

export class Service {
  constructor() {
    this.pangolin = new PangolinService();
    this.role = new RoleService();
    this.auth = new AuthService();
  }
}
