import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'

import {
  nosqlDatabase,
  sqlDatabase,
  authConfig,
  cacheConfig,
  storageConfig
} from './config'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './shared/modules/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        sqlDatabase,
        nosqlDatabase,
        authConfig,
        storageConfig,
        cacheConfig
      ],
      envFilePath: ['.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        name: configService.get('sqlDatabase.name'),
        host: configService.get('sqlDatabase.host'),
        port: configService.get('sqlDatabase.port'),
        username: configService.get('sqlDatabase.username'),
        password: configService.get('sqlDatabase.password'),
        database: configService.get('sqlDatabase.database'),
        entities: [__dirname + '/../dist/modules/**/models/entities/*.js'],
        migrations: [process.cwd() + '/src/shared/database/migrations/*.ts'],
        cli: {
          migrationsDir: process.cwd() + '/src/shared/database/migrations'
        },
        keepConnectionAlive: true
      })
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('nosqlDatabase.url'),
        connectionName: configService.get('nosqlDatabase.name'),
        dbName: configService.get('nosqlDatabase.database'),
        useUnifiedTopology: true,
        autoCreate: true,
        autoIndex: true,
        keepAlive: true
      })
    }),
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
