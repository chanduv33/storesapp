import { Product } from './Product';
import { Orders } from './Orders';
import { Products } from './Products';
import { Cart } from './Cart';

export interface User {
    userId?: number;
    role: string;
    username: string;
    email: string;
    password: string;
    mobileNumber: number;
    products: Product[];
    orders: Orders[];
    dealersProds: Products[];
    items: Cart[];
}
