import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards
} from '@nestjs/common'
import { classToClass } from 'class-transformer'
import { JwtAuthGuard } from '../../shared/modules/auth/guards/jwt.guard'
import { hasRoles } from './decorators/roles.decorator'
import { SignInDTO } from './dtos/sign-in.dto'
import { SignUpDTO } from './dtos/sign-up.dto'
import { UpdateUserDTO } from './dtos/update-user.dto'
import { User } from './models/entities/users.entity'
import { UserRoles } from './enums/user-roles.enum'
import { RolesGuard } from './guards/roles.guard'
import { UsersIsUser } from './guards/user-is-user.guard'
import { SignIn } from './models/SignIn'
import { CheckPasswordsMatch } from './pipes/check-passwords-match.pipe'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  @UseGuards(JwtAuthGuard, UsersIsUser || RolesGuard)
  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body(CheckPasswordsMatch) payload: UpdateUserDTO
  ): Promise<User> {
    const user = await this.usersService.updateOne(id, payload)
    return classToClass(user)
  }

  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update-role/:id')
  async updateUserRole(
    @Param('id') id: string,
    @Body('newRole') role: any
  ): Promise<User> {
    const user = await this.usersService.updateRole(id, role)
    return classToClass(user)
  }

  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteOne(id)
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
