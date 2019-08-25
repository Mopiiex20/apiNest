import { Injectable, Inject } from '@nestjs/common';
import { users } from './users.entity';
import * as bcrypt from "bcrypt"
import * as jwt from "jwt-then";

interface User {
  email: string,
  password: string,
  firstName: string,
  age: number
}

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly USERS_REPOSITORY: typeof users) { }

  async findAll(res): Promise<users[]> {
    try {
      const users = await this.USERS_REPOSITORY.findAll<users>({ attributes: ['_id', 'firstName', 'age', 'email', 'avatar'] });
      if (users != []) {
        return res.status(200).send({
          success: true,
          data: users
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'Users not found',
          data: null
        });

      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err
      });
    }
  }
  async findOne(req, res): Promise<users[]> {
    try {
      const user = await this.USERS_REPOSITORY.findOne<users>({ attributes: ['_id', 'firstName', 'age', 'email', 'avatar'], where: { _id: req.params.id } });
      if (user) {
        return res.status(200).send({
          success: true,
          data: user
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });

      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err
      });
    }
  }

  async delete(req, res): Promise<any> {
    try {
      const check = await this.USERS_REPOSITORY.findOne<users>({ where: { _id: req.params.id } });

      if (check) {
        await this.USERS_REPOSITORY.destroy({ where: { _id: req.params.id } });
        return res.status(200).send({
          success: true,
          message: 'Delete is done'
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });

      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err
      });
    }
  }

  async update(req, res): Promise<any> {
    try {
      const token: string = req.headers.authorization;

      if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
      }
      const decoded = await jwt.verify(token, 'secret');
      if (!(<any>decoded).isAdmin) {
        return res.status(401).send({ auth: false, message: "Unauthorized." });
      }
      const check = await this.USERS_REPOSITORY.findOne<users>({ where: { _id: req.params.id } });

      if (check) {
        const user = await this.USERS_REPOSITORY.update<users>(req.body, { where: { _id: req.params.id } });
        return res.status(200).send({
          success: true,
          message: 'Update is done'
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });

      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err
      });
    }
  }

  async registerNewUser(req, res): Promise<any> {

    const newUser: any = {
      _id: null,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      firstName: req.body.firstName,
      age: req.body.age
    };

    try {

      const matchUser: any = await this.USERS_REPOSITORY.findOne({ where: { email: newUser.email } })
      // matchUser.dataValues - object with user data

      if (!matchUser) {
        await this.USERS_REPOSITORY.create<users>(newUser);
        res.status(200).send({
          success: true,
          message: "User Successfully created"
        });
      } else return res.status(401).send({
        success: false,
        message: `User with E-mail:${matchUser.email} alredy exist!`
      });

    } catch (err) {
      res.status(500).send({
        success: false,
        message: err
      });
    }
  }
}