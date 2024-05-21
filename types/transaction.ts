export interface ProductStock {
    name: string;
    cat: string;
  }
  
  export interface Product {
    sellprice: number;
    productstock: ProductStock;
  }
  
  export interface TransactionData {
    id: string;
    productId: string;
    quantity: number;
    transactionId: string;
    product: Product;
  }
  