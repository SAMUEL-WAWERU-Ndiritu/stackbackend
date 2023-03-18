import Joi from 'joi';

export default class UserPasswordResetDto {
  password!: string;
  confirmPassword!: string;

  static validate(data: any) {
    const schema = Joi.object({
      password: Joi.string().required().min(6),
      confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    });

    return schema.validate(data);
  }
}
