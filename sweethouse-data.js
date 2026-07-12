// SweetHouse product catalog — edit names, prices, and ingredients here.
// To add a product photo: put the image file in the menu_photos/ folder,
// then add a line like   photo: 'menu_photos/your-file.jpeg',   to the item.
// Items without a photo show a neutral placeholder on the menu.
export const PRODUCTS = [
  { id: 'red-bean-cheese', cat: 'bread', name: 'red bean cheese bread', price: 4,
    ingredients: ['bread flour', 'whole milk', 'egg', 'sugar', 'yeast', 'butter', 'red bean paste', 'cream cheese', 'salt'] },
  { id: 'taro-cheese', cat: 'bread', name: 'taro cheese bread', price: 4,
    ingredients: ['bread flour', 'whole milk', 'egg', 'sugar', 'yeast', 'butter', 'taro paste', 'cream cheese', 'salt'] },
  { id: 'hot-dog', cat: 'bread', name: 'hot dog bread', price: 5, photo: 'menu_photos/hot-dog.jpeg',
    ingredients: ['bread flour', 'whole milk', 'egg', 'sugar', 'yeast', 'butter', 'hot dog sausage', 'green onion', 'sesame', 'salt'] },
  { id: 'taro-pork-floss', cat: 'bread', name: 'taro & pork floss bread', price: 6,
    ingredients: ['bread flour', 'whole milk', 'egg', 'sugar', 'yeast', 'butter', 'taro paste', 'pork floss', 'mayonnaise', 'salt'] },
  { id: 'blueberry-cheese', cat: 'bread', name: 'blueberry & cheese bread', price: 6,
    ingredients: ['bread flour', 'whole milk', 'egg', 'sugar', 'yeast', 'butter', 'blueberry jam', 'cream cheese', 'salt'] },
  { id: 'green-onion-roll', cat: 'bread', name: 'green onion & pork floss bread roll', price: 8,
    ingredients: ['bread flour', 'whole milk', 'egg', 'sugar', 'yeast', 'butter', 'green onion', 'pork floss', 'mayonnaise', 'sesame', 'salt'] },
  { id: 'milk-toast', cat: 'pastry', name: 'milk toast', price: 13,
    ingredients: ['bread flour', 'whole milk', 'heavy cream', 'egg', 'sugar', 'yeast', 'butter', 'salt'] },
  { id: 'taro-milk-toast', cat: 'pastry', name: 'taro milk toast', price: 14,
    ingredients: ['bread flour', 'whole milk', 'heavy cream', 'taro paste', 'egg', 'sugar', 'yeast', 'butter', 'salt'] },
  { id: 'swiss-original', cat: 'cake', name: 'swiss roll — original', price: 18,
    ingredients: ['cake flour', 'egg', 'sugar', 'whipping cream', 'whole milk', 'vegetable oil', 'vanilla'] },
  { id: 'swiss-earl-grey', cat: 'cake', name: 'swiss roll — earl grey', price: 20,
    ingredients: ['cake flour', 'egg', 'sugar', 'whipping cream', 'whole milk', 'vegetable oil', 'earl grey tea'] },
  { id: 'swiss-matcha', cat: 'cake', name: 'swiss roll — matcha', price: 22,
    ingredients: ['cake flour', 'egg', 'sugar', 'whipping cream', 'whole milk', 'vegetable oil', 'matcha powder'] },
];

export const LOCATIONS = [
  { id: 'loc-1', name: 'Pick up location 1', address: 'Address coming soon', hours: 'Sat & Sun · 10am – 4pm' },
  { id: 'loc-2', name: 'Pick up location 2', address: 'Address coming soon', hours: 'Sat & Sun · 10am – 4pm' },
  { id: 'loc-3', name: 'Pick up location 3', address: 'Address coming soon', hours: 'Wed & Fri · 4pm – 7pm' },
];

export const CATS = [
  { id: 'bread', label: 'bread' },
  { id: 'cake', label: 'cake' },
  { id: 'pastry', label: 'pastry' },
];
