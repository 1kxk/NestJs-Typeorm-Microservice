import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'

import { authConfig, cacheConfig, storageConfig } from './config'
import sqlDatabaseConfig from './config/database.config'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './shared/modules/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [authConfig, storageConfig, cacheConfig],
      envFilePath: ['.env']
    }),
    TypeOrmModule.forRootAsync(sqlDatabaseConfig[0] as TypeOrmModuleOptions),
    MongooseModule.forRootAsync(sqlDatabaseConfig[1] as MongooseModuleOptions),
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
