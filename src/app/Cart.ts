import { Product } from './Product';
import { Products } from './Products';

export interface Cart {
    itemProductId: number;
    product: Product;
    dealerProduct: Products;
    quantity: number;
}
