import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private jwtService: JwtService) { }


    async validateToken(token: string): Promise<User | null> {
        try {
            // decode the token and extract the user id
            const decoded = await this.jwtService.verify(token, { secret: 'secret_key' });
            const userId = decoded['sub'];

            // find the user by id
            const user = await this.usersService.findById(userId);
            if (!user) {
                throw new UnauthorizedException();
            }

            // return the user object
            return user;
        } catch (err) {
            // handle invalid or expired tokens
            console.log('Error validating token:', err);
            throw new UnauthorizedException();
        }
    }
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByEmail(email);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }
    async login(user: any) {
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}