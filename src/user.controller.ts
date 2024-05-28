import { Controller, Get, Post, Body, Query, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  getUsers(@Query('_page') _page: number): Promise<User[]> {
    _page = _page || 1;
    console.log({ _page });

    return this.userService.users({
      skip: (_page - 1) * 20,
      take: 20,
    });
  }

  @Post()
  async signupUser(
    @Body() userData: { firstName?: string; email: string; password: string },
  ): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }

  @Delete('remove/all')
  async deleteAllUser(): Promise<{ count: number }> {
    return this.userService.deleteAllUsers();
  }
}
