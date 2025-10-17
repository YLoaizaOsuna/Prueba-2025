import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;
    return this.usersService.getUsers(validPage, validLimit);
  }

  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @HttpCode(201)
  @Post()
  addUser(@Body() user: any) {
    return this.usersService.addUser(user);
  }

  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() user: any) {
    return this.usersService.updateUser(id, user);
  }

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
