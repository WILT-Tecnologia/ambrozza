import { Request } from 'express';

export interface AuthenticatedShopkeeperRequest extends Request {
  user: {
    sub: string;
    email: string;
  };
}
