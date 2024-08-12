import jwt from 'jsonwebtoken';

class AuthenticatorService {
    private JWT_SECRET_KEY: string = 'SECRET_KEY_TO_JWT';

    generateToken(userId: string): string {
        return jwt.sign({id: userId}, this.JWT_SECRET_KEY, {expiresIn: '1h'});
    }

    verifyToken(token: string) {
        try {
            return jwt.verify(token, this.JWT_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }
}

export default new AuthenticatorService();