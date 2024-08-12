import {Request, Response} from "express";
import UserService from "../service/UserService";
import AuthenticatorService from "../service/AuthenticatorService";

class UserController {
    async login(request: Request, response: Response) {
        try {
            const {email, password} = request.body;
            const user = await UserService.findUserToLogin(email, password);
            if (!user || user.password !== password) {
                return response.status(401).json({error: 'User or Password Incorrected'});
            }

            const token = AuthenticatorService.generateToken(user.id);
            response.status(200).json({token});
        } catch (error) {
            response.status(500).json({error: 'Error during login'});
        }
    }

    async createUser(request: Request, response: Response) {
        try {
            const {name, email, password, phone, address} = request.body;
            const user = await UserService.createUser(name, email, password, phone, address);
            response.status(200).json(user);
        } catch (e) {
            response.status(500).json({error: `Error to create user ${e}`});
        }
    }

    async updateUser(request: Request, response: Response) {
        try {
            const {id} = request.params;
            const {name, email, password, phone, address} = request.body;
            const user = await UserService.updateUser(id, name, email, password, phone, address);
            response.status(200).json(user);
        } catch (e) {
            response.status(500).json({error: `Error to update user ${e}`});
        }
    }

    async deleteUser(request: Request, response: Response) {
        try {
            const {id} = request.params;
            await UserService.deleteUser(id);
            response.status(200).json({message: 'User deleted successfull'});
        } catch (e) {
            response.status(500).json({error: `Error to delete user ${e}`});
        }
    }

    async findAllUsers(request: Request, response: Response) {
        try {
            const users = await UserService.findAllUsers();
            response.status(200).json(users);
        } catch (e) {
            response.status(500).json({error: `Error to find all users ${e}`});
        }
    }

    async findUserById(request: Request, response: Response) {
        try {
            const {id} = request.params;
            const user = await UserService.findUserById(id);
            response.status(200).json(user);
        } catch (e) {
            response.status(500).json({error: `Error to find user ${e}`});
        }
    }
}

export default new UserController();