export interface BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface PaginationOptions<T> {
    page?: number;
    limit?: number;
    filters?: T
  }
  