import Controller from './controller';
import DAOUser from '../dao/dao_user';

import * as config from '../../config.json';

import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default class AuthController extends Controller {

    private dao = new DAOUser();
    
    public async authentificate(email : string, password : string, req : Request, res : Response) : Promise<void> {

        if(this.hasToken(req)) {
            this.giveError(new Error("You already have a token"), res);
            return;
        }

        this.dao.checkUser(email, password)
        .then((user) => {
            const token = jwt.sign({ id: user.getId(), admin: user.isAdmin() }, config.jwtSecret, {
                expiresIn: "1h"
            });

            this.giveSuccess({
                auth: true,
                token: token,
                user: user
            }, res);
        })
        .catch((err : Error) => {
            this.giveError(new Error("Invalid name or password"), res);
        });
    }

    public async changePassword(email : string, oldPassword : string, newPassword : string,
        req : Request, res : Response) : Promise<void> {

            if(newPassword.length == 0) {
                this.giveError(new Error("New password can't be empty"), res);
                return;
            }
        
            this.dao.checkUser(email, oldPassword)
            .then((user) => {
                if(this.checkToken(req, res, user.isAdmin(), user.getId())) {
                    this.dao.changePassword(email, newPassword).then(() => {
                        this.giveSuccess({
                            success: true,
                            user: user
                        }, res, 201)})
                    .catch(this.findError(res));
                }
            })
            .catch((err : Error) => {
                this.giveError(new Error("Invalid name or old password"), res);
            });
    }

    public hasToken(req : Request) : boolean {
        return !!req.headers['x-access-token'];
    }

    public checkToken(req : Request, res : Response, requireAdmin = false, requiredUserID = "") : boolean {

        if(!this.hasToken(req)) {
            this.giveError(new Error("No token specified"), res, 401);
            return false;
        }

        const token: string = req.headers['x-access-token']?.toString() || "";

        try {
            const userInfo: any = jwt.verify(token, config.jwtSecret);

            const userID = userInfo["id"] || "";
            const admin = userInfo["admin"] || false;

            if(requireAdmin && !admin) {
                this.giveError(new Error("This endpoint requires admin privileges"), res, 401);
                return false;
            }

            if(requiredUserID != "" && userID != requiredUserID) {
                this.giveError(new Error("Invalid user"), res, 401);
                return false;
            }

        } catch {
            this.giveError(new Error("Invalid token"), res, 401);
            return false;
        }

        return true;
    }
}