import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';
import * as moment from 'moment-timezone';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/utils/common';
import { CustomLoggerService } from 'src/lib/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enables /v1 or /v2 versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Set the default timezone to Africa/Lagos
  moment.tz.setDefault('Africa/Lagos');

  // Access the underlying Express app and enable trust proxy
  const expressApp = app.getHttpAdapter().getInstance() as express.Application;
  expressApp.set('trust proxy', 1);

  // Get configurations
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const productionUrl = configService.get<string>('PRODUCTION_URL');
  const stagingUrl = configService.get<string>('STAGING_URL');
  const appUrl = configService.get<string>('PLATFORM_URL');
  const logger = app.get(CustomLoggerService);
  const platform = configService.get<string>('PLATFORM');

  // Enable security features
  app.use(helmet());

  // Rate limiting to prevent abuse
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5000, // Limit each IP to 5000 requests per windowMs
  });

  // CORS settings
  const allowedOrigins = [
    `http://localhost:${port}`,
    `https://${productionUrl}`,
    `https://${stagingUrl}`,
    `https://${appUrl}`,
  ];
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET,PATCH,POST,PUT,DELETE,OPTIONS',
  });

  // JSON body limit
  app.use(express.json({ limit: '10kb' }));

  // Global filters and pipes
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      whitelist: false,
    }),
  );

  // 🔹 Swagger Setup (No versioning)
  const swaggerOptions = new DocumentBuilder()
    .setTitle(`${platform} API`)
    .setDescription(`API Documentation for ${platform}`)
    .setVersion('1.0.0')
    .addServer(`http://localhost:${port}`, 'Local')
    .addServer(`https://${productionUrl}`, 'Production')
    .addServer(`https://${stagingUrl}`, 'Staging')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions, {
    extraModels: [],
    deepScanRoutes: true,
  });

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: `${platform} API Docs`,
    swaggerOptions: {
      explorer: false,
      defaultModelsExpandDepth: -1,
      docExpansion: 'list',
      defaultModelRendering: 'model',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      displayRequestDuration: true,
      jsonEditor: true,
      useUnsafeSource: true,
      deepLinking: true,
    },
    customCss: '.swagger-ui .topbar { display: none; }',
  };

  SwaggerModule.setup('docs', app, swaggerDocument, customOptions);

  // Start the server
  try {
    await app.listen(port);
    logger.log(`Server is running at http://localhost:${port}`);
  } catch (err) {
    logger.error('Error starting the server:', err);
  }
}
bootstrap();
