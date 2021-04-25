import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PgService } from '../pg/pg.service';
import { PgModule } from '../pg/pg.module';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PgModule],
      providers: [UsersService, PgService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
