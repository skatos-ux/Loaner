import { Response } from 'express';

type ResultCallback = (a : any) => void;
type ErrorCallback = (err : Error) => void;

export default abstract class Controller {

    protected findSuccess(res : Response) : ResultCallback {
        return (result) => {
            res.status(200); // Found
            res.json(result);
        }
    }

    protected editSuccess(res : Response) : ResultCallback {
        return () => {
            res.status(201); // Created/Updated/Deleted
            res.json({});
        }
    }

    protected serverError(res : Response) : ErrorCallback {
        return (error) => {
            res.status(500); // Internal server Error
            res.json(this.createError(error));
        }
    }

    protected findError(res : Response) : ErrorCallback {
        return (error) => {
            res.status(400); // Bad request
            res.json(this.createError(error));
        }
    }

    protected giveSuccess(result: any, res : Response, code = 200) : void {
        res.status(code);
        res.json(result);
    }

    protected giveError(err : Error, res : Response, code = 400) : void {
        res.status(code);
        res.json(this.createError(err));
    }

    private createError(err : Error) : any {
        return {
            error: true,
            message: err.message
        }
    }
}