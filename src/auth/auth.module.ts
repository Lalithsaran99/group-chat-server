import { MiddlewareConsumer, Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthGuard, PassportModule } from "@nestjs/passport";
import { User, UserSchema } from "src/user/user.model";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.auth";
import { AuthMiddleware } from "./auth.middleware";
import { APP_GUARD } from "@nestjs/core";



@Module({
  imports: [
    PassportModule,
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    })],
  providers: [AuthService, UserService, LocalStrategy, {
    provide: APP_GUARD,
    useClass: AuthGuard('local'),
  },],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}