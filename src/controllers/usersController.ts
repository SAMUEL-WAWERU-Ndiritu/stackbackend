import { Response, Request } from 'express';
import { responseHandler, asyncHandler } from '../helpers';
import { Pool, QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config';
import { v4 as uuidv4 } from "uuid";
import UserPasswordResetDto from '../dtso/UserPasswordResetDto ';
import nodemailer from 'nodemailer';

interface User {
  name: string;
  email: string;
  password: string;
}
// interface UserPasswordResetDto {
//   password: string;
//   confirmPassword: string;
// }

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result: QueryResult = await pool.query(
      'SELECT * FROM usp_GetUserByEmail($1)',
      [email],
    );

    const user = result.rows[0];
    if (!user) {
      return res.status(400).json(responseHandler(false, 400, 'Invalid credentials', null));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json(responseHandler(false, 400, 'Invalid credentials', null));
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'default-secret');


    return res.status(200).json(responseHandler(true, 200, 'Login successful', { token }));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

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

export const register = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser: QueryResult = await pool.query(
      'SELECT * FROM usp_GetUserByEmail($1)',
      [email],
    );

    if (existingUser.rowCount > 0) {
      return res.status(400).json(responseHandler(false, 400, 'Email already registered', null));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'SELECT usp_AddUser($1, $2, $3)',
      [name, email, hashedPassword],
    );

    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'default-secret');

    return res
      .status(201)
      .json(responseHandler(true, 201, 'User registered', { token }));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});


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

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result: QueryResult = await pool.query('SELECT * FROM get_all_users()');
    console.log(result);
    const users = result.rows;

    return res
      .status(200)
      .json(responseHandler(true, 200, 'Users found', users));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});











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
export const getOneUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result: QueryResult = await pool.query(
      'SELECT * FROM get_user_by_id($1)',
      [id],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json(responseHandler(false, 404, 'User not found', null));
    }

    return res
      .status(200)
      .json(responseHandler(true, 200, 'User found', user));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});
  
 export const updateUser = asyncHandler(async (req: Request, res: Response) => {
        try {
        const { id } = req.params;
        const { name, email, password } = req.body;const existingUser: QueryResult = await pool.query(
          'SELECT * FROM get_user_by_id($1)',
            [id],
          );
          
          if (existingUser.rowCount === 0) {
            return res.status(404).json(responseHandler(false, 404, 'User not found', null));
          }
          
          const hashedPassword = await bcrypt.hash(password, 10);
          
          const result: QueryResult = await pool.query(
            'UPDATE users SET name = $1, email = $2, password = $3, updated_at = $4 WHERE id = $5 RETURNING *',
            [name, email, hashedPassword, new Date(), id],
          );
          
          const updatedUser = result.rows[0];
          
          return res
            .status(200)
            .json(responseHandler(true, 200, 'User updated', updatedUser));
        } catch (err) {
            console.log(err);
            return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
            }
       });
            
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
                
                
                
  export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const existingUser: QueryResult = await pool.query(
        'SELECT * FROM get_user_by_id($1)',
        [id],
      );
      
      if (existingUser.rowCount === 0) {
        return res.status(404).json(responseHandler(false, 404, 'User not found', null));
      }
  
      await pool.query(
        'SELECT usp_DeleteUser($1)',
        [id],
      );
  
      return res
        .status(200)
        .json(responseHandler(true, 200, 'User deleted', null));
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json(responseHandler(false, 500, 'Server Error', null));
    }
  });
        
 
  // Forgot password controller
  export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      // Generate reset token and save it to the database
      const resetToken = uuidv4();
      await pool.query(
        'UPDATE users SET reset_token = $1, reset_token_expires = NOW() + INTERVAL \'1 hour\' WHERE email = $2',
        [resetToken, email],
      );
  
      // Send reset password link to user's email
      const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        service:'gmail',
        port:587,
        auth:{
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
  
      transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent: ' + info.response);
      });
  
      res.json({ message: 'Reset password link sent to your email' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Reset password controller
  export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { resetToken, password, confirmPassword } = req.body;
  
      // Validate password and confirm password
      const { error } = UserPasswordResetDto.validate({ password, confirmPassword });
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
      // Verify reset token and check if it's still valid
      const user = await pool.query(
        'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()',
        [resetToken],
      );
      if (user.rows.length === 0) {
        res.status(404).json({ error: 'Invalid or expired reset token' });
        return;
      }
      // Hash the new password and update it in the database
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        'UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE reset_token = $2',
        [hashedPassword, resetToken],
      );
  
      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };