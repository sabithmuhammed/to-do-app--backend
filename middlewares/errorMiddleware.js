const errorMiddleware = (err, req, res, next) => {
    const statusCode = err?.status ? err.status : 500;
    const errormessage = err?.status ? err.message : " Internal server Error";
    res.status(statusCode).json({ message: errormessage });
};

export default errorMiddleware;
