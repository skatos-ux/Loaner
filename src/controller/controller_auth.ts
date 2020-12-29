import Controller from './controller';
import DAOUser from '../dao/dao_user';

import * as config from '../../config.json';

import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

// https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
export default class AuthController extends Controller {

    private dao = new DAOUser();
    
    public async authentificate(firstName : string, lastName : string, password : string, req : Request, res : Response) : Promise<void> {

        if(this.hasToken(req)) {
            this.giveError(new Error("You already have a token"), res);
            return;
        }

        this.dao.checkUser(firstName, lastName, password)
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

    public hasToken(req : Request) : boolean {
        return !!req.headers['x-access-token'];
    }

    public checkToken(req : Request, res : Response, requireAdmin = false, requiredUserID = -1) : boolean {

        if(!this.hasToken(req)) {
            this.giveError(new Error("No token specified"), res, 401);
            return false;
        }

        const token: string = req.headers['x-access-token']?.toString() || "";

        try {
            const userInfo: any = jwt.verify(token, config.jwtSecret);

            const userID = userInfo["id"] || -1;
            const admin = userInfo["admin"] || false;

            if(requireAdmin && !admin) {
                this.giveError(new Error("This endpoint requires admin privileges"), res, 401);
                return false;
            }

            if(requiredUserID >= 0 && userID != requiredUserID) {
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