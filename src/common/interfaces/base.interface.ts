export interface BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface PaginationOptions {
    page?: number;
    limit?: number;
  }
  