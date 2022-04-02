import { UserDocument } from '@schemas/User.schema';
import { Model } from 'mongoose';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@schemas/User.schema';

@Injectable()
export class AppService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    public async Register(email: string, password: string): Promise<UserDocument> {
        let flag = await this.userModel.findOne({ email: email, password: password });

        if (flag) {
            throw new NotAcceptableException('User already exists');
        }

        let user = await this.userModel.create({
            email: email,
            password: password
        });

        return user;
    }
}
