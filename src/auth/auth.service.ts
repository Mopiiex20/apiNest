import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { users, roles, users_roles } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from "@nestjs/common"

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('AUTH_REPOSITORY') private readonly AUTH_REPOSITORY: typeof users,
    @Inject('ROLES_REPOSITORY') private readonly ROLES_REPOSITORY: typeof roles

  ) { }



  async validateUser(email: string, password: string): Promise<any> {


    const user: any = await this.AUTH_REPOSITORY.findOne<users>({ where: { email: email } })
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const matchPasswords = await bcrypt.compare(password, user.dataValues.password);
    if (user && matchPasswords) {
      return user.dataValues;
    } else throw new HttpException('Email or password is incorect!', 401);

  }

  async login(user: any) {

    let permissions: any[] = [];

    await this.AUTH_REPOSITORY.findAll<users>({
      where: { id: user.id },
      include: [{
        model: roles,
      }]
    }).then((rolen: any) => rolen.forEach(el => {
      el.roleId.forEach(element => {
        permissions.push(element.dataValues.roleName);
      });
    }))

    console.log(permissions);


    const isAdmin: boolean = (user.roleId === 0 ? true : false);
    const payload = {
      username: user.email,
      firstName: user.firstName,
      age: user.age,
      avatar: user.avatar,
      permissions: permissions,
      id: user.id
    };

    return {
      access_token: await this.jwtService.sign(payload)
    };
  }

}