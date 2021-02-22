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
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { classToClass } from 'class-transformer'

import { JwtAuthGuard } from '../../shared/modules/auth/guards/jwt.guard'

import { hasRoles } from './decorators/roles.decorator'
import { RolesGuard } from './guards/roles.guard'
import { UserIsUser } from './guards/user-is-user.guard'
import { CheckPasswordsMatch } from './pipes/check-passwords-match.pipe'
import { UsersService } from './users.service'
import { AuthUser } from './decorators/auth-user.decorator'
import {
  SignIn,
  SignInDTO,
  SignUpDTO,
  UpdateUserDTO,
  User,
  UserRoles
} from './models'

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
    const updatedUser = await this.usersService.updateOne(user.id, payload)
    return classToClass(updatedUser)
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

  @Patch('avatar')
  @UseGuards(JwtAuthGuard, UserIsUser)
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @AuthUser() user: User,
    @UploadedFile() file: Express.Multer.File
  ): Promise<User> {
    const updatedUser = await this.usersService.updateAvatar(user.id, file)
    return classToClass(updatedUser)
  }
}
