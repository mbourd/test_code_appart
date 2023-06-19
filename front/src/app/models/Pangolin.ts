import { Role } from "./Role";

export interface Pangolin {
  _id: string;
  username: string;
  roles: Role[];
  pangolinFriends: Pangolin[];
}
