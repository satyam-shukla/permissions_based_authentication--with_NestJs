import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dtos/create-user-dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { UserPermissions } from './enums/role.enum';
import { Roles } from './enums/roles.decorator';
import { RolesGuard } from './enums/roles.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService, private userService:UserService){}
    @Post("/register")
    async register(@Body() createUserDTO:CreateUserDTO){
        const user = await this.userService.addUser(createUserDTO);
        return user;
    }

    @Post('/login')
    async login(@Body()payload){
        const user = await this.authService.login(payload);
        
        if(!user){
            throw new UnauthorizedException()
        }
        return user;
    }


    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(UserPermissions.CREATE)
    @Get('/user')
    getProfile(@Body() req){
        console.log(req,"----------------------")
        return req.user
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserPermissions.READ)
    @Get('/admin')
    getDashboard(@Request() req) {
        return req.user;
    }
}
