import Floral from "@/dist/images/products/Floral.png";
import HugoShirt from "@/dist/images/products/HugoShirt.jpg";
import Kimino from "@/dist/images/products/Kimino.png";
import NikeJacket from "@/dist/images/products/NikeJacket.png";
import NikeJoggers from "@/dist/images/products/NikeJoggers.jpg";
import NikeWindRunner from "@/dist/images/products/NikeWindRunner.png";
import NikeWindRunner2 from "@/dist/images/products/NikeWindRunner2.jpg";
import Regatta from '@/dist/images/products/Regatta.png'

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: any;
}

const products: Product[] = [
  {
    id: "product-1",
    name: "Hugo Boss Men Shirt Black",
    price: 29.99,
    description:
      "Elevate your style with the Hugo Boss Men Shirt in classic black. This sophisticated shirt features a sleek, modern design crafted from high-quality fabric for ultimate comfort. Perfect for both formal and casual occasions, it offers a timeless look with its crisp collar and tailored fit.",
    photo: HugoShirt,
  },
  {
    id: "product-2",
    name: "Yumi Kimono Midi Wrap Dress - Green",
    price: 125,
    description:
      "Elevate your wardrobe with the Yumi Kimono Midi Wrap Dress in vibrant green. This elegant dress features a flattering wrap design that cinches at the waist, enhancing your silhouette. The kimono-inspired sleeves and midi length offer a blend of sophistication and comfort, making it perfect for both casual outings and special occasions. Crafted from high-quality fabric, this dress drapes beautifully and adds a touch of effortless style to any ensemble.",
    photo: Kimino,
  },

  {
    id: "product-3",
    name: "Nike WindRunner",
    price: 76,
    description:
      "The Nike WindRunner jacket is engineered to keep you protected against the elements while maintaining a stylish look. This lightweight jacket features Nike's signature wind-resistant fabric, a hood for added coverage, and a mesh lining for breathability. Perfect for running or casual wear, it combines functionality with sporty aesthetics.",
    photo: NikeWindRunner,
  },
  {
    id: "product-4",
    name: "Nike Jacket",
    price: 54,
    description:
      "Embrace versatile style with the Nike Jacket. Crafted for both function and fashion, this jacket is made with durable, water-resistant material to keep you dry and comfortable. It includes a full-length zipper, adjustable hood, and multiple pockets, making it a practical choice for everyday wear and outdoor adventures.",
    photo: NikeJacket,
  },
  {
    id: "product-5",
    name: "Nike WindRunner 2",
    price: 96.99,
    description:
      "Upgrade your outerwear collection with the Nike WindRunner 2. This updated version of the classic WindRunner features enhanced wind resistance and a sleek, ergonomic design. Made from premium materials, it offers a comfortable fit and added protection against harsh weather. Ideal for athletes and casual users alike, it’s both stylish and functional.",
    photo: NikeWindRunner2,
  },
  {
    id: "product-6",
    name: "Nike Joggers",
    price: 33.56,
    description:
      "Stay active and comfortable with the Nike Joggers. Designed for both performance and leisure, these joggers feature a soft, breathable fabric that moves with you. The sleek design includes an elastic waistband with adjustable drawstrings and tapered cuffs for a modern fit, making them ideal for workouts or lounging.",
    photo: NikeJoggers,
  },
  {
    id: "product-8",
    name: "Regatta Changing Dress Robe - Green",
    price: 96,
    description:
      "Discover effortless elegance with the H&M Tie Belt Crepe Dress in Cream White with a floral print. This charming dress features a delicate crepe fabric that drapes gracefully, complemented by a flattering tie belt that cinches the waist for a defined silhouette. The soft cream white color is adorned with a subtle floral pattern, adding a touch of feminine flair. Perfect for day-to-night wear, this dress combines comfort with sophistication, making it a versatile addition to your wardrobe.",
    photo: Regatta,
  },
  {
    id: "product-7",
    name: "H&M Tie Belt Crepe Dress - Cream White/Floral",
    price: 99,
    description:
      "Discover effortless elegance with the H&M Tie Belt Crepe Dress in Cream White with a floral print. This charming dress features a delicate crepe fabric that drapes gracefully, complemented by a flattering tie belt that cinches the waist for a defined silhouette. The soft cream white color is adorned with a subtle floral pattern, adding a touch of feminine flair. Perfect for day-to-night wear, this dress combines comfort with sophistication, making it a versatile addition to your wardrobe.",
    photo: Floral,
  },
];

export default products;
