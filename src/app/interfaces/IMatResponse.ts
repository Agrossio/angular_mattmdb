import {User} from "../models/User";

export interface IMatResponse {

  message: string;
  success: boolean;
  data: User;
  statusCode: number;

}
