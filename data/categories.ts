export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
  isActive?: boolean;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Latest electronic gadgets and devices',
    imageUrl: '/images/electronics.jpg',
    isActive: true,
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Trendy apparel and accessories',
    imageUrl: '/images/fashion.jpg',
    isActive: true,
  },
  {
    id: '3',
    name: 'Home & Garden',
    description: 'Furniture, decor, and garden tools',
    imageUrl: '/images/home-garden.jpg',
    isActive: true,
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    description: 'Gear and equipment for sports and outdoor activities',
    imageUrl: '/images/sports-outdoors.jpg',
    isActive: true,
  },
  // Add more categories as needed
];
