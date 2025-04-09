import { Test, TestingModule } from '@nestjs/testing';
import { CatalogRepository } from './catalog.repository';
import { PrismaService } from '../../../prisma/prisma.service';

describe('CatalogRepository', () => {
  let repository: CatalogRepository;
  let prismaService: PrismaService;

  const mockPrismaService = {
    catalog: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<CatalogRepository>(CatalogRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findByName', () => {
    it('should find a catalog by name', async () => {
      const mockCatalog = { id: 1, name: 'Winter collection' };
      mockPrismaService.catalog.findUnique.mockResolvedValue(mockCatalog);

      const result = await repository.findByName('Winter collection');

      expect(result).toEqual(mockCatalog);
      expect(mockPrismaService.catalog.findUnique).toHaveBeenCalledWith({
        where: { name: 'Winter collection' },
      });
    });

    it('should return null when catalog not found by name', async () => {
      mockPrismaService.catalog.findUnique.mockResolvedValue(null);

      const result = await repository.findByName('NonExistent');

      expect(result).toBeNull();
      expect(mockPrismaService.catalog.findUnique).toHaveBeenCalledWith({
        where: { name: 'NonExistent' },
      });
    });
  });
});
