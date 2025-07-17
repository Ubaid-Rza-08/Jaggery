import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchSortBar from "../components/SearchSortBar";
import FilterSidebar from "../components/FilterSidebar";
import axios from "axios";
import { CartContext } from "../context/CartContext";
export default function ProductListingPage() {
  const {productList,setProductList}=useContext(CartContext);
    const backendApi=import.meta.env.VITE_BACKEND_URL;
const [Categories,setCategories]=useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("default"); 
  const [selectedCategory, setSelectedCategory] = useState(0);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchCategories = async () => {
   
    try {
      const res = await axios.get(`${backendApi}/product/getAllCategory`);
      console.log(res.data);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching Categories:", err);
    } 
  };
  fetchCategories();
}, []);
useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendApi}/product/getProductByCategoryId?id=${selectedCategory}`);
      console.log(res.data);
      setProductList(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, [selectedCategory]);
  const filteredProducts = productList
    .filter((p) => p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price_low") return a.price - b.price;
      if (sort === "price_high") return b.price - a.price;
      return 0;
    });
  return (
    <>
      <div className="px-6 py-12 bg-[#FBEAEB]">
        <h1 className="text-2xl font-bold mb-6 text-yellow-800 text-center">
          All Jaggery Products
        </h1>
        <SearchSortBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sort={sort}
          setSort={setSort}
        />
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-1/4">
            <FilterSidebar
              categories={Categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categoryId={selectedCategory}
            />
          </aside>
          <main className="md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {loading?<p>loading...</p>:(
              filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
        
                    <ProductCard  product={p} key={p.id}/>
                 
                ))
              ) : (
                <p>No products found</p>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

ProductListingPage.propTypes = {};
