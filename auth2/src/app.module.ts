import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import the  mongoose module 
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/satyams"),//setup a database
  UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
