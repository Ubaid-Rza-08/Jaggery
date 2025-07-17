import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import NewsletterSignup from "../components/NewsletterSignup";
import { Link } from "react-router-dom";
const sampleProducts = [
  {
    id: 1,
    name: "Palm Jaggery Block",
    price: "150",
    image: "https://spicecliq.com/wp-content/uploads/2021/07/palm-jaggery.jpg",
    description: "Organic palm jaggery made from natural palm sap. Rich in minerals and iron.",
    ingredients: "Palm sap, no additives",
    stock: 15
  },
  {
    id: 2,
    name: "Liquid Jaggery Bottle",
    price: "120",
    image: "https://nuttyyogi.com/cdn/shop/products/LiquidJaggery_DSC8312.jpg?v=1680766195",
    description: "Organic palm jaggery made from natural palm sap. Rich in minerals and iron.",
  ingredients: "Palm sap, no additives",
  stock: 15
  },
  {
    id: 3,
    name: "Organic Jaggery Powder",
    price: "99",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSak-JC9JllMu2jufy_MCA2Gksl4CxCDNIkqA&s",
    description: "Organic palm jaggery made from natural palm sap. Rich in minerals and iron.",
  ingredients: "Palm sap, no additives",
  stock: 15
  },
  {
    id: 4,
    name: "Desi Jaggery Cubes",
    price: "110",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MhsjlRTOwgnU3Ay6kZi3deUwnsZk6wKt8g&s",
    description: "Organic palm jaggery made from natural palm sap. Rich in minerals and iron.",
  ingredients: "Palm sap, no additives",
  stock: 15
  },
];
export default function Home() {
  return (
    <>
      <div className="min-h-screen md:px-12 px-6 flex justify-center items-center bg-[#FBEAEB]">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-yellow-800 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {sampleProducts.map((prod) => (
              <Link to={`/products/${prod.id}`} className="no-underline" key={prod.id}>
                <Categories {...prod} />
              </Link>
            ))}
          </div>

          <section className="px-8 py-12 bg-white w-full h-min-screen mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-800">Best Selling Jaggery Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sampleProducts.map((prod) => (
                
                  <ProductCard product={prod} key={prod.id} />
                
              ))}
            </div>
          </section>
          <WhyChooseUs />
          <Testimonials />
          <NewsletterSignup />
        </div>
      </div>
    </>
  );
}
