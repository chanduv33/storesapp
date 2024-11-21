import { Product } from './Product';
import { Products } from './Products';

export interface Cart {
    id?: number;
    itemProductId: number;
    userId: number;
    quantity: number;
    paymentType?: string;
    productName?: string;
    productCost?: number;
}
