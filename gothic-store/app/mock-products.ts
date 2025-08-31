export interface Product {
  id: number;
  name: string;
  technicalDescription: string;
  poeticDescription: string;
  price: number;
  image: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Midnight Rebellion Hoodie',
    technicalDescription: 'Black cotton hoodie, available in sizes S–XL.',
    poeticDescription: 'Wrap yourself in shadows, a hoodie born from midnight and rebellion...',
    price: 66.60,
    image: '/mockups/hoodie1.jpg', // Placeholder image path
  },
  {
    id: 2,
    name: 'Obsidian Chalice Mug',
    technicalDescription: '11 oz. black ceramic mug. Dishwasher and microwave safe.',
    poeticDescription: 'Sip from the abyss. This chalice holds the darkness, and your favorite brew.',
    price: 25.00,
    image: '/mockups/mug1.jpg', // Placeholder image path
  },
  {
    id: 3,
    name: 'Gothic Spire T-Shirt',
    technicalDescription: '100% combed and ring-spun cotton. Pre-shrunk fabric.',
    poeticDescription: 'Wear the architecture of the night. A spire that reaches for a perpetually moonlit sky.',
    price: 35.00,
    image: '/mockups/tshirt1.jpg', // Placeholder image path
  },
  {
    id: 4,
    name: 'Crimson Bloom Phone Case',
    technicalDescription: 'Slim, durable phone case. Available for most iPhone and Samsung models.',
    poeticDescription: 'A single, defiant bloom in a world of shadows. Protect your device with a touch of gothic romance.',
    price: 29.99,
    image: '/mockups/phonecase1.jpg', // Placeholder image path
  },
];
