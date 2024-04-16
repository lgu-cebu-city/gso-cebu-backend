import { Body, Controller, Delete, Get, Param, Patch, Post, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginRequestPayload } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  Register(@Body() user: CreateUserDto) {
    return this.userService.Create(user);
  }

  @Post('login')
  Login(@Body() credential: LoginRequestPayload) {
    return this.userService.findOne(credential.username, credential.password);
  }

  @Patch('update/:id')
  Update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.Update(id, user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  FindOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Delete(':id')
  Delete(@Param('id') id: string) {
    return this.userService.Remove(id);
  }
}
