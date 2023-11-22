// Contoh fungsi untuk membuat ID pesanan berdasarkan beberapa informasi
let orderIdCounter = 0; // Counter simulasi nomor urut

const generateOrderId = () => {
  orderIdCounter++;
  const timestamp = Date.now(); // Timestamp saat pembuatan pesanan
  const orderId = `TES-${timestamp}-${orderIdCounter}`;
  return orderId;
};

export default generateOrderId;
