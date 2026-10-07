import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InversionesController } from './inversiones.controller';
import { InversionesService } from './inversiones.service';
import { Inversion } from './entities/inversion.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inversion]), UsersModule],
  controllers: [InversionesController],
  providers: [InversionesService],
})
export class InversionesModule {}
