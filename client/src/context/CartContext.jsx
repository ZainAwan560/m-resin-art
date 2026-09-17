import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';
const C=createContext();
export function CartProvider({children}){const [items,setItems]=useState(()=>JSON.parse(localStorage.getItem('mra-cart')||'[]'));useEffect(()=>localStorage.setItem('mra-cart',JSON.stringify(items)),[items]);
const add=(product,customization={})=>setItems(a=>{const key=product._id+JSON.stringify(customization);const i=a.findIndex(x=>x.key===key);if(i>=0){const n=[...a];n[i]={...n[i],quantity:n[i].quantity+1};return n}return [...a,{key,product,customization,quantity:1}]});
const remove=key=>setItems(a=>a.filter(x=>x.key!==key));const qty=(key,d)=>setItems(a=>a.map(x=>x.key===key?{...x,quantity:Math.max(1,x.quantity+d)}:x));const clear=()=>setItems([]);const subtotal=useMemo(()=>items.reduce((s,x)=>s+x.product.price*x.quantity,0),[items]);return <C.Provider value={{items,add,remove,qty,clear,subtotal,count:items.reduce((s,x)=>s+x.quantity,0)}}>{children}</C.Provider>}
export const useCart=()=>useContext(C);
