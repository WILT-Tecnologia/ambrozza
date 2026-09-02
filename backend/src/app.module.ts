import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApprovalModule } from './modules/approval/approval.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // Tempo em milissegundos (60 segundos)
        limit: 5, // Máximo de 20 requisições por IP nesse período
      },
    ]),
    PrismaModule,
    ApprovalModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
