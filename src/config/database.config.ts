import { join } from 'path'

import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { MongooseModuleOptions } from '@nestjs/mongoose'

dotenv.config()

export = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.SQL_HOST,
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    dropSchema: false,
    synchronize: false,
    keepConnectionAlive: true,
    migrationsRun: false,
    migrations: [join(__dirname, '..', 'shared/database/migrations/*.{ts,js}')],
    cli: {
      migrationsDir: 'src/shared/database/migrations'
    },
    entities: [join(__dirname, '..', 'modules/**/models/entities/*.{ts,js}')]
  } as TypeOrmModuleOptions,
  {
    name: 'other',
    type: 'mongodb',
    host: process.env.NOSQL_HOST,
    username: process.env.NOSQL_USERNAME,
    password: process.env.NOSQL_PASSWORD,
    entities: [join(__dirname, '..', 'modules/**/models/entities/*.{ts,js}')],
    useUnifiedTopology: true,
    autoCreate: true,
    autoIndex: true,
    keepAlive: true
  } as MongooseModuleOptions
]
