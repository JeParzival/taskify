import { DUser } from '@decorators/user.decorator';
import { AuthGuard } from '@guards/auth.guard';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDocument } from './schemas/User.schema';

import { RegisterDto } from '@dto/Register.dto';
@Controller()
export class AppController {
  constructor(private appService: AppService) { }

  @Get()
  getStatus(): string {
    return "api is live";
  }

  @Post("/register")
  Register(@Body() registerDto: RegisterDto): Promise<UserDocument> {
    return this.appService.Register(registerDto.email, registerDto.password);
  }

  @Get("/login")
  @UseGuards(AuthGuard)
  public async Login(@DUser() user: UserDocument): Promise<null | UserDocument> {
    return user;
  }
}
