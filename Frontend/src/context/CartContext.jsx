import { createContext } from "react";
import {  useState } from "react";
export const CartContext=createContext()
export const CartProvider=({children})=>{
const [productList,setProductList]=useState([]);
const [cartItems,setCartItems]=useState([]);
const token=localStorage.getItem( "token")
const BACKEND_API=import.meta.env.VITE_BACKEND_URL;
const addToCart=async (id)=>{
  try{
    const response=await fetch (`${BACKEND_API}/product/cart/addToCart`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(id)
    });
    if(!response.ok){
       throw new Error("Failed to add Product to Cart.");
    }
    alert("Product Added to cart");
  }catch(err){
    console.error(err);
  }
}
 const updateQuantity=(id,quantity)=>{
  
    setCartItems((prev)=>{
         return prev.map((item)=>
            item.id===id?{...item,quantity}:item);
    });
 };
 const getCartItem=async()=>{
try{
  const response=await fetch(`${BACKEND_API}/product/cart/getCart`,{
    method:"GET",
    headers:{
      "Content-Type": "application/json",
      "Authorization":`Bearer ${token}`,
    },
  });
  if(!response.ok){
    throw new Error("Failed to Fetch prodcts");
  }
  
  const data= await response.json();
  const itemWithQuantity=data.map(item=>({
    ...item,quantity:1,
  }))
  setCartItems(itemWithQuantity);
}catch(err){
  console.error(err);
}
 }
 const removeFromCart=async(id)=>{
  try{
    const response=await fetch(`${BACKEND_API}/product/cart/removeFromCart`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
      "Authorization":`Bearer ${token}`,
      },
      body: JSON.stringify(id)
  })
    if(!response.ok){
    throw new Error("Failed to Fetch prodcts");
  }}
  catch(err){
    console.error(err);
  }
    setCartItems((prev)=>prev.filter((item)=>
        item.id!==id
    ));
 };
 const clearCart=()=>{
  setCartItems([]);
 }
 return (
    <CartContext.Provider value={{
      getCartItem,
      setProductList,
      productList,
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
    }}>
        {children}</CartContext.Provider>
 )

}