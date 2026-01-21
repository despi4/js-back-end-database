export function errorHandler(err, req, res, next) {
    console.error(err);

    if (res.headersSent) return next(err);

    res.status(500).json({
        ok: false,
        error: "internal_error",
        message: "unexpected server error",
    })
}