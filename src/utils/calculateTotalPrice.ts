export const calculateTotalPrice = (price: number, baseSize: number, size: number): number => {
  return Math.ceil(price * ((size)/baseSize));
}