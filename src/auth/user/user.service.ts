/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

  async Create(user: CreateUserDto): Promise<User | undefined> {
    delete user["id"];
    const saltOrRounds = 10;
    const password = user.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    user.password = hash;
    const nuser = this.userRepo.create(user);
    const data = this.userRepo.save(nuser);
    delete (await data).password;
    return data;
  }

  findAll() {
    const models = this.userRepo.find({
      order: {
          name: "ASC"
        }
    });
    return models;
  }

  async Update(id: string, user: UpdateUserDto) {
    let _user = await this.userRepo.findOneOrFail({ id: id });

    _user.username = user.username;
    _user.empId = user.empId;
    _user.name = user.name;
    _user.userType = user.userType;
    _user.typeId = user.typeId;
    _user.typeName = user.typeName;
    _user.positionId = user.positionId;
    _user.positionName = user.positionName;
    _user.userEmployeeId = user.userEmployeeId;
    _user.userEmployeeName = user.userEmployeeName;

    if (user.password != "***********") {
      const saltOrRounds = 10;
      const password = user.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      _user.password = hash;
    }

    await this.userRepo.update(id, _user);

    return true;
  }

  async findOne(user: string, pwd: string) {
    let retVal = {
      isUserValid: false,
      userId: "",
      username: "",
      empId: "",
      name: "",
      userType: "",
      typeId: "",
      typeName: "",
      positionId: "",
      positionName: "",
      userEmployeeId: "",
      userEmployeeName: "",
    }
    let _user = await this.userRepo.findOne({ username: user, IsActive: true });

    if (_user) {
      const res = await bcrypt.compare(pwd, _user.password).then(function(result) {
        return result;
      });

      if (res) {
        retVal = {
          isUserValid: res,
          userId: _user.id,
          username: _user.username,
          empId: _user.empId,
          name: _user.name,
          userType: _user.userType,
          typeId: _user.typeId,
          typeName: _user.typeName,
          positionId: _user.positionId,
          positionName: _user.positionName,
          userEmployeeId: _user.userEmployeeId,
          userEmployeeName: _user.userEmployeeName,
        }
      }
    }

    return retVal;
  }
  
  async findOneById(id: string): Promise<User | undefined> {
    return this.userRepo.findOneOrFail(id);
  }

  async Remove(id: string) {
    const model = await this.findOneById(id);
    model.IsActive = false;
    return this.userRepo.update(id, model);
  }

}
