import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) { }

    async use(req, res, next: NextFunction) {
        const authToken = req.headers['authorization'];
        if (authToken) {
            const user = await this.authService.validateToken(authToken);
            if (user) {
                req.user = user; // attach the user object to the request
                next();
            } else {
                res.setHeader('WWW-Authenticate', 'Bearer');
                res.status(401).send('Unauthorized');
            }
        } else {
            res.setHeader('WWW-Authenticate', 'Bearer');
            res.status(401).send('Unauthorized');
        }
    }
}