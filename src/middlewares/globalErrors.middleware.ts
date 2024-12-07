import { Request, Response, NextFunction } from "express";

const devErrors = (error: any, res: Response) => {
  res.status(error.statusCode!).json({
    error: error,
    status: error.status,
    message : error.message,
    stack:error.stack
  });
};



const prodErrors = (error: any, res: Response) => {
  res.status(error.statusCode!).json({
    status: error.status,
    message : error.message,
  });
};



const globalErrors = (error: any,req:Request, res: Response,next:NextFunction) => {
  error.statusCode = error.statusCode || 500;
  error.status= error.status || 'Error';
  if(process.env.NODE_ENV === 'development'){
    devErrors(error,res)
  }else{
    prodErrors(error,res)
  }
};


export default globalErrors;