import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import 'colors'

import { AppModule } from './app.module'
import { AllExceptionFilter } from './shared/filters/http-exception.filter'
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  const configService = app.get(ConfigService)
  app.setGlobalPrefix('api')
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  // SETUP DOCS
  const config = new DocumentBuilder()
    .setTitle('Car Rentals')
    .setDescription('')
    .setVersion('1.0')
    .addTag('cars')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(configService.get('PORT'))
  Logger.log(
    `Server running on port ${configService.get('PORT')} in ${
      process.env.NODE_ENV
    } mode`.blue.bold
  )
}
bootstrap()
