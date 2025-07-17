import { User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { CartContext} from "../context/CartContext";
export default function Header() {
 const {cartItems,getCartItem} =useContext(CartContext);
 const totalQty=cartItems.reduce((sum,item)=>sum+item.quantity,0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

useEffect(() => {
getCartItem();
}, []);
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <div className="text-2xl font-bold text-yellow-800"><a href="/">JaggeryFarm</a></div>

      <div className="flex gap-4 items-center">
        <Link to="/cart" className="relative">
  🛒
  {totalQty > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
      {totalQty}
    </span>
  )}
</Link>  
        <Link  to="/profile"><User className="w-6 h-6 cursor-pointer"  /></Link>
      <nav className="hidden md:flex gap-6 text-gray-700">
        <a href="/">Home</a>
        <a href="/products">Products</a> 
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-16 right-2 max-w-md  bg-white shadow-lg flex flex-col items-start gap-4 px-4 py-6 text-gray-700 z-50 ">
          <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/products" onClick={() => setMobileMenuOpen(false)}>Products</a>
          <a href="/about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </nav>
      )}
      </div>
    </header>
  );
}
