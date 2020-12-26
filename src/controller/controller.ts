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
            res.json(this.treatError(error));
        }
    }

    protected findError(res : Response) : ErrorCallback {
        return (error) => {
            res.status(404); // Not found
            res.json(this.treatError(error));
        }
    }

    private treatError(err : Error) : any {
        return {
            error: true,
            message: err.message
        }
    }
}