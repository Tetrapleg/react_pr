export const totalPriceItems = order => order.price * order.count;

export function formatCurrency(props) {
  return props.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })
}