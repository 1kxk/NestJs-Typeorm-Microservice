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
import { NotificationsModule } from './modules/notifications/notifications.module'
import { MailModule } from './shared/modules/mail/mail.module'
import { StorageModule } from './shared/modules/storage/storage.module'

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
      envFilePath: [`.env.${process.env.NODE_ENV}`]
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
        synchronize: configService.get('sqlDatabase.synchronize'),
        autoLoadEntities: configService.get('sqlDatabase.autoLoadEntities'),
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
    UsersModule,
    NotificationsModule,
    StorageModule,
    MailModule
  ]
})
export class AppModule {}
