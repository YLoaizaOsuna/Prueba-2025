import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user-dto';
import { Users } from './entities/users.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  //* Metadata: { roles: ['admin']}
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Número de página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Elementos por página',
  })
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;
    return this.usersService.getUsers(validPage, validLimit);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Omit<Users, 'password'>> {
    return this.usersService.getUser(id);
  }

  // @HttpCode(201)
  // @Post()
  // addUser(@Body() user: CreateUserDto): Promise<Omit<Users, 'password'>> {
  //   return this.usersService.addUser(user);
  // }

  @HttpCode(200)
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<Omit<Users, 'password'>> {
    return this.usersService.updateUser(id, user);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string): Promise<Omit<Users, 'password'>> {
    return this.usersService.deleteUser(id);
  }
}
