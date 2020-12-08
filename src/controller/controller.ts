import { Response } from 'express';

type Callback = (a : any) => void;

export default abstract class Controller {

    protected findSuccess(res : Response) : Callback {
        return (result) => {
            res.status(200); // Found
            res.json(result);
        }
    }

    protected editSuccess(res : Response) : Callback {
        return () => {
            res.status(201); // Created/Updated/Deleted
            res.json({});
        }
    }

    protected serverError(res : Response) : Callback {
        return (error) => {
            res.status(500); // Internal server Error
            res.json(error);
        }
    }

    protected findError(res : Response) : Callback {
        return (error) => {
            res.status(404); // Not found
            res.json(error);
        }
    }
}