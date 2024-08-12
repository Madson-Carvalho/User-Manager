import {Router} from "express";
import UserController from "../controller/UserController";
import AuthenticatorMiddleware from "../middleware/AuthenticatorMiddleware";

const router = Router();

router.post('/login', UserController.login)
router.get('/find-all-users', AuthenticatorMiddleware.authenticate, UserController.findAllUsers);
router.get('/find-user-by-id/:id', AuthenticatorMiddleware.authenticate, UserController.findUserById);
router.post('/create-user', UserController.createUser);
router.put('/update-user/:id', AuthenticatorMiddleware.authenticate, UserController.updateUser);
router.delete('/delete-user/:id', AuthenticatorMiddleware.authenticate, UserController.deleteUser);

export default router;