import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { classToClass } from 'class-transformer'

import { JwtAuthGuard } from '../../shared/modules/auth/guards/jwt.guard'

import { hasRoles } from './decorators/roles.decorator'
import { RolesGuard, UserIsUser } from './guards'
import { CheckPasswordsMatch } from './pipes/check-passwords-match.pipe'
import { UsersService } from './users.service'
import { AuthUser } from './decorators/auth-user.decorator'
import { SignIn, SignInDTO, SignUpDTO, User } from './domain'
import { UserRoles } from './enums/user-roles.enum'
import { UpdateUserDTO } from './dtos/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CacheTTL(10)
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll()
    return users.map(user => classToClass(user))
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id)
    return classToClass(user)
  }

  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, UserIsUser || RolesGuard)
  @Put(':id')
  async updateOne(
    @AuthUser() user: User,
    @Body(CheckPasswordsMatch) payload: UpdateUserDTO
  ): Promise<User> {
    return this.usersService.updateOne(user.id, payload)
  }

  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update-role/:id')
  async updateUserRole(
    @AuthUser() user: User,
    @Body('newRole') role: any
  ): Promise<User> {
    const updatedUser = await this.usersService.updateRole(user.id, role)
    return classToClass(updatedUser)
  }

  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, UserIsUser || RolesGuard)
  @Delete(':id')
  async deleteOne(@AuthUser() user: User): Promise<void> {
    return this.usersService.deleteOne(user.id)
  }

  @Post('signup')
  async signUp(@Body(CheckPasswordsMatch) payload: SignUpDTO): Promise<User> {
    const user = await this.usersService.singUp(payload)
    return classToClass(user)
  }

  @Post('signin')
  async signIn(@Body() payload: SignInDTO): Promise<SignIn> {
    return this.usersService.signIn(payload)
  }
}
