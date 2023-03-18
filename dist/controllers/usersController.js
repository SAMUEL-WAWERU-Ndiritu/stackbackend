"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.deleteUser = exports.updateUser = exports.getOneUser = exports.getAllUsers = exports.register = exports.login = void 0;
const helpers_1 = require("../helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const uuid_1 = require("uuid");
const UserPasswordResetDto_1 = __importDefault(require("../dtso/UserPasswordResetDto "));
const nodemailer_1 = __importDefault(require("nodemailer"));
// interface UserPasswordResetDto {
//   password: string;
//   confirmPassword: string;
// }
exports.login = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield config_1.default.query('SELECT * FROM usp_GetUserByEmail($1)', [email]);
        const user = result.rows[0];
        if (!user) {
            return res.status(400).json((0, helpers_1.responseHandler)(false, 400, 'Invalid credentials', null));
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json((0, helpers_1.responseHandler)(false, 400, 'Invalid credentials', null));
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'default-secret');
        return res.status(200).json((0, helpers_1.responseHandler)(true, 200, 'Login successful', { token }));
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
// export const register = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;
//     const existingUser: QueryResult = await pool.query(
//       'SELECT * FROM users WHERE email = $1',
//       [email],
//     );
//     if (existingUser.rowCount > 0) {
//       return res.status(400).json(responseHandler(false, 400, 'Email already registered', null));
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result: QueryResult = await pool.query(
//       'INSERT INTO users (name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//       [name, email, hashedPassword, new Date(), new Date()],
//     );
//     const registeredUser = result.rows[0];
//     const token = jwt.sign({ id: registeredUser.id }, process.env.JWT_SECRET || 'default-secret');
//     return res
//       .status(201)
//       .json(responseHandler(true, 201, 'User registered', { token }));
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json(responseHandler(false, 500, 'Server Error', null));
//   }
// });
exports.register = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield config_1.default.query('SELECT * FROM usp_GetUserByEmail($1)', [email]);
        if (existingUser.rowCount > 0) {
            return res.status(400).json((0, helpers_1.responseHandler)(false, 400, 'Email already registered', null));
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield config_1.default.query('SELECT usp_AddUser($1, $2, $3)', [name, email, hashedPassword]);
        const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET || 'default-secret');
        return res
            .status(201)
            .json((0, helpers_1.responseHandler)(true, 201, 'User registered', { token }));
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
// export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const result: QueryResult = await pool.query('SELECT * FROM users');
//     const users = result.rows;
//     return res
//       .status(200)
//       .json(responseHandler(true, 200, 'Users found', users));
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json(responseHandler(false, 500, 'Server Error', null));
//   }
// });
exports.getAllUsers = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield config_1.default.query('SELECT * FROM get_all_users()');
        console.log(result);
        const users = result.rows;
        return res
            .status(200)
            .json((0, helpers_1.responseHandler)(true, 200, 'Users found', users));
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
// export const getOneUser = asyncHandler(async (req: Request, res: Response) => {
//     try {
//     const { id } = req.params;const result: QueryResult = await pool.query(
//         'SELECT * FROM users WHERE id = $1',
//         [id],
//       );
//       const user = result.rows[0];
//       if (!user) {
//         return res.status(404).json(responseHandler(false, 404, 'User not found', null));
//       }
//       return res
//         .status(200)
//         .json(responseHandler(true, 200, 'User found', user));
//     } catch (err) {
//         console.log(err);
//         return res
//         .status(500)
//         .json(responseHandler(false, 500, 'Server Error', null));
//         }
//         });
exports.getOneUser = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield config_1.default.query('SELECT * FROM get_user_by_id($1)', [id]);
        const user = result.rows[0];
        if (!user) {
            return res.status(404).json((0, helpers_1.responseHandler)(false, 404, 'User not found', null));
        }
        return res
            .status(200)
            .json((0, helpers_1.responseHandler)(true, 200, 'User found', user));
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
exports.updateUser = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const existingUser = yield config_1.default.query('SELECT * FROM get_user_by_id($1)', [id]);
        if (existingUser.rowCount === 0) {
            return res.status(404).json((0, helpers_1.responseHandler)(false, 404, 'User not found', null));
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const result = yield config_1.default.query('UPDATE users SET name = $1, email = $2, password = $3, updated_at = $4 WHERE id = $5 RETURNING *', [name, email, hashedPassword, new Date(), id]);
        const updatedUser = result.rows[0];
        return res
            .status(200)
            .json((0, helpers_1.responseHandler)(true, 200, 'User updated', updatedUser));
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
//  export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
//           try {
//           const { id } = req.params;
//           const existingUser: QueryResult = await pool.query(
//               'SELECT * FROM users WHERE id = $1',
//               [id],
//             );
//             if (existingUser.rowCount === 0) {
//               return res.status(404).json(responseHandler(false, 404, 'User not found', null));
//             }
//             const result: QueryResult = await pool.query(
//               'UPDATE users SET deleted_at = $1 WHERE id = $2 RETURNING *',
//               [new Date(), id],
//             );
//             const deletedUser = result.rows[0];
//             return res
//               .status(200)
//               .json(responseHandler(true, 200, 'User deleted', deletedUser));
//           } catch (err) {
//               console.log(err);
//               return res
//               .status(500)
//               .json(responseHandler(false, 500, 'Server Error', null));
//               }
//     });
exports.deleteUser = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingUser = yield config_1.default.query('SELECT * FROM get_user_by_id($1)', [id]);
        if (existingUser.rowCount === 0) {
            return res.status(404).json((0, helpers_1.responseHandler)(false, 404, 'User not found', null));
        }
        yield config_1.default.query('SELECT usp_DeleteUser($1)', [id]);
        return res
            .status(200)
            .json((0, helpers_1.responseHandler)(true, 200, 'User deleted', null));
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
// Forgot password controller
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield config_1.default.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Generate reset token and save it to the database
        const resetToken = (0, uuid_1.v4)();
        yield config_1.default.query('UPDATE users SET reset_token = $1, reset_token_expires = NOW() + INTERVAL \'1 hour\' WHERE email = $2', [resetToken, email]);
        // Send reset password link to user's email
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 587,
            auth: {
                user: 'samuelnderitu495@gmail.com',
                pass: 'vlnanwdotnasiywb'
            },
        });
        const mailOptions = {
            from: 'your_gmail_account',
            to: email,
            subject: 'Reset your password',
            html: `Click <a href="http://localhost:3000/reset-password/${resetToken}">here</a> to reset your password. This link is valid for one hour.`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to send email' });
            }
            console.log('Email sent: ' + info.response);
        });
        res.json({ message: 'Reset password link sent to your email' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.forgotPassword = forgotPassword;
// Reset password controller
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resetToken, password, confirmPassword } = req.body;
        // Validate password and confirm password
        const { error } = UserPasswordResetDto_1.default.validate({ password, confirmPassword });
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        // Verify reset token and check if it's still valid
        const user = yield config_1.default.query('SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()', [resetToken]);
        if (user.rows.length === 0) {
            res.status(404).json({ error: 'Invalid or expired reset token' });
            return;
        }
        // Hash the new password and update it in the database
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield config_1.default.query('UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE reset_token = $2', [hashedPassword, resetToken]);
        res.json({ message: 'Password reset successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.resetPassword = resetPassword;
