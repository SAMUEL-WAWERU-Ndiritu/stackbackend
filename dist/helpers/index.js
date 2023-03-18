"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.responseHandler = void 0;
const responseHandler = (success, code = 400, message = 'valid', data) => ({
    success,
    code,
    message,
    data,
});
exports.responseHandler = responseHandler;
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next))
    .catch((error) => {
    console.log(error);
    const payload = (0, exports.responseHandler)(false, 500, 'Something went wrong', null);
    res.status(payload.code).json(payload);
});
exports.asyncHandler = asyncHandler;
