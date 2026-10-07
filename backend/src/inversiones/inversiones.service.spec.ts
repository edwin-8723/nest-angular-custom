import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InversionesService } from './inversiones.service';
import { Inversion } from './entities/inversion.entity';
import { UsersService } from '../users/users.service';

describe('InversionesService', () => {
  let service: InversionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InversionesService,
        {
          provide: getRepositoryToken(Inversion),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<InversionesService>(InversionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
