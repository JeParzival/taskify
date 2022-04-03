import { InjectModel } from '@nestjs/mongoose';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@schemas/User.schema';

import { Model } from "mongoose";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    let authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException();
    }

    let base64 = authorization.split(' ')[1] || "";
    let [email, password] = Buffer.from(base64, 'base64').toString().split(':');
    console.log(base64, email, password);

    if (!email || !password) {
      throw new UnauthorizedException();
    }

    let user = await this.userModel.findOne({ email: email, password: password });

    if (!user) {
      throw new UnauthorizedException();
    }

    request.user = user;

    return true;
  }
}
