import { Test, TestingModule } from '@nestjs/testing';
import { BaseRepository } from './base.repository';
import { PrismaService } from '../../prisma/prisma.service';

class TestRepository extends BaseRepository<any, any, any> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'testModel');
  }
}

describe('BaseRepository', () => {
  let repository: TestRepository;
  let prismaService: PrismaService;

  const mockPrismaService = {
    testModel: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    repository = new TestRepository(prismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('baseRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create an entity', async () => {
      const createData = { name: 'Test Entity' };
      const mockEntity = { id: 1, ...createData };
      mockPrismaService.testModel.create.mockResolvedValue(mockEntity);

      const result = await repository.create(createData);

      expect(result).toEqual(mockEntity);
      expect(mockPrismaService.testModel.create).toHaveBeenCalledWith({
        data: createData,
      });
    });
  });

  describe('findMany', () => {
    it('should return all entities with default pagination', async () => {
      const mockEntities = [
        { id: 1, name: 'Entity 1' },
        { id: 2, name: 'Entity 2' },
      ];
      mockPrismaService.testModel.findMany.mockResolvedValue(mockEntities);

      const result = await repository.findMany();

      expect(result).toEqual(mockEntities);
      expect(mockPrismaService.testModel.findMany).toHaveBeenCalledWith({
        include: undefined,
        where: {},
        skip: 0,
        take: 10,
      });
    });
  });
});
