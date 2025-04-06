export type BaseEntity = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PaginationOptions = {
  page?: number;
  limit?: number;
};
