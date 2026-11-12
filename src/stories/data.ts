export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const revenue = [42, 48, 45, 61, 58, 72, 69, 84, 80, 95, 102, 118];
const costs = [30, 32, 35, 38, 41, 44, 47, 49, 53, 55, 58, 60];

export const monthly = months.map((month, i) => ({ month, revenue: revenue[i], costs: costs[i] }));
export const series = [
  { key: 'revenue', label: 'Revenue' },
  { key: 'costs', label: 'Costs' }
];
export const traffic = [
  { name: 'Direct', value: 412 },
  { name: 'Search', value: 638 },
  { name: 'Social', value: 204 },
  { name: 'Referral', value: 151 }
];
export const spark = [4, 6, 5, 8, 7, 11, 9, 13, 12, 16, 15, 19];
