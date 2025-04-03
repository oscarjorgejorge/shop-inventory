export const PRODUCT_STATUS = {
    ACTIVE: 'ACTIVE',
    PAUSED: 'PAUSED',
    DELETED: 'DELETED'
  } as const;
  
  export type ProductStatus = typeof PRODUCT_STATUS[keyof typeof PRODUCT_STATUS];