import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

// modules
import { UserModule } from '@modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { User, UserSchema } from '@schemas/User.schema';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/taskify"),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
