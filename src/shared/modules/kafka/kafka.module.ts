import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import ConsumeController from './consume.controller';
import { ProduceService } from './produce.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TMSCLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'userprofileId',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'tipee-tms-group',
          },
        },
      },
    ]),
  ],
  providers: [ProduceService],
  exports: [ProduceService],
  controllers: [ConsumeController],
})
export class KafkaModule {}
