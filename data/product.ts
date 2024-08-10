import HugoShirt from '@/dist/images/products/HugoShirt.jpg';
import NikeJacket from '@/dist/images/products/NikeJacket.png';
import NikeJoggers from '@/dist/images/products/NikeJoggers.jpg';
import NikeWindRunner from '@/dist/images/products/NikeWindRunner.png';
import NikeWindRunner2 from '@/dist/images/products/NikeWindRunner2.jpg';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: any;
}

const products: Product[] = [
  {
    id: 'product-1',
    name: 'Hugo Boss Men Shirt Black',
    price: 29.99,
    description: 'Description for Product 1',
    photo: HugoShirt,
  },
  {
    id: 'product-2',
    name: 'Nike Joggers',
    price: 39.99,
    description: '',
    photo: NikeJoggers,
  },
  {
    id: 'product-3',
    name: 'Nike WindRunner',
    price: 39.99,
    description: '',
    photo: NikeWindRunner,
  },
  {
    id: 'product-4',
    name: 'Nike Jacket',
    price: 39.99,
    description: '',
    photo: NikeJacket,
  },
  {
    id: 'product-5',
    name: 'Nike WindRunner 2',
    price: 39.99,
    description: '',
    photo: NikeWindRunner2,
  },
];

export default products;
