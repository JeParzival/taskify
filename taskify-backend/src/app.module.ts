import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/taskify"),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
