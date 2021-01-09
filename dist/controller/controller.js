"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    findSuccess(res) {
        return (result) => {
            res.status(200);
            res.json(result);
        };
    }
    editSuccess(res) {
        return () => {
            res.status(201);
            res.json({});
        };
    }
    serverError(res) {
        return (error) => {
            res.status(500);
            res.json(this.createError(error));
        };
    }
    findError(res) {
        return (error) => {
            res.status(400);
            res.json(this.createError(error));
        };
    }
    giveSuccess(result, res, code = 200) {
        res.status(code);
        res.json(result);
    }
    giveError(err, res, code = 400) {
        res.status(code);
        res.json(this.createError(err));
    }
    createError(err) {
        return {
            error: true,
            message: err.message
        };
    }
}
exports.default = Controller;
