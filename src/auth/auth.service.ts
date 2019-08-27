import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { users, roles, users_roles } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { loadPartialConfig } from '@babel/core';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('AUTH_REPOSITORY') private readonly AUTH_REPOSITORY: typeof users,
    @Inject('ROLES_REPOSITORY') private readonly ROLES_REPOSITORY: typeof roles

  ) { }



  async validateUser(email: string, password: string): Promise<any> {

    const user: any = await this.AUTH_REPOSITORY.findOne<users>({ where: { email: email } })

    console.log(user.get("datauser"));

    if (!user) {
      return null
    }

    const matchPasswords = await bcrypt.compare(password, user.dataValues.password);
    if (user && matchPasswords) {
      return user.dataValues;
    }
    return null;
  }

  async login(user: any) {

    let permissions: any[]=[];

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
      access_token: this.jwtService.sign(payload)
    };
  }

}