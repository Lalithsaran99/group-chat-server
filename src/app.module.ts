import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb+srv://lalith:Lalith1999@cluster0.xsote.mongodb.net/test?authSource=admin&replicaSet=atlas-7tl7ih-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
