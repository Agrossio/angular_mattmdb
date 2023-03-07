import {User} from "../models/User";

export interface IMatResponse {

  message: string;
  ok: boolean;
  response: User;
  statusCode: number;

}
