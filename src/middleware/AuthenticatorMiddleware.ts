import {NextFunction, Request, Response} from "express";
import AuthenticatorService from "../service/AuthenticatorService";

class AuthenticatorMiddleware {
    authenticate(request: Request, response: Response, next: NextFunction) {
        const token = request.headers['authorization']?.split(' ')[1];

        if (!token) {
            return response.status(401).json({error: 'Access denied'});
        }

        try {
            AuthenticatorService.verifyToken(token);
            next();
        } catch (e) {
            return response.status(401).json({error: 'Invalid token'});
        }
    }
}

export default new AuthenticatorMiddleware();