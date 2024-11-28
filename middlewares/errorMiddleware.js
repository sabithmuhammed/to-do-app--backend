const errorMiddleware = (err, req, res, next) => {
    const statusCode = err?.status || 500;
    const errorMessage = err?.message || "Internal Server Error";

    res.status(statusCode).json({
        message: errorMessage,
        ...(err.details && { errors: err.details }), // Include details if available
    });
};

export default errorMiddleware;
