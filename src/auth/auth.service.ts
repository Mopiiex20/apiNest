import { Injectable, Inject } from '@nestjs/common';
import { auth } from './auth.entity';
import * as bcrypt from "bcrypt"
import * as jwt from "jwt-then";
import { users } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY') private readonly AUTH_REPOSITORY: typeof users) { }

  async Authentification(req, res): Promise<any> {

    const { email, password } = req.body;

    console.log(req.body);

    const user: any = await this.AUTH_REPOSITORY.findOne<users>({ attributes: ['_id', 'password','firstName', 'roleId', 'age', 'email', 'avatar'], where: { email: email } });


    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
        isLoggedIn: false
      });
    }

    const matchPasswords = await bcrypt.compare(password, user.dataValues.password);

    if (!matchPasswords) {
      return res.status(401).send({
        success: false,
        message: "Not authorized",
        isLoggedIn: false
      });
    }
    const isAdmin: boolean = (user.roleId === 0 ? true : false);

    const token = await jwt.sign(
      {
        email: user.dataValues.email,
        firstName: user.dataValues.firstName,
        age: user.dataValues.age,
        avatar: user.dataValues.avatar,
        isAdmin: isAdmin,
        _id: user.dataValues._id
      },
      'secret',
      { expiresIn: "10h" }
    );

    res.status(200).send({
      success: true,
      message: "Token generated Successfully",
      token: token,
      isLoggedIn: true
    });

  }

}