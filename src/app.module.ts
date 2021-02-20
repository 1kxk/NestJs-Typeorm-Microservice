import { Module, CacheModule } from '@nestjs/common'
import redisStore from 'cache-manager-redis-store'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'

import { authConfig } from './config/auth.config'
import { nosqlDatabase, sqlDatabase } from './config/database.config'
import { storageConfig } from './config/storage.config'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './shared/modules/auth/auth.module'
import { NotificationsModule } from './modules/notifications/notifications.module'
import { DiskStorageProvider } from './shared/providers/storage/implementations/disk-storage'
import { EtheralMailProvider } from './shared/providers/email/implementations/etheral-mail'
import { HandleBarsTemplateProvider } from './shared/providers/emailTemplate/implementations/handlebars-template'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [sqlDatabase, nosqlDatabase, authConfig, storageConfig],
      envFilePath: [`.env.${process.env.NODE_ENV}`]
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: 86400, // 1d
        store: redisStore,
        host: configService.get<string>('cache.host'),
        port: configService.get<string>('cache.port')
      })
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
        keepAlive: true
      })
    }),
    AuthModule,
    UsersModule,
    NotificationsModule
  ],
  providers: [
    {
      provide: 'StorageProvider',
      useClass: DiskStorageProvider
    },
    {
      provide: 'MailProvider',
      useClass: EtheralMailProvider
    },
    {
      provide: 'MailTemplateProvider',
      useClass: HandleBarsTemplateProvider
    }
  ]
})
export class AppModule {}
