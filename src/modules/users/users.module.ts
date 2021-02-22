import { CacheModule, forwardRef, Module } from '@nestjs/common'
import redisStore from 'cache-manager-redis-store'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { MailModule } from '../../shared/modules/mail/mail.module'
import { StorageModule } from '../../shared/modules/storage/storage.module'
import { AuthModule } from '../../shared/modules/auth/auth.module'

import { RolesGuard } from './guards/roles.guard'
import { UserIsUser } from './guards/user-is-user.guard'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    forwardRef(() => AuthModule),
    MulterModule.register({
      dest: __dirname + '/../../../tmp'
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        ttl: 86400, // 1d
        store: redisStore,
        max: 20,
        host: configService.get<string>('cache.host'),
        port: configService.get<string>('cache.port')
      })
    }),
    StorageModule,
    MailModule
  ],
  controllers: [UsersController],
  providers: [UsersService, RolesGuard, UserIsUser],
  exports: [UsersService]
})
export class UsersModule {}
