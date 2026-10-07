import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { InversionesService } from './inversiones.service';
import { CreateInversionDto } from './dto/create-inversion.dto';

@Controller('inversiones')
export class InversionesController {
  constructor(private readonly inversionesService: InversionesService) {}

  // Obtener todas las inversiones
  @Get()
  findAll() {
    return this.inversionesService.findAll();
  }

  // Obtener todas las inversiones de un usuario
  @Get('user/:userId')
  findAllByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.inversionesService.findAllByUser(userId);
  }

  // Obtener una inversión específica de un usuario
  @Get('user/:userId/:id')
  findOne(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.inversionesService.findOne(userId, id);
  }

  // Crear una inversión para un usuario
  @Post('user/:userId')
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createInversionDto: CreateInversionDto,
  ) {
    return this.inversionesService.create(userId, createInversionDto);
  }

  // Eliminar una inversión de un usuario
  @Delete('user/:userId/:id')
  remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.inversionesService.remove(userId, id);
  }
}