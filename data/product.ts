import HugoShirt from '@/dist/images/products/HugoShirt.jpg';
import NikeJacket from '@/dist/images/products/NikeJacket.png';
import NikeJoggers from '@/dist/images/products/NikeJoggers.jpg';
import NikeWindRunner from '@/dist/images/products/NikeWindRunner.png';
import NikeWindRunner2 from '@/dist/images/products/NikeWindRunner2.jpg';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  photo: any;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Hugo Boss Men Shirt Black ',
    price: 29.99,
    description: 'Description for Product 1',
    photo: HugoShirt,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 39.99,
    description: '',
    photo: NikeJoggers,
  },
  {
    id: 3,
    name: 'Product 2',
    price: 39.99,
    description: '',
    photo: NikeWindRunner,
  },
  {
    id: 4,
    name: 'Product 2',
    price: 39.99,
    description: '',
    photo: NikeJacket,
  },
  {
    id: 5,
    name: 'Product 2',
    price: 39.99,
    description: '',
    photo: NikeWindRunner2,
  },
];

export default products;
