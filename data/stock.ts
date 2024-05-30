import axios from 'axios';

export async function getTotal() {
  const response = await axios.get('/api/dashboard');
  const { totalStock, totalAmount, totalQuantity } = response.data;
  return { totalStock, totalAmount, totalQuantity };
}
