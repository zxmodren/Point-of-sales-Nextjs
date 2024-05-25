import axios from 'axios';

export async function getTotal() {
  const response = await axios.get('/api/dashboard');
  const { totalStock, totalAmount, totalQuantity } = response.data;
  console.log('Total Stock:', totalStock);
  console.log('Total Amount:', totalAmount);
  console.log('Total Quantity:', totalQuantity);
  return { totalStock, totalAmount, totalQuantity };
}
