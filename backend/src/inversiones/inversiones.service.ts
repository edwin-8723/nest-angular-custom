import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inversion } from './entities/inversion.entity';
import { CreateInversionDto } from './dto/create-inversion.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class InversionesService {
  constructor(
    @InjectRepository(Inversion)
    private readonly inversionesRepository: Repository<Inversion>,
    private readonly usersService: UsersService,
  ) {}


  async findAll(): Promise<Inversion[]> {
    return this.inversionesRepository.find({
      order: { id: 'ASC' },
      relations: { user: true },
    });
  }

  async findAllByUser(userId: number): Promise<Inversion[]> {
    await this.usersService.findOne(userId);
    return this.inversionesRepository.find({
      where: { user: { id: userId } },
      order: { id: 'ASC' },
      relations: { user: true },
    });
  }

  async findOne(userId: number, id: number): Promise<Inversion> {
    await this.usersService.findOne(userId);
    const inversion = await this.inversionesRepository.findOne({
      where: { id, user: { id: userId } },
      relations: { user: true },
    });
    if (!inversion) {
      throw new NotFoundException(
        `Inversion ${id} not found for user ${userId}`,
      );
    }
    return inversion;
  }

  async create(
    userId: number,
    createInversionDto: CreateInversionDto,
  ): Promise<Inversion> {
    const user = await this.usersService.findOne(userId);
    const inversion = this.inversionesRepository.create({
      ...createInversionDto,
      user,
    });
    return this.inversionesRepository.save(inversion);
  }

  async remove(userId: number, id: number): Promise<void> {
    const inversion = await this.findOne(userId, id);
    await this.inversionesRepository.remove(inversion);
  }
}
