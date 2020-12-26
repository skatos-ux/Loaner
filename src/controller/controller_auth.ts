import Controller from './controller';
import User from '../model/user';
import DAOUser from '../dao/dao_user';

import * as config from '../../config.json';

import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
//import * as bcrypt from 'bcryptjs';

// https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
export default class AuthController extends Controller {

    private dao = new DAOUser();
    
    public async authentificate(firstName : string, lastName : string, password : string, req : Request, res : Response) : Promise<void> {

        if(this.hasToken(req)) {
            const callback = this.findError(res);
            callback(new Error("You already have a token"));
            return;
        }

        this.dao.checkUser(firstName, lastName, password)
        .then(user => {
            if(password == user.getPassword()) {
                const token = jwt.sign({ id: user.getId() }, config.jwtSecret, {
                    expiresIn: 86400 // 24h
                });

                const callback = this.findSuccess(res);
                callback({
                    auth: true,
                    token: token
                });

            } else {
                const callback = this.findError(res);
                callback(new Error("Invalid password"));
            }
        })
        .catch(err => {
            const callback = this.findError(res);
            callback(new Error("Cannot find user"));
        });
    }

    public hasToken(req : Request) : boolean {
        return !!req.headers['x-access-token'];
    }

    public checkToken(req : Request, res : Response) : boolean {

        if(!this.hasToken(req)) {
            // ...
            return false;
        }

        const token: string = req.headers['x-access-token']?.toString() || "";

        const userInfo = jwt.verify(token, config.jwtSecret);

        if(userInfo == null) {
            // ...
            return false;
        }

        return true;
    }
}