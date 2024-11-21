import { Product } from './Product';

export interface Products {
    id?: string;
    quantity: number;
    productId: number;
    imageUrl?: string;
    productName?: string;
    manufacturerName?: string;
    sellingPrice: number;
    description?: string;
}
