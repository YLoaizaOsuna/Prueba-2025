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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BlockedUserDto } from './dto/blocked-user.dto';

//Get/users (con guard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @HttpCode(200)
  @ApiBearerAuth('access-token')
  @Get()
  @Roles(Role.Admin)
  //* Metadata: { roles: ['admin']}
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Listar usuarios(solo Admin)',
    description:
      'Devuelve una lista paginada de usuarios. Requiere token JWT de un usuario con rol admin',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Número de página (por defecto 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Elementos por página (por defecto 5)',
  })
  @ApiOkResponse({
    description: 'Lista de usuarios',
    type: Users,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'No autenticado / token inválido',
  })
  @ApiForbiddenResponse({
    description: 'El usuario no tiene permisos de administrador',
  })
  async getUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<Omit<Users, 'password'>[]> {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;

    return this.usersService.getUsers(validPage, validLimit);
  }

  //* Filtrar por pais (1 paso)
  // async getUsers(
  //   @Query('page') page?: string,
  //   @Query('limit') limit?: string,
  //   @Query('country') country?: string,
  // ) {
  //   const pageNum = Number(page);
  //   const limitNum = Number(limit);

  //   const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
  //   const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;
  //   return this.usersService.getUsers(validPage, validLimit, country || '');
  // }
  //* Ordenar asc por ID (1 paso)
  // async getUsers(
  //   @Query('page') page?: string,
  //   @Query('limit') limit?: string,
  //   @Query('order') order?: string,
  // ): Promise<Omit<Users, 'password'>[]> {
  //   const pageNum = Number(page);
  //   const limitNum = Number(limit);

  //   const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
  //   const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;
  //   const validOrder = order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  //   return await this.usersService.getUsers(validPage, validLimit, validOrder);
  // }

  //Get/users/:id (con guard)
  @HttpCode(200)
  @ApiBearerAuth('access-token')
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Obtener un usuario por Id',
  })
  @ApiOkResponse({
    description: 'Usuario encontrado',
    type: Users,
  })
  @ApiNotFoundResponse({
    description: 'Usuario no encontrado',
  })
  @ApiUnauthorizedResponse({
    description: 'No autenticado / token inválido',
  })
  getUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Omit<Users, 'password' | 'isAdmin' | 'isSuperAdmin'>> {
    return this.usersService.getUserById(id);
  }

  //Put/users/:id (con guard)
  @HttpCode(200)
  @ApiBearerAuth('access-token')
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Actualizar datos de un usuario',
  })
  @ApiOkResponse({
    description: 'Usuario actualizado correctamente',
    type: Users,
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos',
  })
  @ApiUnauthorizedResponse({
    description: 'No autenticado / token inválido',
  })
  @ApiForbiddenResponse({
    description: 'El usuario no tiene permisos de administrador',
  })
  updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<Omit<Users, 'password'>> {
    return this.usersService.updateUser(id, user);
  }
  //* crear ruta PUT/users/blocked/:id (4 paso y paso 7 proteger rutas de Admin con los Guards)
  @Put('blocked/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  blockUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: BlockedUserDto,
  ) {
    return this.usersService.blockUser(id, dto.isBlocked);
  }

  //Delete/users/:id (con guard)
  @HttpCode(200)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Eliminar un usuario (requiere autenticación)',
  })
  @ApiOkResponse({
    description: 'usuario eliminado correctamente',
    type: Users,
  })
  @ApiUnauthorizedResponse({
    description: 'No autenticado / token inválido',
  })
  deleteUser(@Param('id') id: string): Promise<Omit<Users, 'password'>> {
    return this.usersService.deleteUser(id);
  }
  //* 4 paso borrado Logico (reemplazar delete)
  //   deleteUser(@Param('id', ParseUUIDPipe) id: string) {
  //     return this.usersService.deleteUser(id);
  // }
}
