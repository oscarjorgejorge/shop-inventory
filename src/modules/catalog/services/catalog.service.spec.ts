import { Test, TestingModule } from '@nestjs/testing';
import { CatalogService } from './catalog.service';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { CatalogRepository } from '../repositories/catalog.repository';
import { CatalogProductsService } from '../../catalog-products/catalog-products.service';

describe('CatalogService', () => {
  let service: CatalogService;
  let repository: CatalogRepository;
  let catalogProductsService: CatalogProductsService;

  const mockCatalogRepository = {
    findByName: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  const mockCatalogProductsService = {
    countProductsByCatalogId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogService,
        {
          provide: CatalogRepository,
          useValue: mockCatalogRepository,
        },
        {
          provide: CatalogProductsService,
          useValue: mockCatalogProductsService,
        },
      ],
    }).compile();

    service = module.get<CatalogService>(CatalogService);
    repository = module.get<CatalogRepository>(CatalogRepository);
    catalogProductsService = module.get<CatalogProductsService>(CatalogProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw ConflictException when catalog with same name exists', async () => {
      const createDto = { name: 'Test Catalog' };
      mockCatalogRepository.findByName.mockResolvedValue({ id: 1, name: 'Test Catalog' });

      await expect(service.create(createDto)).rejects.toThrow(ConflictException);
      expect(mockCatalogRepository.findByName).toHaveBeenCalledWith('Test Catalog');
    });

    it('should create a catalog when name is unique', async () => {
      const createDto = { name: 'New Catalog' };
      const createdCatalog = { id: 1, ...createDto };
      mockCatalogRepository.findByName.mockResolvedValue(null);
      mockCatalogRepository.create.mockResolvedValue(createdCatalog);

      const result = await service.create(createDto);

      expect(result).toEqual(createdCatalog);
      expect(mockCatalogRepository.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('delete', () => {
    it('should throw BadRequestException when catalog has products', async () => {
      const catalogId = 1;
      mockCatalogProductsService.countProductsByCatalogId.mockResolvedValue(2);

      await expect(service.delete(catalogId)).rejects.toThrow(BadRequestException);
      expect(catalogProductsService.countProductsByCatalogId).toHaveBeenCalledWith(catalogId);
    });

    it('should delete catalog when it has no products', async () => {
      const catalogId = 1;
      const deletedCatalog = { id: catalogId, name: 'Test Catalog' };
      mockCatalogProductsService.countProductsByCatalogId.mockResolvedValue(0);
      mockCatalogRepository.delete.mockResolvedValue(deletedCatalog);

      const result = await service.delete(catalogId);

      expect(result).toEqual(deletedCatalog);
      expect(mockCatalogRepository.delete).toHaveBeenCalledWith(catalogId);
    });
  });
});
